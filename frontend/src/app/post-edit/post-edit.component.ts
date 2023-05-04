import { Component } from '@angular/core';
import { PostsService } from "../posts.service"
import { ActivatedRoute, Router } from "@angular/router"

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent {
	user: any = ""
	i: any = -1
	text_area_input: string = ""
	created: any = ""
	modified: any = ""
	
	constructor(private posts_service: PostsService, private route: ActivatedRoute, private router: Router) {
		this.user = this.route.snapshot.paramMap.get("user")
		this.i = this.route.snapshot.paramMap.get("i")
		
		posts_service.get_post(this.i).subscribe((x: any) => {
			this.text_area_input = x.text
			this.created = x.created
			this.modified = x.modified
		})
	}
	
	
	on_update() {
		this.posts_service.update_post(this.i, this.text_area_input).subscribe(x => {
			this.router.navigate(["/admin" ])
		})
	}
}
