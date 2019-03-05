export interface Config {
    status: {
      timestamp: string;
      error_code: number;
      error_message: null;
      elapsed: number;
      credit_count: number;
    };
    data: {
      1: {
        urls: {
          website: string[];
          twitter: string[];
          reddit: string[];
          message_board: string[];
          announcement: string[];
          chat: string[];
          explorer: string[];
          source_code: string[];
        };
        logo: string;
        id: number;
        name: string;
        symbol: string;
        slug: string;
        date_added: string;
        tags: string[];
        platform: null;
        category: string;
      };
    };
  }

export interface Metadata {
  urls: {
    website: string[];
    twitter: string[];
    reddit: string[];
    message_board: string[];
    announcement: string[];
    chat: string[];
    explorer: string[];
    source_code: string[];
  };
  logo: string;
  id: number;
  name: string;
  symbol: string;
  slug: string;
  date_added: string;
  tags: string[];
  platform: null;
  category: string;
}

