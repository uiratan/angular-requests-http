import { AlertModalService } from './../../shared/alert-modal.service';
import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { catchError, empty, Observable, Subject } from 'rxjs';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';

import { Curso } from '../curso';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent {

  // cursos: Curso[] = [];

  // bsModalRef?: BsModalRef;

  cursos$!: Observable<Curso[]>;
  error$ = new Subject<boolean>();


  constructor(
    private service: CursosService,
    // private modalService: BsModalService,
    private alertModalService: AlertModalService
  ) {}

  ngOnInit() {
    // this.service.list()
    //   .subscribe(dados => this.cursos = dados);
    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.service.list()
    .pipe(
      catchError(error => {
        console.log(error);
        //this.error$.next(true);
        this.handleError()
        return empty();
      })
    );

    // this.service.list()
    // .pipe(
    //   catchError(error => empty())
    // )
    // .subscribe(
    //   dados => {
    //     console.log(dados);
    //   },
    //   error => console.log(error),
    //   () => console.log('Observable completo!')
    // );

  }

  handleError() {
    this.alertModalService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.');
    // this.bsModalRef = this.modalService.show(AlertModalComponent);
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = 'Erro ao carregar cursos. Tente novamente mais tarde.';
  }
}
