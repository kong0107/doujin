import { Component } from '@angular/core';
import * as projectInfo from '../../package.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '同人契約模板';
  version = projectInfo['version'];
}
