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
        Loading...
      </div>
    );
  }

  if (!artDetails) {
    return <div className="text-xl">Artwork not found.</div>;
  }

  return (
    <div className="flex items-center space-y-4 justify-center min-h-screen">
      <Card>
        <CardHeader>
          <CardTitle>{artDetails.artist_display}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{artDetails.medium_display}</CardDescription>
          <h1 className="text-4xl font-bold">{artDetails.title}</h1>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArtDetails;
