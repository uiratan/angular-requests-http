import { Observable } from 'rxjs';
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


  constructor(
    private service: CursosService
  ) {}

  ngOnInit() {
    // this.service.list()
    //   .subscribe(dados => this.cursos = dados);
    this.cursos$ = this.service.list();
  }

}
