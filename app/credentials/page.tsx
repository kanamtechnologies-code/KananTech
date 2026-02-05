import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CredentialsSection from "@/components/CredentialsSection";

export const metadata = {
  title: "Credentials & Certifications | Kanam Technologies",
  description: "Certified in Agile delivery and AI leadership, with a foundation in IT and productivity systems.",
};

export default function CredentialsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <CredentialsSection />
      <Footer />
    </main>
  );
}
