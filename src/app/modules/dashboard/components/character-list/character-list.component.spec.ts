import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CharacterListComponent } from './character-list.component';
import { loadCharacters, filterCharacters } from 'src/app/state/actions/characters.actions';
import { AppState } from 'src/app/state/app.state';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Store } from '@ngrx/store';

fdescribe('CharacterListComponent', () => {
  let component: CharacterListComponent;
  let fixture: ComponentFixture<CharacterListComponent>;
  let mockStore: MockStore<AppState>; // Use MockStore type

  const initialState: AppState = {
    characters: {
      characters: [],
      next: 'https://rickandmortyapi.com/api/character',
      filter: {
        name: ''
      }
    }
  };

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterListComponent],
      imports: [ReactiveFormsModule, InfiniteScrollModule],
      providers: [provideMockStore({ initialState })],
    });

    fixture = TestBed.createComponent(CharacterListComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.get(Store); // Use TestBed.get(Store) to get the Store
    fixture.detectChanges();
    tick();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadCharacters on ngOnInit', fakeAsync(() => {
    spyOn(mockStore, 'dispatch').and.callThrough();

    component.ngOnInit();
    tick();

    expect(mockStore.dispatch).toHaveBeenCalledWith(loadCharacters(component.initialSearch));
  }));

  it('should dispatch filterCharacters on searchCharacter if form is valid', fakeAsync(() => {
    spyOn(mockStore, 'dispatch');
    const searchText = 'Test Character';
    component.searchForm.setValue({ searchText });
    component.searchCharacter();
    tick();
    expect(mockStore.dispatch).toHaveBeenCalledWith(filterCharacters({ name: searchText }));
  }));
});
