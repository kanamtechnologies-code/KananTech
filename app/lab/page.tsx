import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import LabLanding from "@/components/lab/LabLanding";

export const metadata = {
  title: "Kanam Learning Lab",
  description:
    "Try free interactive lesson previews across Coding (Python + AI tools), Data (Excel + Power BI), and IT (CompTIA A+ cert-style practice).",
};

export default function LabPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <LabLanding />
      <Contact />
      <Footer />
    </main>
  );
}

