import { Component, OnInit } from '@angular/core';

import * as number2chinese from '../../number2chinese.js/number2chinese.js';
import * as Dictionary from '../dictionary.json';
import * as ArticleGroups from './articles.json';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
    dictionary = Dictionary;
    articleGroups = ArticleGroups;

    settings: any= {};

    set(attribute, value) {
        let s = this.settings;
        s[attribute].value = value;
        s[attribute].decided = true;
        switch(attribute) {
            case "category":
                s[attribute].display = false;
                switch(value) {
                    case "設定圖":
                    case "非出版單張":
                        s.delegation_data.display = true;
                        s.workType.display = true;
                        break;
                    case "出版插圖":
                    case "合本":
                        s.contributor.display = true;
                        break;
                    default:
                        throw new Error;
                }
                break;
            case "contributor":
                s[attribute].display = false;
                switch(s.category.value) {
                    case "出版插圖":
                        s.delegation_data.display = true;
                        s.workType.display = true;
                        break;
                    case "合本":
                        console.log("合本契約");
                        break;
                    default:
                        throw new Error;
                }
                break;
            case "workType":
            case "copyrightBelonging":
            case "a_useRange":
            case "a_useLimit":
                break;
            default:
                throw new Error;
        }
    }
    unset(attribute) {
        this.settings[attribute].display = true;
        this.settings[attribute].decided = false;
    }

  constructor() {
    for(let key in this.dictionary) {
      let attribute = this.dictionary[key];
      this.settings[attribute] = {display: false, decided: false, value: ""};
    }
    this.settings.category.display = true;
  }

  ngOnInit() {
      console.log(this.articleGroups);
  }

  ngDoCheck() {
    let articleHeaders = document.querySelectorAll("article > h6 > span:first-child");
    for(let i = 0; i < articleHeaders.length; ++i) {
        let ah = articleHeaders[i];
        let num = number2chinese(i+1);
        ah.innerHTML = `第${num}條`;
    }
  }
}
