import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InteractiveSandbox from "@/components/InteractiveSandbox";
import SandboxWelcome from "@/components/SandboxWelcome";

export const metadata = {
  title: "Interactive Sandbox | Kanam Technologies",
  description: "Explore interactive demos of our solutions and see how they work in real-time.",
};

export default function SandboxPage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <Header />
      <SandboxWelcome />
      <InteractiveSandbox />
      <Footer />
    </main>
  );
}
