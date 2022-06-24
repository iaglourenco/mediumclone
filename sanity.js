import createImageUrlBuilder from "@sanity/image-url";
import { createClient, createCurrentUserHook } from "next-sanity";

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2021-10-21",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  useCdn: process.env.NODE_ENV === "production",
};

export const sanityClient = createClient(config);
export const urlFor = (source) => createImageUrlBuilder(config).image(source);
export const useCurrentUser = createCurrentUserHook(config);
