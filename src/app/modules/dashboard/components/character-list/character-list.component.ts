import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filterCharacters, loadCharacters } from 'src/app/state/actions/characters.actions';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { selectCharacterCollection, selectNextUrl } from 'src/app/state/selectors/characters.selectors';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {

  characters$: Observable<any> = new Observable();
  nextUrl$: Observable<string> = new Observable();
  initialSearch = {
    characters: {
      next: 'https://rickandmortyapi.com/api/character', 
      characters: [], 
      filter:{
        name: ''
      }
    }
  };
  searchForm = new FormGroup({
    searchText: new FormControl('', Validators.compose([Validators.minLength(3)]))
  });
  

  constructor(
    private store: Store<AppState>
    ) { }

  ngOnInit() {
    this.store.dispatch(loadCharacters(this.initialSearch));
    this.nextUrl$ = this.store.select(selectNextUrl);
    this.characters$ = this.store.select(selectCharacterCollection);
  }

  searchCharacter() {
    if(this.searchForm.valid) {
      this.store.dispatch(filterCharacters({name: this.searchForm.value.searchText}));
    } 
  }

  onScroll() {
    this.nextUrl$.subscribe(
      (response) => {
        this.store.dispatch(loadCharacters({characters: {next: response, characters: [], filter:{name: ''}}}));
      }
    );
  }
}
