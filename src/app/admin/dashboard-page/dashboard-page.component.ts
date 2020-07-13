import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { Post } from 'src/app/shared/interfaces';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  constructor(public postSerice: PostService) {}

  posts: Post[] = [];
  postSub: Subscription;
  deleteSub: Subscription;
  searchStr: string = '';

  ngOnInit() {
    this.postSub = this.postSerice.getAll().subscribe((res) => {
      this.posts = res;
    });
  }

  remove(id: string) {
    this.deleteSub = this.postSerice.remove(id).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== id);
    });
  }

  ngOnDestroy() {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }
    if (this.deleteSub) {
      this.deleteSub.unsubscribe();
    }
  }
}
