import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageWrapper } from "@/components/page-layout";

export default function DashboardOverview() {
  const stats = [
    {
      title: "Total Subscribers",
      value: 0,
      description: "Active subscribers in your account",
    },
    {
      title: "Purchased Numbers",
      value: 0,
      description: "Phone numbers you own",
    },
    {
      title: "Assigned Numbers",
      value: 0,
      description: "Numbers assigned to subscribers",
    },
    {
      title: "Available to Assign",
      value: 0,
      description: "Unassigned numbers ready for use",
    },
  ];

  return (
    <PageWrapper>
      <div>
        <h1 className="text-2xl font-bold tracking-tight dark:text-white">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          an overview of your VoIP services
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1 text-pretty">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks to manage your VoIP services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <a
              href="/dashboard/subscribers"
              className="p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer"
            >
              <h3 className="font-semibold">Manage Subscribers</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Add or edit subscriber information
              </p>
            </a>
            <a
              href="/dashboard/numbers"
              className="p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer"
            >
              <h3 className="font-semibold">Browse Numbers</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Find and purchase new phone numbers
              </p>
            </a>
            <a
              href="/dashboard/purchased"
              className="p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer"
            >
              <h3 className="font-semibold">Assign Numbers</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Connect numbers to your subscribers
              </p>
            </a>
          </div>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
