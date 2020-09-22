import React, { useContext } from 'react';
import { characterContext } from '../../context/Character';
import { charMethods } from '../../Services/CharacterMethods';
import { Types } from '../../context/Character/reducer';

interface IProps {
  /**
  * range of generated switch
  */
  range: [number, number];
  /**
  * path of property that will change in character object
  */
  name: string;
  /**
  * default value of generated switch
  */
  value: number;
}

const StatsSelect: React.FC<IProps> = ({ range, name, value }) => {
  const { character, dispatch } = useContext(characterContext);

  const onChange = ({ target }: any) => {
    const copySkills = { ...character.Skills };
    const newMod = charMethods.calcStatModificator(+target.value);
    switch (name) {
      case "Stats.Strength":
        copySkills.Athletics = newMod;
        break;
      case "Stats.Dexterity":
        copySkills.Acrobatics = newMod;
        copySkills.SleightOfHand = newMod;
        copySkills.Stealth = newMod;
        break;
      case "Stats.Intelligence":
        copySkills.Arcana = newMod;
        copySkills.History = newMod;
        copySkills.Investigation = newMod;
        copySkills.Nature = newMod;
        copySkills.Religion = newMod;
        break;
      case "Stats.Wisdom":
        copySkills.AnimalHandling = newMod;
        copySkills.Insight = newMod;
        copySkills.Medicine = newMod;
        copySkills.Perception = newMod;
        copySkills.Survival = newMod;
        break;
      case "Stats.Charisma":
        copySkills.Deception = newMod;
        copySkills.Intimidation = newMod;
        copySkills.Performance = newMod;
        copySkills.Persuasion = newMod;
        break;
    }
    dispatch({ type: Types.SET_CHARACTER, payload: { newCharacter: { ...character, Skills: copySkills } } });
    dispatch({ type: Types.CHANGE_STAT, payload: { property: name, newValue: target.value } });
  };

  let options = [];
  for (let i = range[0]; i <= range[1]; i++) {
    options.push(<option key={i} value={i}>{i}</option>)
  }

  return (
    <select className="stats-select" value={value} name={name} onChange={onChange}>
      {options}
    </select>
  );
};

export default StatsSelect;
