import { Word } from './../../models/Word';
import { WordCardPanel, WordDetailsLink, WordDetailsText, WordTitle } from './styles';

type Props = {
  order: number;
  word: Word;
}

const formatAttribute = (amount: number, pluralNoun: string): string => {
  if (amount === 0) {
    return `Nenhum ${pluralNoun.slice(-1)} cadastrado`;
  } else if (amount === 1) {
    return `Um ${pluralNoun} encontrado`;
  } else {
    return `${amount} ${pluralNoun} encontrados`;
  }
}

export const WordCard = ({ order, word }: Props) => {
  const { audioUrls, meanings, term } = word;
  const details = formatAttribute(meanings.length, 'significados') + ' e ' + formatAttribute(audioUrls.length, 'áudios').toLowerCase();
  const wordTitle = `${order} - ${term}`;

  return (
    <WordCardPanel data-cy="word-card-panel">
      <WordTitle data-cy="word-title">{wordTitle}</WordTitle>
      <WordDetailsLink to="/details" state={{ word }}>
        <WordDetailsText>{details}</WordDetailsText>
      </WordDetailsLink>
    </WordCardPanel>
  );
}