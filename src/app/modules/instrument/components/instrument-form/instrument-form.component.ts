import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { InstrumentDTO } from '../../dto/instrument-dto';
import { InstrumentInDTO } from '../../dto/insturment-in-dto';
import { InstrumentService } from '../../service/instrument.service';

@Component({
  selector: 'app-instrument-form',
  templateUrl: './instrument-form.component.html',
  styleUrls: ['./instrument-form.component.scss']
})
export class InstrumentFormComponent implements OnChanges {
  @Input() instrumentDTO: InstrumentDTO = { id: 0, name: '', description: '' };
  @Output() onChange: EventEmitter<void> = new EventEmitter();

  editMode = false;

  formGroup: FormGroup = this._fb.group({
    name: [this.instrumentDTO.name, Validators.required],
    description: [this.instrumentDTO.description]
  });

  constructor(private _fb: FormBuilder, private _router: Router, private _service: InstrumentService) { }

  ngOnChanges(changes: SimpleChanges): void {
    const instrumentDTO = changes['instrumentDTO'].currentValue;
    this.formGroup.patchValue({ ...instrumentDTO });
    this.editMode = instrumentDTO.id !== 0;
  }

  save(): void {
    this._service.save(this.compileInDTO()).pipe(first()).subscribe(_ => this.onSuccess());
  }

  update(): void {
    this._service.update(this.compileDTO()).pipe(first()).subscribe(_ => this.onSuccess());
  }

  private onSuccess(): void {
    this.onChange.emit();
    this.formGroup.reset();
    this.editMode = false;
  }

  private compileDTO(): InstrumentDTO {
    return {
      id: this.instrumentDTO.id,
      name: this.formGroup.get('name')?.value,
      description: this.formGroup.get('description')?.value
    }
  }

  private compileInDTO(): InstrumentInDTO {
    return {
      name: this.formGroup.get('name')?.value,
      description: this.formGroup.get('description')?.value
    }
  }
}
