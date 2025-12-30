import { DashboardNavigationMenu } from "@/components/dashboard-navigation-menu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNavigationMenu />
      <main className="flex-1 overflow-auto">
        <div className="container max-w-[95%] sm:max-w-[90%] md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto py-3.5 px-2.5 my-3.5 sm:px-6 md:px-8 lg:px-10">
          <div className="space-y-6">{children}</div>
        </div>
      </main>
    </div>
  );
}
