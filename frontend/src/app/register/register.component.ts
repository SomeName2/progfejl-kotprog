import { Component } from '@angular/core';
import { UsersService } from "../users.service"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
	username_input: string = ""
	password_input: string = ""
	message: string = ""
	
	constructor(private users_service: UsersService) {}
	
	on_register() {
		let subscription = this.users_service.register(this.username_input, this.password_input).subscribe(x => {
			if(x) {
				this.message = "Successfully registered"
			} else {
				this.message = "Failed to register"
			}
		})
	}
}
