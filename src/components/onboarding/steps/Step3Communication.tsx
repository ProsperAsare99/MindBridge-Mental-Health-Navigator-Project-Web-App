"use client";

import { motion } from "framer-motion";
import { MessageSquare, Bell, Clock, Languages } from "lucide-react";

const languages = ["English", "Twi", "Ga", "Ewe", "Other"];
const notifications = [
  "Daily gentle reminders",
  "Only when I need support",
  "Weekly check-ins",
  "No notifications"
];
const times = [
  "Morning (6am - 10am)",
  "Afternoon (12pm - 4pm)",
  "Evening (5pm - 9pm)",
  "Night (9pm - 11pm)"
];

export default function Step3Communication({ data, update, onNext }: any) {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Communication</h2>
        <p className="text-muted-foreground italic">How would you like to interact with us?</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
            <Languages className="h-4 w-4 text-emerald-500" />
            Preferred Language
          </label>
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => update({ preferredLanguage: lang })}
                className={`rounded-xl border px-4 py-2 text-xs font-medium transition-all ${
                  data.preferredLanguage === lang 
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-700" 
                    : "border-border/50 bg-background/50 hover:border-emerald-500/30 text-muted-foreground"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground">Why we ask: We'll communicate in your comfortable language</p>
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
            <Bell className="h-4 w-4 text-emerald-500" />
            Notification Preferences
          </label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {notifications.map((notif) => (
              <button
                key={notif}
                onClick={() => update({ notificationPreference: notif })}
                className={`rounded-2xl border p-4 text-left text-xs font-medium transition-all ${
                  data.notificationPreference === notif 
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 shadow-sm" 
                    : "border-border/50 bg-background/50 hover:border-emerald-500/30 text-muted-foreground"
                }`}
              >
                {notif}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
            <Clock className="h-4 w-4 text-emerald-500" />
            Best time for reminders
          </label>
          <div className="grid grid-cols-2 gap-2">
            {times.map((time) => (
              <button
                key={time}
                onClick={() => update({ checkInTime: time })}
                className={`rounded-xl border p-4 text-center text-xs font-medium transition-all ${
                  data.checkInTime === time 
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-700" 
                    : "border-border/50 bg-background/50 hover:border-emerald-500/30 text-muted-foreground"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
