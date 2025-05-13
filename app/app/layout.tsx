import { Sidebar } from "./_components/sidebar";
import { Topbar } from "./_components/topbar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="
      w-full 
      h-full 
      min-h-screen 
      max-h-screen 
      flex

    ">
      <Sidebar />
      <div className="w-full h-full min-h-screen max-h-screen flex flex-col items-center gap-10 py-10">
        <Topbar />
        {children}
      </div>
    </div>
  )
}