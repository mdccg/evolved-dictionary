interface Word {
  term: string;
  audioUrls: string[];
  meanings: string[];
}

interface WordNotFound {
  title: string;
}

const isInstanceOfWordNotFound = (obj: Word[] | WordNotFound) => (<WordNotFound>obj).title !== undefined;

const getWords = (jsonObj: any): Word[] | WordNotFound => {
  const { title } = jsonObj;

  if (title) {
    const notFound: WordNotFound = { title };
    return notFound;
  }

  const words: Word[] = [];

  jsonObj.forEach((obj: any) => {
    const { word, phonetics, meanings } = obj;

    const audioUrls: string[] = [];
    if (phonetics && phonetics.length > 0) {
      phonetics.forEach((p: any) => {
        const { audio } = p;
        if (audio) {
          audioUrls.push(audio);
        }
      })
    }

    const meaningsArr: string[] = [];
    if (meanings && meanings.length > 0) {
      meanings.forEach((m: any) => {
        const { definitions } = m;
        if (definitions && definitions.length > 0) {
          definitions.forEach((d: any) => {
            const { definition } = d;
            meaningsArr.push(definition);
          });
        }
      });
    }

    const wordObj: Word = {
      term: word,
      audioUrls,
      meanings: meaningsArr,
    };
    words.push(wordObj);
  });

  return words;
}
// Criar uma task para todo o código acima

describe('English Dictionary E2E tests', () => {
  beforeEach(() => {
    cy.visit('');
    cy.fixture('apiResponse').then((apiResponse) => (this.apiResponse = apiResponse));
  });

  it('should render correct number of word cards when search is perfomed', () => {
    const query = 'word';
    
    cy.intercept('GET', `${Cypress.env('API_URL')}/${query}`, { body: this.apiResponse });
    cy.performSearch(query);
    cy.get('[data-cy="word-card"]').should('have.length', this.apiResponse.length);
  });

  it('should show correct meanings about a word', () => {
    const query = 'word';

    const requestOptions: Partial<Cypress.RequestOptions> = {
      method: 'GET',
      url: `${Cypress.env('API_URL')}/${query}`,
      failOnStatusCode: false,
    };

    cy.request(requestOptions).then(({ status, body }) => {
      const words: Word[] | WordNotFound = getWords(body);
      console.log(words);
      
      cy.performSearch(query);
      cy.get('[data-cy="word-details"]').first().click();
      
      const firstWord: Word = words[0];
      const meaningsList = cy.get('[data-cy="details-list"] > li');

      meaningsList.should('have.length', firstWord.meanings.length);

      meaningsList.then(($value: JQuery<HTMLElement>) => {
        const { meanings } = firstWord;
        
        for (let i = 0; i < meanings.length; ++i) {
          expect($value[i].innerText).to.equal(meanings.at(i));
        }

        // cy.get('[data-cy="details-list"] > :nth-child(1)')
      });
    });
  });
});