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
  const json: TBody = await response.json();
  return json;
}

export interface MovieDetails {
  id: number;
  title: string;
  popularity: number;
  overview: string;
  release_date: string;
  backdrop_path?: string;
}
interface PageResponse<TResult> {
  page: number;
  results: TResult[];
  total_pages: number;
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
export const client = {
  async getConfig() {
    return get<Config>("/configuration");
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
};

