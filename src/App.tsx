import Task from "./components/Task.tsx"

export default function App() {
    return (
        <div className="to-do-app">
            <h1 className="name">TODO LIST</h1>

            <div className="buttons-container">
                <button className="task main-btn">Add Task</button>
                
                <div className="right-main-btns-container">
                    <button className="all active sort-btn main-btn">All</button>
                    <button className="pending sort-btn main-btn">Pending</button>
                    <button className="completed sort-btn main-btn">Completed</button>
                </div>
            </div>

            <div className="tasks-container">
                <Task />
                <Task />
                <Task />
            </div>
        </div>
    )
}