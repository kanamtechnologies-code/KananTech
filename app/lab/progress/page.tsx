import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import LabProgressDashboard from "@/components/lab/LabProgressDashboard";

export const metadata = {
  title: "Kanam Learning Lab — Progress",
  description:
    "See your progress across Coding, Data, and IT lesson previews. Continue where you left off and keep momentum.",
};

export default function LabProgressPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <LabProgressDashboard />
      <Contact />
      <Footer />
    </main>
  );
}

