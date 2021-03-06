import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, dataBaseResponse } from './interfaces';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}

  create(post: Post): Observable<Post> {
    return this.http.post(`${environment.dataBaseUrl}/posts.json`, post).pipe(
      map((response: dataBaseResponse) => {
        return {
          ...post,
          id: response.name,
          date: new Date(post.date),
        };
      })
    );
  }

  getAll(): Observable<Post[]> {
    return this.http.get(`${environment.dataBaseUrl}/posts.json`).pipe(
      map((response: { [key: string]: any }) => {
        return Object.keys(response).map((key) => ({
          ...response[key],
          id: key,
          date: new Date(response[key].date),
        }));
      })
    );
  }
  getById(id: string): Observable<Post> {
    return this.http
      .get<Post>(`${environment.dataBaseUrl}/posts/${id}.json`)
      .pipe(
        map((post: Post) => {
          return {
            ...post,
            id,
            date: new Date(post.date),
          };
        })
      );
  }
  remove(id: string): Observable<void> {
    return this.http.delete<void>(
      `${environment.dataBaseUrl}/posts/${id}.json`
    );
  }
  update(post: Post): Observable<Post> {
    return this.http.patch<Post>(
      `${environment.dataBaseUrl}/posts/${post.id}.json`,
      post
    );
  }
}
