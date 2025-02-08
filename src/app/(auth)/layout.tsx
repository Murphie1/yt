interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      {children}
    </div>
  );
};

export default Layout;
