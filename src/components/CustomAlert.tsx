import "../styles/customAlert.css"

interface AlertProps {
    handleCancelAlert: () => void;
    handleOkayAlert: () => void
    data: FileData[]
}

const Alert = ({handleCancelAlert, handleOkayAlert, data}: AlertProps) => {

    const downloadFilter = ({status, isChecked} : FileData) => (status.toLocaleLowerCase() === "available" && isChecked )

    return (
        <div role="dialog" className="modal__overlay" aria-modal="true" aria-labelledby="modalTitle" aria-describedby="modalDescription">
            <div id="modalContent" className="modal__body">
                <h1 id="modalTitle">Files you want to download</h1>
                <ul id="modalDescription">
                    {
                        data.filter(downloadFilter).map(({id, path, device}) => (
                            <li key={id}><p>{`Device: ${device}; path: ${path}`}</p></li>
                        ))
                    }
                </ul>
                <div className="modal__footer">
                    <button aria-label="okay download" type="button" onClick= {handleCancelAlert}>Okay</button>
                    <button aria-label="cancel download"  type="button" onClick= {handleOkayAlert}>Cancel</button>
                </div>
            </div>
        </div>
    )

}

export default Alert