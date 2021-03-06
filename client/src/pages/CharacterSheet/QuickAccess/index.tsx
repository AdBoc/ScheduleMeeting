import React from 'react';
import NumberInput from "../../../components/NumberInput/NumberInput";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers";
import {Link, useHistory} from "react-router-dom";
import styles from "./quickAccess.module.scss";
import api from "../../../utils/api";
import {changeCharacterStat} from "../../../redux/actions";
import ModifyStatField from "../../../components/ModifyStatField/ModifyStatField";
import Checkbox from "../../../components/Checkbox/Checkbox";

const QuickAccess = () => {
  // const characterStats = useSelector((state: RootState) => state.characterStats, (prev, next) => prev.hitPoints === next.hitPoints && prev.speed === next.speed);
  const hitPoints = useSelector((state: RootState) => state.characterStats.hitPoints);
  const speed = useSelector((state: RootState) => state.characterStats.speed);
  const dispatch = useDispatch();
  const history = useHistory();

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
      <Link className={styles.defaultButton} to="/">Show Calendar</Link>
      <button className={styles.defaultButton} onClick={handleCopy}>Copy JSON</button>
      <button className={styles.dangerButton} onClick={handleDelete}>Delete Character</button>
    </>
  );
}

export default QuickAccess;