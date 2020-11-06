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
//Because of the React update batching behavior used in React Redux v7, a dispatched action that causes multiple useSelector()s in the same component to return new values should only result in a single re-render.
export default Stats;