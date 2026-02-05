import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import TrackPreviewPage from "@/components/lab/TrackPreviewPage";

export const metadata = {
  title: "Kanam Learning Lab — CompTIA A+ Preview",
  description: "Try a free preview lesson and cert-style mini quiz for the CompTIA A+ learning path.",
};

export default function LabComptiaAPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <TrackPreviewPage
        title="CompTIA A+ Path (Preview)"
        subtitle="Cert-style practice (not official materials) across hardware, troubleshooting, and OS support basics."
        objectives={[
          "Understand CPU/RAM/storage and common ports",
          "Apply a repeatable troubleshooting methodology",
          "Learn core Windows support concepts and tools",
        ]}
        estimatedMinutes={15}
        startHref="/lab/a-plus/aplus-hardware-basics"
        quizQuestions={[
          {
            id: "q1",
            prompt: "Which component is primarily responsible for short-term working memory?",
            options: [
              { id: "a", label: "CPU" },
              { id: "b", label: "RAM" },
              { id: "c", label: "SSD" },
              { id: "d", label: "Power supply" },
            ],
            correctOptionId: "b",
            explanation: "RAM holds data currently in use. Low RAM can cause slowdowns and disk swapping.",
          },
          {
            id: "q2",
            prompt: "After establishing a theory of probable cause, what’s the next best step?",
            options: [
              { id: "a", label: "Replace the motherboard" },
              { id: "b", label: "Test the theory to determine the cause" },
              { id: "c", label: "Document the outcome" },
              { id: "d", label: "Escalate immediately" },
            ],
            correctOptionId: "b",
            explanation: "Test your theory before making large or risky changes.",
          },
          {
            id: "q3",
            prompt: "Which Windows tool helps you view system/application logs for errors?",
            options: [
              { id: "a", label: "Event Viewer" },
              { id: "b", label: "Notepad" },
              { id: "c", label: "Paint" },
              { id: "d", label: "Calculator" },
            ],
            correctOptionId: "a",
            explanation: "Event Viewer shows logs useful for diagnosing drivers, services, and application failures.",
          },
        ]}
        recommended={{
          primaryLabel: "Continue in Lab",
          primaryHref: "/lab/a-plus/aplus-hardware-basics",
          secondaryLabel: "See Learning tracks",
          secondaryHref: "/learning/personal",
        }}
      />
      <Contact />
      <Footer />
    </main>
  );
}

