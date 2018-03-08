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
        delegationDetails: false,
        copyright: false,
        contract: false
    };

    settings: any = (()=>{
        const self = this;
        return {
            set: function(attribute: string, value: any, render: boolean= true) {
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
                                console.error(`unexpected value "${value}" for attribute "category"`);
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
                                console.error(`unexpected category "${s.category.value}" while selecting contributor`);
                        }
                        break;
                    case "workType":
                        d.delegationDetails = true;
                        break;
                    case "a_useRange":
                        if(value == "全部可轉授權" || value =="全部不可轉授權")
                            s.set("a_useLimit", "無限制", false);
                        break;
                    case "firstPubliclyReleased":
                        if(value == false)
                            s.set("confidentialityObligation", false, false);
                        break;
                    case "b_useRange":
                        if(value == "全部可轉授權" || value == "全部不可轉授權")
                            s.set("b_useLimit", "無限制", false);
                        break;
                    case "b_useLimit":
                        if(value == "無限制")
                            s.set("derivable", true, false);
                        break;
                    default:
                        console.log(`uncaught attribute "${attribute}"`);
                }
                if(render) self.renderArticles();
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
                self.renderArticles();
            },
            check: function(attribute: string) {
                const s = self.settings;
                if(!s[attribute].decided) return false;
                for(let i = 1; i < arguments.length; ++i)
                    if(s[attribute].value == arguments[i]) return true;
                return false;
            },
            toggle: function(attribute: string) {
                const s = self.settings;
                const v = !s[attribute].value;
                s.set(attribute, v);
                return v;
            }
        };
    })();

    check = this.settings.check;
    toggle = this.settings.toggle;

    withContributor = function() {
        /// 這個比較特別，因為沒得選的時候仍然是「非商家贊助」而非「未設定」。
        const c = this.settings.contributor;
        return c.decided && (c.value == "是");
    };

    renderArticles = function() {
        let ags = [];
        this.allArticleGroups.forEach(ag => {
            for(let key in ag.condition) {
                if(!this.check(this.dictionary[key], ag.condition[key])) return;
            }
            ags.push({
                title: ag.title,
                condition: ag.condition,
                articles: ag.articles.filter(article => {
                    if(typeof article.condition == "undefined") return true;
                    for(let key in article.condition) {
                        if(!this.check(this.dictionary[key], article.condition[key])) return false;
                    }
                    return true;
                })
            });
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
        window['articleGroups'] = ags;
        console.log(`rendered ${this.getArticleCount()} articles`);
    };

    getArticleCount = function() {
        return this.articleGroups.reduce((accumlator, current) => accumlator + current.articles.length, 0);
    }

  constructor() {
    for(let key in this.dictionary) {
      let attribute = this.dictionary[key];
      this.settings[attribute] = {decided: false, value: ""};
    }
  }

  ngOnInit() {
    console.log(window['allArticleGroups'] = this.allArticleGroups);
  }
}
