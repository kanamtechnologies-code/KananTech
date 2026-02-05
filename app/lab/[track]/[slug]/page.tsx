import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getLabTrack } from "@/content/lab/tracks";
import { getLesson, getTrackLessons } from "@/content/lab/lessons";
import LabLessonShell from "@/components/lab/LabLessonShell";

export async function generateMetadata({ params }: { params: { track: string; slug: string } }) {
  const track = getLabTrack(params.track);
  const lesson = getLesson(params.track, params.slug);
  if (!track || !lesson) {
    return {
      title: "Kanam Learning Lab",
      description: "Try free interactive lesson previews across Coding, Data, and IT.",
    };
  }

  return {
    title: `Kanam Learning Lab — ${track.shortTitle}: ${lesson.title}`,
    description: `Try a free interactive preview lesson in the ${track.title}. Step-by-step content, knowledge checks, and applied practice.`,
  };
}

export default function LabLessonPage({ params }: { params: { track: string; slug: string } }) {
  const track = getLabTrack(params.track);
  const lesson = getLesson(params.track, params.slug);

  if (!track || !lesson) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-3xl">
            <div className="bg-card-bg border border-border rounded-2xl p-8 shadow-sm">
              <h1 className="text-3xl font-bold text-primary-text mb-3">Lesson not found</h1>
              <p className="text-secondary-text mb-6">
                That lesson link doesn’t match a current preview. Head back to the Learning Lab and choose a track.
              </p>
              <Link
                href="/lab"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-primary text-white font-medium rounded-xl hover:bg-emerald-hover transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                Go to Lab
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const lessons = getTrackLessons(track.id);
  const index = lessons.findIndex((l) => l.slug === lesson.slug);
  const next = index >= 0 ? lessons[index + 1] : null;
  const nextHref = next ? `/lab/${track.id}/${next.slug}` : null;

  return (
    <main className="min-h-screen">
      <Header />
      <LabLessonShell track={track} lessons={lessons} lesson={lesson} nextHref={nextHref} />
      <Footer />
    </main>
  );
}

