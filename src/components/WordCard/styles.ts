import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const WordCardPanel = styled.div`
  flex-direction: column;
  display: flex;
  width: 600px;
  margin: 20px auto;
  padding: 20px;
  box-shadow: 10px 10px 20px #ddd;
`;

export const WordTitle = styled.h1`
  font-family: 'Lato';
  font-weight: 700;
  font-style: italic;
  margin-bottom: 10px;
`;

export const WordDetailsLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
`;

export const WordDetailsText = styled.span`
  font-family: 'Lato';
  /* TODO arrumar */
  font-size: 20px;
`;