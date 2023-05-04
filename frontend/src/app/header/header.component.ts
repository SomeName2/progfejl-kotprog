import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
	message: string = ""
	
	user_observable: any = null
	admin_observable: any = null
	
	constructor(private users_service: UsersService, private router: Router) {
		this.update_observables()
	}
	
	
	update_observables() {
		this.user_observable = new Observable((x) => {
			this.users_service.get_current().subscribe((y: any) => {
				x.next(y.user)
			})
		})
		
		this.admin_observable = new Observable((x) => {
			this.users_service.get_current().subscribe((y: any) => {
				x.next(y.is_admin)
			})
		})
	}
	
	
	on_logout() {
		this.users_service.logout()
		this.message = "Logged out"
		this.update_observables()
		this.router.navigate(["/home"])
	}
	
	
	on_user_posts() {
		this.users_service.get_current().subscribe((x: any) => {
			this.router.navigate(["posts", x.user ])
		})
	}
}
