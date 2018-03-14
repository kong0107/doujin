import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-anthology-with-contributor',
  templateUrl: './anthology-with-contributor.component.html',
  styleUrls: ['./anthology-with-contributor.component.css', '../form.css']
})
export class AnthologyWithContributorComponent implements OnInit {
  @Input() settings: any;
  @Input() optionGroups: any;
  @Input() display: any;

  @Output() render = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
