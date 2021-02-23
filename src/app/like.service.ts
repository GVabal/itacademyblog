import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from './shared/post';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http: HttpClient) { }

  addLike(post: Post): Observable<Post> {
    return this.http.put<Post>(`api/posts/${post.id}`, {
      ...post,
      likes: post.likes + 1
    });
  }

  removeLike(post: Post): Observable<Post> {
    return this.http.put<Post>(`api/posts/${post.id}`, {
      ...post,
      likes: post.likes - 1
    });
  }
}
