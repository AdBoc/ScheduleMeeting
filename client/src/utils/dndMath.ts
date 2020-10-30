import {RootState} from "../redux/reducers";

class DndMath {
  /** Returns proficiency bonus calculated from character level */
  public skillProficiency(level: number): number {
    if (level === 0) return 2;
    return Math.floor((level - 1) / 4) + 2;
  }

  /**
   * Returns base stat modifier (ex. str 10 returns 0)
   * @param statVal stat value is used to calculate base modificator
   */
  public statModifier(statVal: number): number {
    if (!statVal) return 0;
    return Math.floor(statVal / 2) - 5;
  }

  /**
   * Calculate saving throw modificator (Base Stat Mod + Proficiency)
   * @param level character level is used to calculate character proficiency
   * @param statVal  stat value is used to calculate base modificator
   * @param isTagged  if its tagged then character proficiency is added to final result
   */
  public savingThrowProficiency(level: number, statVal: number, isTagged: boolean): number {
    if (isTagged) return this.skillProficiency(level) + this.statModifier(statVal);
    return this.statModifier(statVal);
  }

  /**
   * convert and return total gold value
   * @param currencyObject object that holds all currencies and their values
   */
  public totalGp(currencyObject: { [k: string]: number }): number {
    const currencyCopy = {
      PP: currencyObject.PP * 10,
      GP: currencyObject.GP,
      EP: currencyObject.EP / 2,
      SP: currencyObject.SP / 10,
      CP: currencyObject.CP / 100,
    };
    return Math.floor(Object.values(currencyCopy).reduce((a, b) => a + b));
  }

  /*
  *Count new skills object based on changed Stat
   */
  public generateNewSkills(skills: RootState["character"]["Skills"], newValue: number, name: string): RootState["character"]["Skills"] {
    const newSkills = {...skills};
    const newMod = this.statModifier(newValue);
    switch (name) {
      case "Strength":
        newSkills.Athletics = newMod;
        break;
      case "Dexterity":
        newSkills.Acrobatics = newMod;
        newSkills.SleightOfHand = newMod;
        newSkills.Stealth = newMod;
        break;
      case "Intelligence":
        newSkills.Arcana = newMod;
        newSkills.History = newMod;
        newSkills.Investigation = newMod;
        newSkills.Nature = newMod;
        newSkills.Religion = newMod;
        break;
      case "Wisdom":
        newSkills.AnimalHandling = newMod;
        newSkills.Insight = newMod;
        newSkills.Medicine = newMod;
        newSkills.Perception = newMod;
        newSkills.Survival = newMod;
        break;
      case "Charisma":
        newSkills.Deception = newMod;
        newSkills.Intimidation = newMod;
        newSkills.Performance = newMod;
        newSkills.Persuasion = newMod;
        break;
    }
    return newSkills;
  }
}

export const dndMath = new DndMath();
// private _num: number = 3;
// set num(val: number) {
//   this._num = val;
// }
// get num() {
//   return this._num;
// }