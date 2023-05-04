import { Component } from '@angular/core';
import { PostsService } from "../posts.service"

@Component({
  selector: 'app-posts-admin',
  templateUrl: './posts-admin.component.html',
  styleUrls: ['./posts-admin.component.css']
})

export class PostsAdminComponent {
	posts: any
	
	constructor(private posts_service: PostsService) {
		this.posts = posts_service.get_all()
	}
	
	on_delete(id_: string) {
		this.posts_service.delete_post(id_).subscribe(x => {
			this.posts = this.posts_service.get_all()
		})
	}
}
