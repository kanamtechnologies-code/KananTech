import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import ChildrenLearningPageContent from "@/components/learning/ChildrenLearningPageContent";

export const metadata = {
  title: "Children’s Coding Bootcamp | Kanam Technologies",
  description:
    "A safe, structured coding bootcamp where kids build real beginner projects and learn problem-solving habits with clear goals.",
};

export default function ChildrenLearningPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ChildrenLearningPageContent />
      <Contact subject="Kids Coding Bootcamp" />
      <Footer />
    </main>
  );
}

