import React from 'react';
import Button from './Button';
// ページをリロードするボタン
function ResetButton() {
    const handleClick = () => {
        window.location.reload();
    };

    return (
        <Button onClick={handleClick} text="リセット" />
    );
}

export default ResetButton;