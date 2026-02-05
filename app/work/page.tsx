import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WorkPageContent from "@/components/WorkPageContent";

export const metadata = {
  title: "Work | Kanam Technologies",
  description: "Websites and tools we've built. View live projects and see examples of our work.",
};

export default function WorkPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <WorkPageContent />
      <Footer />
    </main>
  );
}

