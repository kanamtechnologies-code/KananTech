import { convertToModelMessages, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { conciergeSystemPrompt } from "@/lib/chat/prompt";
import { siteMap } from "@/lib/chat/siteMap";

export async function POST(req: Request) {
  const body = await req.json();
  const messages = body?.messages ?? [];

  const uiMessages = (Array.isArray(messages) ? messages : []) as any[];
  const lastUserText =
    [...uiMessages]
      .reverse()
      .find((m) => m?.role === "user")
      ?.parts?.filter((p: any) => p?.type === "text")
      ?.map((p: any) => p.text)
      ?.join("") ?? "";

  // Offline demo mode: keep the concierge usable before an API key is configured.
  // Returns a simple text stream response compatible with TextStreamChatTransport.
  if (!process.env.OPENAI_API_KEY) {
    const reply = offlineConciergeReply(lastUserText);
    return new Response(reply, {
      status: 200,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  // `@ai-sdk/react` sends UIMessage objects. Convert them to model messages for `streamText`.
  const modelMessages = await convertToModelMessages(uiMessages.map(({ id, ...rest }: any) => rest));

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: conciergeSystemPrompt,
    messages: modelMessages,
  });

  return result.toTextStreamResponse();
}

function routeLabel(href: string) {
  const r = siteMap.routes.find((x) => x.href === href);
  return r?.label ?? href;
}

function offlineConciergeReply(textRaw: string): string {
  const text = (textRaw || "").toLowerCase();

  // Lead capture hint (UI handles collection; we just respond helpfully when user supplies it)
  if (text.includes("lead info:") || (text.includes("name:") && text.includes("email:") && text.includes("need:"))) {
    return [
      "Thanks — I saved that context in this chat.",
      "",
      "Next steps:",
      `- Book a 15‑min call / contact: /contact`,
      "",
      "Note: AI assistant is in offline demo mode until an API key is configured.",
    ].join("\n");
  }

  if (text.includes("book") || text.includes("call") || text.includes("schedule")) {
    return [
      "To book a call, head to Contact. If Calendly is configured, it will appear there.",
      "",
      `- ${routeLabel("/contact")}: /contact`,
      "",
      "If you share your goal (and timeline), I can point you to the right service or lesson next.",
      "",
      "Note: AI assistant is in offline demo mode until an API key is configured.",
    ].join("\n");
  }

  if (text.includes("corporate") || text.includes("team") || text.includes("training")) {
    return [
      "For corporate learning, the best starting point is the Corporate Learning page. If you want, tell me the audience (roles) and the outcome you want (reporting, automation, IT support).",
      "",
      `- ${routeLabel("/learning/corporate")}: /learning/corporate`,
      `- ${routeLabel("/contact")}: /contact`,
      "",
      "Note: AI assistant is in offline demo mode until an API key is configured.",
    ].join("\n");
  }

  if (text.includes("try a free lesson") || text.includes("free lesson") || text.includes("lab")) {
    return [
      "Start in the Learning Lab. Pick a track, then jump into a preview lesson.",
      "",
      `- ${routeLabel("/lab")}: /lab`,
      `- Try Coding: /lab/python-ai`,
      `- Try Data: /lab/excel-powerbi`,
      `- Try IT (A+): /lab/comptia-a`,
      "",
      "Note: AI assistant is in offline demo mode until an API key is configured.",
    ].join("\n");
  }

  const wantsTrackHelp =
    text.includes("pick a learning track") ||
    text.includes("learning track") ||
    text.includes("which track") ||
    text.includes("recommend") ||
    text.includes("path");

  if (wantsTrackHelp) {
    const isAPlus = text.includes("a+") || text.includes("comptia") || text.includes("it support") || text.includes("help desk");
    const isData = text.includes("excel") || text.includes("power bi") || text.includes("report") || text.includes("dashboard");
    const isCoding = text.includes("python") || text.includes("ai") || text.includes("coding") || text.includes("developer");

    if (isAPlus && !isData && !isCoding) {
      return [
        "Recommendation: **CompTIA A+ path** (IT Track). Great if you want core support fundamentals and cert‑style practice.",
        "",
        `- Try the preview: /lab/comptia-a`,
        `- Learning options: /learning/personal`,
        "",
        "Note: AI assistant is in offline demo mode until an API key is configured.",
      ].join("\n");
    }

    if (isData && !isAPlus && !isCoding) {
      return [
        "Recommendation: **Excel + Power BI path** (Data Track). Best if your goal is cleaner reporting and dashboards.",
        "",
        `- Try the preview: /lab/excel-powerbi`,
        `- Learning options: /learning/personal`,
        "",
        "Note: AI assistant is in offline demo mode until an API key is configured.",
      ].join("\n");
    }

    if (isCoding && !isAPlus && !isData) {
      return [
        "Recommendation: **Python + AI path** (Coding Track). Best if you want practical coding plus responsible AI tool usage.",
        "",
        `- Try the preview: /lab/python-ai`,
        `- Learning options: /learning/personal`,
        "",
        "Note: AI assistant is in offline demo mode until an API key is configured.",
      ].join("\n");
    }

    return [
      "If you tell me your goal, I’ll recommend one track:",
      "- Python + AI (build + automate)",
      "- Excel + Power BI (reporting + dashboards)",
      "- CompTIA A+ (IT support fundamentals)",
      "",
      "Quick starts:",
      `- /lab/python-ai`,
      `- /lab/excel-powerbi`,
      `- /lab/comptia-a`,
      "",
      "Note: AI assistant is in offline demo mode until an API key is configured.",
    ].join("\n");
  }

  if (text.includes("consulting") || text.includes("tech support") || text.includes("automation") || text.includes("website")) {
    return [
      "We help with tech consulting and support: websites, lightweight automation, dashboards/reporting, and practical guidance (Google Workspace / Microsoft 365).",
      "",
      `- ${routeLabel("/consulting")}: /consulting`,
      `- ${routeLabel("/work")}: /work`,
      `- ${routeLabel("/contact")}: /contact`,
      "",
      "Note: AI assistant is in offline demo mode until an API key is configured.",
    ].join("\n");
  }

  // Default
  return [
    "I can help you navigate and choose next steps. What are you trying to do?",
    "",
    "Common paths:",
    `- ${routeLabel("/consulting")}: /consulting`,
    `- ${routeLabel("/learning")}: /learning`,
    `- ${routeLabel("/lab")}: /lab`,
    `- ${routeLabel("/contact")}: /contact`,
    "",
    "Note: AI assistant is in offline demo mode until an API key is configured.",
  ].join("\n");
}

