import {Component, OnInit} from '@angular/core';
import {Post} from '../shared/post';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  post: Post;

  constructor(private route: ActivatedRoute,
              private postService: PostService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.postService.getPost(id)
      .subscribe(post => this.post = post);
  }
}
