import { useState, useEffect, memo } from "react"
import "../styles/table.css"

// Components
import CustomCheckBox from "./CustomCheckBox"
import TableHeader from "./TableHeader"
import TableBody from "./TableBody"
import Alert from "./CustomAlert"

// constants
import { 
    SELECTED_ALL, 
    NONE_SELECTED, 
    STATUS_CHECKED, 
    STATUS_INTERMEDIATE, 
    STATUS_UNCHECKED, 
    SELECTED
} from '../contants'

const Table = ({data}: {data: FileData[]}) => {
    const [checkedAll, setCheckedAll] = useState<CheckBoxStatus>("unchecked");
    const [fileData, setFileData] = useState<FileDataState[]>([])
    const [label, setLabel] = useState<string>("None Selected")
    const [isAlertOpen, setToggleAlert] = useState(false)

    useEffect(() => {
        createDataInfo(data)
      }, [data]);

    function createDataInfo(info: FileData[]) {
        const formattedFileData = info.map(data=> {
            return {
                id: data.name,
                name: data.name,
                device: data.device,
                path: data.path,
                status: data.status,
                isChecked: false
            }
        })
        setFileData(formattedFileData)
    }

    const toggleSelectAll = () => {
        let checkboxStatus: CheckBoxStatus = STATUS_UNCHECKED
        let checkBoxlabel: string = NONE_SELECTED

        if (checkedAll === STATUS_UNCHECKED) {
            checkboxStatus = STATUS_CHECKED
            checkBoxlabel = SELECTED_ALL
        }
        const newSelectedList = fileData.map(
            item => ({...item, isChecked: checkboxStatus === STATUS_CHECKED })
        );
        setLabel(checkBoxlabel)
        setFileData(newSelectedList)
        setCheckedAll(checkboxStatus)
    }

    const updateSelectAll = () => {
        let checkboxStatus: CheckBoxStatus = STATUS_UNCHECKED;
        let checkBoxlabel: string = ""
        const selectedCount = fileData.filter(item => item.isChecked).length
        const allSelected = selectedCount === fileData.length
        const someSelected = !allSelected && selectedCount > 0

        if (allSelected) {
            checkboxStatus = STATUS_CHECKED
            checkBoxlabel = SELECTED_ALL
        } else if (someSelected) {
            checkboxStatus =STATUS_INTERMEDIATE
            checkBoxlabel = ` ${SELECTED} ` + selectedCount
        } else {
            checkBoxlabel = NONE_SELECTED
        }

        setLabel(checkBoxlabel)
        setCheckedAll(checkboxStatus)
    }

    const handleIndividualClick = (id: string) => {
           const listCopy: FileDataState[] = [...fileData]
           let clickedItemToUpdate = listCopy.find((item) => item.id === id);

           if (clickedItemToUpdate) {
                clickedItemToUpdate.isChecked = !clickedItemToUpdate.isChecked;
           }
           setFileData(listCopy)
           updateSelectAll();
     }

     const toggleAlertOpen = () => {
        setToggleAlert(!isAlertOpen);
      };


    return (
        <main>
            {isAlertOpen && (<Alert
                handleCancelAlert={toggleAlertOpen}
                handleOkayAlert={toggleAlertOpen}
                data={fileData}
            />)}
            <div className="wrapper" data-testid="main-content">
                <div className="wrapper__header">
                    <CustomCheckBox 
                        aria-checked={checkedAll} 
                        active={checkedAll === "checked"} 
                        type={checkedAll} labelText={label} 
                        name="selectAll" 
                        handleOnChange={toggleSelectAll}
                    />
                    <div className="wrapper_download">
                        <button 
                            data-testid="download-btn"
                            aria-label="download-button-Selected" 
                            type="button" 
                            className="download__btn"
                            aria-pressed={isAlertOpen} 
                            onClick={toggleAlertOpen}>
                                Download Selected
                        </button>
                    </div>
                </div>
                <div className="table-container"> 
                    <table>
                        <TableHeader />
                        <TableBody 
                            data={fileData} 
                            handleClick={handleIndividualClick} 
                        />
                    </table>
                </div>
            </div>
        </main>
    )
}

export default  memo(Table)