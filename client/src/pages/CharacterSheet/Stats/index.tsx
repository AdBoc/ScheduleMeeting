import React from 'react';
import Stat from "./Stat";

const Stats: React.FC = () => {
  return (
    <>
      <Stat statName="strength"/>
      <Stat statName="dexterity"/>
      <Stat statName="constitution"/>
      <Stat statName="intelligence"/>
      <Stat statName="wisdom"/>
      <Stat statName="charisma"/>
    </>
  )
}

export default Stats;