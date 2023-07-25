import { Observable, Subject, catchError, empty } from 'rxjs';
import { Component } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Curso } from '../curso';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent {

  // cursos: Curso[] = [];

  cursos$!: Observable<Curso[]>;
  error$ = new Subject<boolean>();


  constructor(
    private service: CursosService
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
        this.error$.next(true);
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

}
