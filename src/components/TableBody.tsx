import CustomCheckBox from './CheckBox'
import Status from './Status'

interface TableBodyProps {
    data: FileData[];
    handleClick: (name: string) => void
}

const TableBody = ({data, handleClick} : TableBodyProps) => {
   return (
    <tbody>
        {
            data.map((item, index) => {
                const {name, device, path, status, isChecked} = item
                const handleCheckbox = () => {
                    handleClick(name)
                }
                return (
                    <tr key={name} className={`${isChecked ? "row-active" : ""}`}>
                        <td>
                            <CustomCheckBox 
                                tabIndex={index}  
                                name={name} 
                                active={isChecked} 
                                handleOnChange={handleCheckbox}
                            />
                        </td>
                        <td>{name}</td>
                        <td>{device}</td>
                        <td>{path}</td>
                        <td>
                            <Status value={status}/>
                        </td>
                    </tr>
                )
            })
        }
    </tbody>
   )
}
export default TableBody