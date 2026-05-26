import { Outlet } from "react-router";
import { FloatingContactPrompt } from "./components/FloatingContactPrompt";
import { useLenis } from "./hooks/useLenis";

export function Root() {
  useLenis();

  return (
    <div className="bg-[#1A1A1A] min-h-screen text-white font-['Lexend'] selection:bg-[#2E353C] selection:text-white">
      <Outlet />
      <FloatingContactPrompt />
    </div>
  );
}
