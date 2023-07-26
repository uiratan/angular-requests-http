import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { catchError, EMPTY, Observable, Subject, switchMap, take } from 'rxjs';

import { Curso } from '../curso';
import { Cursos2Service } from '../cursos2.service';
import { AlertModalService } from './../../shared/alert-modal.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent {

  deleteModalRef?: BsModalRef;
  @ViewChild('deleteModal') deleteModal: any;

  cursos$!: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  cursoSelecionado?: Curso;

  constructor(
    private service: Cursos2Service,
    private modalService: BsModalService,
    private alertModalService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.service.list()
      .pipe(
        catchError(error => {
          console.log(error);
          //this.error$.next(true);
          this.handleError()
          return EMPTY;
        })
    );
  }

  handleError() {
    this.alertModalService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.');
  }

  onEdit(cursoId: number) {
    this.router.navigate(['editar', cursoId], { relativeTo: this.route });
  }

  onDelete(curso: Curso) {
    this.cursoSelecionado = curso;
    // this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
    const result$ = this.alertModalService.showConfirm('Confirmação', `Tem certeza que deseja remover o curso ${this.cursoSelecionado.nome}?`);
    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.service.remove(curso.id) : EMPTY)
      )
      .subscribe({
        next: () => this.onRefresh(),
        error: () => this.alertModalService.showAlertDanger(`Erro ao remover o curso ${this.cursoSelecionado?.nome}. Tente novamente mais tarde.`),
        complete: () => console.log('delete completo')
      });

    // this.deleteModalRef?.hide()
  }

  // onConfirmDelete(): void {
  //   this.service.remove(this.cursoSelecionado!.id)
  //     .subscribe(
  //       success => this.onRefresh(),
  //       error => this.alertModalService.showAlertDanger('Erro ao remover cursos. Tente novamente mais tarde.')
  //   );
  //   this.deleteModalRef?.hide();
  // }

  // onDeclineDelete(): void {
  //   this.deleteModalRef?.hide();
  // }
}
