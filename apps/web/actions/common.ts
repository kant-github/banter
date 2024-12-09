"use server";
import { revalidateTag } from "next/cache";

export async function clearCache(tag: string) {
  console.log(`clearing cache for tag ${tag}`);
  revalidateTag(tag);
}
