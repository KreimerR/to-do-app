import { useState } from "react"
import checkmark from "../assets/check.png"
import trashBin from "../assets/trash-bin.png"
import pencil from "../assets/pencil.png"

export default function Task() {
    const [isChecked, setIsChecked] = useState(false)

    function toggleCheckmark() {
        setIsChecked(prevIsChecked => !prevIsChecked)
    }
    
    return (
        <div className="task-container">
            <div className="left-task-container">
                {isChecked ? 
                    <button onClick={toggleCheckmark} className="check checked">
                        <img className="icon" src={checkmark} alt="checkmark" />
                    </button> :
                    <button onClick={toggleCheckmark} className="check unchecked"></button>
                }

                <div className="info-container">
                    <h3>Task name</h3>
                    <p>5:23 AM, 01/06/2022</p>
                </div>                
            </div>

            <div className="right-task-container">
                <button className="trash-btn">
                    <img className="icon" src={trashBin} alt="delete" />
                </button>
                <button className="edit-btn">
                    <img className="icon" src={pencil} alt="edit" />
                </button>
            </div>
        </div>
    )
}