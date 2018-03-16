import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter
} from '@angular/core';

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

  @Output() render = new EventEmitter<any>();

  partyNames= "甲乙丙丁戊己庚辛壬癸".split("");

  constructor() { }

  ngOnInit() {
  }

}
