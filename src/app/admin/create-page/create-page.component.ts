import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from 'src/app/shared/interfaces';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent implements OnInit {
  constructor(private postService: PostService) {}

  form: FormGroup;

  buildForm() {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
    });
  }

  submitForm() {
    if (this.form.invalid) {
      return;
    }

    const post: Post = {
      title: this.form.value.title,
      text: this.form.value.text,
      author: this.form.value.author,
      date: new Date(),
    };

    this.postService.create(post).subscribe(() => {
      this.form.reset();
    });
  }

  ngOnInit() {
    this.buildForm();
  }
}
