import { useRouter } from "next/router";

export default function SectionPage() {
  const router = useRouter();
  return (
    <div>
      Section Page with Id {router.query.sectionId}
      <br />
      TODO: resolve this page into section stage and its [...sectionInfo] -- [
      accountId , ...month, ...year , etc] :
      <br />
      stage = plan | actual | billing
      <br />
      accountId = in case not plan then need to be under an accountId
    </div>
  );
}
