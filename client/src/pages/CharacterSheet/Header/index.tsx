import React from 'react';
import StatsSection from "./StatsSection";
import TopSection from "./TopSection";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers";
import styles from './header.module.scss';
import {InspirationSvg} from "../../../assets/GitSvg";

const Header = () => {
  const inspirationStatus = useSelector((state: RootState) => state.other.inspiration);
  return (
    <div className={styles.header}>
      <TopSection/>
      <StatsSection/>
      {inspirationStatus && <InspirationSvg cssClass={styles.inspirationSvg}/>}
    </div>
  );
}

export default Header;