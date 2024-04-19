"use server";

import { revalidateTag } from "next/cache";

export default async function revalidate() {
  revalidateTag("todos");
}

// will clear cache in next actions and revalidate the tags and repopulate the todos on page when refreshed.
