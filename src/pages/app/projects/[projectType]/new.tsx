import { NewProjectPage } from '@/lib/components/ProjectPage/NewProject';
import { PROJECT_TYPE_QUERY } from '@/lib/consts/routes';
import { queryParamToString } from '@/lib/utils/queryParamToString';
import { useRouter } from 'next/router';
import React from 'react';

export default function ProjectRoute() {
  const { query } = useRouter();
  return (
    <NewProjectPage
      projectType={queryParamToString(query, PROJECT_TYPE_QUERY)}
    />
  );
}
