import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../post.service';
import {Post} from '../shared/post';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {
  postForm: FormGroup;

  submitted = false;

  constructor(private fb: FormBuilder,
              private postService: PostService) { }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      author: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z ]+$/)
      ]],
      title: ['', [
        Validators.required
      ]],
      content: ['', [
        Validators.required,
        Validators.minLength(5)
      ]]
    });
  }

  get author(): FormControl {
    return this.postForm.get('author') as FormControl;
  }

  get title(): FormControl {
    return this.postForm.get('title') as FormControl;
  }

  get content(): FormControl {
    return this.postForm.get('content') as FormControl;
  }

  onSubmit(): void {
    this.submitted = true;
    const post: Post = {
      ...this.postForm.value,
      likes: 0
    };
    this.postService.addPost(post).subscribe();
  }
}
