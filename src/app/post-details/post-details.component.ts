import {Component, OnInit} from '@angular/core';
import {Post} from '../shared/post';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../post.service';
import {LikeService} from '../like.service';
import {switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  post$: Observable<Post>;

  constructor(private route: ActivatedRoute,
              private postService: PostService,
              private likeService: LikeService) { }

  ngOnInit(): void {
    // BLOGAI:
    // const id = this.route.snapshot.paramMap.get('id');
    // this.postService.getPost(id).subscribe((post) => this.post = post);

    // GERIAU:
    // this.route.paramMap.subscribe((params) => {
    //   const id = params.get('id');
    //   this.postService.getPost(id).subscribe(post => this.post = post);
    // });

    // DAR GERIAU:
    this.post$ = this.route.paramMap.pipe(switchMap(params => {
      const id = params.get('id');
      return this.postService.getPost(id);
    }));
  }

  addLike(post: Post): void {
    this.likeService.addLike(post).subscribe();
    window.location.reload();
  }

  removeLike(post: Post): void {
    this.likeService.removeLike(post).subscribe();
    window.location.reload();
  }
}
