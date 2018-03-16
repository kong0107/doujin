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

  @Output() render = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
