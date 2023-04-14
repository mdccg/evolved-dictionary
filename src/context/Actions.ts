import { Dispatch } from 'react';
import { Action, ActionType } from './UserReducer';
import { Word } from './../models/Word';

export const setWords = (dispatch: Dispatch<Action>, words: Word[]) => (
  dispatch({ payload: words, type: ActionType.SET_WORDS })
);