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
  styleUrls: ['./anthology-without-contributor.component.css']
})
export class AnthologyWithoutContributorComponent implements OnInit {
  @Input() settings: object;
  @Input() display: any;
  
  @Output() render = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
