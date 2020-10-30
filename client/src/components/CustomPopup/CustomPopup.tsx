import React, {useEffect, useRef} from "react";
import styles from "./customPopup.module.scss";

interface IProps {
  hideElement: React.Dispatch<React.SetStateAction<any>>;
}

const CustomPopup: React.FC<IProps> = ({hideElement, children}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  const handleClick = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      hideElement(false);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div ref={ref}>
        {children}
      </div>
    </div>
  )
}

export default CustomPopup;