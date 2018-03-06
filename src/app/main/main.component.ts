import { Component, OnInit } from '@angular/core';

import * as number2chinese from '../../number2chinese.js/number2chinese.js';
import * as Dictionary from '../dictionary.json';
import * as ArticleGroups from './articles.json';
import * as OptionGroups from './options.json';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
    dictionary = Dictionary;
    articleGroups = ArticleGroups;
    optionGroups = OptionGroups;

    display = {
        category: true,
        contributor: false,
        delegation: false,
        workType: true,
        copyright: false,
        contract: false
    };

    settings: any = (()=>{
        const self = this;
        return {
            set: function(attribute: string, value: string) {
                const d = self.display;
                const s = self.settings;
                s[attribute].decided = true;
                s[attribute].value = value;
                switch(attribute) {
                    case "category":
                        d.category = false;
                        switch(value) {
                            case "設定圖":
                            case "非出版單張":
                                d.delegation = true;
                                d.workType = true;
                                break;
                            case "出版插圖":
                            case "合本":
                                d.contributor = true;
                                break;
                            default:
                                console.error("unexpected value");
                        }
                        break;
                    case "contributor":
                        d.contributor = false;
                        switch(s.category.value) {
                            case "出版插圖":
                                d.delegation = true;
                                d.workType = true;
                                break;
                            case "合本":
                                console.log("合本契約");
                                break;
                            default:
                                console.error("unexpected value");
                        }
                        break;
                    default:
                        console.log("uncaught attribute");
                }
            },
            unset: function(attribute: string) {
                const d = self.display;
                const s = self.settings;
                s[attribute].decided = false;
                //s[attribute].value = "";
                switch(attribute) {
                    case "category":
                        d.category = true;
                        s.contributor.decided = false;
                        d.contributor = false;
                        break;
                    case "contributor":
                        d.contributor = true;
                        break;
                    default:
                        console.log("uncaught attribute");
                }
            }
        };
    })();
    
    hide = function(blockName) {
        this.display[blockName] = false;
    };
    show = function(blockName) {
        this.display[blockName] = true;
    }
    
    withContributor = function() {
        const c = this.settings.contributor;
        return c.decided && (c.value == "是");
    };

  constructor() {
    for(let key in this.dictionary) {
      let attribute = this.dictionary[key];
      this.settings[attribute] = {decided: false, value: ""};
    }
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
