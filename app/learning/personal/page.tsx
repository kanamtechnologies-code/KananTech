import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import PersonalLearningPageContent from "@/components/learning/PersonalLearningPageContent";

export const metadata = {
  title: "Personal Learning | Kanam Technologies",
  description:
    "Personal learning tracks built for real progress: coding (Python + AI tools), Excel + Power BI reporting, and CompTIA A+ prep.",
};

export default function PersonalLearningPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <PersonalLearningPageContent />
      <Contact />
      <Footer />
    </main>
  );
}

