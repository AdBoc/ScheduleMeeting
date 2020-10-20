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
          <p className="c-stats__stat">{stat[0]}</p>
          <p className="c-stats__mod-lab">MOD</p>
          <p className="c-stats__mod-val">{dndMath.statModifier(stat[1])}</p>
        </div>
      ))}
    </div>
  );
}

export default Stats;