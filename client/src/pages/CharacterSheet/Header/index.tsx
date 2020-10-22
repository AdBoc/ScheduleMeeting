import React, {useState} from 'react';
import StatsSection from "./StatsSection";
import TopSection from "./TopSection";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers";
import DiceSim from "../DiceSim";

const Header = () => {
  const inspirationStatus = useSelector((state: RootState) => state.characterReducer.Other.Inspiration);
  const diceStatus = useSelector((state: RootState) => state.characterReducer.DiceSim.status);
  const [showDiceSim, setShowDiceSim] = useState(false);
  const handleShowDiceSim = () => setShowDiceSim(prev => !prev);

  return (
    <>
      <TopSection/>
      <StatsSection/>
      {inspirationStatus && <img alt="inspiration point" src={require('../../../assets/light-bulb.svg')}/>}
      {diceStatus && <img alt="dice sim button" src={require('../../../assets/dices.svg')} onClick={handleShowDiceSim}/>}
      {showDiceSim && <DiceSim/>}
    </>
  );
}

export default Header;
//TODO: react memo and import SVGs from assets GitSvg.tsx?