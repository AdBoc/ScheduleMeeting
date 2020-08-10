import { useState, useContext, useEffect } from "react";
import { characterContext } from "../../context/Character";
import { Types } from "../../context/Character/reducer";

export const useExpandableList = (property: "Equipment" | "Attacks") => {
  const { character, dispatch } = useContext(characterContext);
  let initialState: any = (character[property] as any).slice(0).map((item: any) => ({ ...item, active: false }));
  const [extItems, setExtItems] = useState(initialState);
  const [extVisible, setExtVisible] = useState(false);

  useEffect(() => {
    let initialState: any = (character[property] as any).slice(0).map((item: any) => ({ ...item, active: false }));
    setExtItems(initialState);
  }, [character, property]);

  const showDetails = (id: string) => () => {
    const copy = JSON.parse(JSON.stringify(extItems));
    copy.forEach((item: any) => {
      if (item.id === id) {
        item.active = !item.active
      }
    });
    setExtItems([...copy]);
  };

  const formVisiblity = () => {
    setExtVisible(prev => !prev);
  };

  const deleteItem = ({ target }: any) => {
    dispatch({ type: Types.DELETE_IN_ARRAY, payload: { property, id: target.name } });
  };

  return {
    extItems,
    extVisible,
    showDetails,
    formVisiblity,
    deleteItem
  };
};

// let initialState: any = (character[property] as Array<CharacterInterface["Equipment" | "Attacks"][0]>).slice(0).map(item => ({ ...item, active: false }));
// export function useExpandableList<T extends object>(initialState: T) {}
