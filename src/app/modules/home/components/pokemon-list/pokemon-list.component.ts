import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/interfaces/pokemon.interface';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  public pokemons: Pokemon[] = [];
  private pokemonsDummy: Pokemon[] = [];
  public data?: Pokemon;
  public isPokemonFormHidden: boolean = true;

  public pokemonSpecs = ['Nombre', 'Imagen', 'Ataque', 'Defensa', 'Acciones'];

  constructor(private _pokemonService: PokemonsService) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemonsByFilter(pokemonName: string) {
    this.pokemonsDummy = [];
    if (!pokemonName) {
      this.getPokemons();
    } else {
      this.pokemons.filter((pokemon) => {
        if (pokemon.name.includes(pokemonName)) {
          this.pokemonsDummy.push(pokemon);
          this.pokemons = this.pokemonsDummy;
        }
      });
    }
  }

  getPokemons() {
    this.pokemons = [];
    this._pokemonService.getPokemons().subscribe({
      next: (res: any) => {
        this.pokemons.push(...res);
      },
      error: (err: Error) => console.error(err),
    });
  }

  isCreated(created: boolean) {
    if (created) {
      this.getPokemons();
    }
  }

  removePokemon(data: Pokemon) {
    this._pokemonService.deletePokemon(data).subscribe({
      next: () => {
        this.getPokemons();
      },
      error: (err: Error) => console.error(err),
    });
  }

  showPokemonForm(data: Pokemon | '') {
    this.isPokemonFormHidden = false;

    if (!data) {
      return;
    }

    this.data = data;
  }

  cancel(isCanceled: boolean) {
    if (isCanceled) {
      this.data = {
        name: '',
        attack: 0,
        defense: 0,
        image: '',
        hp: 0,
        type: '',
      };
      this.isPokemonFormHidden = true;
    }
  }
}
