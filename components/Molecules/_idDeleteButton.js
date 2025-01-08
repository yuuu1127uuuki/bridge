import React from 'react';
import Button from '../Atoms/Button';
import { useRouter } from 'next/router';

function _idDeleteButton() {
    const router = useRouter();
    const handleClick = () => {
        console.log('_idDeleteButton');
    };
    return <Button onClick={handleClick} text="ID指定でまとめて削除" />;
}

export default _idDeleteButton;
