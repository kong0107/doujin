import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as marked from 'marked';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: []
})
export class DisclaimerComponent implements OnInit {
  disclaimer: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // https://github.com/angular/angular/issues/18586#issuecomment-330945826
    this.http.get('./assets/disclaimer.md', {responseType: 'text'})
      .subscribe(data => this.disclaimer = marked(data));
  }

}
