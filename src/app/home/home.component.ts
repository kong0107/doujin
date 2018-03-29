import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as marked from 'marked';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit {
  intro: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // https://github.com/angular/angular/issues/18586#issuecomment-330945826
    this.http.get('./assets/intro.md', {responseType: 'text'})
      .subscribe(data => this.intro = marked(data));
  }

}
