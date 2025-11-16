"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Movie } from "@/app/page";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.some((fav: Movie) => fav.imdbID === movie.imdbID));
  }, [movie.imdbID]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    
    if (isFavorite) {
      const updated = favorites.filter((fav: Movie) => fav.imdbID !== movie.imdbID);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      favorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  const imdbUrl = `https://www.imdb.com/title/${movie.imdbID}`;

  return (
    <div className="group relative bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border hover:border-primary/50">
      <div className="relative aspect-[2/3] overflow-hidden bg-muted">
        {movie.Poster && movie.Poster !== "N/A" ? (
          <Image
            src={movie.Poster}
            alt={movie.Title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No Poster
          </div>
        )}
        <Button
          onClick={toggleFavorite}
          size="icon"
          variant="secondary"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart
            className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
          />
        </Button>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 line-clamp-1">{movie.Title}</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span>{movie.Year}</span>
          {movie.imdbRating && movie.imdbRating !== "N/A" && (
            <>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                <span>{movie.imdbRating}</span>
              </div>
            </>
          )}
        </div>
        
        {movie.Genre && movie.Genre !== "N/A" && (
          <p className="text-xs text-muted-foreground mb-2">{movie.Genre}</p>
        )}
        
        {movie.Plot && movie.Plot !== "N/A" && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {movie.Plot}
          </p>
        )}
        
        <Button asChild variant="outline" className="w-full gap-2">
          <a href={imdbUrl} target="_blank" rel="noopener noreferrer">
            View on IMDb
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
      </div>
    </div>
  );
}