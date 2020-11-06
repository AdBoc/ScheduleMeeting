import React from 'react';
import styles from "./selectMenu.module.scss";

interface IProps {
  tabs: string[];
  setTab: React.Dispatch<React.SetStateAction<number>>;
}

const SelectMenu: React.FC<IProps> = ({tabs, setTab}) => {
  const labels = ["Stats", "Skills", "Saving Throws", "Actions", "Equipment", "Background", "Quick Access"];
  return (
    <div className={styles.selectMenu}>
      {tabs.map((tab, i) => (
        <button key={tab} className={styles.buttons} onClick={() => setTab(i)}>{labels[i]}</button>
      ))}
    </div>
  );
}

export default SelectMenu;