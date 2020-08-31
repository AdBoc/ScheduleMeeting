import React, { useState } from 'react';

const Actions = () => {
  const [currentAction, setCurrentAction] = useState<null | number>(null);

  const actionsDescription = [
    "The most common action to take in combat is the Attack action, whether you are swinging a sword, firing an arrow from a bow, or brawling with your fists.",
    "Spellcasters such as wizards and clerics, as well as many monsters, have access to spells and can use them to great effect in combat.",
    "When you take the Dash action, you gain extra movement for the current turn. The increase equals your speed, after applying any modifiers. With a speed of 30 feet, for example, you can move up to 60 feet on your turn if you dash.",
    "If you take the Disengage action, your movement doesn’t provoke opportunity attacks for the rest of the turn.",
    "When you take the Dodge action, you focus entirely on avoiding attacks. Until the start of your next turn, any attack roll made against you has disadvantage if you can see the attacker, and you make Dexterity saving throws with advantage. You lose this benefit if you are incapacitated.",
    "You can lend your aid to another creature in the completion of a task. When you take the Help action, the creature you aid gains advantage on the next ability check it makes to perform the task you are helping with, provided that it makes the check before the start of your next turn.",
    "When you take the Hide action, you make a Dexterity (Stealth) check in an attempt to hide, following the rules for hiding. If you succeed, you gain certain benefits.",
    "Sometimes you want to get the jump on a foe or wait for a particular circumstance before you act. To do so, you can take the Ready action on your turn, which lets you act using your reaction before the start of your next turn.",
    "When you take the Search action, you devote your attention to finding something. Depending on the nature of your search, the GM might have you make a Wisdom (Perception) check or an Intelligence (Investigation) check.",
    "When an object requires your action for its use, you take the Use an Object action."
  ];



  return (
    <div className="actions">
      <h1 className="actions__title">List of common actions</h1>
      <p className="actions__action" onClick={() => {
        setCurrentAction(0);
        setTimeout(function () {
          setCurrentAction(null)
        }, 3000)
      }}>Attack</p>
      <p className="actions__action" onClick={() => { setCurrentAction(1) }}>Cast spell</p>
      <p className="actions__action" onClick={() => { setCurrentAction(2) }}>Dash</p>
      <p className="actions__action" onClick={() => { setCurrentAction(3) }}>Disengage</p>
      <p className="actions__action" onClick={() => { setCurrentAction(4) }}>Dodge</p>
      <p className="actions__action" onClick={() => { setCurrentAction(5) }}>Help</p>
      <p className="actions__action" onClick={() => { setCurrentAction(6) }}>Hide</p>
      <p className="actions__action" onClick={() => { setCurrentAction(7) }}>Ready</p>
      <p className="actions__action" onClick={() => { setCurrentAction(8) }}>Search</p>
      <p className="actions__action" onClick={() => { setCurrentAction(9) }}>Use an Object</p>
      {currentAction !== null && <p>{actionsDescription[currentAction]}</p>}
    </div>
  )
};

export default Actions;