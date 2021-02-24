import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../post.service';
import {Post} from '../shared/post';
import {asyncValidator, cleanLanguage, crossFieldValidator} from '../shared/MyValidators';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {
  postForm: FormGroup;

  submitted = false;
  contentLength = 0;

  constructor(private fb: FormBuilder,
              private postService: PostService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      author: ['', {
        validators: [
          Validators.required,
          Validators.pattern(/^[A-Za-z ]+$/)
        ],
        updateOn: 'blur',
        asyncValidators: [
          asyncValidator(this.http)
        ]
      }],
      title: ['', [
        Validators.required
      ]],
      content: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25),
        cleanLanguage
      ]]
    },
    { validators: crossFieldValidator });

    this.content.valueChanges.subscribe(content => {
      this.contentLength = content !== null ? content.length : 0;
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

  resetForm(): void {
    this.postForm.reset();
    this.submitted = false;
  }
}
