"use client";

import { useState } from "react";
import SearchBar from "@/components/search-bar";
import MovieCard from "@/components/movie-card";
import FavoritesModal from "@/components/favorites-modal";
import LoadingSpinner from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import { Heart, Film } from "lucide-react";

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
  Plot?: string;
  imdbRating?: string;
  Genre?: string;
  Director?: string;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    setMovies([]);

    try {
      // First, use AI to understand the natural language query
      const aiResponse = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!aiResponse.ok) {
        throw new Error("Failed to process query");
      }

      const { searchTerms } = await aiResponse.json();

      // Then fetch movies using the processed search terms
      const moviesResponse = await fetch("/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchTerms }),
      });

      if (!moviesResponse.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await moviesResponse.json();
      setMovies(data.movies || []);

      if (!data.movies || data.movies.length === 0) {
        setError("No movies found. Try a different search!");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Film className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Movie Search AI
            </h1>
          </div>
          <Button
            onClick={() => setShowFavorites(true)}
            variant="outline"
            className="gap-2"
          >
            <Heart className="w-5 h-5" />
            Favorites
          </Button>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <SearchBar onSearch={handleSearch} loading={loading} />
          <p className="text-sm text-muted-foreground mt-3 text-center">
            Try: "Show me action movies from the 90s" or "I want a comedy about friendship"
          </p>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner />
          </div>
        )}

        {error && (
          <div className="text-center py-10">
            <p className="text-destructive text-lg">{error}</p>
          </div>
        )}

        {!loading && movies.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        )}

        <FavoritesModal open={showFavorites} onOpenChange={setShowFavorites} />
      </div>
    </main>
  );
}