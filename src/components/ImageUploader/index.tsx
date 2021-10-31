import React, {FC, useState} from 'react';
import './ImageUploader.scss';
import Uploader from "../Uploader";
import Preview from "../Preview";

const ImageUploader: FC = () => {

    const [selectedImage, setSelectedImage] = useState<string>('')

    const handleImageSelection = (image: string) => {
        setSelectedImage(image)
    }

    const handleDeleteImage = (): void => {
        if (selectedImage) {
            setSelectedImage('')
        }
    }

    return (
        <div className={'ImageUploader'}>
            <Uploader handleImageSelection={handleImageSelection} handleDeleteImage={handleDeleteImage} />
            <Preview selectedImage={selectedImage} />
        </div>
    )
}

export default ImageUploader;
