import React, { FC, useEffect, useRef, useState } from 'react';
import './Label.scss';
import { ClickTargetsType, LabelType } from '../../types';

type Props = {
  label: LabelType;
  onSetLabelText: (id: string, newText: string) => void;
  deleteLabel: (id: LabelType['id']) => void;
  onSetClickTargets: (targets: ClickTargetsType) => void;
  clickTargets: ClickTargetsType;
};

export const Label: FC<Props> = ({
  label,
  onSetLabelText,
  deleteLabel,
  onSetClickTargets,
  clickTargets,
}) => {
  const [labelText, setLabelText] = useState<string>(label.text);
  const inputRef = useRef<HTMLInputElement>(null);
  const targetsAfterAction = {
    prev: 'label',
    current: 'img',
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    return () => onSetClickTargets(targetsAfterAction);
  }, []);

  const handleFocus = (): void => {
    onSetClickTargets({
      ...clickTargets,
      prev: clickTargets.current ? clickTargets.current : '',
      current: 'label',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.replace(/^\s*/, '');

    setLabelText(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      if (!labelText) {
        onSetClickTargets(targetsAfterAction);
      } else {
        onSetClickTargets(targetsAfterAction);
      }

      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
    if (e.code === 'Escape') {
      setLabelText(label.text);
      if (!labelText) {
        deleteLabel(label.id);

        onSetClickTargets(targetsAfterAction);
      }
    }
  };

  const onBlurField = (): void => {
    if (!labelText) {
      deleteLabel(label.id);
    } else {
      onSetLabelText(label.id, labelText);
    }
  };

  return (
    <div
      className="label"
      style={{
        left: `${label.left}`,
        top: `${label.top}`,
        bottom: `${label.bottom}`,
      }}
    >
      <div className="label-wrapper">
        <input
          className="label-field"
          type="text"
          ref={inputRef}
          value={labelText}
          onChange={handleChange}
          onBlur={onBlurField}
          onKeyDown={handleKeyPress}
          onFocus={handleFocus}
        />

        <button type="button" className="label-delete" onClick={() => deleteLabel(label.id)}>
          {' '}
          ×{' '}
        </button>
      </div>
    </div>
  );
};
