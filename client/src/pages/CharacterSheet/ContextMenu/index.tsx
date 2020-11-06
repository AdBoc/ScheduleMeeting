import React, {useState} from 'react';
import styles from "./contextMenu.module.scss";
import ActiveEffects from "./ActiveEffects";

const ContextMenu = () => {
  const [showEffects, setShowEffects] = useState(false);
  return (
    <>
      {showEffects && <div className={styles.expandedMenu}>
          <ActiveEffects/>
      </div>
      }
      <div className={showEffects ? styles.contextMenuSelected : styles.contextMenu} onClick={() => {
        setShowEffects(prev => !prev);
      }}>
        <div className={showEffects ? styles.lineSmallSelected : styles.lineSmall}/>
        <div className={showEffects ? styles.lineLargeSelected : styles.lineLarge}/>
        <div className={showEffects ? styles.lineSmallSelected : styles.lineSmall}/>
      </div>
    </>
  );
}

export default ContextMenu;