import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map, distinctUntilChanged, tap } from 'rxjs';
import { Pokemon } from 'src/app/interfaces/pokemon.interface';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  @Output() pokemonsSearchEvent = new EventEmitter<any>();

  searchPokemon = new FormControl('');

  constructor(protected _pokemonsService: PokemonsService) {
    this.sendTxtPokemon();
  }

  protected sendTxtPokemon(): void {
    this.searchPokemon.valueChanges
      .pipe(
        map((search) => search?.trim()),
        debounceTime(300),
        distinctUntilChanged(),
        tap((search) => {
          this.pokemonsSearchEvent.emit(search);
        })
      )
      .subscribe();
  }
}
