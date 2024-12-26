import React from 'react';
import Button from '../Atoms/Button';
// ページをリロードするボタン
function ResetButton() {
  const handleClick = () => {
    window.location.reload();
  };

  return <Button onClick={handleClick} text="ホーム画面に戻る" />;
}

export default ResetButton;
