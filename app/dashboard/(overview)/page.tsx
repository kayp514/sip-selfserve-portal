import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Phone, ShoppingCart, TrendingUp } from "lucide-react";

export default function DashboardOverView() {
  const stats = [
    {
      title: "Total Subscribers",
      value: 0,
      icon: Users,
      description: "Active subscribers in your account",
    },
    {
      title: "Purchased Numbers",
      value: 0,
      icon: Phone,
      description: "Phone numbers you own",
    },
    {
      title: "Assigned Numbers",
      value: 0,
      icon: ShoppingCart,
      description: "Numbers assigned to subscribers",
    },
    {
      title: "Available to Assign",
      value: 0,
      icon: TrendingUp,
      description: "Unassigned numbers ready for use",
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <p className="text-muted-foreground mt-2">
          an overview of your VoIP services
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
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
              <Users className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold">Manage Subscribers</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Add or edit subscriber information
              </p>
            </a>
            <a
              href="/dashboard/numbers"
              className="p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer"
            >
              <ShoppingCart className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold">Browse Numbers</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Find and purchase new phone numbers
              </p>
            </a>
            <a
              href="/dashboard/purchased"
              className="p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer"
            >
              <Phone className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold">Assign Numbers</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Connect numbers to your subscribers
              </p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
