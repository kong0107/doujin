import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-anthology-with-contributor',
  templateUrl: './anthology-with-contributor.component.html',
  styleUrls: ['../form.css']
})
export class AnthologyWithContributorComponent implements OnInit {
  @Input() settings: any;
  @Input() optionGroups: any;
  @Input() display: any;
  @Input() modal: object;

  constructor() { }

  ngOnInit() {
  }

}
