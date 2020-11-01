type Background = {
  TaggedThrows: (string | null)[];
  TaggedSkills: string[];
  Currency: {
    PP: number;
    GP: number;
    EP: number;
    SP: number;
    CP: number;
  };
  Inspiration: boolean;
  SpellSlots: [number, number, number, number, number, number, number, number, number];
  CurrentSlots: [number, number, number, number, number, number, number, number, number];
  ShortRestSlots: [number, number, number, number, number, number, number, number, number];
  SpellProficiency: null | string;
}

const initialState = null as unknown as Background;

export function other(state = initialState, action:any) {
  switch (action.type) {
    default:
      return state;
  }
}