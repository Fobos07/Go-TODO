package handlers

import (
	"encoding/json"
	"fmt"
	"github.com/Fobos07/Go-TODO/backend/internal/database"
	"github.com/Fobos07/Go-TODO/backend/internal/models"
	"net/http"
)

// GetTodos обрабатывает запрос на получение всех задач
func GetTodos(w http.ResponseWriter, r *http.Request) {
	db := database.GetDB()
	rows, err := db.Query("SELECT id, title, description, done FROM todos")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var todos []models.Todo
	for rows.Next() {
		var todo models.Todo
		if err := rows.Scan(&todo.ID, &todo.Title, &todo.Description, &todo.Done); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		todos = append(todos, todo)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(todos)
}

// CreateTodo обрабатывает запрос на создание новой задачи
func CreateTodo(w http.ResponseWriter, r *http.Request) {
	var todo models.Todo
	if err := json.NewDecoder(r.Body).Decode(&todo); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	db := database.GetDB()
	stmt, err := db.Prepare("INSERT INTO todos(title, description, done) VALUES ($1, $2, $3)")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	_, err = stmt.Exec(todo.Title, todo.Description, todo.Done)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}

// UpdateTodo обрабатывает запрос на обновление задачи
func UpdateTodo(w http.ResponseWriter, r *http.Request) {
	var todo models.Todo
	if err := json.NewDecoder(r.Body).Decode(&todo); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	db := database.GetDB()
	stmt, err := db.Prepare("UPDATE todos SET title = $1, done = $2 WHERE id = $3")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	_, err = stmt.Exec(todo.Title, todo.Done, todo.ID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent) // Успешное обновление, без контента в ответе
}

// DeleteTodo обрабатывает запрос на удаление задачи
func DeleteTodo(w http.ResponseWriter, r *http.Request) {
	// Получаем ID задачи из URL (например, /todos/delete/{id})
	id := r.URL.Query().Get("id")
	fmt.Println(r.Method)
	if id == "" {
		http.Error(w, "ID is required", http.StatusBadRequest)
		return
	}

	db := database.GetDB()
	stmt, err := db.Prepare("DELETE FROM todos WHERE id = $1")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	_, err = stmt.Exec(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent) // Успешное удаление, без контента в ответе
}
