import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import LearningPageContent from "@/components/LearningPageContent";

export const metadata = {
  title: "Learning | Kanam Technologies",
  description:
    "Practical training for real outcomes: corporate upskilling, personal learning tracks, and a children’s coding bootcamp.",
};

export default function LearningPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <LearningPageContent />
      <Contact />
      <Footer />
    </main>
  );
}

