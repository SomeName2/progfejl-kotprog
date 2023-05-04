import { Component } from '@angular/core';
import { PostsService } from "../posts.service"

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent {
	posts: any
	
	constructor(private posts_service: PostsService) {
		this.posts = posts_service.get_all()
	}
}
