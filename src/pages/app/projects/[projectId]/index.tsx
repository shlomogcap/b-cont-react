import { useRouter } from 'next/router';

export default function ProjectPage() {
  const router = useRouter();
  return <div>Project Page With Id {router.query.projectId}</div>;
}
