export type ShortenDTO = {
  id: string;
  url: string;
};

export type ShortenResponseDTO = {
  id: string;
  url: string;
  shortUrl: string;
};

export type RedirectDTO = {
  id: string;
  url: string;
};

export type RedirectResponseDTO = {
  id: string;
  url: string;
  originalUrl: string;
};

export type AnalyticMessage = {
  id: string;
  type: 'MAP' | 'REDIRECT';
  url: string;
  shortUrl: string;
};
