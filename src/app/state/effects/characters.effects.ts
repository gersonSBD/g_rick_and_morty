import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { CharacterState } from 'src/app/core/models/Character.state';
import { CharacterService } from 'src/app/modules/dashboard/services/character.service';

@Injectable()
export class CharacterEffects {

    loadCharacter$ = createEffect(() => this.actions$.pipe(
        ofType('[Character] Load Characters'),
        exhaustMap((actions:CharacterState) => this.characterService.getCharacters(actions.characters.next)
        .pipe(
            map(characters => ({ type: '[Character] Load Characters Success', characters})),
            catchError(() => EMPTY)
        ))
        )
    );

    filterCharacter$ = createEffect(() => this.actions$.pipe(
        ofType('[Character] Filter Characters'),
        exhaustMap((actions:{name: string}) => this.characterService.searchCharacter(actions.name)
        .pipe(
            map(characters => ({ type: '[Character] Filter Characters Success', characters})),
            catchError(() => EMPTY)
        ))
        )
    );

    constructor(
        private actions$: Actions,
        private characterService: CharacterService
    ) {}
}