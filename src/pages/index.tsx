import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ProjectSplashPage() {
  const { replace } = useRouter();
  useEffect(() => {
    replace({
      pathname: '/app',
    });
  }, [replace]);
  return null;
}
