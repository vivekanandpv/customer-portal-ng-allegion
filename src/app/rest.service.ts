import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private httpClient: HttpClient) {}

  read<TRes>(fragment: string) {
    return this.httpClient.get<TRes>(this.getUrl(fragment));
  }

  post<TReq, TRes>(fragment: string, body: TReq) {
    return this.httpClient.post<TRes>(this.getUrl(fragment), body);
  }

  put<TReq, TRes>(fragment: string, body: TReq) {
    return this.httpClient.put<TRes>(this.getUrl(fragment), body);
  }

  delete<TRes>(fragment: string) {
    return this.httpClient.delete<TRes>(this.getUrl(fragment));
  }

  private getUrl(fragment: string): string {
    return `${environment.baseUrl}${fragment}`;
  }
}
