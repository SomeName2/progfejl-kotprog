import { Component } from '@angular/core';
import { UsersService } from "../users.service"
import { Router } from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
	username_input: string = ""
	password_input: string = ""
	message: string = ""
	
	constructor(private users_service: UsersService, private router: Router) {}
	
	on_login() {
		this.users_service.login(this.username_input, this.password_input).subscribe((x: any) => {			
			if(x) {
				this.users_service.set_current(x.user, x.is_admin)
				this.router.navigate(["/home",])
			} else {
				this.message = "Failed to log in"
			}
		})
	}
}
