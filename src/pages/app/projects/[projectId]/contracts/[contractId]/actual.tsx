import { useRouter } from "next/router";

export default function ContractActualPage() {
  const { query } = useRouter();
  return (
    <div>
      Contract Page with Id {query.contractId}
      <br />
      Actual Stage
    </div>
  );
}
