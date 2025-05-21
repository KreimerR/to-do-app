import checkmark from "../assets/check.png"
import trashBin from "../assets/trash-bin.png"
import pencil from "../assets/pencil.png"
import save from "../assets/save.png"

type TitleType = {
    id: number | undefined
    title: string
}

type Props = {
    id: number
    title: string
    date: string
    checked: boolean
    edit: boolean
    setTaskTitle: (newValue: TitleType) => void
    deleteTask: (id: number) => void
    editTask: (id: number) => void
    saveTask: (id: number) => void
    toggleCheckmark: (id: number) => void
}

export default function Task({ id, title, date, checked, edit, setTaskTitle, deleteTask, editTask, saveTask, toggleCheckmark }: Props) {
    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            saveTask(id)
        }
    }

    return (
        <div className="task-container">
            <div className="left-task-container">
                {checked ?
                    <button onClick={() => toggleCheckmark(id)} className="check checked">
                        <img className="icon" src={checkmark} alt="checkmark" />
                    </button> :
                    <button onClick={() => edit ? null : toggleCheckmark(id)} className="check unchecked"></button>
                }

                <div className="info-container">
                    {edit ?
                        <input 
                            onChange={(e) => setTaskTitle({ id: id, title: e.target.value })} 
                            onKeyDown={handleKeyDown} 
                            className={checked ? "checked-task change-title change-title2 change-title3" : "none change-title change-title2 change-title3"} 
                            placeholder="Edit task title" /> :
                        <h3 className={checked ? "checked-task" : "none"}>{title}</h3>
                    }
                    <p>{date}</p>
                </div>
            </div>

            <div className="right-task-container">
                <button className="trash-btn">
                    <img onClick={() => deleteTask(id)} className="icon" src={trashBin} alt="delete" />
                </button>
                {edit ?
                    <button className="save-btn">
                        <img onClick={() => saveTask(id)} className="icon" src={save} alt="save" />
                    </button> :

                    <button className="edit-btn">
                        <img onClick={() => checked ? null : editTask(id)} className="icon" src={pencil} alt="edit" />
                    </button>
                }
            </div>
        </div>
    )
}