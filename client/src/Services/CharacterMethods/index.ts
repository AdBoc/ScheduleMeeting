class CharMethods {
  /** Returns profieciency bonus calculated from character level */
  calcProficiency(level: number) {
    if (level === 0) return 2;
    return Math.floor((level - 1) / 4) + 2;
  }

  /**
   * Returns base stat modifier (ex. str 10 returns 0)
   * @param statVal stat value is used to calculate base modificator
   */
  calcStatModificator(statVal: number) {
    if (!statVal) return 0;
    return Math.floor(statVal / 2) - 5;
  }

  /**
   * Calculate saving throw modificator (Base Stat Mod + Proficiency)
   * @param level character level is used to calculate character proficiency
   * @param statVal  stat value is used to calculate base modificator
   * @param isTagged  if its tagged then character proficienty is added to final result
   */
  calcSavingThrowMod(level: number, statVal: number, isTagged: boolean) {
    if (isTagged) return this.calcProficiency(level) + this.calcStatModificator(statVal);
    return this.calcStatModificator(statVal);
  }

  /**
   * Calculate number of tagged proficiencies
   * @param throws array that holds information which throw has proficiency
   */
  countTaggedThrows(throws: [string | null, string | null]) {
    let count = 0;
    if (throws[0]) count++;
    if (throws[1]) count++;
    return count;
  }

  /**
   * convert and return total gold value
   * @param currencyObject object that holds all currencies and their values
   */
  countTotalGP(currencyObject: { [k: string]: number }) {
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

export const charMethods = new CharMethods();

//Object.assign({}, a) in object assign method nested objects are treated as reference
//deep copy JSON.parse(JSON.stringify(a))
