import { DashboardNavigationMenu } from "@/components/dashboard-navigation-menu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <DashboardNavigationMenu />
      <main className="flex-1 w-full">
        <div className="max-w-[1600px] mx-auto px-6 py-6">{children}</div>
      </main>
    </div>
  );
}
