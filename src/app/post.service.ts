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
    return this.http.get<Post[]>('http://localhost:3000/posts');
  }

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`http://localhost:3000/posts/${id}`);
  }
}
