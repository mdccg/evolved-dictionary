import { useState, useCallback } from 'react';
import WordCard from '../../components/WordCard';
import { isInstanceOfWordNotFound, Word } from '../../models/Word';
import { WordService } from '../../services/WordService';
import { HomeContainer, NoResultsFoundMessage, ResultsFoundMessage, SearchButton, SearchInput, SearchPanel } from './styles';

const Home = () => {
  const [filter, setFilter] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [noWordFound, setNoWordFound] = useState<boolean>(false);
  const [words, setWords] = useState<Word[]>([]);
  const [wordService] = useState<WordService>(new WordService());
  const searchWords = useCallback(async () => {
    if (filter) {
      setIsSearching(true);
      setNoWordFound(false);
      setWords([]);

      const response = await wordService.findWords(filter);
      isInstanceOfWordNotFound(response) ? setNoWordFound(true) : setWords(response as Word[]);
      setIsSearching(false);
    }
  }, [isSearching, filter]);

  return (
    <HomeContainer>
      <SearchPanel>
        <SearchInput
          data-cy="search-input"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          placeholder="Apple, orange, book&hellip;" />
        
        <SearchButton
          data-cy="search-button"
          value="Buscar"
          disabled={isSearching}
          onClick={searchWords} />

        {!isSearching && words.length > 0 && (
          <>
            <ResultsFoundMessage>
              {words.length} resultado(s) encontrados
            </ResultsFoundMessage>

            {words.map((word, index) => (
              <WordCard
                key={index}
                order={index + 1}
                word={word} />
            ))}
          </>
        )}

        {!isSearching && noWordFound && (
          <NoResultsFoundMessage>
            Nenhum resultado foi encontrado
          </NoResultsFoundMessage>
        )}
      </SearchPanel>
    </HomeContainer>
  );
}

export default Home
