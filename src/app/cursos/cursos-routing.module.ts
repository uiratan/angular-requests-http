import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CursosFormComponent } from './cursos-form/cursos-form.component';
import { CursosListaComponent } from './cursos-lista/cursos-lista.component';
import { CursoResolverGuard } from './guards/cursos-resolver.resolver';

const routes: Routes = [
  { path: '', component: CursosListaComponent },
  { path: 'novo',
    component: CursosFormComponent,
    resolve: {
      curso: CursoResolverGuard
    }
  },
  { path: 'editar/:id',
    component: CursosFormComponent,
    resolve: {
      curso: CursoResolverGuard
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
