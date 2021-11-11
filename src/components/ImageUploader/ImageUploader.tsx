import React, { FC, useState } from 'react'
import { Uploader } from '../Uploader'
import { Preview } from '../Preview'
import { ImageUploaderContainer } from './styled'
import { GlobalStyles } from '../../GlobalStyles'

export const ImageUploader: FC = () => {
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
        <ImageUploaderContainer>
            <GlobalStyles />
            <Uploader handleImageSelection={handleImageSelection} handleDeleteImage={handleDeleteImage} />
            <Preview selectedImage={selectedImage} />
        </ImageUploaderContainer>
    )
}
