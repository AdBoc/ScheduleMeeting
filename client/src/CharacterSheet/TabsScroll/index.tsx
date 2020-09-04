import React from 'react';
import { Tabs } from '../../ts/interfaces';
import './styles.scss';

interface IProps {
  setCurrentView: React.Dispatch<React.SetStateAction<Tabs>>
};

const TabsScroll: React.FC<IProps> = ({ setCurrentView }) => {
  const toggleView = ({ target }: any) => setCurrentView(target.name);
  return (
    <div className="c-btns">
      <button className="c-btn" onClick={toggleView} name="stats">Stats</button>
      <button className="c-btn" onClick={toggleView} name="skills">Skills</button>
      <button className="c-btn" onClick={toggleView} name="savingThrows">Saving Throws</button>
      <button className="c-btn" onClick={toggleView} name="allActions">Actions</button>
      <button className="c-btn" onClick={toggleView} name="equipment">Equipment</button>
      <button className="c-btn" onClick={toggleView} name="story">Background</button>
      <button className="c-btn" onClick={toggleView} name="quickAccess">Quick Access</button>
    </div>
  )
};

export default TabsScroll;
