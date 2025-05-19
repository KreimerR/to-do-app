export default function Task() {
    return (
        <div className="task-container">
            <div className="left-task-container">
                <button className="check unchecked"></button>
                <div className="info-container">
                    <h2>Task name</h2>
                    <p>5:23 AM, 01/06/2022</p>
                </div>                
            </div>

            <div className="right-task-container">
                <button className="trash-btn"></button>
                <button className="edit-btn"></button>
            </div>
        </div>
    )
}