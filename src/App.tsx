import Task from "./components/Task.tsx"

export default function App() {
    return (
        <>
            <h1 className="name">TODO LIST</h1>
            <div className="buttons-container">
                <button className="task-btn">Add Task</button>
                
                <div className="right-main-btns-container">
                    <button className="all-sort-btn">All</button>
                    <button className="pending-sort-btn">Pending</button>
                    <button className="completed-sort-btn">Completed</button>
                </div>
            </div>
            <div className="tasks-container">
                <Task />
                <Task />
                <Task />
            </div>
        </>
    )
}