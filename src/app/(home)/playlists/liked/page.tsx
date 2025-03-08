import { DEFAULT_LIMIT } from "@/constants";
import { LikedVideosView } from "@/modules/playlists/ui/views/liked-videos-view";
import { HydrateClient, trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";

const Page = async () => {
  void trpc.playlists.getLiked.prefetchInfinite({ limit: DEFAULT_LIMIT });

  return (
    <HydrateClient>
      <LikedVideosView />
    </HydrateClient>
  );
};

export default Page;
