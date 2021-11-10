import React, { ChangeEvent, FC, useRef } from 'react';
import './Uploader.scss';

type Props = {
  handleImageSelection: (image: string) => void;
  handleDeleteImage: () => void;
};

export const Uploader: FC<Props> = ({ handleImageSelection, handleDeleteImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onSelectImage = (e: ChangeEvent<HTMLInputElement>): void => {
    if (FileReader && e.target.files && e.target.files.length) {
      const file = e.target.files[0];

      const reader: FileReader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result;

        handleImageSelection(base64String as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onDeleteImage = (): void => {
    if (fileInputRef.current && fileInputRef.current.value) {
      fileInputRef.current.value = '';
    }

    handleDeleteImage();
  };

  return (
    <div className="uploader">
      <label htmlFor="fileInput" className="uploader-button">
        Upload image
        <input
          id="fileInput"
          ref={fileInputRef}
          type="file"
          onChange={onSelectImage}
          accept=".jpg, .jpeg, .png"
        />
      </label>
      <button type="button" className="delete-image-button" onClick={onDeleteImage}>
        Delete image
      </button>
    </div>
  );
};
