import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
	posts = [
		{user: "asd1", text: "asdasdasd"},
		{user: "asd2", text: "asdasdasd2"},
		{user: "asd3", text: "asdasdasd3"},
	]
}
