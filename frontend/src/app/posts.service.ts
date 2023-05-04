import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class PostsService {
	server_address: string = "http://localhost:3000"
	
	constructor(private http_client: HttpClient) { };
	
	get_all() {
		return this.http_client.get(this.server_address + "/posts_api/all")
	}
	
	
	create(text: string) {
		return this.http_client.post(this.server_address + "/posts_api/create", {text: text}, { withCredentials: true })
	}
	
	
	get_user_posts(user: string) {
		return this.http_client.post(this.server_address + "/posts_api/user", {username: user}, { withCredentials: true })
	}
	
	
	delete_post(id_: string) {
		return this.http_client.post(this.server_address + "/posts_api/delete", {_id: id_}, { withCredentials: true })
	}
	
	
	get_post(i: string) {
		return this.http_client.post(this.server_address + "/posts_api/get", {_id: i})
	}
	
	
	update_post(i: string, text: string) {
		return this.http_client.post(this.server_address + "/posts_api/update", {_id: i, text: text}, { withCredentials: true })
	}
}
