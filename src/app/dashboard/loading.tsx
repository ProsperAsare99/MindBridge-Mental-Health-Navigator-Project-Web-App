import React from "react";
import { DashboardContainer, DashboardItem } from "@/components/dashboard/dashboard-animations";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen pb-20 px-4 md:px-10 pt-24 md:pt-10 max-w-7xl mx-auto selection:bg-primary/20">
      <DashboardContainer>
        {/* Header Skeleton */}
        <DashboardItem className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4 w-full max-w-md">
            <div className="h-4 w-24 bg-primary/10 rounded-full animate-pulse" />
            <div className="h-12 w-full bg-muted/20 rounded-2xl animate-pulse" />
            <div className="h-4 w-64 bg-muted/10 rounded-full animate-pulse" />
          </div>
          <div className="h-12 w-40 bg-primary/20 rounded-2xl animate-pulse" />
        </DashboardItem>

        {/* Streak & Feedback Skeleton */}
        <DashboardItem className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 h-44 glass rounded-[2rem] animate-pulse" />
          <div className="h-44 glass rounded-[2rem] animate-pulse" />
        </DashboardItem>

        {/* Stats Grid Skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <DashboardItem className="md:col-span-2 h-48 glass rounded-[2rem] animate-pulse" />
          <DashboardItem className="h-48 glass rounded-[2rem] animate-pulse" />
          <DashboardItem className="h-48 glass rounded-[2rem] animate-pulse" />
        </div>

        {/* Recommended & Crisis Skeleton */}
        <DashboardItem className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3 h-40 glass rounded-[2rem] animate-pulse" />
          <div className="md:col-span-2 h-40 bg-red-500/5 glass border-red-500/20 rounded-[2rem] animate-pulse" />
        </DashboardItem>
      </DashboardContainer>
    </div>
  );
}
