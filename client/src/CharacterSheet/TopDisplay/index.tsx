import React, {useContext, useState} from 'react';

import {characterContext} from '../../context/Character';

import TopHpView from "./TopHpView";
import TopStatsView from "./TopStatsView";
import DiceSim from "../DiceSim";

import './styles.scss';

const TopDisplay = () => {
  const {character} = useContext(characterContext);
  const [isDiceSim, setIsDiceSim] = useState(false);

  const handleDiceRender = () => {
    setIsDiceSim(prev => !prev);
  };

  return (
    <>
      <div className="c-sheet">
        <TopHpView/>
        <TopStatsView/>
        {character.Other.Inspiration && <img className="inspiration-point" alt="inspiration point" src={require('../../assets/light-bulb.svg')}/>}
        {character.DiceSim.status &&
        <img className="dice-icon" alt="dice sim button" src={require('../../assets/dices.svg')} onClick={handleDiceRender}/>}
      </div>
      {isDiceSim && <DiceSim handleDiceRender={handleDiceRender}/>}
    </>
  )
};

export default React.memo(TopDisplay);
