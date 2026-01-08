"use server";

import { getSubscriptionToken, type Realtime } from "@inngest/realtime";
import { anthropicAiChannel } from "@/inngest/channels/anthropic";
import { inngest } from "@/inngest/client";

export type AnthropicAiToken = Realtime.Token<
  typeof anthropicAiChannel,
  ["status"]
>;

export async function fetchOpenAiRealtimeToken(): Promise<AnthropicAiToken> {
  const token = await getSubscriptionToken(inngest, {
    channel: anthropicAiChannel(),
    topics: ["status"],
  });

  return token;
}
