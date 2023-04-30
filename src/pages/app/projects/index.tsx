import { useRouter } from "next/router";

export default function ProjectPage() {
  const router = useRouter();
  return (
    <div>
      Projects Table{router.query.type ? ` From Type ${router.query.type}` : ""}
    </div>
  );
}
