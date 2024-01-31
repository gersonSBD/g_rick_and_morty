import { createReducer, on } from '@ngrx/store';
import { filterCharacters, filterCharactersSuccess, loadCharacters, loadCharactersSuccess } from '../actions/characters.actions';
import { CharacterState } from 'src/app/core/models/Character.state';

export const initialState: CharacterState = { 
    characters: [], 
    next: 'https://rickandmortyapi.com/api/character',
    filter: {
        name: ''
    }
};

export const characterReducer = createReducer(
    initialState,
    on(loadCharacters, (state) => {
        return state;
    }),
    on(loadCharactersSuccess, (state, {characters}) => {
        let charactersArray = state.characters.concat(characters.results);
        return { ...state, characters:charactersArray, next: characters.info.next };
    }),
    on(filterCharacters, (state, {name}) => {
        return {...state, filter: {name}};
    }),
    on(filterCharactersSuccess, (state, {characters}) => {
        return {...state, characters: characters.results, next: characters.info.next};
    })
);