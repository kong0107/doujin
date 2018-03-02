import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
    contract = {
        delegation_name: "BBB"
    };
    
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
    
    terms = [
        {
            title: "工作內容、期間",
            counter: 0,
            articles: [
                { content: "乙方委託甲方為乙方產品完成圖像設計之工作。" },
                { title: "規格", 
                  content: "甲方應完成之詳細工作內容、規格及交付方式，依本契約【附件一】「{{委託名稱}}工作成果規格書」之約定。【附件一】內容如須增刪調整，應由雙方另以附約方式議定之。" 
                },
                { title: "草稿及完稿預覽檔案繳交期限", 
                  content: "{{delegation_name}}甲方{{GGG}}同意於{{草稿繳交期限}}前完成所委託圖像設計工作成果（下稱「本著作」）之草稿並交付乙方進行檢驗，草稿之規格應明列於【附件一】。甲方並同意於前述期限後之{{定稿繳交期間}}日內完成全部工作，將本著作交付乙方進行驗收。" 
                }
            ]
        },
    ];
    
    replacer = {
        草稿繳交期限: "ZZZ"
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

  constructor() { }

  ngOnInit() {
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
