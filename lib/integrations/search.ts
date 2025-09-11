import { Tool } from 'ai';

interface SearchResult {
  title: string;
  snippet: string;
  link: string;
  displayLink: string;
}

export const searchTool: Tool = {
  name: 'web_search',
  description: 'Search the web for current information',
  parameters: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'The search query',
      },
      numResults: {
        type: 'number',
        description: 'Number of results to return',
        default: 5,
      },
    },
    required: ['query'],
  },
  execute: async ({ query, numResults = 5 }) => {
    const apiKey = process.env.SERPAPI_API_KEY;
    if (!apiKey) {
      throw new Error('SERPAPI_API_KEY not configured');
    }

    try {
      const response = await fetch(
        `https://serpapi.com/search.json?q=${encodeURIComponent(
          query
        )}&num=${numResults}&api_key=${apiKey}`
      );

      const data = await response.json();
      
      const results: SearchResult[] = data.organic_results?.map((result: any) => ({
        title: result.title,
        snippet: result.snippet,
        link: result.link,
        displayLink: result.displayed_link,
      })) || [];

      return {
        success: true,
        results,
        query,
        searchedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Search error:', error);
      return {
        success: false,
        error: 'Search failed',
        query,
      };
    }
  },
};
