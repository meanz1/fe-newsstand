import { fetchData } from "../../utils/js/getJson.js";
import { getQuerySelector, getQuerySelectorAll } from "../../utils/js/getElements.js";

const categoryObj = {
  "종합/경제" : [],
  "방송/통신" : [],
  "IT" : [],
  "영자지" : [],
  "스포츠/연예" : [],
  "매거진/전문지" : [],
  "지역" : []
};

// 뉴스리스트에 필요한 요소들 받아오기
export async function getNewsData() {
  const NewsPath = await fetchData("../assets/data/newspaperSrc.json");
  NewsPath.newsList.map((elem) => {
    categoryObj[elem.category].push({"name" : elem.name, "lightSrc" : elem.lightSrc, "editDate" : elem.editDate, "mainNews" : elem.mainNews, "subNews" : elem.subNews});
  });
}

// 뉴스리스트 요소들 보여주기
export function showListNewsData(category, newsIdx) {
  const categoryData = categoryObj[category][newsIdx-1];
  const contentBigNews = getQuerySelector(document, ".press-content-big-news");
  const pressContentNewsLogo = getQuerySelector(document, ".press-content-news-info");
  const pressNewsContentHeadlines = getQuerySelector(document, ".press-content-news-headlines");

  contentBigNews.innerHTML = `
    <img src="${categoryData.mainNews.thumbnail}">
    <span>${categoryData.mainNews.title}</span>
  `;

  
  pressContentNewsLogo.innerHTML = `
    <img src="${categoryData.lightSrc}"/>
    <span class="press-content-news-info-time">${categoryData.editDate}</span>
    <button class="press-content-news-info-subscribe">+ 구독하기</button>
  `;
  
  const putSubTitles = categoryData.subNews.reduce((acc, _, idx)=> {
    return acc + `<span class="press-content-news-title">${categoryData.subNews[idx]}</span>`
  }, "");

  pressNewsContentHeadlines.innerHTML = putSubTitles;

  getQuerySelector(undefined, ".press-content-news-footer").innerHTML = `${categoryData.name} 언론사에서 직접 편집한 내용입니다.`;
}

