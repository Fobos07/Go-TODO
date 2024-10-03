import React, { useEffect, useState } from 'react';
import { getTodo } from '../../api/todoApi'; // Функция для получения задачи по ID
import './TaskCard.css'; // Импортируем CSS для стилизации карточки задачи (если требуется)

const TaskCard = ({ id }) => {
    const [task, setTask] = useState(null); // Состояние для хранения задачи
    const [loading, setLoading] = useState(true); // Состояние для отображения загрузки
    const [error, setError] = useState(null); // Состояние для ошибок

    // Функция для загрузки задачи с сервера
    useEffect(() => {
        const fetchTask = async () => { // Перемещаем функцию внутрь useEffect
            try {
                const response = await getTodo(id);
                setTask(response.data); // Сохраняем данные задачи в состояние
            } catch (err) {
                console.error('Error fetching task:', err);
                setError('Error fetching task'); // Устанавливаем сообщение об ошибке
            } finally {
                setLoading(false); // Останавливаем индикатор загрузки
            }
        };

        fetchTask(); // Вызываем функцию для получения задачи
    }, [id]); // Повторный запрос при изменении ID

    if (loading) return <p>Loading task...</p>; // Пока данные загружаются, показываем сообщение
    if (error) return <p style={{ color: 'red' }}>{error}</p>; // Если ошибка, показываем сообщение

    // Если задача успешно загружена, отображаем её данные
    return (
        <div className="TaskCard">
            {task ? (
                <>
                    <h3>{task.title}</h3>
                    <p className={"TastDesrciption"}><strong>Description:</strong> {task.description}</p>
                    <p><strong>Status:</strong> {task.done ? 'Completed' : 'Pending'}</p>
                </>
            ) : (
                <p>Task not found</p> // Если задача не найдена, выводим сообщение
            )}
        </div>
    );
};

export default TaskCard;
