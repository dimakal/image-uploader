import React, {FC, useEffect, useState} from 'react'
import './Preview.scss'
import {ClickTargets, ClickTargetsType, LabelType} from "../../types";
import Label from "../Label";
import {idGenerator} from "../../utils/idGenerator";

type Props = {
    selectedImage: string
}

const Preview: FC<Props> = ({selectedImage}) => {

    const [clickTargets, setClickTargets] = useState<ClickTargetsType>({prev: '', current: ''})
    const [labels, setLabels] = useState<LabelType[]>([])

    useEffect(() => {
        if (!selectedImage) {
            setClickTargets({prev: '', current: ''})
        }

        setLabels([])
    }, [selectedImage])

    const onAddLabel = (e: React.MouseEvent<HTMLImageElement>): void => {
        const target = e.target as HTMLImageElement

        setClickTargets(prevTargets => {
            return {
                prev: prevTargets.current ? prevTargets.current : '',
                current: 'img',
            }
        })

        if ((clickTargets.prev === ClickTargets.IMG && clickTargets.current === ClickTargets.LABEL) ||
            (clickTargets.prev === ClickTargets.LABEL && clickTargets.current === ClickTargets.LABEL)) {
            return
        }

        const parent = target.parentElement as HTMLDivElement
        const previewContainer = parent.parentElement as HTMLDivElement
        const label = parent.children[0].getBoundingClientRect()
        const imageWidth = target.offsetWidth
        const imageHeight = target.offsetHeight
        const isInsideWindowHorizontally = (e.clientX + label.width) < parent.offsetWidth + parent.offsetLeft
        const isInsideWindowVertically = e.clientY + window.scrollY + label.height * 2 < previewContainer.offsetTop + target.offsetHeight

        setLabels(prevLabels => {
            return [...prevLabels, {
                id: idGenerator(),
                text: '',
                left: isInsideWindowHorizontally ?
                    ((parent.offsetLeft + e.clientX) * 100 / imageWidth) + '%' :
                    ((parent.offsetLeft + imageWidth - label.width) * 100 / imageWidth) + '%',
                top: isInsideWindowVertically ?
                    ((e.clientY - previewContainer.offsetTop + window.scrollY) * 100 / imageHeight) + '%' :
                    '',
                bottom: !isInsideWindowVertically ?
                    (previewContainer.offsetTop + imageHeight - (e.clientY + window.scrollY)) * 100 / imageHeight + '%' :
                    ''
            }]
        })
    }

    const onSetLabelText = (id: string, newText: string): void => {
        setLabels((prevState) => {
                return prevState.map(label => label.id === id ? {...label, text: newText} : label)
            }
        )
    }

    const onSetClickTargets = (targets: ClickTargetsType): void => {
        setClickTargets(targets)
    }

    const onDeleteLabel = (id: LabelType["id"]): void => {
        setLabels((prevState) => {
                return prevState.filter(label => label.id !== id)
            }
        )
    }

    return (
        <>
            {
                selectedImage ? <div
                        className={'preview-container'}
                    >
                        <div className="image-wrapper">
                            <div className="label" style={{visibility: 'hidden', top: '-100%', position: 'absolute'}}>
                                <input type="text" className="label-field" />
                            </div>
                            {
                                labels.map(label => <Label
                                    key={label.id}
                                    label={label}
                                    onSetLabelText={onSetLabelText}
                                    deleteLabel={onDeleteLabel}
                                    onSetClickTargets={onSetClickTargets}
                                    clickTargets={clickTargets}
                                />)
                            }

                            <img
                                src={selectedImage}
                                className={'preview-image'}
                                alt={'preview'}
                                onClick={onAddLabel}
                            />
                        </div>
                    </div>
                    : <div className={'noImage'}> Preview will be here </div>
            }
        </>
    )
};

export default Preview