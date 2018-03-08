import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  @Input() attribute: string;
  @Input() settings: object;
  @Input() options: any[];

  constructor() {}
  ngOnInit() {
      this.options = this.options.map(option => {
        if(typeof option == "string") return {value: option};
        if(typeof option.explanation == "string")
            option.explanation = [option.explanation];
        return option;
    });
  }
}
