import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/post.service';
import { Post } from '../shared/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  post$: Observable<Post[]>;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.post$ = this.postService.getAll();
  }
}
