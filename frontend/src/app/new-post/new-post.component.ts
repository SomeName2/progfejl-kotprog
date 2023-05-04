import { Component } from '@angular/core';
import { PostsService } from '../posts.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {
	text_area_input: string = ""
	
	constructor(private posts_service: PostsService, private users_service: UsersService) {}
	
	on_post() {
		this.posts_service.create(this.text_area_input).subscribe((x: any) => {})
		this.text_area_input = ""
	}
}
