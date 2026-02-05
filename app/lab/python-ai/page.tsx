import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import TrackPreviewPage from "@/components/lab/TrackPreviewPage";

export const metadata = {
  title: "Kanam Learning Lab — Python + AI Preview",
  description: "Try a free preview lesson and mini quiz for the Python + AI learning path.",
};

export default function LabPythonAiPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <TrackPreviewPage
        title="Python + AI Path (Preview)"
        subtitle="A fast, structured intro to Python foundations plus responsible AI tool usage for real work."
        objectives={[
          "Understand variables, types, and basic input/output",
          "Use simple control flow patterns to validate data",
          "Learn how to prompt clearly and verify AI outputs",
        ]}
        estimatedMinutes={15}
        startHref="/lab/coding/python-basics-variables"
        quizQuestions={[
          {
            id: "q1",
            prompt: "In Python, what does input() return?",
            options: [
              { id: "a", label: "A number" },
              { id: "b", label: "A string" },
              { id: "c", label: "A boolean" },
              { id: "d", label: "A list" },
            ],
            correctOptionId: "b",
            explanation: "input() returns a string; convert to int/float when you need math.",
          },
          {
            id: "q2",
            prompt: "What’s a good default stance toward AI-generated code?",
            options: [
              { id: "a", label: "Ship it if it looks right" },
              { id: "b", label: "Use it as a draft; verify and test" },
              { id: "c", label: "Never use AI for technical work" },
              { id: "d", label: "Skip review to move faster" },
            ],
            correctOptionId: "b",
            explanation: "Treat AI output as a draft and verify assumptions, edge cases, and behavior.",
          },
          {
            id: "q3",
            prompt: "Which prompt is most likely to produce reliable output?",
            options: [
              { id: "a", label: "Make something professional" },
              { id: "b", label: "Help me" },
              { id: "c", label: "Write a quick app" },
              {
                id: "d",
                label:
                  "Given a Next.js App Router site, generate a contact form component with accessible labels, validation, and a light emerald theme. Return only the TSX.",
              },
            ],
            correctOptionId: "d",
            explanation: "Specific context + constraints typically yields more reliable output.",
          },
        ]}
        recommended={{
          primaryLabel: "Continue in Lab",
          primaryHref: "/lab/coding/python-basics-variables",
          secondaryLabel: "See Learning tracks",
          secondaryHref: "/learning/personal",
        }}
      />
      <Contact />
      <Footer />
    </main>
  );
}

