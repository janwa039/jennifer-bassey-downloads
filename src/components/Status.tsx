import { memo } from "react"
import "../styles/status.css"

const STATUS_TYPES: Record<FileDataStatus, string> = {
    available: "Available",
    scheduled: "Scheduled"
}

const Status = ({value} : {value : FileDataStatus}) => {
    return (
        <>
            <div aria-label={value} className="status">
                {value === "available" && <span className="status-primary"></span>}
            </div>
            {STATUS_TYPES[value]}
        </>
    )

}

export default memo(Status)