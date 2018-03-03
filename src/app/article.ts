export interface Article {
    title?: string;
    condition?: object;
    content: string;
}

export interface ArticleGroup {
    title: string;
    condition?: object;
    articles: Article[];
}
