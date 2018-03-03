import { Component, OnInit } from '@angular/core';
import { Article, ArticleGroup } from '../article';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
    articleGroups = [];
    contract = {
        category: "",
        workType: "",
        delegation_name: "BBB"
    };
    showSetting = {
        category: false
    };
    setting = {
        category: {
            display: true,
            value: ""
        }
    };
    
    set(input) {
        for(let key in input) {
            this.setting[key].display = false;
            this.setting[key].value = input[key];
        }
    }

    variables = {
        草稿繳交期限: "draftDeadline",
        定稿繳交期限: "finalDeadline",
        付全額期間: "fullPayPeriod",
        全額報酬數額: "fullPayAmount",
        違約金數額: "penaltyAmount",
        草稿初次意見期間: "draftFirstOpinionPeriod",
        草稿開放小修期間: "draftFixRequestPeriod",
        改稿次數: "draftFixNumber",
        草稿小修回應期間: "draftFixRespondPeriod",
        驗收期間: "acceptPeriod",
        委託名稱: "delegation_name"
    };

  chineseNumber(input: number) {
    const digit = "零一二三四五六七八九";
    if(input > 99 || input < 0) throw new Error;

    let result = "";
    let ten = Math.floor(input / 10);
    if(ten) result = digit.charAt(ten) + "十";

    let one = input % 10;
    if(one || !result) result += digit.charAt(one);

    return result;
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
      this.http.get<ArticleGroup[]>("/assets/articles.json")
        .subscribe(ags => {this.articleGroups = ags; console.log(ags);});
  }

  ngDoCheck() {
    let articleHeaders = document.querySelectorAll("article > h6 > span:first-child");
    for(let i = 0; i < articleHeaders.length; ++i) {
        let ah = articleHeaders[i];
        let num = this.chineseNumber(i+1);
        ah.innerHTML = `第${num}條`;
    }
  }

}
