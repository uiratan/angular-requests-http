import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Cursos2Service } from '../cursos2.service';
import { AlertModalService, AlertTypes } from './../../shared/alert-modal.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
})
export class CursosFormComponent {
  form!: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private cursoService: Cursos2Service,
    private alertModalService: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const curso = this.route.snapshot.data['curso'];

    console.log(curso);

    this.form = this.fb.group({
      id: [curso.id],
      nome: [curso.nome ,[Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    });
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
    //return this.form.controls[field].errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);

    if (this.form.valid) {
      console.log('submit');

      const operacao = this.form.value.id ? 'atualizado' : 'criado';

      this.cursoService.save(this.form.value).subscribe({
        next: () => this.alertModalService.showAlert(`Curso ${operacao} com sucesso!`, AlertTypes.SUCCESS, 3000, true),
        error: () => this.alertModalService.showAlert(`Curso não pode ser ${operacao}. Tente novamente mais tarde!`, AlertTypes.DANGER),
        complete: () => console.log('save completo')
      });
    }
  }


  onCancel() {
    this.submitted = false;
    this.form.reset();
  }

}
