import React from 'react';
import * as XLSX from 'xlsx';
import { useRouter } from 'next/router';
import Button from '../Atoms/Button'; // Button.jsのパスを適切に設定してください

const ExcelFormatButton = () => {
  const router = useRouter();
  const handleClick = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([
      ['施設ID', '施設分類', '管理事務所名', '管理先電話番号', '緯度', '経度', '緯度,経度',
        '施設名', '施設名カナ', '路線種別', '路線名', '路線', '所在地', '橋梁の種類',
        '架設年（西暦）', '橋長（m）', '幅員（m）', '種類', '最新点検年度', '健全度', '次回点検年']
    ]);

    // テーブル範囲を設定
    const range = XLSX.utils.decode_range(ws['!ref']);
    ws['!autofilter'] = { ref: XLSX.utils.encode_range(range) };

    // ワークブックにワークシートを追加
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // エクセルファイルをバイナリ形式で書き出し
    XLSX.writeFile(wb, 'formatted_excel_file.xlsx');
  };

  return <Button onClick={handleClick} text="Excel入力用フォーマット" />;
};

export default ExcelFormatButton;