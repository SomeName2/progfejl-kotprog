import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
	server_address = "http://localhost:3000"
	
	initialized: Boolean = false
	current_user: string = "";
	current_admin: Boolean = false
	
	
	constructor(private http_client: HttpClient) { };
	
	
	register(username: string, password: string) {
		return this.http_client.post(this.server_address + "/users_api/register", {username: username, password: password})
	}
	
	
	login(username: string, password: string) {
		return this.http_client.post(this.server_address + "/users_api/login", {username: username, password: password}, { withCredentials: true })
	}
	
	
	logout() {
		let s: any = this.http_client.get(this.server_address + "/users_api/logout", { withCredentials: true }).subscribe(x => {})
		
		this.current_user = ""
		this.current_admin = false
	}
	
	
	set_current(user: string, admin: Boolean) {
		this.current_user = user
		this.current_admin = admin
		this.initialized = true
	}
	
	
	get_current() {
		return new Observable((x) => {
			if(this.initialized) {
				x.next({ user: this.current_user, is_admin: this.current_admin })
			} else {
				this.http_client.get(this.server_address + "/users_api/status", { withCredentials: true }).subscribe((y: any) => {
					this.current_user = y.user
					this.current_admin = y.is_admin
					this.initialized = true
					
					x.next(y)
				})
			}
		})
	}
	
	
	get_all() {
		return this.http_client.get(this.server_address + "/users_api/all")
	}
}
