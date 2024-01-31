import { createAction, props } from '@ngrx/store';
import { CharacterState } from 'src/app/core/models/Character.state';

export const loadCharacters = createAction(
    '[Character] Load Characters',
    props<{ characters: CharacterState }>()
);

export const loadCharactersSuccess = createAction(
    '[Character] Load Characters Success',
    props<{ characters: any }>()
);

export const filterCharacters = createAction(
    '[Character] Filter Characters',
    props<{ name: string }>()
);

export const filterCharactersSuccess = createAction(
    '[Character] Filter Characters Success',
    props<{ characters: any }>()
);
