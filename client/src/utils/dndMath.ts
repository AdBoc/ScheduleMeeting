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

  // /*
  // *Count new skills object based on changed Stat
  //  */
  // public generateNewSkills(skills: RootState["skills"], newValue: number, name: string): RootState["skills"] {
  //   const newSkills = {...skills};
  //   const newMod = this.statModifier(newValue);
  //   switch (name) {
  //     case "Strength":
  //       newSkills.athletics.value = newMod;
  //       break;
  //     case "Dexterity":
  //       newSkills.acrobatics.value = newMod;
  //       newSkills.sleightOfHand.value = newMod;
  //       newSkills.stealth.value = newMod;
  //       break;
  //     case "Intelligence":
  //       newSkills.arcana.value = newMod;
  //       newSkills.history.value = newMod;
  //       newSkills.investigation.value = newMod;
  //       newSkills.nature.value = newMod;
  //       newSkills.religion.value = newMod;
  //       break;
  //     case "Wisdom":
  //       newSkills.animalHandling.value = newMod;
  //       newSkills.insight.value = newMod;
  //       newSkills.medicine.value = newMod;
  //       newSkills.perception.value = newMod;
  //       newSkills.survival.value = newMod;
  //       break;
  //     case "Charisma":
  //       newSkills.deception.value = newMod;
  //       newSkills.intimidation.value = newMod;
  //       newSkills.performance.value = newMod;
  //       newSkills.persuasion.value = newMod;
  //       break;
  //   }
  //   return newSkills;
  // }
}

export const dndMath = new DndMath();
// private _num: number = 3;
// set num(val: number) {
//   this._num = val;
// }
// get num() {
//   return this._num;
// }