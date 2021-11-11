import styled from 'styled-components'

export const PreviewContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    line-height: 1;
`
export const ImageContainer = styled.div`
    position: relative;
    line-height: 0;
`
export const ImageWrapper = styled.div``

export const PreviewImage = styled.img`
    width: 100%;
    object-fit: contain;
`

export const NoImage = styled.div`
    flex: 1;
    text-align: center;
    padding-top: 70px;
    font-size: 32px;
    font-weight: bold;
`
