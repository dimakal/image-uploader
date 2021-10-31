import React, {
    FC, useRef,
    useState
} from 'react'
import './Label.scss'
import {ClickTargetsType, LabelType} from "../../types";

type Props = {
    label: LabelType
    onSetLabelText: (id: string, newText: string) => void
    deleteLabel: (id: LabelType["id"]) => void
    onSetClickTargets: (targets: ClickTargetsType) => void
    clickTargets: ClickTargetsType
}

const Label: FC<Props> = ({
                              label,
                              onSetLabelText,
                              deleteLabel,
                              onSetClickTargets,
                              clickTargets,
                          }) => {

    const [labelText, setLabelText] = useState<string>(label.text)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleFocus = (clickTargets: ClickTargetsType): void => {
        onSetClickTargets(
            {
                ...clickTargets,
                prev: clickTargets.current ? clickTargets.current : '',
                current: 'label'
            }
        )
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value.replace(/^\s*/, '')

        setLabelText(value)
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        const clickTargets = {
            prev: 'label',
            current: 'img',
        }

        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            if (!labelText) {
                onSetClickTargets(clickTargets)
            } else {
                onSetClickTargets(clickTargets)
            }

            inputRef.current && inputRef.current.blur()
        }
        if (e.code === 'Escape') {
            setLabelText(label.text)
            if (!labelText) {
                deleteLabel(label.id)

                onSetClickTargets(clickTargets)
            }
        }
    }

    const onBlurField = (): void => {
        if (!labelText) {
            deleteLabel(label.id)
        } else {
            onSetLabelText(label.id, labelText)
        }
    }

    return (
        <div className="label" style={{
            left: `${label.left}`,
            top: `${label.top}`,
            bottom: `${label.bottom}`
        }}>

            <div className="label-wrapper">
                <input
                    className={'label-field'}
                    type="text"
                    autoFocus={true}
                    ref={inputRef}
                    value={labelText}
                    onChange={handleChange}
                    onBlur={onBlurField}
                    onKeyDown={handleKeyPress}
                    onFocus={() => handleFocus(clickTargets)}
                />

                <div className="label-delete" onClick={() => deleteLabel(label.id)}>
                    <span className={'label-deleteIcon'}> × </span>
                </div>
            </div>
        </div>
    )
};

export default Label