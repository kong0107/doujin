import { 
    Component, 
    OnInit, 
    Input,
    Output,
    EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-delegation',
  templateUrl: './delegation.component.html',
  styleUrls: ['./delegation.component.css', '../form.css']
})
export class DelegationComponent implements OnInit {
  @Input() settings: object;
  @Input() optionGroups: any;
  @Input() display: any;
  
  @Output() render = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
