import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const OMDB_API_KEY = process.env.OMDB_API_KEY || "demo";

export async function POST(request: NextRequest) {
  try {
    const { searchTerms } = await request.json();

    if (!searchTerms) {
      return NextResponse.json(
        { error: "Search terms are required" },
        { status: 400 }
      );
    }

    // Search for movies using OMDb API
    const searchResponse = await axios.get(
      `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(searchTerms)}&type=movie`
    );

    if (searchResponse.data.Response === "False") {
      return NextResponse.json({ movies: [] });
    }

    const movies = searchResponse.data.Search || [];

    // Fetch detailed info for each movie (limited to first 8 results)
    const detailedMovies = await Promise.all(
      movies.slice(0, 8).map(async (movie: any) => {
        try {
          const detailResponse = await axios.get(
            `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${movie.imdbID}&plot=short`
          );
          return detailResponse.data;
        } catch (error) {
          console.error(`Error fetching details for ${movie.imdbID}:`, error);
          return movie;
        }
      })
    );

    return NextResponse.json({ movies: detailedMovies });
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json(
      { error: "Failed to fetch movies" },
      { status: 500 }
    );
  }
}