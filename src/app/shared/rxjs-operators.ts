import { filter, map, pipe, tap } from "rxjs";
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';

export function filterRespose<T>() {
  return pipe(
    filter((event: any) => event.type == HttpEventType.Response),
    map((res: any) => res.body)
  );
}

export function uploadProgress<T>(cb: (progress: number) => void) {
  return tap((event: any) => {
    if (event.type == HttpEventType.UploadProgress) {
      cb(Math.round((event.loaded * 100) / event.total!));
    }
  });
}
