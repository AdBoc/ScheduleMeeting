import { useState, useContext, useEffect } from "react";
import { characterContext } from "../context/character";
import { CharacterInterface } from "../ts/interfaces";

export const useExpandableList = (property: "Equipment" | "Attacks") => {
  const { character } = useContext(characterContext);
  let initialState: any = (character[property] as Array<CharacterInterface["Equipment" | "Attacks"][0]>).slice(0).map(item => ({ ...item, active: false }));
  const charDependency = character[property];
  const [extItems, setExtItems] = useState(initialState);
  const [extVisible, setExtVisible] = useState(false);

  useEffect(() => {
    let initialState: any = (character[property] as any).slice(0).map((item: any) => ({ ...item, active: false }));
    setExtItems(initialState);
  }, [charDependency]);

  const showDetails = (id: string) => () => {
    const copy = JSON.parse(JSON.stringify(extItems));
    copy.forEach((item: any) => {
      if (item.id === id) {
        item.active = !item.active
      }
    });
    setExtItems([...copy]);
  }

  const formVisiblity = () => {
    setExtVisible(prev => !prev);
  }

  return {
    extItems,
    extVisible,
    showDetails,
    formVisiblity
  }
}

// export function useExpandableList<T extends object>(initialState: T) {}
