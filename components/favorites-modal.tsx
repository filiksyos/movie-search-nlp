"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MovieCard from "@/components/movie-card";
import type { Movie } from "@/app/page";

interface FavoritesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FavoritesModal({ open, onOpenChange }: FavoritesModalProps) {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    if (open) {
      const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
      setFavorites(stored);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Your Favorite Movies</DialogTitle>
        </DialogHeader>
        
        {favorites.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            <p>No favorites yet. Start adding movies you love!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {favorites.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}