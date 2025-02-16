"use client";
import { ResponsiveModal } from "@/components/responsive-modal";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { Loader2, Loader2Icon, PlusIcon } from "lucide-react";
import { toast } from "sonner";
import { StudioUploader } from "./studio-uploader";

export const StudioUploadModal = () => {
  const utils = trpc.useUtils();
  const create = trpc.videos.create.useMutation({
    onSuccess: () => {
      utils.studio.getMany.invalidate();
      toast.success("Video created");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
  return (
    <>
      <ResponsiveModal
        title="Upload video"
        open={!!create.data?.url}
        onOpenChange={() => create.reset()}
      >
        {create.data?.url ? (
          <StudioUploader endpoint={create.data?.url} onSuccess={() => {}} />
        ) : (
          <Loader2Icon />
        )}
      </ResponsiveModal>

      <Button
        variant={"secondary"}
        onClick={() => create.mutate()}
        disabled={create.isPending}
      >
        {create.isPending ? <Loader2 className="animate-spin" /> : <PlusIcon />}
        Create
      </Button>
    </>
  );
};
