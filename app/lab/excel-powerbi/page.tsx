import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import TrackPreviewPage from "@/components/lab/TrackPreviewPage";

export const metadata = {
  title: "Kanam Learning Lab — Excel + Power BI Preview",
  description: "Try a free preview lesson and mini quiz for the Excel + Power BI learning path.",
};

export default function LabExcelPowerBiPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <TrackPreviewPage
        title="Excel + Power BI Path (Preview)"
        subtitle="Reporting skills that reduce manual work: Excel foundations plus Power BI dashboard thinking."
        objectives={[
          "Use tables, sorting/filtering, and core formulas reliably",
          "Understand cert-style concepts (references, pivots) without hype",
          "Choose visuals that tell a clear dashboard story",
        ]}
        estimatedMinutes={15}
        startHref="/lab/data/excel-foundations"
        quizQuestions={[
          {
            id: "q1",
            prompt: "What’s a key benefit of converting a range into an Excel Table?",
            options: [
              { id: "a", label: "It prevents editing" },
              { id: "b", label: "Formulas/formatting expand as rows are added" },
              { id: "c", label: "It automatically builds a dashboard" },
              { id: "d", label: "It converts everything to text" },
            ],
            correctOptionId: "b",
            explanation: "Tables reduce broken reports because formulas/formatting extend with new rows.",
          },
          {
            id: "q2",
            prompt: "In Power BI, what should you use for a total that changes with filters?",
            options: [
              { id: "a", label: "A calculated column" },
              { id: "b", label: "A measure" },
              { id: "c", label: "A text box" },
              { id: "d", label: "A slicer" },
            ],
            correctOptionId: "b",
            explanation: "Measures evaluate in filter context; totals update when users filter.",
          },
          {
            id: "q3",
            prompt: "What’s a better dashboard default for leaders?",
            options: [
              { id: "a", label: "Start with the questions the dashboard must answer" },
              { id: "b", label: "Add 12 charts so everything is covered" },
              { id: "c", label: "Use only pie charts" },
              { id: "d", label: "Avoid KPIs entirely" },
            ],
            correctOptionId: "a",
            explanation: "A focused set of questions keeps dashboards useful and readable.",
          },
        ]}
        recommended={{
          primaryLabel: "Continue in Lab",
          primaryHref: "/lab/data/excel-foundations",
          secondaryLabel: "See Learning tracks",
          secondaryHref: "/learning/personal",
        }}
      />
      <Contact />
      <Footer />
    </main>
  );
}

