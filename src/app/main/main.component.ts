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
    allArticleGroups = ArticleGroups;
    optionGroups = OptionGroups;

    articleGroups: any= [];

    display = {
        category: true,
        contributor: false,
        delegation: false,
        workType: true,
        copyright: false,
        contract: false
    };

    displayAll = function() {
        for(let block in this.display)
            this.display[block] = true;
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
            },
            check: function(attribute: string) {
                const s = self.settings;
                if(!s[attribute].decided) return false;
                for(let i = 1; i < arguments.length; ++i)
                    if(s[attribute].value == arguments[i]) return true;
                return false;
            }
        };
    })();

    check = this.settings.check;

    withContributor = function() {
        /// 這個比較特別，因為沒得選的時候仍然是「非商家贊助」而非「未設定」。
        const c = this.settings.contributor;
        return c.decided && (c.value == "是");
    };

    showContract = function() {
        const ags = this.allArticleGroups.filter(ag => {
            for(let key in ag.condition) {
                if(!this.check(this.dictionary[key], ag.condition[key])) return false;
            }
            return true;
        });

        let num = 0;
        ags.forEach(ag => {
            ag.articles.forEach(article => {
                let chinese = number2chinese(++num);
                article.number = `第${chinese}條`;
                article.output = article.content.replace(/{{([^{}]+)}}/g,
                    (match, key) => {
                        const attribute = this.dictionary[key];
                        let value = this.settings[attribute] ? this.settings[attribute].value : `?!${key}!?`;
                        const number = parseInt(value); //< may be NaN
                        if(!isNaN(number)) value = number2chinese(number, "T", "upper");
                        if(!value) value = `__${key}__`;
                        return `<mark title="${key}">${value}</mark>`;
                    }
                );
            });
        });

        this.articleGroups = ags;
        this.display.contract = true;
    };

  constructor() {
    for(let key in this.dictionary) {
      let attribute = this.dictionary[key];
      this.settings[attribute] = {decided: false, value: ""};
    }
  }

  ngOnInit() {
    console.log(this.allArticleGroups);
  }
}
