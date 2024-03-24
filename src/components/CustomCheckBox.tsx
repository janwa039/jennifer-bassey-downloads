import { memo } from "react";
import { STATUS_INTERMEDIATE } from "../contants";
import "../styles/customCheckbox.css"

interface CheckBoxProps {
    handleOnChange?: (event?: any) => void;
    name: string;
    active: boolean;
    type?: CheckBoxStatus;
    labelText?: string
    tabIndex?: number
}

const CustomCheckBox = ({ handleOnChange, name, active, type, labelText, tabIndex }: CheckBoxProps) => {
    const isIntermediateState = type === STATUS_INTERMEDIATE
    const isSelectedAll = name  === "selectAll"

    return (
        <div className={`checkbox-container ${ isIntermediateState ? type : ""} ${ isSelectedAll ? "adjust-selected" : ""}`}>
            <label htmlFor={name} >
                <input
                    tabIndex={tabIndex}
                    data-testid={name}
                    id={name}
                    name={name}
                    checked={active}
                    type="checkbox"
                    onChange={handleOnChange}
                    aria-checked={active}
                    aria-label={isSelectedAll ? labelText : name}
                />
               {isSelectedAll && (<span>{labelText}</span>)}
            </label>
        </div>
    )

}

export default memo(CustomCheckBox)