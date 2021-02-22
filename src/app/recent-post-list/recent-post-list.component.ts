import { Component, OnInit } from '@angular/core';
import {Post} from '../shared/post';
import {PostService} from '../post.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-recent-post-list',
  templateUrl: './recent-post-list.component.html',
  styleUrls: ['./recent-post-list.component.scss']
})
export class RecentPostListComponent implements OnInit {
  posts: Post[];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.loadPosts()
      .pipe(map(posts => posts.filter(post => post.img)))
      .subscribe(posts => this.posts = posts);
  }

}
