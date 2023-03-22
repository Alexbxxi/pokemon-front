import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PokemonsService } from 'src/app/services/pokemons.service';

import { CardComponent } from './card/card.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule],
  exports: [SearchComponent, CardComponent],
  declarations: [SearchComponent, CardComponent],
  providers: [PokemonsService],
})
export class SharedModule {}
