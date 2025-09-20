import RequireAuth from "@/components/RequireAuth";
import { ReactNode } from "react";

type HomeLayoutProps = {
  children: ReactNode;
};
export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <RequireAuth>
      <div className="min-h-screen flex items-center justify-center">
        {children}
      </div>
    </RequireAuth>
  );
}
