import React, { useState } from 'react';
import { createTodo } from '../../api/todoApi';

const AddTask = ({ onTaskAdded }) => { // Принимаем onTaskAdded как пропс
    const [newTodoTitle, setNewTodoTitle] = useState('');
    const [newTodoDescription, setNewTodoDescription] = useState('');

    const handleCreateTodo = async () => {
        try {
            await createTodo({
                title: newTodoTitle,
                description: newTodoDescription,
                done: false,
            });
            setNewTodoTitle('');
            setNewTodoDescription('');
            onTaskAdded(); // Вызываем функцию для обновления списка задач
        } catch (err) {
            console.error('Error creating todo:', err);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Title"
                value={newTodoTitle}
                onChange={(e) => setNewTodoTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Description"
                value={newTodoDescription}
                onChange={(e) => setNewTodoDescription(e.target.value)}
            />
            <button onClick={handleCreateTodo}>Add</button>
        </div>
    );
};

export default AddTask;
