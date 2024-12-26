import { create } from "zustand";

interface Artwork {
  id: string;
  title: string;
  imageUrl: string;
  place_of_origin: string;
  artist_title: string;
  iiif_url: string;
  image_id: string;
  image_url?: string | null;
  artist_display: string;
  medium_display: string;
  date_display: string;
  dimensions: string;
  description: string;
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
  searchedArtworks: () => Promise<void>;
  artDetails: Artwork | null; // Artwork details
  setArtDetails: (val: Artwork) => void;
}
export const appStore = create<AppStore>((set, get) => ({
  search: "",
  artworks: [],
  setSearch: (val: string) => set(() => ({ search: val })),
  moreArtworks: true,
  page: 1,
  isLoading: false,
  setIsLoading: (val: boolean) => set(() => ({ isLoading: val })),
  isLoadingMore: false,
  setIsLoadingMore: (val: boolean) => set(() => ({ isLoadingMore: val })),
  artDetails: null,
  setArtDetails: (val: Artwork) => set(() => ({ artDetails: val })),

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
      const artworks: Array<Artwork> = json.data.map((art: {
        id: string;
        title: string;
        artist_title: string | null;
        place_of_origin: string | null;
        image_id: string | null;
        iiif_url: string | null;
      }) => ({
        id: art.id,
        title: art.title,
        artist_title: art.artist_title || "Unknown Artist",
        place_of_origin: art.place_of_origin || "Unknown Origin",
        image_id: art.image_id || null,
        iiif_url: art.iiif_url || "",
        image_url: art.image_id
          ? `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`
          : null,
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
  //  Searching the arts
  searchedArtworks: async () => {
    try {
      console.log("Searching artworks...");
      const response = await fetch(
        `https://api.artic.edu/api/v1/artworks/search?q=${
          get().search
        }&fields=id,title,image_id,artist_title,place_of_origin,iiif_url`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      const artworkIds = json.data.map((item: { id: string }) => item.id);
      const artworksResponse = await fetch(
        `https://api.artic.edu/api/v1/artworks?ids=${artworkIds.join(
          ","
        )}&fields=id,title,image_id,artist_title,place_of_origin,iiif_url`
      );
      const artworksJson = await artworksResponse.json();

      // Transform API response
      const artworks: Array<Artwork> = artworksJson.data.map((art: {
        id: string;
        title: string;
        artist_title: string | null;
        place_of_origin: string | null;
        image_id: string | null;
        iiif_url: string | null;
      }) => ({
        id: art.id,
        title: art.title,
        artist_title: art.artist_title || "Unknown Artist",
        place_of_origin: art.place_of_origin || "Unknown Origin",
        image_id: art.image_id || null,
        iiif_url: art.iiif_url || "",
        image_url: art.image_id
          ? `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`
          : null,
      }));

      set({
        artworks,
        isLoading: false,
        page: 1, // Reset page when searching
        moreArtworks: false, // Disable infinite scroll during search
      });
    } catch (error) {
      console.error("Failed to fetch artworks:", error);
    }
  },
}));
