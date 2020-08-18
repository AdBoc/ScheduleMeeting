import React, { useContext, useState } from 'react';
import { characterContext } from '../../context/Character';
import { Types } from '../../context/Character/reducer';
import { charMethods } from '../../Services/CharacterMethods';

const TopDisplay = () => {
  const { character, dispatch } = useContext(characterContext);
  const [showHpInput, setShowHpInput] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let MaxHP = character.MainStats.HitPoints;
    let currHP = character.TemporaryHitPoints;
    let input = parseInt(e.target.HpMod.value);
    currHP = currHP + input;
    if (currHP <= 0)
      currHP = 0;
    else if (currHP > MaxHP)
      currHP = MaxHP;
    dispatch({ type: Types.CHANGE_STAT, payload: { property: "TemporaryHitPoints", newValue: currHP } });
    setShowHpInput(prev => !prev);
  };

  const styleHp = () => {
    let className = "c-sheet__hp";
    let result = character.TemporaryHitPoints / character.MainStats.HitPoints;
    if (result <= 0.25)
      return className += " --low-hp";
    if (result <= 0.5)
      return className += " --mid-hp";
    return className;
  };

  return (
    <div className="c-sheet">
      <div className="c-sheet__player">
        <div className="c-player">
          <p className="c-player__name">{character.Story.Name}</p>
          <p className="c-player__details">{character.Story.Race} {character.Story.Class} {character.MainStats.Level}</p>
        </div>
        <div className="relative">
          <p className={styleHp()} onClick={() => setShowHpInput(prev => !prev)}>{character.TemporaryHitPoints}/{character.MainStats.HitPoints} HP</p>
          {
            showHpInput && <form className="c-sheet__hp-form" onSubmit={handleSubmit}>
              <input className="c-sheet__hp-form__input" type="number" name="HpMod" autoFocus required />
              <input className="c-sheet__hp-form__submit" type="submit" value="OK" />
            </form>
          }
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

export default React.memo(TopDisplay);
