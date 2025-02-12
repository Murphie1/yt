"use client";
import { trpc } from "@/trpc/client";
import { VideosSection } from "../sections/videos-section";
import { DEFAULT_LIMIT } from "@/constants";

export const StudioView = () => {
  const [data] = trpc.studio.getMany.useSuspenseInfiniteQuery(
    { limit: DEFAULT_LIMIT },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );
  return (
    <div>
      {JSON.stringify(data)}
      <VideosSection />
    </div>
  );
};
