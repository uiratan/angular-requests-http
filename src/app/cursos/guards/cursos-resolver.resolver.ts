import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';

import { CursosService } from '../cursos.service';

type CursoEditOrNewTypes = {
  id: number | null,
  nome: string | null
}

export const CursoResolverGuard: ResolveFn<CursoEditOrNewTypes> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  if (route.params && route.params['id']) {
    return inject(CursosService).loadById(route.params['id']);
  }

  return of({
    id: null,
    nome: null
  });

};
