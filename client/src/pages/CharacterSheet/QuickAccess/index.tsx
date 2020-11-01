import React from 'react';
import NumberInput from "../../../components/NumberInput/NumberInput";
import {useSelector, shallowEqual} from "react-redux";
import {RootState} from "../../../redux/reducers";
import {Link} from "react-router-dom";
import ModifyStatField from "../../../components/ModifyStatField/ModifyStatField";
import styles from "./quickAccess.module.scss";
import Checkbox from "../../../components/Checkbox/Checkbox";
import {history} from "../../../utils/history";
import api from "../../../utils/api";

const QuickAccess = () => {
  // const characterStats = useSelector((state: RootState) => state.characterStats);
  // const other = useSelector((state: RootState) => state.other);

  const handleCopy = () => {
    const dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = localStorage.getItem("character")!;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure?")) {
      api.deleteCharacter();
      localStorage.clear();
      history.push("/");
    }
  }

  return (
    <>
      <NumberInput label="Max HP" statName="hitPoints"/>
      <NumberInput label="Speed" statName="speed"/>
      <hr className={styles.hl}/>
      {/*<ModifyStatField label="Level" path="MainStats.Level" value={characterStats.level}/>*/}
      {/*<ModifyStatField label="Armor Class" path="MainStats.ArmorClass" value={characterStats.armorClass}/>*/}
      {/*<ModifyStatField label="Initiative" path="MainStats.Initiative" value={characterStats.initiative}/>*/}
      {/*<ModifyStatField label="Passive Perception" path="MainStats.PassivePerception" value={characterStats.passivePerception}/>*/}
      <hr className={styles.hl}/>
      {/*<Checkbox label="Inspiration" path="Other.Inspiration" checkboxValue={other.Inspiration}/>*/}
      {/*<Checkbox label="DiceSim" path="DiceSim.status" checkboxValue={character.DiceSim.status}/>*/}
      <hr className={styles.hl}/>
      <button className={styles.defaultButton}><Link className={styles.linkColor} to="/">Show Calendar</Link></button>
      <button className={styles.defaultButton} onClick={handleCopy}>Copy JSON</button>
      <button className={styles.dangerButton} onClick={handleDelete}>Delete Character</button>
    </>
  );
}

export default QuickAccess;