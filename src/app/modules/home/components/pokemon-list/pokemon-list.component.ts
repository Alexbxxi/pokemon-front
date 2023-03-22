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
  public data?: Pokemon;
  private filterPokemonsByInput: boolean = false;
  private pokemonId?: number;
  public isPokemonFormHidden: boolean = true;

  public pokemonSpecs = ['Nombre', 'Imagen', 'Ataque', 'Defensa', 'Acciones'];

  constructor(private _pokemonService: PokemonsService) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  getFilterPokemons(pokemonName?: string) {
    if (pokemonName === '') {
      this.filterPokemonsByInput = false;
      this.getPokemons();
    } else {
      this.filterPokemonsByInput = true;

      this.pokemons.filter((pokemon) => {
        if (pokemon.name === pokemonName) {
          this.pokemonId = pokemon.id;
          this.getPokemons();
        }
      });
    }
  }

  getPokemons() {
    this.pokemons = [];
    let service: any;

    if (this.filterPokemonsByInput) {
      if (!this.pokemonId) {
        return;
      }

      service = this._pokemonService
        .getPokemon(this.pokemonId as number)
        .subscribe({
          next: (res: any) => {
            this.pokemons.push(res);
          },
          error: (err: Error) => console.error(err),
        });

      this.filterPokemonsByInput = false;
    } else {
      service = this._pokemonService.getPokemons();

      service.subscribe({
        next: (res: any) => {
          this.pokemons.push(...res);
        },
        error: (err: Error) => console.error(err),
      });
    }
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
