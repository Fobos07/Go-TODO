import React, {useEffect, useState} from 'react';
import AddTask from '../AddTask/AddTask'; // Импортируем компонент добавления задачи
import {deleteTodo, getTodos, updateTodo} from '../../api/todoApi'; // Импортируем API для работы с задачами
import "./TodoList.css";
import TaskCard from "../TaskCard/TaskCard";

const TodoList = () => {
    const [todos, setTodos] = useState([]); // Состояние для списка задач
    const [showAddTask, setShowAddTask] = useState(false); // Состояние для отображения формы добавления задачи
    const [error, setError] = useState(null); // Состояние для ошибок
    const [selectedTodoId, setSelectedTodoId] = useState(null);

    // Функция для загрузки задач с API
    const fetchTodos = async () => {
        try {
            const response = await getTodos();
            setTodos(response.data); // Обновляем состояние с задачами
        } catch (err) {
            console.error("Error fetching todos:", err);
            setError("Error fetching todos"); // Устанавливаем сообщение об ошибке
        }
    };

    // Используем useEffect для загрузки задач при монтировании компонента
    useEffect(() => {
        fetchTodos(); // Загружаем задачи при старте компонента
    }, []);

    const handleGetTodo = (id) => {
        setSelectedTodoId(id === selectedTodoId ? null : id); // Открываем/закрываем карточку задачи
    };

    const handleAddTask = () => {
        setShowAddTask(false); // Скрываем компонент добавления задачи
        fetchTodos(); // Обновляем список задач
    };

    const handleUpdateTodo = async (id) => {
        try {
            await updateTodo({
                id: id,
                done: true
            }); // Обновляем задачу на сервере
            fetchTodos(); // Обновляем список задач
        } catch (err) {
            console.error("Error updating todo:", err);
            setError("Error updating todo");
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            await deleteTodo(id); // Удаляем задачу на сервере
            fetchTodos(); // Обновляем список задач
        } catch (err) {
            console.error("Error deleting todo:", err);
            setError("Error deleting todo");
        }
    };

    return (
        <div className={"TodoList"}>
            <h1 className={"AppTitle"}>TODO List</h1>
            <button className={"AddTaskBtn"} onClick={() => setShowAddTask(true)}>Add Task</button>
            {/* Кнопка для добавления задачи */}
            {showAddTask &&
                <AddTask onTaskAdded={handleAddTask}/>} {/* Отображаем компонент AddTask при необходимости */}
            {error && <p style={{color: 'red'}}>{error}</p>} {/* Показываем сообщение об ошибке */}

            <ul className={"TodoItems"}>
                {todos && todos.length > 0 ? (
                    todos.map(todo => !todo.done && (
                        <li className={"TodoItem"} key={todo.id}>
                            <span
                                style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
                                onClick={() => handleGetTodo(todo.id)}
                            >
                                {todo.title}
                            </span>
                            <div>
                                <button className={"removeTaskBtn"} onClick={() => handleUpdateTodo(todo.id)}>
                                    <img src="done-icon.svg" alt="Mark as done"/>
                                </button>
                                <button className={"removeTaskBtn"} onClick={() => handleDeleteTodo(todo.id)}>
                                    <img src="trash-icon.svg" alt="Delete task"/>
                                </button>
                            </div>
                            {/* Показываем карточку задачи при клике */}
                            {selectedTodoId === todo.id && <TaskCard id={todo.id} />}
                        </li>
                    ))
                ) : (
                    <p>No tasks available</p> // Если задач нет, выводим сообщение
                )}
            </ul>
        </div>
    );
};

export default TodoList;
