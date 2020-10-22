import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers";
import HpForm from "./HpForm";

const TopSection = () => {
  const background = useSelector((state: RootState) => state.characterReducer.Background);
  const stats = useSelector((state: RootState) => state.characterReducer.MainStats);
  const [showHpForm, setShowHpForm] = useState(false);

  return (
    <>
      <div>
        <p>{background.Name}</p>
        <p>{background.Race} {background.Class} {stats.Level}</p>
      </div>
      <div>
        <p onClick={() => {
          setShowHpForm(prev => !prev)
        }}>{stats.TemporaryHitPoints}/{stats.HitPoints} HP</p>
        {showHpForm && <HpForm/>}
      </div>
    </>
  );
}

export default TopSection;