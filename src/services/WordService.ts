import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getWords, Word, WordNotFound } from '../models/Word';

const sanitize = (term: string): string => (
  term
    .trim()
    .toLowerCase()
);

export class WordService {
  private _http: AxiosInstance;

  constructor() {
    this._http = axios.create({ baseURL: process.env.REACT_APP_API_URL });
  }

  async findWords(term: string): Promise<Word[] | WordNotFound> {
    term = sanitize(term);
    
    const url = `/${term}`;
    const config: AxiosRequestConfig = { validateStatus: (status) => status < 500 };
    const response = await this._http.get(url, config);
    const result = getWords(response.data);
    return result;
  }
}