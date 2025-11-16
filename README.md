# 🎬 Movie Search AI

An AI-powered movie search application that understands natural language queries and returns movie results with direct IMDb links.

![Next.js](https://img.shields.io/badge/Next.js-14.1.3-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.0-38bdf8)

## ✨ Features

- 🤖 **Natural Language Search** - Type queries like "Show me action movies from the 90s" or "I want a comedy about friendship"
- 🎯 **AI-Powered Understanding** - OpenRouter AI processes your queries to understand intent
- 🎥 **Movie Results with IMDb Links** - Get detailed movie info with direct links to IMDb pages
- 💾 **Save Favorites** - Bookmark movies you like with localStorage persistence
- 🎨 **Modern UI** - Beautiful Shadcn/UI components with dark mode support
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenRouter API key ([Get one here](https://openrouter.ai/keys))
- OMDb API key ([Get one here](https://www.omdbapi.com/apikey.aspx))

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/filiksyos/movie-search-nlp.git
cd movie-search-nlp
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API keys:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
OMDB_API_KEY=your_omdb_api_key_here
```

4. **Run the development server**

```bash
npm run dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Framework:** Next.js 14.1.3 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Shadcn/UI
- **AI:** OpenRouter API (Meta Llama 3.2)
- **Movie Data:** OMDb API
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod
- **Theme:** next-themes (dark mode support)

## 📁 Project Structure

```
movie-search-nlp/
├── app/
│   ├── api/
│   │   ├── search/route.ts    # OpenRouter AI integration
│   │   └── movies/route.ts    # OMDb API integration
│   ├── layout.tsx             # Root layout with theme provider
│   └── page.tsx               # Main search page
├── components/
│   ├── ui/                    # Shadcn/UI components
│   ├── search-bar.tsx         # Search input component
│   ├── movie-card.tsx         # Movie result card
│   ├── favorites-modal.tsx    # Favorites dialog
│   └── loading-spinner.tsx    # Loading animation
├── lib/
│   └── utils.ts               # Utility functions
└── styles/
    └── globals.css            # Global styles
```

## 🎯 How It Works

1. **User Input:** Type a natural language query (e.g., "scary movies from the 80s")
2. **AI Processing:** OpenRouter AI converts your query into optimized search terms
3. **Movie Search:** The app fetches movies from OMDb API using the processed terms
4. **Display Results:** Movies are displayed with posters, ratings, and IMDb links
5. **Save Favorites:** Click the heart icon to save movies to your favorites

## 🌟 Example Queries

- "Show me action movies from the 90s"
- "I want a comedy about friendship"
- "Sci-fi movies with time travel"
- "Best horror films ever made"
- "Movies starring Tom Hanks"

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENROUTER_API_KEY` | Your OpenRouter API key for AI processing | Yes |
| `OMDB_API_KEY` | Your OMDb API key for movie data | Yes |

## 🔧 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🎨 Customization

This project uses Shadcn/UI components which are highly customizable. To modify the theme:

1. Edit `tailwind.config.ts` to change colors
2. Modify `styles/globals.css` for CSS variables
3. Components are in `components/ui/` for easy customization

## 📄 License

MIT License - feel free to use this project for learning or production!

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 🙏 Acknowledgments

- Built with inspiration from [Weeblo](https://github.com/mzeeshan2005/Weeblo) for OpenRouter integration patterns
- UI components from [Shadcn/UI](https://ui.shadcn.com/)
- Movie data from [OMDb API](https://www.omdbapi.com/)
- AI powered by [OpenRouter](https://openrouter.ai/)

---

**Made with ❤️ using Next.js and AI**