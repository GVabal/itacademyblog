import { Component, OnInit } from '@angular/core';
import {Post} from '../shared/post';
import {PostService} from '../post.service';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {
  model: Post = {author: '', title: '', content: '', likes: 0};

  submitted = false;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.submitted = true;
    this.postService.addPost(this.model).subscribe();
  }
}
