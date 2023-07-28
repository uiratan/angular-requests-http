import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss']
})
export class LibSearchComponent {

  queryField = new FormControl();
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  readonly FIELDS = 'name,description,version,homepage';
  results$ = new Observable<any>();
  total!: number;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.results$ = this.queryField.valueChanges
      .pipe(
        map(value => value.trim()),
        filter(value => value.length > 1),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(value => this.http.get(this.SEARCH_URL, {
          params : {
            search: value,
            fields: this.FIELDS
          }
        })),
        tap((res:any) => this.total = res.total),
        map((res:any) => res.results)
      );
  }

  onSearch() {
    const fields = 'name,description,version,homepage';
    let value = this.queryField.value;

    if (value && (value = value.trim()) !== '') {

      const params_ = {
        search: value,
        fields: fields
      };

      let params = new HttpParams();
      params = params.set('search', value);
      // params.append
      params = params.set('fields', fields);

      this.results$ = this.http
        .get(this.SEARCH_URL, { params })
        .pipe(
          tap((res:any) => this.total = res.total),
          map((res:any) => res.results)
        );
    }
  }

  onClear() {
    this.results$ = new Observable<any>();
  }

}
