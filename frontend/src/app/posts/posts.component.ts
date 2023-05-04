import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../posts.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnDestroy {
	user_posts: any = []
	user: any = ""
	sub: any = null
	
	constructor(private posts_service: PostsService, private users_service: UsersService, private route: ActivatedRoute) {
		this.user = this.route.snapshot.paramMap.get("id")
		
		this.sub = this.route.params.subscribe(params => {
			this.user = params['id'];
			
			posts_service.get_user_posts(this.user).subscribe((x:any) => {
				this.user_posts = x
			})
		});
	}
	
	
	ngOnDestroy() {
		this.sub.unsubscribe()
	}
}
