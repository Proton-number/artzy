"use client";

import { Button } from "@/components/ui/button";
import { appStore } from "@/Store/appStore";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Art() {
  const {
    artworks,
    fetchArtworks,
    moreArtworks,
    page,
    isLoading,
    setIsLoading,
    isLoadingMore,
    setIsLoadingMore,
  } = appStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchArtworks();
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [fetchArtworks]);

  const loadMoreArt = async () => {
    if (moreArtworks && !isLoading) {
      setIsLoadingMore(true);
      try {
        await fetchArtworks(page + 1);
      } catch (error) {
        console.error("Error loading more movies:", error);
      } finally {
        setIsLoadingMore(false);
      }
    }
  };

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (!artworks || artworks.length === 0) {
    return <div>No artworks found.</div>;
  }

  return (
    <div className="mt-10">
      <div>
        {artworks?.map((artwork) => (
          <Card key={artwork.id}>
            <CardHeader>
              <CardTitle>{artwork.artist_title}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
      <Button onClick={loadMoreArt}>
        {" "}
        {isLoadingMore ? "Loading..." : "Load More"}
      </Button>
    </div>
  );
}

export default Art;
