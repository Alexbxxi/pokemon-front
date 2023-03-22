import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pokemon } from 'src/app/interfaces/pokemon.interface';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Output() isCreated: EventEmitter<boolean> = new EventEmitter();
  @Output() isHiddenPokemonForm: EventEmitter<boolean> = new EventEmitter();
  @Input() data: any;
  public pokemonForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _cdr: ChangeDetectorRef,
    private _pokemonService: PokemonsService
  ) {}

  ngOnInit(): void {
    this.onCreateForm();
  }

  onCreateForm() {
    this.pokemonForm = this.fb.group({
      id: '',
      name: ['', Validators.required],
      image: ['', Validators.required],
      attack: [0, [Validators.min(0), Validators.max(100)]],
      defense: [0, [Validators.min(0), Validators.max(100)]],
      hp: [0, [Validators.min(0), Validators.max(100)]],
      type: ['', Validators.required],
      idAuthor: 1,
    });

    if (this.data?.id) {
      this.pokemonForm.patchValue(this.data);
    }
  }

  public submit(form: FormGroup) {
    if (form?.invalid) {
      this.pokemonForm?.markAsTouched();
      this._cdr.markForCheck();
      return;
    }
    const data = { ...this.pokemonForm.value };

    this._pokemonService.submitPokemon(data).subscribe(() => {
      this.pokemonForm.reset({});
      this.isCreated.next(true);
    });
  }

  hidePokemonForm() {
    this.pokemonForm.reset({});
    this.isHiddenPokemonForm.next(true);
  }
}
