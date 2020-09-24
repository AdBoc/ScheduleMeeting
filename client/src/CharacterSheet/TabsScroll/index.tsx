import React from 'react';
import './styles.scss';

interface IProps {
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

const TabsScroll: React.FC<IProps> = ({setCurrentIndex}) => {

  const toggleView = ({target}: any) => setCurrentIndex(+target.value);

  return (
    <div className="c-btns">
      <button className="c-btn" onClick={toggleView} value={0}>Stats</button>
      <button className="c-btn" onClick={toggleView} value={1}>Skills</button>
      <button className="c-btn" onClick={toggleView} value={2}>Saving Throws</button>
      <button className="c-btn" onClick={toggleView} value={3}>Actions</button>
      <button className="c-btn" onClick={toggleView} value={4}>Equipment</button>
      <button className="c-btn" onClick={toggleView} value={5}>Background</button>
      <button className="c-btn" onClick={toggleView} value={6}>Quick Access</button>
    </div>
  )
};

export default TabsScroll;
