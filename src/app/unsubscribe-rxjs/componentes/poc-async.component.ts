import { Component } from '@angular/core';
import { tap } from 'rxjs/operators';

import { EnviarValorService } from '../enviar-valor.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-poc-async',
  template: `
    <app-poc-base [nome]="nome"
      [valor]="valor$ | async" estilo="bg-success">
    </app-poc-base>
  `
})
export class PocAsyncComponent {

  nome = 'Componente com async';
  //valor$: Observable<string> = new Observable();
  valor$: Observable<string>|null = null;

  constructor(private service: EnviarValorService) { }

  ngOnInit() {
    this.valor$ = this.service.getValor()
      .pipe(tap(v => console.log(this.nome, v)));
  }

  ngOnDestroy() {
    console.log(`${this.nome} foi destruído.`);
  }

}
