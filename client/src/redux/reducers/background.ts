type Background = {
  Alignment: string;
  Background: string;
  Class: string;
  ExperiencePoints: string;
  FeaturesAndTraits: string;
  Name: string;
  ProficienciesAndLanguage: string;
  Race: string;
  Story: string;
}

const initialState = null as unknown as Background;

export function background(state = initialState, action:any) {
  switch (action.type) {
    default:
      return state;
  }
}