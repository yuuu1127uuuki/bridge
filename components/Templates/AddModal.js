import React, { useState } from 'react';
import Modal from '../Organisms/Modal';
import InputField from '../Atoms/InputField';

const AddModal = ({ isOpen, onClose, onCancel, onConfirm }) => {
  const [formData, setFormData] = useState({
    _id: '',
    bridge: '',
    Inspector: '',
    Tel: '',
    Id: '',
    Name: '',
    Kana: '',
    Road: '',
    address: '',
    Keisiki: '',
    birth: '',
    length: '',
    width: '',
    HowUse: '',
    Date: '',
    Rank: '',
    Schedule: '',
    New: '',
    Ho1: '',
    Ho2: '',
    Ho3: '',
    Ho4: '',
    Ho5: '',
    Record: '',
    Co: '',
  });

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      title="新しい橋を追加"
      onClose={onClose}
      onCancel={onCancel}
      onConfirm={() => onConfirm(formData)}
    >
      <div style={{ maxHeight: '80vh', overflowY: 'auto', textAlign: 'left' }}>
        <InputField
          title="ID"
          label="ハイフン込みで12文字を入力"
          value={formData._id}
          onChange={(e) => handleInputChange('_id', e.target.value)}
        />
        <InputField
          title="タイプ"
          label="ここに入力"
          value={formData.bridge}
          onChange={(e) => handleInputChange('bridge', e.target.value)}
        />
        <InputField
          title="管理事務所"
          label="ここに入力"
          value={formData.Inspector}
          onChange={(e) => handleInputChange('Inspector', e.target.value)}
        />
        <InputField
          title="電話番号"
          label="ここに入力"
          value={formData.Tel}
          onChange={(e) => handleInputChange('Tel', e.target.value)}
        />
        <InputField
          title="緯度経度"
          label="ここに入力"
          value={formData.Id}
          onChange={(e) => handleInputChange('Id', e.target.value)}
        />
        <InputField
          title="名前"
          label="ここに入力"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
        />
        <InputField
          title="ﾅﾏｴ"
          label="ここに入力"
          value={formData.Kana}
          onChange={(e) => handleInputChange('Kana', e.target.value)}
        />
        <InputField
          title="道路"
          label="ここに入力"
          value={formData.Road}
          onChange={(e) => handleInputChange('Road', e.target.value)}
        />
        <InputField
          title="住所"
          label="ここに入力"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
        />
        <InputField
          title="橋の形式"
          label="ここに入力"
          value={formData.Keisiki}
          onChange={(e) => handleInputChange('Keisiki', e.target.value)}
        />
        <InputField
          title="建設年度"
          label="例: 2000"
          value={formData.birth}
          onChange={(e) => handleInputChange('birth', e.target.value)}
        />
        <InputField
          title="橋の長さ"
          label="ここに入力"
          value={formData.length}
          onChange={(e) => handleInputChange('length', e.target.value)}
        />
        <InputField
          title="橋の幅"
          label="ここに入力"
          value={formData.width}
          onChange={(e) => handleInputChange('width', e.target.value)}
        />
        <InputField
          title="使用用途"
          label="ここに入力"
          value={formData.HowUse}
          onChange={(e) => handleInputChange('HowUse', e.target.value)}
        />
        <InputField
          title="点検年度"
          label="例: 2023"
          value={formData.Date}
          onChange={(e) => handleInputChange('Date', e.target.value)}
        />
        <InputField
          title="健全度"
          label="ここに入力"
          value={formData.Rank}
          onChange={(e) => handleInputChange('Rank', e.target.value)}
        />
        <InputField
          title="次回点検年度"
          label="ここに入力"
          value={formData.Schedule}
          onChange={(e) => handleInputChange('Schedule', e.target.value)}
        />
        <InputField
          title="最新補修年度"
          label="ここに入力"
          value={formData.New}
          onChange={(e) => handleInputChange('New', e.target.value)}
        />
        <InputField
          title="橋梁管理カルテ"
          label="ここに入力"
          value={formData.Record}
          onChange={(e) => handleInputChange('Record', e.target.value)}
        />
        <InputField
          title="Co施工記録データ"
          label="ここに入力"
          value={formData.Co}
          onChange={(e) => handleInputChange('Co', e.target.value)}
        />
      </div>
    </Modal>
  );
};

export default AddModal;
