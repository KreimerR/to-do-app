import { useState, useEffect } from "react"
import Task from "./components/Task.tsx"

export default function App() {
    type TasksType = {
        id: number
        title: string
        date: string
        checked: boolean
        edit: boolean
    }

    type TitleType = {
        id: number | undefined
        title: string
    }

    const [tasks, setTasks] = useState<TasksType[]>(() => {
        const stored = localStorage.getItem("tasks")
        return stored ? JSON.parse(stored) as TasksType[] : []
    })
    const [tasksCounter, setTasksCounter] = useState<number>(() => {
        const stored = localStorage.getItem("tasksCounter")
        return stored ? JSON.parse(stored) as number : 1
    })
    const [taskTitle, setTaskTitle] = useState<TitleType>(() => {
        const stored = localStorage.getItem("taskTitle")
        return stored ? JSON.parse(stored) as TitleType : { id: undefined, title: "New task" }
    })
    const [currentSorting, setCurrentSorting] = useState<string>(() => {
        const stored = localStorage.getItem("currentSorting")
        return stored ? JSON.parse(stored) as string : "All"
    })

    useEffect(() => {
        if (tasks.length === 0) {
            setTasksCounter(1)
        }
    }, [tasks])

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks])

    useEffect(() => {
        localStorage.setItem("tasksCounter", JSON.stringify(tasksCounter))
    }, [tasksCounter])

    useEffect(() => {
        localStorage.setItem("taskTitle", JSON.stringify(taskTitle))
    }, [taskTitle])

    useEffect(() => {
        localStorage.setItem("currentSorting", JSON.stringify(currentSorting))
    }, [currentSorting])

    function setToAll(): void {
        setCurrentSorting("All")
    }

    function setToPending(): void {
        setCurrentSorting("Pending")
    }

    function setToCompleted(): void {
        setCurrentSorting("Completed")
    }

    function getFormattedDate(): string {
        const now = new Date()

        const time = now.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: false
        })

        const date = now.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        })

        return `${time}, ${date}`
    }

    function addTask(): void {
        setTasksCounter(prevTasksCounter => prevTasksCounter + 1)
        setTasks([...tasks, {
            id: tasksCounter,
            title: "New task",
            date: getFormattedDate(),
            checked: false,
            edit: true
        }])
    }

    function toggleCheckmark(id: number): void {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, checked: !task.checked } : task
        ))
    }

    function deleteTask(id: number): void {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id))
    }

    function editTask(id: number): void {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, edit: true } : task
        ))
    }

    function saveTask(id: number): void {
        setTasks(tasks.map(task =>
            task.id === id && task.id === taskTitle.id ? { ...task, title: taskTitle.title, edit: false } : task
        ))
        setTaskTitle({ id: undefined, title: "New task" })
    }

    function renderTasks() {
        const pendingTasks = tasks.filter(task => task.checked === false)
        const completedTasks = tasks.filter(task => task.checked === true)

        if (currentSorting === "Pending") {
            if (pendingTasks.length === 0) {
                return <h2 className="no-tasks">There are currently no tasks</h2>
            } else {
                return pendingTasks.map(task => (
                    <Task
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        date={task.date}
                        checked={task.checked}
                        edit={task.edit}
                        setTaskTitle={setTaskTitle}
                        deleteTask={deleteTask}
                        editTask={editTask}
                        saveTask={saveTask}
                        toggleCheckmark={toggleCheckmark}
                    />
                ))
            }
        } else if (currentSorting === "Completed") {
            if (completedTasks.length === 0) {
                return <h2 className="no-tasks">There are currently no tasks</h2>
            } else {
                return completedTasks.map(task => (
                    <Task
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        date={task.date}
                        checked={task.checked}
                        edit={task.edit}
                        setTaskTitle={setTaskTitle}
                        deleteTask={deleteTask}
                        editTask={editTask}
                        saveTask={saveTask}
                        toggleCheckmark={toggleCheckmark}
                    />
                ))
            }
        } else if (currentSorting === "All") {
            if (tasks.length === 0) {
                return <h2 className="no-tasks">There are currently no tasks</h2>
            } else {
                if (completedTasks.length > 0) {
                    return (
                        <>
                            {pendingTasks.map(task => (
                                <Task
                                    key={task.id}
                                    id={task.id}
                                    title={task.title}
                                    date={task.date}
                                    checked={task.checked}
                                    edit={task.edit}
                                    setTaskTitle={setTaskTitle}
                                    deleteTask={deleteTask}
                                    editTask={editTask}
                                    saveTask={saveTask}
                                    toggleCheckmark={toggleCheckmark}
                                />
                            ))}
                            {completedTasks.map(task => (
                                <Task
                                    key={task.id}
                                    id={task.id}
                                    title={task.title}
                                    date={task.date}
                                    checked={task.checked}
                                    edit={task.edit}
                                    setTaskTitle={setTaskTitle}
                                    deleteTask={deleteTask}
                                    editTask={editTask}
                                    saveTask={saveTask}
                                    toggleCheckmark={toggleCheckmark}
                                />
                            ))}
                        </>
                    )
                } else {
                    return tasks.map(task => (
                        <Task
                            key={task.id}
                            id={task.id}
                            title={task.title}
                            date={task.date}
                            checked={task.checked}
                            edit={task.edit}
                            setTaskTitle={setTaskTitle}
                            deleteTask={deleteTask}
                            editTask={editTask}
                            saveTask={saveTask}
                            toggleCheckmark={toggleCheckmark}
                        />
                    ))
                }
            }
        }
    }

    return (
        <div className="to-do-app">
            <div className="buttons-container">
                <button
                    onClick={addTask}
                    className="task main-btn"
                >Add Task
                </button>

                <div className="right-main-btns-container">
                    <button 
                        onClick={setToAll} 
                        className={currentSorting === "All" ? "all active sort-btn main-btn" : "all sort-btn main-btn"}
                    >All
                    </button>
                    <button 
                        onClick={setToPending} 
                        className={currentSorting === "Pending" ? "pending active sort-btn main-btn" : "pending sort-btn main-btn"}
                    >Pending
                    </button>
                    <button 
                        onClick={setToCompleted} 
                        className={currentSorting === "Completed" ? "completed active sort-btn main-btn" : "completed sort-btn main-btn"}
                    >Completed
                    </button>
                </div>
            </div>

            <div className="tasks-container">
                {renderTasks()}
            </div>
        </div>
    )
}