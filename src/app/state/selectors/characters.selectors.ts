import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { CharacterState } from 'src/app/core/models/Character.state';

export const selectCharacters = (state: AppState) => state.characters;

export const selectCharacterCollection = createSelector(
    selectCharacters,
    (state: CharacterState) => state.characters
);

export const selectNextUrl = createSelector(
    selectCharacters,
    (state: CharacterState) => state.next
);