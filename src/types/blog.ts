export interface BlogArticleProperties {
  title: {
    title: {
      plain_text: string;
    }[];
  };
  tags: {
    relation: {
      id: string;
    }[];
  };
  tageNames: {
    rollup: {
      array: {
        title: {
          plain_text: string;
        }[];
      }[];
    };
  };
  category: {
    relation: {
      id: string;
    }[];
  };
  categoryName: {
    rollup: {
      array: {
        title: {
          plain_text: string;
        }[];
      }[];
    };
  };
  datePublished: {
    date: {
      start: string;
    };
  };
  shortUrl: {
    url: string;
  };
  thumbnail: {
    files: {
      name: string;
      file: {
        url: string;
      };
    }[];
  };
}

export interface BlogArticle {
  id: string;
  properties: BlogArticleProperties;
}

export interface BlogArticleResponse {
  object: string;
  results: BlogArticle[];
}
