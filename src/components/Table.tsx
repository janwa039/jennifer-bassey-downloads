import { useState, useEffect } from "react"
import "../styles/index.css"

// Components
import CustomCheckBox from "./CheckBox"
import TableHeader from "./TableHeader"
import TableBody from "./TableBody"
import Alert from "./CustomAlert"
import { tableData } from "../data"

const Table = () => {
    const [checkedAll, setCheckedAll] = useState<CheckBoxStatus>("unchecked");
    const [fileData, setFileData] = useState<FileData[]>([])
    const [label, setLabel] = useState<string>("None Selected")
    const [isAlertOpen, setToggleAlert] = useState(false)

    useEffect(() => {
        createDataInfo(tableData)
      }, []);

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
        let checkboxStatus: CheckBoxStatus = "unchecked"
        let checkBoxlabel: string = "None Selected"

        if (checkedAll === "unchecked") {
            checkboxStatus = "checked"
            checkBoxlabel = "Selected All"
        }
        const newSelectedList = fileData.map(
            item => ({...item, isChecked: checkboxStatus === "checked" })
        );
        setLabel(checkBoxlabel)
        setFileData(newSelectedList)
        setCheckedAll(checkboxStatus)
    }

    const updateSelectAll = () => {
        let checkboxStatus: CheckBoxStatus = "unchecked";
        let checkBoxlabel: string = ""
        const selectedCount = fileData.filter(item => item.isChecked).length
        const allSelected = selectedCount === fileData.length
        const someSelected = !allSelected && selectedCount > 0

        if (allSelected) {
            checkboxStatus = "checked"
            checkBoxlabel = "Selected All"
        } else if (someSelected) {
            checkboxStatus = "intermediate"
            checkBoxlabel = " Selected " + selectedCount
        } else {
            checkBoxlabel = "None Selecteed"
        }

        setLabel(checkBoxlabel)
        setCheckedAll(checkboxStatus)
    }

    const handleIndividualClick = (id: string) => {
           const listCopy: FileData[] = [...fileData]
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
                    <div>
                        <CustomCheckBox 
                            aria-checked={checkedAll} 
                            active={checkedAll === "checked"} 
                            type={checkedAll} labelText={label} 
                            name="selectAll" 
                            handleOnChange={toggleSelectAll}
                        />
                    </div>
                    <div className="wrapper_download">
                        <button 
                            data-testid="download-btn"
                            aria-label="download-button-Selected" 
                            type="button" 
                            className="download__btn"
                            aria-pressed={isAlertOpen} 
                            onClick={toggleAlertOpen}>
                                Download Seleceted
                        </button>
                    </div>
                </div>    
                <table>
                    <TableHeader />
                    <TableBody 
                        data={fileData} 
                        handleClick={handleIndividualClick} 
                    />
                </table>
            </div>
        </main>
    )
}

export default Table