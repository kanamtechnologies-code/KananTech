import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import CorporateLearningPageContent from "@/components/learning/CorporateLearningPageContent";

export const metadata = {
  title: "Corporate Learning | Kanam Technologies",
  description:
    "Corporate training designed for measurable outcomes: clearer reporting, faster workflows, and more consistent execution.",
};

export default function CorporateLearningPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <CorporateLearningPageContent />
      <Contact subject="Corporate Learning" />
      <Footer />
    </main>
  );
}

