import { create } from "zustand";

interface Artwork {
  id: string;
  title: string;
  imageUrl: string;
  place_of_origin: string;
  artist_title: string;
}

interface AppStore {
  search: string;
  setSearch: (val: string) => void;
  fetchArtworks: (page?: number) => Promise<void>;
  artworks: Array<Artwork>;
  moreArtworks: boolean;
  page: number;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
  isLoadingMore: boolean;
  setIsLoadingMore: (val: boolean) => void;
}
export const appStore = create<AppStore>((set) => ({
  search: "",
  artworks: [],
  setSearch: (val: string) => set(() => ({ search: val })),
  moreArtworks: true,
  page: 1,
  isLoading: false,
  setIsLoading: (val: boolean) => set(() => ({ isLoading: val })),
  isLoadingMore: false,
  setIsLoadingMore: (val: boolean) => set(() => ({ isLoadingMore: val })),

  //   Fetching the arts
  fetchArtworks: async (page = 1) => {
    try {
      console.log("Fetching arts...");
      const response = await fetch(
        `https://api.artic.edu/api/v1/artworks?page=${page}&limit=20`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      // Transform API response
      const artworks: Array<Artwork> = json.data.map((art: any) => ({
        id: art.id,
        title: art.title,
        artist_title: art.artist_title || "Unknown Artist",
        place_of_origin: art.place_of_origin || "Unknown Origin",
      }));
      // Determine if more pages are available
      const moreArtworks =
        json.pagination.current_page < json.pagination.total_pages;

      set((state) => ({
        artworks: page === 1 ? artworks : [...state.artworks, ...artworks],
        moreArtworks,
        page,
      }));
    } catch (error) {
      console.error("Failed to fetch artworks:", error);
    }
  },
}));
