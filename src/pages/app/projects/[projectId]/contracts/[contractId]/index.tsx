import { useRouter } from 'next/router';

export default function ContractPage() {
  const { query } = useRouter();
  return (
    <div>
      Contract Page with Id {query.contractId} <br />
      TODO: nav to contract stage (plan,actual,billing based on status logic)
    </div>
  );
}
