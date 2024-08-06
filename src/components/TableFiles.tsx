export default function TableFiles({ children }:{ children:JSX.Element[] }) {

    return <div className="border border-indigo-500 rounded-lg w-full p-0 shadow-xl shadow-indigo-100">
        <table className="table-auto w-full">
            <thead>
                <tr className="divide-x divide-indigo-200">
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Correcciones</th>
                    <th className="px-4 py-2">Rate</th>
                </tr>
            </thead>
            <tbody>
                {children}
            </tbody>
        </table>
    </div>
}