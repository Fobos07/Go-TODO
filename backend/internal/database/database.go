package database

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/lib/pq"
)

var db *sql.DB

// InitializeDatabase инициализирует подключение к базе данных и создает таблицы
func InitializeDatabase() {
	var err error
	// Получаем строку подключения из переменных окружения
	connStr := os.Getenv("DB_URL")
	db, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}

	// Создание таблицы задач
	sqlStmt := `
    CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NULL,
        done BOOLEAN NOT NULL DEFAULT false
    );
    `
	_, err = db.Exec(sqlStmt)
	if err != nil {
		log.Fatal(err)
	}
}

// GetDB возвращает указатель на базу данных
func GetDB() *sql.DB {
	return db
}
