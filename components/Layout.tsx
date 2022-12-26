import { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-black mx-auto w-5/6 py-20">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
