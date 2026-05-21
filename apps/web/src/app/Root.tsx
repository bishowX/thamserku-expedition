import { Outlet } from "react-router";
import { FloatingContactPrompt } from "./components/FloatingContactPrompt";

export function Root() {
  return (
    <div className="bg-[#1A1A1A] min-h-screen text-white font-['Lexend'] selection:bg-[#0A3A77] selection:text-white">
      <Outlet />
      <FloatingContactPrompt />
    </div>
  );
}
