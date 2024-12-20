import React from 'react';
import Button from './Button';

const ConsoleWindow = ({ data, onEdit, onDelete }) => {
  return (
    <table
      border="1"
      style={{ width: '100%', textAlign: 'center', tableLayout: 'fixed' }}
    >
      <thead>
        <tr>
          <th>ID</th>
          <th>名前</th>
          <th>緯度経度</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        {data ? (
          <tr>
            <td>{data._id}</td>
            <td>{data.Name}</td>
            <td>{data.Id}</td>
            <td>
              <Button text="編集" onClick={onEdit} />
              <Button text="削除" onClick={onDelete} />
            </td>
          </tr>
        ) : (
          <tr>
            <td colSpan="4" style={{ textAlign: 'center' }}>
              データが選択されていません
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ConsoleWindow;
