import React, {useContext} from "react";

import {charMethods} from "../../Services/CharacterMethods";
import {characterContext} from "../../context/Character";

const TopStatsView: React.FC = () => {
  const {character} = useContext(characterContext);

  return (
    <div className="c-sheet__stats">
      <div className="c-stat">
        <p className="c-stat__value">{character.MainStats.ArmorClass}</p>
        <p className="c-stat__label">Armor Class</p>
      </div>
      <div className="c-stat">
        <p className="c-stat__value">{character.MainStats.Initiative}</p>
        <p className="c-stat__label">Initiative</p>
      </div>
      <div className="c-stat">
        <p className="c-stat__value">{character.MainStats.PassivePerception}</p>
        <p className="c-stat__label">Passive Perception</p>
      </div>
      <div className="c-stat">
        <p className="c-stat__value">{charMethods.calcProficiency(character.MainStats.Level)}</p>
        <p className="c-stat__label">Proficiency Bonus</p>
      </div>
    </div>
  )
}

export default TopStatsView;