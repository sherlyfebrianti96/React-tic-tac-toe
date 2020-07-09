import React from 'react';
import styles from './Board.module.css';
import Box from "../Box/Box";

const Board: React.FC = () => (
  <div className={styles.Board}>
      <Box />
      <Box />
      <Box />
      <div className={styles.clearFix}/>
      <Box />
      <Box />
      <Box />
      <div className={styles.clearFix}/>
      <Box />
      <Box />
      <Box />
      <div className={styles.clearFix}/>
  </div>
);

export default Board;
