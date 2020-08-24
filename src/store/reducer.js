import { UPDATE_USER, SET_AGE, SET_GENDER, SET_LANGUAGE } from './actions';

export function reducer(state, action) {
  switch (action.type) {
    case UPDATE_USER:
      return {
        username: action.username,
        gender: null,
        age: null
      };
    case SET_GENDER:
      return {
        username: state.username,
        gender: action.gender,
        age: null
      };
    case SET_AGE:
      return {
        username: state.username,
        gender: state.gender,
        age: action.age
      };
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.language,
      };
    default:
      return initialState;
  }
}

export const initialState = {
  username: null,
  gender: null,
  age: null,
  language: 'zhCN',
};

export const defaultLanguage = 'zhCN'
