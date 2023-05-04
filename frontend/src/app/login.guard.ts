import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from "./users.service"

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
	constructor(private users_service: UsersService, private router: Router) {}
	
	canActivate(
	route: ActivatedRouteSnapshot,
	state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return new Observable((x) => {
			this.users_service.get_current().subscribe((y: any) => {
				
				if(y.user == "") {
					x.next(this.router.parseUrl(""))
				} else {
					x.next(true);
				}
			})
		})
	}
}
