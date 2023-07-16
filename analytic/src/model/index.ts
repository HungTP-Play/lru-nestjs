export type AnalyticMessage = {
  id: string;
  type: 'MAP' | 'REDIRECT';
  url: string;
  shortUrl: string;
};
