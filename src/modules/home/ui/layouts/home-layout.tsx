import { SidebarProvider } from "@/components/ui/sidebar";
import { HomeNavBar } from "../components";

interface LayoutProps {
  children: React.ReactNode;
}

export const HomeLayout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="w-full">
        <HomeNavBar />
        <div>{children}</div>
      </div>
    </SidebarProvider>
  );
};
