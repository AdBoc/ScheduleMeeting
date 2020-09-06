import React, { useContext } from 'react';
import './styles.scss';
import { tabContext } from '../../context/TabView';


const TabsScroll: React.FC = () => {
  const { setCurrentView, indexRef } = useContext(tabContext);
  const toggleView = ({ target }: any) => setCurrentView(target.name);
  // const toggleView = () => setCurrentView(tabs[6]);
  const plusView = () => {
    console.log('next');
    indexRef.current = indexRef.current + 1;
    console.log(indexRef.current);
  };

  const minusView = () => { };

  return (
    <div className="c-btns">
      <button className="c-btn" onClick={toggleView} name="stats">Stats</button>
      <button className="c-btn" onClick={toggleView} name="skills">Skills</button>
      <button className="c-btn" onClick={toggleView} name="savingThrows">Saving Throws</button>
      <button className="c-btn" onClick={toggleView} name="allActions">Actions</button>
      <button className="c-btn" onClick={toggleView} name="equipment">Equipment</button>
      <button className="c-btn" onClick={toggleView} name="story">Background</button>
      <button className="c-btn" onClick={toggleView} name="quickAccess">Quick Access</button>

      <button className="c-btn" onClick={plusView}>PLUS</button>
      <button className="c-btn" onClick={minusView}>MINUS</button>
    </div>
  )
};

export default TabsScroll;
