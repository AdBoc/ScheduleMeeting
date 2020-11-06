import React from 'react';
import NumberInput from "../../../components/NumberInput/NumberInput";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers";
import {Link} from "react-router-dom";
import styles from "./quickAccess.module.scss";
import {history} from "../../../utils/history";
import api from "../../../utils/api";
import {changeCharacterStat} from "../../../redux/actions";
import ModifyStatField from "../../../components/ModifyStatField/ModifyStatField";
import Checkbox from "../../../components/Checkbox/Checkbox";

const QuickAccess = () => {
  // const characterStats = useSelector((state: RootState) => state.characterStats, (prev, next) => prev.hitPoints === next.hitPoints && prev.speed === next.speed);
  const hitPoints = useSelector((state: RootState) => state.characterStats.hitPoints);
  const speed = useSelector((state: RootState) => state.characterStats.speed);
  const dispatch = useDispatch();

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
  }//TODO: change Number Input Component, Split NumberInput to other component as it causes rerenders of whole component

  return (
    <>
      <NumberInput label="Max HP" value={hitPoints} dispatchAction={(v: string) => dispatch(changeCharacterStat("hitPoints", parseInt(v)))}/>
      <NumberInput label="Speed" value={speed} dispatchAction={(v: string) => dispatch(changeCharacterStat("speed", parseInt(v)))}/>
      <hr className={styles.hl}/>
      <ModifyStatField label="Level" statName="level"/>
      <ModifyStatField label="Armor Class" statName="armorClass"/>
      <ModifyStatField label="Initiative" statName="initiative"/>
      <ModifyStatField label="Passive Perception" statName="passivePerception"/>
      <hr className={styles.hl}/>
      <Checkbox label="Inspiration" propertyName="inspiration"/>
      <hr className={styles.hl}/>
      <button className={styles.defaultButton}><Link className={styles.linkColor} to="/">Show Calendar</Link></button>
      <button className={styles.defaultButton} onClick={handleCopy}>Copy JSON</button>
      <button className={styles.dangerButton} onClick={handleDelete}>Delete Character</button>
    </>
  );
}

export default QuickAccess;