"use client";

import { BookOpen, Award, TrendingUp, Heart } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { EmptyState } from "@/components/shared/EmptyState";

const STAT_CARDS = [
  { label: "Enrolled courses", value: 0, icon: BookOpen },
  { label: "Certificates earned", value: 0, icon: Award },
  { label: "Avg. progress", value: "0%", icon: TrendingUp },
  { label: "Wishlist items", value: 0, icon: Heart },
];

export default function DashboardPage() {
  const { profile } = useAuth();

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome back${profile?.name ? `, ${profile.name.split(" ")[0]}` : ""}`}
        description="Here's what's happening with your learning."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STAT_CARDS.map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent activity</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            title="No activity yet"
            description="Once you enroll in a course, your recent activity will show up here."
          />
        </CardContent>
      </Card>
    </div>
  );
}
