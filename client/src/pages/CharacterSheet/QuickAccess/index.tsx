import React from 'react';
import NumberInput from "../../../components/NumberInput";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers";
import {Link} from "react-router-dom";
import ModifyStatField from "../../../components/ModifyStatField";
import {flipBool} from "../../../redux/actions";

const QuickAccess = () => {
  const character = useSelector((state: RootState) => state.characterReducer);
  const dispatch = useDispatch();

  const handleCopy = () => {
    const dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = localStorage.getItem("character")!;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }

  return (
    <>
      <NumberInput label="Max HP" value={character.MainStats.HitPoints} path="MainStats.HitPoints"/>
      <NumberInput label="Speed" value={character.MainStats.Speed} path="MainStats.Speed"/>
      <hr/>
      <ModifyStatField label="Level" path="MainStats.Level" value={character.MainStats.Level}/>
      <ModifyStatField label="Armor Class" path="MainStats.ArmorClass" value={character.MainStats.ArmorClass}/>
      <ModifyStatField label="Initiative" path="MainStats.Initiative" value={character.MainStats.Initiative}/>
      <ModifyStatField label="Passive Perception" path="MainStats.PassivePerception" value={character.MainStats.PassivePerception}/>
      <hr/>
      <div>
        <label htmlFor="inspiration">Inspiration</label>
        <input id="inspiration"
               type="checkbox"
               checked={character.Other.Inspiration}
               onChange={() => {
                 dispatch(flipBool("Other.Inspiration"))
               }}
        />
      </div>
      <div>
        <label htmlFor="diceSim">DiceSim</label>
        <input id="diceSim" type="checkbox" checked={character.DiceSim.status}
               onChange={() => {
                 dispatch(flipBool("DiceSim.status"))
               }}
        />
      </div>
      <hr/>
      <button><Link to="/">Show Calendar</Link></button>
      <button onClick={handleCopy}>Copy JSON</button>
      <button>Delete Character</button>
    </>
  );
}

export default QuickAccess;