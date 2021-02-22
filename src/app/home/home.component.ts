import {Component, OnInit} from '@angular/core';
import {Post} from "../shared/post";
import {PostService} from '../post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: Post[];

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.postService.loadPosts()
      .subscribe(posts => this.posts = posts);
  }
}
