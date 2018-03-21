import { Component, OnInit } from '@angular/core';

import * as number2chinese from '../../number2chinese.js/number2chinese.js';
import * as Dictionary from '../dictionary.json';
import * as ArticleGroups from './articles.json';
import * as OptionGroups from './options.json';
import * as DemoData from './demo-data.json';
import * as ContractStyle from './contract.css';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css', './contract.css']
})
export class MainComponent implements OnInit {
    dictionary = Dictionary;
    allArticleGroups = ArticleGroups;
    optionGroups = OptionGroups;
    articleGroups: any= [];
    demoData = DemoData;
    contractStyle = ContractStyle;
    parties: any= [];

    display = {
        paste: false,
        category: true,
        contributor: false,

        delegation: false,
        workType: true,
        delegationDetails: false,
        copyright: false,

        anthologyWithContributor: false,
        anthologyWithoutContributor: false,

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
                                s.set("isAnthology", false);
                                break;
                            case "出版插圖":
                                s.set("isAnthology", false);
                                d.contributor = true;
                                break;
                            case "合本":
                                s.set("isAnthology", true);
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
                                d.delegation = false;
                                d.anthologyWithContributor = false;
                                d.anthologyWithoutContributor = false;
                                switch(value) {
                                    case "是":
                                        d.anthologyWithContributor = true;
                                        console.log("合本契約、商家出資");
                                        break;
                                    case "否":
                                        d.anthologyWithoutContributor = true;
                                        console.log("合本契約、無商家");
                                        break;
                                    default:
                                        console.error(`unexpected value "${value}" for attribute "contributor"`);
                                }
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
                        //console.log(`uncaught attribute "${attribute}"`);
                }
                if(render) self.renderArticles();
            },
            unset: function(attribute: string, render: boolean= true) {
                const d = self.display;
                const s = self.settings;
                s[attribute].decided = false;
                switch(attribute) {
                    case "category":
                        s.contributor.decided = false;
                        s.workType.decided = false;
                        s.copyrightBelonging.decided = false;
                        s.a_useRange.decided = false;

                        d.category = true;
                        d.contributor = false;
                        d.delegation = false;
                        d.copyright = false;
                        d.contract = false;
                        break;
                    case "contributor":
                        s.workType.decided = false;
                        s.copyrightBelonging.decided = false;
                        s.a_useRange.decided = false;

                        d.contributor = true;
                        d.delegation = false;
                        d.copyright = false;
                        d.contract = false;
                        break;
                    case "copyrightBelonging":

                        break;
                    default:
                        //console.log("uncaught attribute");
                }
                if(render) self.renderArticles();
            },
            check: function(attribute: string) {
                const s = self.settings;
                if(!s[attribute].decided) return false;
                for(let i = 1; i < arguments.length; ++i)
                    if(s[attribute].value == arguments[i]) return true;
                return false;
            },
            withContributor: function() {
                /// 這個比較特別，因為沒得選的時候仍然是「非商家贊助」而非「未設定」。
                const c = self.settings.contributor;
                return c.decided && (c.value == "是");
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
    withContributor = this.settings.withContributor;
    toggle = this.settings.toggle;

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
                        let value = this.settings[attribute] ? this.settings[attribute].value : `?!${key}!?`; ///< 根本沒有對應的變數，確認 dictionary

                        if(value) {
                            const number = +value; ///< 轉換成整數。跟 parseInt 不同，丟入日期字串的話會是 NaN
                            if(!isNaN(number)) {
                                if(["accountNumber", "a_phone", "b_phone"].indexOf(attribute) == -1)
                                    value = number2chinese(number, "T", "upper");
                            }
                            else if(/^\d{4}-\d{2}-\d{2}$/.test(value)) {
                                value = value.replace(/(\d{4})-(\d{2})-(\d{2})/, (match, y, m, d) => `${y}年${m}月${d}日`);
                            }

                        }
                        else value = `__${key}__`; ///< 使用者在此欄位沒有填資料
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

    load = function(data) {
        const s = this.settings;
        if(data) {
            for(let attr in data)
                if(s[attr]) s.set(attr, data[attr], false);
        }
        else {
            for(let key in this.dictionary)
                s.unset(this.dictionary[key], false);
        }
        this.renderArticles();
        this.display.contract = !!data;
    }


    /**
     * 觸發瀏覽器下載
     *
     * 利用 <a download="filename.ext" /> 的 click 事件來實作。
     * 有 blob: URLs 和 data: URLs 兩種做法，但沒能成功排除 iPhone 在前者的錯誤訊息，就還是選了後者。
     * data: URLs 的缺點有：
     * 1. 長度受限－－幸好本專案需要處理的資料不多
     * 2. window.btoa 對 Unicode 的支援問題
     *
     * refs:
     * * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-download
     * * https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
     */
    download = function(filename, content, type) {
        if(!type) type = "text/html";

        const a = document.createElement("a");
        //a.href = URL.createObjectURL(new Blob([content], {type: type}));

        if(type.indexOf("charset") == -1) type += ";charset=UTF-8";
        a.href = `data:${type};base64,` + btoa(window['unescape'](encodeURIComponent(content)));

        a.download = filename;
        a.target = "_blank";
        document.body.appendChild(a); //< Elements should be in DOM to work for Firefox
        a.click();

        //URL.revokeObjectURL(a.href);
        document.body.removeChild(a);
    }

    downloadSettings = function() {
        const result = {};
        const s = this.settings
        for(let attr in s) {
            if(s[attr].hasOwnProperty("value"))
                result[attr] = s[attr].value;
        }
        this.download("settings.json", JSON.stringify(result, null, 2), "application/json");
    }

    downloadText = function() {
        this.download("contract.txt", document.getElementById("contract").innerText, "text/plain");
    }

    downloadHTML = function() {
        const html = `<!doctype html>
            <html lang="zh-Hant-TW">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <title>出資聘人完成著作契約</title>
              <style type="text/css">
                .text-center {text-align: center;}
                ${this.contractStyle}
              </style>
            </head>
            <body>${document.getElementById("contract").innerHTML}</body>
            </html>`
        ;
        this.download("contract.html", html, "text/html");
    }

    loadUserSettings = function() {
        try {
            const us = JSON.parse(this.userSettings);
            this.load(us);
            this.display.paste = false;
        } catch(e) {
            const d = new Date;
            this.loadError = `讀取錯誤 ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
        }
    }


  constructor() {
    for(let key in this.dictionary) {
      let attribute = this.dictionary[key];
      this.settings[attribute] = {decided: false, value: ""};
    }
    "甲乙丙丁戊己庚辛壬癸".split("").forEach(alias => {
        this.parties.push({
            alias: alias,
            name: "",
            permanantAddress: "",
            telephone: "",
            cellphone: "",
            email: "",
            correspondenceAddress: "",
            bank: "",
            bankAccount: ""
        });
    });
  }

  ngDoCheck() {
    if(this.display.contract) this.renderArticles();
  }

  ngOnInit() {
    this.settings.set("club_population", 3);
    //window['mainComponent'] = this;
    //window["settings"] = this.settings;
    //window['allArticleGroups'] = this.allArticleGroups;
  }
}
