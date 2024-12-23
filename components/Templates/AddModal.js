import React, { useState } from 'react';
import Modal from '../Organisms/Modal';
import InputField from '../Atoms/InputField';

const AddModal = ({ isOpen, onClose, onCancel, onConfirm }) => {
  const [formData, setFormData] = useState({
    id: '',
    type: '',
    location: '',
    name: '',
    additionalInfo1: '',
    additionalInfo2: '',
    material: '',
    length: '',
    width: '',
    height: '',
    usage: '',
    yearBuilt: '',
    inspectionYear: '',
    inspectionData: ''
  });

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
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
          value={formData.id}
          onChange={(e) => handleInputChange('id', e.target.value)}
        />
        <InputField
          title="タイプ"
          label="ここに入力"
          value={formData.type}
          onChange={(e) => handleInputChange('type', e.target.value)}
        />
        <InputField
          title="位置情報"
          label="ここに入力"
          value={formData.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
        />
        <InputField
          title="名前"
          label="ここに入力"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
        />
        <InputField
          title="材質"
          label="ここに入力"
          value={formData.material}
          onChange={(e) => handleInputChange('material', e.target.value)}
        />
        <InputField
          title="長さ"
          label="ここに入力"
          value={formData.length}
          onChange={(e) => handleInputChange('length', e.target.value)}
        />
        <InputField
          title="幅"
          label="ここに入力"
          value={formData.width}
          onChange={(e) => handleInputChange('width', e.target.value)}
        />
        <InputField
          title="高さ"
          label="ここに入力"
          value={formData.height}
          onChange={(e) => handleInputChange('height', e.target.value)}
        />
        <InputField
          title="使用用途"
          label="ここに入力"
          value={formData.usage}
          onChange={(e) => handleInputChange('usage', e.target.value)}
        />
        <InputField
          title="建設年度"
          label="例: 2000"
          value={formData.yearBuilt}
          onChange={(e) => handleInputChange('yearBuilt', e.target.value)}
        />
        <InputField
          title="点検年度"
          label="例: 2023"
          value={formData.inspectionYear}
          onChange={(e) => handleInputChange('inspectionYear', e.target.value)}
        />
        <InputField
          title="点検データ"
          label="ここに入力"
          value={formData.inspectionData}
          onChange={(e) => handleInputChange('inspectionData', e.target.value)}
        />
      </div>
    </Modal>
  );
};

export default AddModal;
