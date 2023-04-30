import { useRouter } from "next/router";

export default function SectionPlan() {
  const { query } = useRouter();
  const { projectId, contractId, sectionId, ...search } = query;
  return (
    <div>
      Section Plan <br />
      <ul>
        {Object.entries(search).map(([key, value]) => (
          <li key={key}>
            {key} : {Array.isArray(value) ? value.join(" , ") : value}
          </li>
        ))}
      </ul>
    </div>
  );
}
