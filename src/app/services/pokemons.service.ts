import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../interfaces/pokemon.interface';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  constructor(private _http: HttpClient) {}

  public getPokemons(): Observable<Pokemon> {
    return this._http
      .get(
        `https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/pkm-msa-evaluation/pokemon/?idAuthor=1`
      )
      .pipe(map((res) => res as Pokemon));
  }

  public getPokemon(id: number): Observable<Pokemon> {
    return this._http
      .get(
        `https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/pkm-msa-evaluation/pokemon/${id}`
      )
      .pipe(map((res) => res as Pokemon));
  }

  public submitPokemon(pokemon: Pokemon) {
    if (pokemon?.id) {
      return this.updatePokemon(pokemon);
    } else {
      return this.createPokemon(pokemon);
    }
  }

  public createPokemon(pokemon: Pokemon) {
    return this._http
      .post(
        `https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/pkm-msa-evaluation/pokemon/`,
        pokemon
      )
      .pipe(
        map((res) => res as Pokemon),
        catchError(() => {
          return of(null);
        })
      );
  }

  public updatePokemon(pokemon: Pokemon) {
    return this._http
      .put(
        `https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/pkm-msa-evaluation/pokemon/${pokemon.id}`,
        pokemon
      )
      .pipe(
        map((res) => res as Pokemon),
        catchError(() => {
          return of(null);
        })
      );
  }

  public deletePokemon(pokemon: Pokemon) {
    return this._http
      .delete(
        `https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/pkm-msa-evaluation/pokemon/${pokemon.id}`
      )
      .pipe(
        map((res) => res as Pokemon),
        catchError(() => {
          return of(null);
        })
      );
  }
}
