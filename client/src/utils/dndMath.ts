class DndMath {
  /** Returns proficiency bonus calculated from character level */
  public skillProficiency(level: number) {
    if (level === 0) return 2;
    return Math.floor((level - 1) / 4) + 2;
  }

  /**
   * Returns base stat modifier (ex. str 10 returns 0)
   * @param statVal stat value is used to calculate base modificator
   */
  public statModifier(statVal: number) {
    if (!statVal) return 0;
    return Math.floor(statVal / 2) - 5;
  }

  /**
   * Calculate saving throw modificator (Base Stat Mod + Proficiency)
   * @param level character level is used to calculate character proficiency
   * @param statVal  stat value is used to calculate base modificator
   * @param isTagged  if its tagged then character proficiency is added to final result
   */
  public savingThrowProficiency(level: number, statVal: number, isTagged: boolean) {
    if (isTagged) return this.skillProficiency(level) + this.statModifier(statVal);
    return this.statModifier(statVal);
  }
  /**
   * convert and return total gold value
   * @param currencyObject object that holds all currencies and their values
   */
  public totalGp(currencyObject: { [k: string]: number }) {
    const currencyCopy = {
      PP: currencyObject.PP * 10,
      GP: currencyObject.GP,
      EP: currencyObject.EP / 2,
      SP: currencyObject.SP / 10,
      CP: currencyObject.CP / 100,
    };
    return Math.floor(Object.values(currencyCopy).reduce((a, b) => a + b));
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