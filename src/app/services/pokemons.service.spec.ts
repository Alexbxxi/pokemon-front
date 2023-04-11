import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { PokemonsService } from './pokemons.service';

describe('PokemonsService', () => {
  let service: PokemonsService;
  const pokemonDummy = {
    name: 'Unknow',
    image: '',
    attack: 100,
    defense: 100,
    hp: 100,
    type: 'Unknow',
    idAuthor: 1,
  }

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

  it('service should return pokemon is created', (done: DoneFn) => {
    service.createPokemon(pokemonDummy).subscribe((pokemonDummy) => {
      expect(pokemonDummy);
      done();
    })
    expect(service).toBeTruthy();
  });
});
