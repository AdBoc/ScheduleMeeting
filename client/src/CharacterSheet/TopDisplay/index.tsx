import React, { useContext } from 'react';
import { characterContext } from '../../context/Character';
import { Types } from '../../context/Character/reducer';
import { charMethods } from '../../Services/CharacterMethods';

const TopDisplay: React.FC = () => {
  const { character, dispatch } = useContext(characterContext);

  const incrementHp = () => dispatch({ type: Types.INCREMENT_STAT, payload: { property: "TemporaryHitPoints" } });
  const decrementHp = () => dispatch({ type: Types.DECREMENT_STAT, payload: { property: "TemporaryHitPoints" } });

  return (
    <div className="c-sheet">
      <div className="c-sheet__player">
        <div className="c-player">
          <p className="c-player__name">{character.Story.Name}</p>
          <p className="c-player__details">{character.Story.Race} {character.Story.Class} {character.MainStats.Level}</p>
        </div>
        <div className="c-sheet__hp">
          <button className="decrement-hp" onClick={decrementHp} aria-label="decrement hp" />
          {character.TemporaryHitPoints}/{character.MainStats.HitPoints} HP
          <button className="increment-hp" onClick={incrementHp} aria-label="increment hp" />
        </div>
      </div>
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
          <p className="c-stat__value">{character.MainStats.PassivePercepion}</p>
          <p className="c-stat__label">Passive Percepion</p>
        </div>
        <div className="c-stat">
          <p className="c-stat__value">{charMethods.calcProficiency(character.MainStats.Level)}</p>
          <p className="c-stat__label">Proficiency Bonus</p>
        </div>
      </div>
    </div>
  )
};

export default TopDisplay;