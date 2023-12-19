import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged, min } from 'rxjs';
import { Candy } from 'src/app/models/Candy';
import { CandyStorage } from 'src/app/models/CandyStorage';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-addCandy',
  templateUrl: './addCandy.component.html',
  styleUrls: ['./addCandy.component.css'],
})
export class AddCandyComponent implements OnInit {
  group: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    desc: new FormControl('', [Validators.required]),
    flavour: new FormControl('', [Validators.required]),
    colour: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    photoLink: new FormControl('', [Validators.required]),
    stock: new FormControl('', [Validators.required, Validators.min(1)]),
  });

  public actualizadoConExito: boolean = false;
  private debounceTimeMs: number = 1000;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.setupControlChanges();
  }

  setupControlChanges() {
    this.group.valueChanges
      .pipe(debounceTime(this.debounceTimeMs), distinctUntilChanged())
      .subscribe(() => {
        this.onControlValueChanged();
      });
  }

  onControlValueChanged() {
    if (this.allValid()) {
      this.adminService
        .pushPreview(
          new CandyStorage(
            new Candy(
              this.group.value.name,
              this.group.value.desc,
              this.group.value.flavour,
              this.group.value.colour,
              this.group.value.price,
              this.group.value.photoLink
            ),
            this.group.value.stock
          )
        )
        .subscribe((result) => {
          if (!result) {
            console.error('error en el llamado a servicio');
            return;
          }
          this.actualizadoConExito = result;
          console.info('Candy pushed successfully');

          setTimeout(() => {
            this.actualizadoConExito = false;
          }, 3000);
        });
    }
  }

  public allValid() {
    return this.group.valid;
  }

  public validateNonNegative(formcontrol: AbstractControl | null) {
    if (!formcontrol) {
      console.error('wat');
      return;
    }

    let value = formcontrol.value;

    if (value < 0) {
      formcontrol.setValue(0);
    }
  }
}
