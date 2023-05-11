import { useRouter } from 'next/router';

export default function SectionActual() {
  const { query } = useRouter();
  const { projectId, contractId, sectionId, ...search } = query;
  return (
    <div>
      Section Actual <br />
      <ul>
        {Object.entries(search).map(([key, value]) => (
          <li key={key}>
            {key} : {Array.isArray(value) ? value.join(' , ') : value}
          </li>
        ))}
      </ul>
    </div>
  );
}
