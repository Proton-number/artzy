"use client";

import { appStore } from "@/Store/appStore";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const ArtDetails = () => {
  const { artId } = useParams();
  const { artDetails, setArtDetails } = appStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtDetails = async () => {
      try {
        const response = await fetch(
          `https://api.artic.edu/api/v1/artworks/${artId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setArtDetails(data.data); // Set the art details in the store
        setLoading(false);
      } catch (error) {
        console.error("Error fetching art details:", error);
        setLoading(false);
      }
    };
    fetchArtDetails();
  }, [artId]);

  if (loading) {
    return (
      <div className="animate-pulse text-3xl flex items-center space-y-4 justify-center min-h-screen">
        <div className="loading">
          <div className="d1"></div>
          <div className="d2"></div>
        </div>
      </div>
    );
  }

  if (!artDetails) {
    return <div className="text-xl">Artwork not found.</div>;
  }

  const imageUrl = artDetails.image_id
    ? `https://www.artic.edu/iiif/2/${artDetails.image_id}/full/843,/0/default.jpg`
    : "/placeholder.jpg";

  return (
    <>
      <title>{artDetails?.title}</title>
      <meta name="description" content={artDetails?.artist_display} />
      <div className="max-w-4xl mx-auto p-6 pt-20 space-y-6 ">
        <div className="relative w-full h-[600px] rounded-xl overflow-hidden shadow-lg bg-white">
          <Image
            src={imageUrl}
            alt={artDetails.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
            priority
          />
        </div>
        <Card className=" shadow-lg">
          <CardHeader className="space-y-2">
            <div>
              <CardTitle className="text-3xl font-bold">
                {artDetails.title}
              </CardTitle>
              <p className="text-lg text-foreground mt-1 opacity-75">
                {" "}
                {artDetails.artist_title}, {artDetails.date_display}
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 bg-foreground text-primary-foreground  p-6 rounded-lg">
              <div>
                <h2 className="text-sm opacity-75">Medium</h2>
                <p className="font-medium ">{artDetails.medium_display}</p>
              </div>
              <div>
                <p className="text-sm opacity-75">Dimensions</p>
                <p className="font-medium">{artDetails.dimensions}</p>
              </div>
              <div>
                <p className="text-sm opacity-75">Location</p>
                <p className="font-medium">{artDetails.place_of_origin}</p>
              </div>
              <div>
                <p className="text-sm opacity-75">Created</p>
                <p className="font-medium flex items-center gap-1">
                  {artDetails.date_display}
                </p>
              </div>
            </div>
            <CardDescription>
              <h2 className="text-lg font-semibold">Description</h2>
              <p className="text-muted-foreground">
                {artDetails.description?.replace(/<\/?[^>]+(>|$)/g, "") ||
                  "No description available."}
              </p>
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ArtDetails;
