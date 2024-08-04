export default function TableFiles({ children }:{ children:JSX.Element[] }) {

    return <table className="table-auto">
        <tr>
        <th className="border border-gray-400 px-4 py-2">Name</th>
        <th className="border border-gray-400 px-4 py-2">Correcciones</th>
        <th className="border border-gray-400 px-4 py-2">Rate</th>
        </tr>
        {children}
    </table>
}