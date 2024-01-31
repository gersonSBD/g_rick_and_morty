import { ActionReducerMap } from "@ngrx/store";
import { CharacterState } from "../core/models/Character.state";
import { characterReducer } from "./reducers/characters.reducers";

export interface AppState {
    characters: CharacterState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    characters: characterReducer
}