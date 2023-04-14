import { useState, useCallback, useContext } from 'react';
import { ClimbingBoxLoader } from 'react-spinners';
import WordCard from '../../components/WordCard';
import { isInstanceOfWordNotFound, Word } from '../../models/Word';
import { WordService } from '../../services/WordService';
import { HomeContainer, NoResultsFoundMessage, ResultsFoundMessage, SearchButton, SearchInput, SearchPanel } from './styles';
import { LoaderSizeProps } from 'react-spinners/helpers/props';
import UserContext from '../../context/UserContext';
import { setWords } from '../../context/Actions';

const Home = () => {
  const [filter, setFilter] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [noWordFound, setNoWordFound] = useState<boolean>(false);
  const [wordService] = useState<WordService>(new WordService());
  const [loaderSizeProps] = useState<LoaderSizeProps>({
    color: 'var(--roxinho)',
    cssOverride: {
      margin: '10px auto'
    }
  });
  const { state, dispatch } = useContext(UserContext);
  const { words } = state;
  const searchWords = useCallback(async () => {
    if (filter) {
      setIsSearching(true);
      setNoWordFound(false);
      setWords(dispatch, []);

      const response = await wordService.findWords(filter);
      isInstanceOfWordNotFound(response) ? setNoWordFound(true) : setWords(dispatch, response as Word[]);
      setIsSearching(false);
    }
  }, [filter, wordService]);

  return (
    <HomeContainer>
      <SearchPanel>
        <SearchInput
          data-cy="search-input"
          value={filter}
          onChange={(event) => {
            setFilter(event.target.value);
          }}
          onKeyUp={(event) => event.key === 'Enter' ? searchWords() : undefined}
          placeholder="Apple, orange, book&hellip;" />
        
        <SearchButton
          data-cy="search-button"
          value="Buscar"
          disabled={isSearching}
          onClick={searchWords} />
      </SearchPanel>

      {isSearching && <ClimbingBoxLoader {...loaderSizeProps} />}

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
    </HomeContainer>
  );
}

export default Home
