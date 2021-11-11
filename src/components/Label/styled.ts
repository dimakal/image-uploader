import styled from 'styled-components'

export const LabelWrapper = styled.div<{ left?: string; top?: string; bottom?: string }>`
    position: absolute;
    left: ${(props) => props.left};
    top: ${(props) => props.top};
    bottom: ${(props) => props.bottom};
    height: 25px;
    display: flex;
    width: auto;
    flex: 1 1 120px;
    max-width: 120px;

    &::after {
        content: '';
        display: flex;
        flex: 1 1 25px;
    }

    @media (max-width: 1024px) {
        flex-basis: 100px;
        height: 20px;
    }
    //
    @media (max-width: 768px) {
        flex-basis: 80px;
        height: 18px;
    }
`

export const HiddenLabel = styled(LabelWrapper)`
    visibility: hidden;
    position: absolute;
    top: -100%;
    max-width: 120px;
    width: 120px;
`

export const LabelInputWrapper = styled.div`
    position: relative;
    height: 100%;
`

export const LabelInput = styled.input`
    background: rgba(255, 255, 255, 0.8);
    border: 2px solid #aaa;
    transition-duration: 0.3s;
    width: 100%;
    height: 100%;
    flex: 1;
    padding-right: 15px;

    &:focus {
        border-color: #555;
        box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2), -1px 1px 3px rgba(0, 0, 0, 0.2), 1px -1px 3px rgba(0, 0, 0, 0.2),
            -1px -1px 3px rgba(0, 0, 0, 0.2);
    }
`

export const DeleteButton = styled.button`
    position: absolute;
    top: -3px;
    right: -4px;
    cursor: pointer;
    border-radius: 50%;
    background: #ff5252;
    height: 12px;
    width: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ddd;
    font-size: 14px;
`
