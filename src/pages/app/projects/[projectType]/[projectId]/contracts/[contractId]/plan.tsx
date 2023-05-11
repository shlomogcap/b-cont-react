import { useRouter } from 'next/router';

export default function ContractPlanPage() {
  const { query } = useRouter();
  return (
    <div>
      Contract Page with Id {query.contractId}
      <br />
      Plan Stage
    </div>
  );
}
