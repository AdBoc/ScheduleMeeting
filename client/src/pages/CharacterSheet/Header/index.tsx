import React, {useState} from 'react';
import StatsSection from "./StatsSection";
import TopSection from "./TopSection";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers";
import DiceSim from "../DiceSim";
import styles from './header.module.scss';
import {DiceSvg, InspirationSvg} from "../../../assets/GitSvg";

const Header = () => {
  const inspirationStatus = useSelector((state: RootState) => state.other.inspiration);
  // const diceStatus = useSelector((state: RootState) => state.character.DiceSim.status); //TODO: make dice sim
  // const [showDiceSim, setShowDiceSim] = useState(false);

  return (
    <div className={styles.header}>
      <TopSection/>
      <StatsSection/>
      {inspirationStatus && <InspirationSvg cssClass={styles.inspirationSvg}/>}
      {/*{diceStatus && <DiceSvg cssClass={styles.dicesSvg} handleClick={() => setShowDiceSim(prev => !prev)}/>}*/}
      {/*{showDiceSim && <DiceSim/>}*/}
    </div>
  );
}

export default Header;
//Because of the React update batching behavior used in React Redux v7, a dispatched action that causes multiple useSelector()s in the same component to return new values should only result in a single re-render.