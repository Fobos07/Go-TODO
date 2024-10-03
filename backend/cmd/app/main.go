package main

import (
	"github.com/Fobos07/Go-TODO/backend/internal/database"
	"github.com/Fobos07/Go-TODO/backend/internal/handlers"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
	"log"
	"net/http"
	"os"
)

func main() {
	// Загружаем переменные окружения из .env файла
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Получаем переменные окружения
	port := os.Getenv("PORT")

	// Инициализация базы данных
	database.InitializeDatabase()

	// Настройка маршрутов
	mux := http.NewServeMux()
	mux.HandleFunc("/todos", handlers.GetTodos)          // Получение всех задач
	mux.HandleFunc("/todos/create", handlers.CreateTodo) // Создание новой задачи
	mux.HandleFunc("/todos/delete", handlers.DeleteTodo) // Удаление задачи
	mux.HandleFunc("/todos/update", handlers.UpdateTodo) // Обновление задачи

	// Настройка CORS
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},        // Разрешаем запросы с фронтенда
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"}, // Разрешаем эти методы
		AllowCredentials: true,
	})

	// Оборачиваем наш mux в CORS middleware
	handler := c.Handler(mux)

	// Запуск сервера
	log.Printf("Server is running on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}
