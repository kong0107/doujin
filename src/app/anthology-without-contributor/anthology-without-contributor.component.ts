import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-anthology-without-contributor',
  templateUrl: './anthology-without-contributor.component.html',
  styleUrls: ['../form.css']
})
export class AnthologyWithoutContributorComponent implements OnInit {
  @Input() settings: any;
  @Input() optionGroups: any;
  @Input() display: any;
  @Input() parties: any;
  @Input() modal: object;

  constructor() { }

  ngOnInit() {
  }

}
