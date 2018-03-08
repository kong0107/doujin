import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {
  @Input() attribute: string;
  @Input() settings: any;
  @Input() text: string;

  constructor() { }

  ngOnInit() {
  }

}
