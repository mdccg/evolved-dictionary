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
  const { title } = jsonObject;
  if (title) {
    const wordNotFound: WordNotFound = { title };
    return wordNotFound;
  }
  const words: Word[] = [];
  jsonObject.forEach((jsonObject: any) => {
    const { word, phonetics, meanings } = jsonObject;
    const audioUrls: string[] = [];
    if (phonetics && phonetics.length > 0) {
      phonetics.forEach((phonetic: any) => {
        const { audio } = phonetic;
        audioUrls.push(audio);
      });
    }
    const meaningsArray: string[] = [];
    if (meanings && meanings.length > 0) {
      meanings.forEach((meaning: any) => {
        const { definitions } = meaning;
        if (definitions && definitions.length > 0) {
          definitions.forEach((definition: any) => {
            meaningsArray.push(definition);
          });
        }
      });
    }
    
    const wordObject: Word = {
      term: word,
      audioUrls,
      meanings: meaningsArray
    };

    words.push(wordObject);
  });

  return words;
}