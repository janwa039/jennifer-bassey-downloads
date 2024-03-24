import "../styles/table.css"

const HEADER_TITLES: string[]  = ["Name", "Device", "Path", "Status"]

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th></th>
                {
                    HEADER_TITLES.map(name => <th scope="col" key={name}>{name}</th>)
                }
            </tr>
        </thead>
    )
}
export default TableHeader