import React from 'react';
import {RootState} from "../../../redux/reducers";
import {useSelector} from "react-redux";

import {dndMath} from "../../../utils/dndMath";

import StatsSelect from "./StatsSelect";

const Stats = () => {
  const stats = useSelector((state: RootState) => state.characterReducer.Stats)
  return (
    <div>
      {Object.entries(stats).map((stat, i) => (
        <div key={i}>
          <StatsSelect statName={stat[0]} statVal={stat[1]}/>
          <p>{stat[0]}</p>
          <p>MOD</p>
          <p>{dndMath.statModifier(stat[1])}</p>
        </div>
      ))}
    </div>
  );
}

export default Stats;