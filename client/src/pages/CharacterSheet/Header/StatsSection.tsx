import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers";
import {dndMath} from "../../../utils/dndMath";

const StatsSection = () => {
  const stat = useSelector((state: RootState) => state.characterReducer.MainStats);
  return (
    <>
      <div>
        <p>{stat.ArmorClass}</p>
        <p>Armor Class</p>
      </div>
      <div>
        <p>{stat.Initiative}</p>
        <p>Initiative</p>
      </div>
      <div>
        <p>{stat.PassivePerception}</p>
        <p>Passive Perception</p>
      </div>
      <div>
        <p>{dndMath.skillProficiency(stat.Level)}</p>
        <p>Proficiency Bonus</p>
      </div>
    </>
  );
}

export default StatsSection;