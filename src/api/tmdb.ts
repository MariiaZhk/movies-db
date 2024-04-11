import config from "../config";

const apiBasePath = `${config.apiUrl}/3`;

async function get<TBody>(relativeUrl: string): Promise<TBody> {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${config.apiToken}`,
    },
  };
  const response = await fetch(`${apiBasePath}${relativeUrl}`, options);
  const value: TBody = await response.json();
  return value;
}

export interface MovieDetails {
  id: number;
  title: string;
  popularity: number;
  overview: string;
  release_date: string;
  backdrop_path?: string | null;
}
interface PageResponse<TResult> {
  page: number;
  results: TResult[];
  total_pages: number;
  total_results: number;
}
interface PageDetails<TResult> {
  page: number;
  results: TResult[];
  totalPages: number;
}

interface Config {
  images: {
    base_url: string;
  };
}

export interface KeywordItem {
  id: number;
  name: string;
}

export interface MoviesFilters {
  keywords?: number[];
}

export const client = {
  async getConfig() {
    const response = await get<Config>("/configuration");
    return response;
  },

  async getNowPlaying(page: number = 1): Promise<PageDetails<MovieDetails>> {
    const response = await get<PageResponse<MovieDetails>>(
      `/movie/now_playing?page=${page}`
    );
    return {
      results: response.results,
      page: response.page,
      totalPages: response.total_pages,
    };
  },

  async getKeywords(query: string) {
    const response = await get<PageResponse<KeywordItem>>(
      `/search/keyword?query=${query}`
    );
    return response.results;
  },

  async getMovies(page: number, filters: MoviesFilters) {
    const params = new URLSearchParams({
      page: page.toString(),
    });

    if (filters.keywords?.length) {
      params.append("with_keywords", filters.keywords.join("|"));
    }
    const query = params.toString();
    const response = await get<PageResponse<MovieDetails>>(
      `/discover/movie?${query}`
    );
    return {
      results: response.results,
      page: response.page,
      totalPages: response.total_pages,
    };
  },
};

