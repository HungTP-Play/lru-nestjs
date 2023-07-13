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
  Id: string;
  Url: string;
};

export type RedirectResponseDTO = {
  Id: string;
  Url: string;
  OriginalUrl: string;
};
