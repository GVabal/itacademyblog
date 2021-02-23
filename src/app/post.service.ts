import { Injectable } from '@angular/core';
import {Post} from './shared/post';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  loadPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('api/posts');
  }

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`api/posts/${id}`);
  }

  addPost(request: Post): Observable<Post> {
    return this.http.post<Post>('api/posts', request);
  }
}
