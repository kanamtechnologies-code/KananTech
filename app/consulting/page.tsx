import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import ConsultingPageContent from "@/components/ConsultingPageContent";

export const metadata = {
  title: "Consulting | Kanam Technologies",
  description:
    "Websites and operational systems delivered in weeks. Automation, dashboards, internal tools, and practical AI for operations and program teams.",
};

export default function ConsultingPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ConsultingPageContent />
      <Contact />
      <Footer />
    </main>
  );
}

