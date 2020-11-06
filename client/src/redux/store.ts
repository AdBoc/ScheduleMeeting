import {createStore} from 'redux';
import {rootReducer} from './reducers';
import {loadStateFromStorage, saveStateToStorage} from "../utils/localStorage";
import {composeWithDevTools} from "redux-devtools-extension";
import api from "../utils/api";
import throttle from 'lodash/throttle';

const store = createStore(rootReducer, loadStateFromStorage(), composeWithDevTools());

store.subscribe(() => saveStateToStorage({
  stats: store.getState().stats,
  spells: store.getState().spells,
  skills: store.getState().skills,
  other: store.getState().other,
  equipment: store.getState().equipment,
  effects: store.getState().effects,
  characterStats: store.getState().characterStats,
  background: store.getState().background,
  attacks: store.getState().attacks
}));

store.subscribe(throttle(() => {
  api.sendCharacter();
}, 2000));

export default store;

// {"stats":{"strength":1,"dexterity":1,"constitution":1,"intelligence":1,"wisdom":1,"charisma":1},"spells":[],"skills":{"athletics":{"value":-5,"isTagged":false},"acrobatics":{"value":-5,"isTagged":false},"sleightOfHand":{"value":-5,"isTagged":false},"stealth":{"value":-5,"isTagged":false},"arcana":{"value":-5,"isTagged":false},"history":{"value":-5,"isTagged":false},"investigation":{"value":-5,"isTagged":false},"nature":{"value":-5,"isTagged":false},"religion":{"value":-5,"isTagged":false},"animalHandling":{"value":-5,"isTagged":false},"insight":{"value":-5,"isTagged":false},"medicine":{"value":-5,"isTagged":false},"perception":{"value":-5,"isTagged":false},"survival":{"value":-5,"isTagged":false},"deception":{"value":-5,"isTagged":false},"intimidation":{"value":-5,"isTagged":false},"performance":{"value":-5,"isTagged":false},"persuasion":{"value":-5,"isTagged":false}},"other":{"taggedThrows":["dexterity","strength"],"taggedSkills":[],"currency":{"pP":0,"gP":0,"eP":0,"sP":0,"cP":0},"inspiration":false,"spellSlots":[0,0,0,0,0,0,0,0,0],"shortRestSlots":[0,0,0,0,0,0,0,0,0],"currentSlots":[0,0,0,0,0,0,0,0,0],"spellProficiency":"constitution"},"equipment":[{"name":"item1","quantity":"5","type":"other","description":"dwadwadwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww","id":"a70b4333-5884-4625-8c60-2303424f1aee"},{"name":"item2","quantity":"10","type":"other","description":"","id":"9456ac7a-9af9-483a-b94e-1ef8d4900796"}],"effects":[],"characterStats":{"level":1,"temporaryHitPoints":1,"hitPoints":1,"armorClass":1,"initiative":1,"speed":1,"passivePerception":1},"background":{"name":"","alignment":"","background":"","class":"","featuresAndTraits":"","experiencePoints":"","proficienciesAndLanguage":"","race":"","story":""},"attacks":[{"name":"Fist","diceType":"1d6","range":5,"bonusDamage":0,"bonusHit":0,"proficient":true,"profMod":"Strength","type":"Bludgeoning","id":"cd712c29-6419-4563-93ae-47b0c91463f5"}]}

// {"characterStats":{"level":1,"temporaryHitPoints":1,"hitPoints":1,"armorClass":1,"initiative":1,"speed":1,"passivePerception":1},
//   "stats":{"strength":1,"dexterity":1,"constitution":1,"intelligence":1,"wisdom":1,"charisma":1},
//   "skills":{"athletics": {"value": -5, "isTagged": false},"acrobatics": {"value": -5, "isTagged": false},"sleightOfHand": {"value": -5, "isTagged": false},"stealth": {"value": -5, "isTagged": false},"arcana": {"value": -5, "isTagged": false},"history": {"value": -5, "isTagged": false},"investigation": {"value": -5, "isTagged": false},"nature": {"value": -5, "isTagged": false},"religion": {"value": -5, "isTagged": false},"animalHandling": {"value": -5, "isTagged": false},"insight": {"value": -5, "isTagged": false},"medicine": {"value": -5, "isTagged": false},"perception": {"value": -5, "isTagged": false},"survival": {"value": -5, "isTagged": false},"deception": {"value": -5, "isTagged": false},"intimidation": {"value": -5, "isTagged": false},"performance": {"value": -5, "isTagged": false},"persuasion": {"value": -5, "isTagged": false}},
//   "background":{"name":"","alignment":"","background":"","class":"","featuresAndTraits":"","experiencePoints":"","proficienciesAndLanguage":"","race":"","story":""},
//   "attacks":[{"name":"Fist","diceType":"1d6","range":5,"bonusDamage":0,"bonusHit":0,"proficient":true,"profMod":"Strength","type":"Bludgeoning","id":"cd712c29-6419-4563-93ae-47b0c91463f5"}],
//   "equipment":[{"name":"item1","quantity":"5","type":"other","description":"dwadwadwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww","id":"a70b4333-5884-4625-8c60-2303424f1aee"},{"name":"item2","quantity":"10","type":"other","description":"","id":"9456ac7a-9af9-483a-b94e-1ef8d4900796"}],
//   "effects":[],
//   "spells":[],
//   "other":{"taggedThrows":["dexterity","strength"],"taggedSkills":[],"currency":{"pP":0,"gP":0,"eP":0,"sP":0,"cP":0},"inspiration":false,"spellSlots":[0,0,0,0,0,0,0,0,0],"shortRestSlots":[0,0,0,0,0,0,0,0,0],"currentSlots":[0,0,0,0,0,0,0,0,0],"spellProficiency":"constitution"}}