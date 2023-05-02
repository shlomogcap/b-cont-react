import { useRouter } from 'next/router';

export default function CompanyPage() {
  const { query } = useRouter();
  return <div>Company Page with Id {query.companyId}</div>;
}
