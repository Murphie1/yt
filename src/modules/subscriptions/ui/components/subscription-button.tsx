import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

interface SubscriptionButtonProps {
  onClick: ButtonProps["onClick"];
  disabled: boolean;
  isSubscribed: boolean;
  className?: string;
  size?: ButtonProps["size"];
}

export const SubscriptionButton = ({
  disabled,
  isSubscribed,
  onClick,
  className,
  size,
}: SubscriptionButtonProps) => {
  return (
    <Button
      variant={isSubscribed ? "secondary" : "default"}
      size={size}
      disabled={disabled}
      onClick={onClick}
      className={cn("rounded-full", className)}
    >
      {isSubscribed ? "Unsubscribe" : "Subscribe"}
    </Button>
  );
};
