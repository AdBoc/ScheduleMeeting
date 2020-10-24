import React, {useState} from 'react';
import styles from "./savingThorws.module.scss";

const ThrowsCheckboxes = () => {
  const [throws, setThrows] = useState([false, false, false, false, false, false]);

  const handleThrows = ({target}: any) => {
    const newThrows = throws.slice(0);
    newThrows[+target.name] = !newThrows[+target.name];
    setThrows(newThrows);
  }

  return (
    <>
      <p className={styles.label}>Death Saves</p>
      <div className={styles.deathSaves}>
        <p className={styles.deathSaveLabel}>Successes</p>
        <button className={styles.deathButton} name="0" onClick={handleThrows}/>
        <button className={styles.deathButton} name="1" onClick={handleThrows}/>
        <button className={styles.deathButton} name="2" onClick={handleThrows}/>
        <p className={styles.deathSaveLabel}>Failures</p>
        <button className={styles.deathButton} name="3" onClick={handleThrows}/>
        <button className={styles.deathButton} name="4" onClick={handleThrows}/>
        <button className={styles.deathButton} name="5" onClick={handleThrows}/>
      </div>
    </>
  );
}

export default ThrowsCheckboxes;