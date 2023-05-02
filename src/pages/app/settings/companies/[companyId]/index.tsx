import { useRouter } from 'next/router';

export default function BudgetChaptersPage() {
  const { query } = useRouter();
  return <div>Budget Chapter Page with Id {query.budgetChapterId}</div>;
}
