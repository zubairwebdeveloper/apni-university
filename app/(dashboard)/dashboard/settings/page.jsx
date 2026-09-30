"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import EditProfileForm from "@/components/settings/EditProfileForm";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Account settings"
        description="Manage your profile information."
      />

      <Card>
        <CardHeader>
          <CardTitle>Edit profile</CardTitle>
          <CardDescription>
            Yeh information aapke public profile par nazar aati hai.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EditProfileForm />
        </CardContent>
      </Card>
    </div>
  );
}
