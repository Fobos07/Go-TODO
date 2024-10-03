package config

import (
	"os"
)

// Config структура для хранения конфигурации
type Config struct {
	Port string
}

// LoadConfig загружает конфигурацию из переменных окружения
func LoadConfig() Config {
	port := os.Getenv("PORT")

	if port == "" {
		port = "8080" // Значение по умолчанию
	}

	return Config{
		Port: port,
	}
}
