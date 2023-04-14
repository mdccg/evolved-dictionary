import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Word } from './../../models/Word';
import { AudioPlayer, BackButton, DetailsContainer, DetailsList, DetailsMetadata, DetailsPanel, DetailsPanelTitle, DetailsTitle } from './styles';

type Location = {
  state: {
    word: Word;
  }
}

const Details = () => {
  const location: Location = useLocation();
  const [word] = useState<Word>(location.state.word);
  const navigate = useNavigate();

  return (
    <DetailsContainer>
      <DetailsTitle data-cy="details-title">Significados de {word.term}</DetailsTitle>

      {word.meanings.length > 0 && (
        <DetailsPanel data-cy="meanings-panel">
          <DetailsPanelTitle>Significados</DetailsPanelTitle>
          <DetailsList data-cy="details-list">
            {word.meanings.map((meaning, index) => (
              <DetailsMetadata key={index}>{meaning}</DetailsMetadata>
            ))}
          </DetailsList>
        </DetailsPanel>
      )}

      {word.audioUrls.length > 0 && (
        <DetailsPanel data-cy="audios-panel">
          <DetailsPanelTitle>Áudios de pronúncia</DetailsPanelTitle>
          {word.audioUrls.map((audioUrl, index) => (
            <AudioPlayer key={index} controls data-cy="audio-player">
              <source src={audioUrl}></source>
            </AudioPlayer>
          ))}
        </DetailsPanel>
      )}

      <BackButton data-cy="back-button" onClick={() => navigate('/')}>Voltar</BackButton>
    </DetailsContainer>
  );
}

export default Details;
