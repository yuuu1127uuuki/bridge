import React from 'react';
import Home from './main';
import styles from '../styles/main.module.css';
import HomeButton from '../components/Molecules/HomeButton';

const History = () => {
  return (
    <div className={styles.all}>
      <h1 className={styles.header}>ぷくみん</h1>
      <HomeButton />
    </div>
  );
};
export default History;
