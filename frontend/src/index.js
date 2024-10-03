import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Находим элемент с id 'root'
const rootElement = document.getElementById('root');

// Создаем корневой рендеринг
const root = ReactDOM.createRoot(rootElement);

// Рендерим приложение
root.render(<App />);
