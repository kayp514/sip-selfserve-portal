import { DashboardNavigationMenu } from "@/components/dashboard-navigation-menu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <DashboardNavigationMenu />
      <main>
        <div>{children}</div>
      </main>
    </div>
  );
}
