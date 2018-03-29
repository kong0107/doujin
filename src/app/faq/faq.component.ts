import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as marked from 'marked';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: []
})
export class FaqComponent implements OnInit {
  faq: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // https://github.com/angular/angular/issues/18586#issuecomment-330945826
    this.http.get('./assets/faq.md', {responseType: 'text'})
      .subscribe(data => this.faq = marked(data));
  }

}
