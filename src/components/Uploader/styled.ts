import styled from 'styled-components'

export const UploaderContainer = styled.div`
    padding: 15px;
    display: flex;
    justify-content: space-between;
`

export const UploaderButton = styled.label`
    transition-duration: 0.3s;
    cursor: pointer;
    border-radius: 5px;
    border: 2px solid #ccc;
    padding: 5px 10px;
    box-shadow: 1px 1px 4px #555;
    background: #feffca;

    &:active {
        box-shadow: -1px -1px 5px #ccc;
    }
`

export const UploaderInput = styled.input`
    display: none;
`

export const DeleteImageButton = styled.button`
    transition-duration: 0.3s;
    border: 2px solid #ccc;
    padding: 5px 10px;
    box-shadow: 1px 1px 4px #555;
    background: #fc5d5d;
    color: #fff;

    &:active {
        box-shadow: -1px -1px 5px #ccc;
    }
`
