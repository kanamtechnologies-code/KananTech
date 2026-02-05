import { redirect } from "next/navigation";

export const metadata = {
  title: "Kids Bootcamp | Kanam Technologies",
  description: "Children’s coding bootcamp overview and cohort information.",
};

export default function KidsRedirectPage() {
  redirect("/learning/children");
}

