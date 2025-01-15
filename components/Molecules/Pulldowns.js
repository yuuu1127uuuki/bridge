import React from 'react';
import Pulldown from '../Atoms/Pulldown';
import styles from '../../styles/PullDowns.module.css';

const currentYear = new Date().getFullYear();

const Pulldowns = ({ data, onFilter }) => {
  const handleRankClick = (item) => {
    const filteredData = data.filter((entry) => entry.Rank.includes(item));
    onFilter(filteredData);
  };

  const handleYearClick = (item) => {
    if (typeof item === 'number') {
      const filteredData = data.filter(
        (entry) => entry.Date === currentYear - item
      );
      onFilter(filteredData);
    } else {
      const filteredData = data.filter(
        (entry) => entry.Date <= currentYear - 6
      );
      onFilter(filteredData);
    }
  };

  const handleItemClick = (item) => {
    console.log(item);
  };

  return (
    <div className={styles.pulldownContainer}>
      <Pulldown
        text="健全度"
        items={['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ']}
        onItemClick={handleRankClick}
      />
      <Pulldown
        text="経過年度"
        items={[1, 2, 3, 4, 5, '6年以上']}
        onItemClick={handleYearClick}
      />
      <Pulldown
        text="Excel入出力"
        items={['Execel入力', 'Excelダウンロード', 'フォーマット']}
        onItemClick={handleItemClick}
      />
      <Pulldown
        text="まとめて削除"
        items={['ID指定でまとめて削除', 'ピンをまとめて削除']}
        onItemClick={handleItemClick}
      />
    </div>
  );
};

export default Pulldowns;
