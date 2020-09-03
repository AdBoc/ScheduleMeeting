import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const Actions = () => {
  const actionsDescription = [
    "The most common action to take in combat is the Attack action, whether you are swinging a sword, firing an arrow from a bow, or brawling with your fists.",
    "Spellcasters such as wizards and clerics, as well as many monsters, have access to spells and can use them to great effect in combat.",
    "When you take the Dash action, you gain extra movement for the current turn. The increase equals your speed, after applying any modifiers. With a speed of 30 feet, for example, you can move up to 60 feet on your turn if you dash.",
    "If you take the Disengage action, your movement doesn’t provoke opportunity attacks for the rest of the turn.",
    "When you take the Dodge action, you focus entirely on avoiding attacks. Until the start of your next turn, any attack roll made against you has disadvantage if you can see the attacker, and you make Dexterity saving throws with advantage. You lose this benefit if you are incapacitated.",
    "You can lend your aid to another creature in the completion of a task. When you take the Help action, the creature you aid gains advantage on the next ability check it makes to perform the task you are helping with, provided that it makes the check before the start of your next turn.",
    "When you take the Hide action, you make a Dexterity (Stealth) check in an attempt to hide, following the rules for hiding. If you succeed, you gain certain benefits.",
    "Sometimes you want to get the jump on a foe or wait for a particular circumstance before you act. To do so, you can take the Ready action on your turn, which lets you act using your reaction before the start of your next turn. To take the Ready action, you must specify the action you are intending to take and a specific circumstance that triggers the intended action.",
    "When you take the Search action, you devote your attention to finding something. Depending on the nature of your search, the GM might have you make a Wisdom (Perception) check or an Intelligence (Investigation) check.",
    "When an object requires your action for its use, you take the Use an Object action."
  ];

  const actions = ["Attack", "Cast spell", "Dash", "Disengage", "Dodge", "Help", "Hide", "Ready", "Search", "Use an Object"];

  return (
    <div className="actions">
      <h1 className="actions__title">List of common actions</h1>
      {actions.map((action, index) => (
        <Tippy key={index} content={actionsDescription[index]} placement="bottom">
          <button className="actions__action" value={index}>{action}</button>
        </Tippy>
      )
      )}
    </div>
  )
};

export default Actions;
