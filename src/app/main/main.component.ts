import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  category: string;
  contributor: string;
  workType: string;
  copyrightOwner: string;

  showWorkType: boolean;
  showCopyrightOwner: boolean;
  showGoToCommision: boolean;

  check(): void {
    const contributerDecided = !!this.contributor;
    const workTypeDecided = !!this.workType;
    switch(this.category) {
      case '設定圖':
      case '單張圖':
        this.showWorkType = true;
        this.showCopyrightOwner = true;
        this.showGoToCommision = workTypeDecided;
        break;
      case '插圖':
      case '多人合本':
        this.showWorkType = contributerDecided;
        this.showCopyrightOwner = contributerDecided;
        this.showGoToCommision = workTypeDecided;
        break;
      default:
        this.hideAll();
    }
  }

  hideAll(): void {
    this.showWorkType = false;
    this.showCopyrightOwner = false;
    this.showGoToCommision = false;
  }

  constructor() { }

  ngOnInit() {
    this.hideAll();
  }

}
