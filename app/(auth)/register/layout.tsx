import { ReactNode } from "react";

type RegisterLayoutProps = {
  children: ReactNode;
};
export default function RegisterLayout({ children }: RegisterLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {children}
    </div>
  );
}
