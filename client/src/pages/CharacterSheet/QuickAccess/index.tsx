import React from 'react';
import NumberInput from "../../../components/NumberInput/NumberInput";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers";
import {Link} from "react-router-dom";
import ModifyStatField from "../../../components/ModifyStatField/ModifyStatField";
import styles from "./quickAccess.module.scss";
import Checkbox from "../../../components/Checkbox/Checkbox";
import {history} from "../../../utils/history";

const QuickAccess = () => {
  const character = useSelector((state: RootState) => state.character);

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
      localStorage.clear();
      history.push("/");
    }
  }

  return (
    <>
      <NumberInput label="Max HP" value={character.MainStats.HitPoints} path="MainStats.HitPoints"/>
      <NumberInput label="Speed" value={character.MainStats.Speed} path="MainStats.Speed"/>
      <hr className={styles.hl}/>
      <ModifyStatField label="Level" path="MainStats.Level" value={character.MainStats.Level}/>
      <ModifyStatField label="Armor Class" path="MainStats.ArmorClass" value={character.MainStats.ArmorClass}/>
      <ModifyStatField label="Initiative" path="MainStats.Initiative" value={character.MainStats.Initiative}/>
      <ModifyStatField label="Passive Perception" path="MainStats.PassivePerception" value={character.MainStats.PassivePerception}/>
      <hr className={styles.hl}/>
      <Checkbox label="Inspiration" path="Other.Inspiration" checkboxValue={character.Other.Inspiration}/>
      <Checkbox label="DiceSim" path="DiceSim.status" checkboxValue={character.DiceSim.status}/>
      <hr className={styles.hl}/>
      <button className={styles.defaultButton}><Link className={styles.linkColor} to="/">Show Calendar</Link></button>
      <button className={styles.defaultButton} onClick={handleCopy}>Copy JSON</button>
      <button className={styles.dangerButton} onClick={handleDelete}>Delete Character</button>
    </>
  );
}

export default QuickAccess;