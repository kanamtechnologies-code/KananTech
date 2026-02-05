import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";

export const metadata = {
  title: "Contact | Kanam Technologies",
  description: "Contact Kanam Technologies to discuss consulting, learning programs, or corporate training.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-24 lg:pt-28">
        <Contact />
      </div>
      <Footer />
    </main>
  );
}

