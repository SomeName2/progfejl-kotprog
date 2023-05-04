import { Component } from '@angular/core';
import { UsersService } from "../users.service"

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
	users_list: any = []
	
	constructor(private users_service: UsersService) {
		users_service.get_all().subscribe(x => {
			this.users_list = x
		} )
	}
}
