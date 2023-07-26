import { HttpClient } from "@angular/common/http";
import { delay, take, tap } from "rxjs";

export class CrudService<T  extends { id?: number | string }> {

  constructor(
    protected http: HttpClient,
    private API_URL: string
    //@Inject(String) private API_URL: string
  ) {
    //super(http, `${environment.API}cursos`);
  }

  list() {
    return this.http.get<T[]>(this.API_URL)
      .pipe(
        delay(2000),
        tap(console.log)
      );
  }

  loadById(id: number | string) {
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  private create(entity: T) {
    return this.http.post(this.API_URL, entity).pipe(take(1));
  }

  private update(entity: T) {
    return this.http.put(`${this.API_URL}/${entity.id}`, entity).pipe(take(1));
  }

  save(entity: T) {
    if (entity.id) {
      return this.update(entity);
    }

    return this.create(entity);
  }

  remove(id: number | string) {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1));
  }
}
