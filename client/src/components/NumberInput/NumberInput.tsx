import React, {ChangeEvent} from 'react';
import styles from "./NumberInput.module.scss";

interface IProps {
  label: string;
  value: number;
  dispatchAction: (v: string) => any;
  customClass?: any;
}


const NumberInput: React.FC<IProps> = ({label, dispatchAction, value, customClass}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(/^[1-9][0-9]*$/.test(e.target.value)) {
      dispatchAction(e.target.value);
    }
  }

  return (
    <div className={customClass ? customClass : styles.numberInput}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        type="number"
        onChange={handleChange}
        onFocus={(e) => e.target.select()}
        value={value}
        autoComplete="off"
        autoCorrect="false"
        spellCheck="false"
        onInput={(e: any) => {
          e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 5)
        }}
      />
    </div>
  );
}

export default NumberInput;