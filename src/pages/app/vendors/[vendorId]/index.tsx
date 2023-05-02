import { useRouter } from 'next/router';

export default function VendorPage() {
  const router = useRouter();
  return <div>Vendor Page {router.query.vendorId}</div>;
}
