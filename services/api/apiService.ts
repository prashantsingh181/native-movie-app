import { TMDB_CONFIG } from "./config";
import { API_ENDPOINTS } from "./endPoints";

class ApiService {
  private readonly baseUrl: string;
  private readonly headers: Record<string, string>;

  constructor(config: { baseUrl: string; headers: Record<string, string> }) {
    this.baseUrl = config.baseUrl;
    this.headers = config.headers;
  }

  public async fetchMovies({ query }: { query?: string } = {}): Promise<
    Movie[]
  > {
    try {
      const endpoint = query
        ? `${API_ENDPOINTS.SEARCH_MOVIES}?query=${encodeURIComponent(query)}`
        : `${API_ENDPOINTS.FETCH_MOVIES}?sort_by=popularity.desc`;
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: this.headers,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error fetching movies", error);
      throw error;
    }
  }

  public async fetchMovieDetails(movieId: string): Promise<MovieDetails> {
    try {
      const response = await fetch(
        `${this.baseUrl}/movie/${movieId}?api_key=${TMDB_CONFIG.apiKey}`,
        {
          method: "GET",
          headers: this.headers,
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching details for movie ID ${movieId}`, error);
      throw error;
    }
  }
}

const apiService = new ApiService(TMDB_CONFIG);

export default apiService;
