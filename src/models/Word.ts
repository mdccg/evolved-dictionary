export interface Word {
  term: string;
  audioUrls: string[];
  meanings: string[];
}

export interface WordNotFound {
  title: string;
}

export const isInstanceOfWordNotFound = (object: Word[] | WordNotFound) =>
  (object as WordNotFound).title !== undefined;

export const getWords = (jsonObject: any): Word[] | WordNotFound => {
  
}