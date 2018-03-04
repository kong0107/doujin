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
    settings: any= {};

    variables = {
        契約類型: "category",
        商家出資: "contributor",

        委託資料及委託規格: "delegation_data",
        工作方式: "workType",

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
        付定金期間:"earnestMoneyPeriod",
        定金數額: "earnestMoneyAmount",
        付尾款期間: "finalPayPeriod",
        尾款數額: "finalPayAmount",

        繪師姓名: "a_name",
        繪師戶籍地址: "a_permanentAddress",
        繪師身分證號: "a_id",
        繪師電子郵件: "a_email",
        繪師通訊地址: "a_correspondenceAddress",
        繪師連絡電話: "a_phone",

        商家名稱: "b_name",
        商家登記地址: "b_permanentAddress",
        商家統一編號: "b_id",
        商家代表人: "b_chairperson",
        商家通訊地址: "b_correspondenceAddress",
        商家聯絡電話: "b_phone",

        委託主姓名: "b_name",
        委託主戶籍地址: "b_permanantAddress",
        委託主身分證號: "b_id",
        委託主電子郵件: "b_email",
        委託主通訊地址: "b_correspondenceAddress",
        委託主連絡電話: "b_phone",

        繪師帳戶銀行名稱: "bank",
        繪師戶名: "accountName",
        繪師帳號: "accountNumber",

        委託名稱: "delegation_name",
        委託內容: "delegation_content",
        委託規格: "delegation_format",
        重大修改: "seriousityDefinition",

        著作權條款: "copyrightTerms",
        著作財產權歸屬: "copyrightBelonging",
        繪師指定公開發表名稱: "a_pseudonym",
        繪師利用範圍: "a_useRange",
        目的範圍: "purpose",
        繪師利用限制: "a_useLimit",
        利用範圍: "useLimitRange"
        
    };

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

    // deprecated
    contract = {
        category: "",
        workType: "",
        delegation_name: "BBB"
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

  constructor(private http: HttpClient) {
    for(let key in this.variables) {
      let attribute = this.variables[key];
      this.settings[attribute] = {display: false, decided: false, value: ""};
    }
    this.settings.category.display = true;
  }

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
