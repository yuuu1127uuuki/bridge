import React from 'react';
import Button from './Button';

function ResetButton() {
    const handleClick = () => {
        window.location.reload();
    };

    return (
        <Button onClick={handleClick} text="リセット" />
    );
}

export default ResetButton;