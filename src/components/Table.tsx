import { useThemeMode } from "../hooks/useThemeMode";

type TableProps = {
  headers: string[];
  data: any[];
};

export function Table({ headers, data }: TableProps) {
  const { theme } = useThemeMode();

  return (
    <div
      className={`
				${theme}
			bg-indigo-900 dark:bg-gray-900
				inline-block rounded-lg shadow-xl
				border dark:border-gray-900
			`}
    >
      <table className="w-full border-separate rounded-xl overflow-hidden">
        <thead className="text-gray-100">
          <tr>
            {headers.map((header) => (
              <th key={header} className="text-left p-3">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-black">
          {data.map((d, idx) => {
            return (
              <tr
                key={d.id}
                className={`${idx % 2 === 0 ? "bg-gray-400" : "bg-gray-300"}`}
              >
                {Object.entries(d).map(([, value], idx) => (
                  <td key={idx} className="text-left p-3">
                    {value}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
