import React, { FC, useEffect, useState } from 'react'
import { ClickTargetsType, LabelType } from '../../types'
import { Label } from '../Label'
import { idGenerator } from '../../utils/idGenerator'
import { ClickTargetsEnum } from '../../enums'
import { HiddenLabel } from '../Label/styled'
import { ImageContainer, ImageWrapper, NoImage, PreviewContainer, PreviewImage } from './styled'

type Props = {
    selectedImage: string
}

export const Preview: FC<Props> = ({ selectedImage }) => {
    const [clickTargets, setClickTargets] = useState<ClickTargetsType>({ prev: '', current: '' })
    const [labels, setLabels] = useState<LabelType[]>([])

    useEffect(() => {
        if (!selectedImage) {
            setClickTargets({ prev: '', current: '' })
        }

        setLabels([])
    }, [selectedImage])

    const onAddLabel = (e: React.MouseEvent<HTMLDivElement>): void => {
        const target = e.target as HTMLDivElement

        setClickTargets((prevTargets) => {
            return {
                prev: prevTargets.current ? prevTargets.current : '',
                current: 'img',
            }
        })
        if (
            (clickTargets.prev === ClickTargetsEnum.IMG && clickTargets.current === ClickTargetsEnum.LABEL) ||
            (clickTargets.prev === ClickTargetsEnum.LABEL && clickTargets.current === ClickTargetsEnum.LABEL)
        ) {
            return
        }

        const parent = target.parentElement as HTMLDivElement
        const imageWrapper = parent.parentElement as HTMLDivElement
        const previewContainer = imageWrapper.parentElement as HTMLDivElement
        const label = imageWrapper.children[0].getBoundingClientRect()
        const imageWidth = target.offsetWidth
        const imageHeight = target.offsetHeight
        const isInsideWindowHorizontally = e.clientX + label.width < imageWrapper.offsetWidth + imageWrapper.offsetLeft
        const isInsideWindowVertically =
            e.clientY + window.scrollY + label.height * 2 < previewContainer.offsetTop + target.offsetHeight

        setLabels((prevLabels) => {
            return [
                ...prevLabels,
                {
                    id: idGenerator(),
                    text: '',
                    left: isInsideWindowHorizontally
                        ? `${((imageWrapper.offsetLeft + e.clientX) * 100) / imageWidth}%`
                        : `${((imageWrapper.offsetLeft + imageWidth - label.width) * 100) / imageWidth}%`,
                    top: isInsideWindowVertically
                        ? `${((e.clientY - previewContainer.offsetTop + window.scrollY) * 100) / imageHeight}%`
                        : '',
                    bottom: !isInsideWindowVertically
                        ? `${
                              ((previewContainer.offsetTop + imageHeight - (e.clientY + window.scrollY)) * 100) /
                              imageHeight
                          }%`
                        : '',
                },
            ]
        })
    }

    const onSetLabelText = (id: string, newText: string): void => {
        setLabels((prevState) => {
            return prevState.map((label) => (label.id === id ? { ...label, text: newText } : label))
        })
    }

    const onSetClickTargets = (targets: ClickTargetsType): void => {
        setClickTargets(targets)
    }

    const onDeleteLabel = (id: LabelType['id']): void => {
        setLabels((prevState) => {
            return prevState.filter((label) => label.id !== id)
        })
    }

    return (
        <>
            {selectedImage ? (
                <PreviewContainer>
                    <ImageContainer>
                        <HiddenLabel />

                        {labels.map((label) => (
                            <Label
                                key={label.id}
                                label={label}
                                onSetLabelText={onSetLabelText}
                                deleteLabel={onDeleteLabel}
                                onSetClickTargets={onSetClickTargets}
                                clickTargets={clickTargets}
                            />
                        ))}
                        <ImageWrapper onClick={onAddLabel} role="presentation">
                            <PreviewImage src={selectedImage} className="preview-image" alt="preview" />
                        </ImageWrapper>
                    </ImageContainer>
                </PreviewContainer>
            ) : (
                <NoImage> Preview will be here </NoImage>
            )}
        </>
    )
}
