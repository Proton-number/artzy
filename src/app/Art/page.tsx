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
import Image from "next/image";

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
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
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

  const loadMoreArt = async (): Promise<void> => {
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
    return <div className="animate-pulse text-3xl">loading...</div>;
  }

  if (!artworks || artworks.length === 0) {
    return <div>No artworks found.</div>;
  }

  return (
    <>
      <div className="mt-10 p-4">
        <div
          className="grid grid-cols-1 sm:grid-cols-3
   lg:grid-cols-4 gap-6"
        >
          {artworks.map((artwork, index) => {
            const artUrl = artwork.image_id
              ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`
              : "/placeholder.png";
            return (
              <Card key={index}>
                <div className="relative w-full h-96 sm:h-64 lg:h-96">
                  <Image
                    src={artUrl}
                    alt={artwork.title || "Artwork"}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    {artwork.title}
                  </CardTitle>
                  <CardDescription>By {artwork.artist_title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{artwork.place_of_origin}</p>
                  <p></p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      {moreArtworks && (
        <Button onClick={loadMoreArt} className=" flex items-center mt-12 mb-3">
          {" "}
          {isLoadingMore ? "Loading..." : "Load More"}
        </Button>
      )}
    </>
  );
}

export default Art;
