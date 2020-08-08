class CharMethods {
  /** Returns profieciency bonus calculated from character level */
  calcProficiency(level: number) {
    if (level === 0)
      return 2;
    return Math.floor((level - 1) / 4) + 2;
  };
  /**
   * Returns base stat modifier (ex. str 10 returns 0) 
   * @param statVal stat value is used to calculate base modificator
   */
  calcStatModificator(statVal: number) {
    return Math.floor(statVal / 2) - 5;
  };
  /**
   * Calculate saving throw modificator (Base Stat Mod + Proficiency)
   * @param level character level is used to calculate character proficiency
   * @param statVal  stat value is used to calculate base modificator
   * @param isTagged  if its tagged then character proficienty is added to final result 
   */
  calcSavingThrowMod(level: number, statVal: number, isTagged: boolean) { //A MOZE BY POLACZYC DWIE METODY WYZEJ
    if (isTagged)
      return this.calcStatModificator(level) + this.calcProficiency(statVal);
    return this.calcStatModificator(statVal);
  };
  /**
   * Calculate number of tagged proficiencies
   * @param throws array that holds information which throw has proficiency 
   */
  countTaggedThrows(throws: [string | null, string | null]) {
    let count = 0;
    if (throws[0])
      count++;
    if (throws[1])
      count++;
    return count;
  }
};
export const charMethods = new CharMethods();

//the same as 
// export const charMethods = (function () {
//   return {
//     calculateProfeciency(level: number) {
//       if (level === 0)
//         return 2;
//       return Math.floor((level - 1) / 4) + 2;
//     },
//   }
// })();