import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { PokemonsService } from './pokemons.service';

describe('PokemonsService', () => {
  let service: PokemonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(PokemonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('service should return pokemons by author', (done: DoneFn) => {
    service.getPokemons().subscribe((pokemon) => {
      expect(pokemon);
      done();
    });
    expect(service).toBeTruthy();
  });

  it('service should return pokemon by id', (done: DoneFn) => {
    service.getPokemon(355).subscribe((pokemon) => {
      expect(pokemon);
      done();
    });
    expect(service).toBeTruthy();
  });
});
