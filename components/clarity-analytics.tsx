"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

// Microsoft Clarity — session recordings and heatmaps. It sits alongside Vercel
// Analytics rather than replacing it: Vercel answers "how many visitors, from
// where", Clarity answers "what did this visitor actually do on the page".
//
// The project id is not a secret — it ships in the tag URL of every Clarity
// site and is readable in any visitor's page source — so it is a plain default
// with an env override, not something to hide in a server secret.
const CLARITY_PROJECT_ID =   "yf6f5uo7r9";

export function ClarityAnalytics() {
  useEffect(() => {
    // Developer clicks and preview-deploy smoke tests would be filed as real
    // visits and skew every heatmap and funnel read off this data, so only a
    // production deploy reports. `NEXT_PUBLIC_VERCEL_ENV` is absent outside
    // Vercel, so a self-hosted production build still reports normally.
    if (process.env.NODE_ENV !== "production") return;
    const deployment = process.env.NEXT_PUBLIC_VERCEL_ENV;
    if (deployment && deployment !== "production") return;

    // `init` injects the tag once and no-ops when the script element already
    // exists, so a re-mount cannot load Clarity twice.
    Clarity.init(CLARITY_PROJECT_ID);
  }, []);

  return null;
}
