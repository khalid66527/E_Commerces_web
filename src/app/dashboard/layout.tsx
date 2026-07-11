import DashboardSideBar from "@/components/dashboardcomponents/DashboardSideBar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {


  return (
    <div className="min-h-screen bg-[#06060C] text-gray-300 font-sans flex">
      
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
    
        {/* Dashboard Dynamic Child Content */}
        <DashboardSideBar></DashboardSideBar>
        <main className="">
          {children}
        </main>
      </div>

    </div>
  );
}