"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading: boolean;
}

export default function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !loading) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          type="text"
          placeholder="Describe the movie you're looking for..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 h-12 text-base"
          disabled={loading}
        />
      </div>
      <Button type="submit" disabled={loading || !query.trim()} size="lg">
        {loading ? "Searching..." : "Search"}
      </Button>
    </form>
  );
}