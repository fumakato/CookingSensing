package config

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
)

func LoadConfig() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}
}

func GetDBConfig() string {
	// dbms := os.Getenv("DBMS")
	user := os.Getenv("USER")
	pass := os.Getenv("PASS")
	protocol := os.Getenv("PROTOCOL")
	dbName := os.Getenv("DB_NAME")

	return fmt.Sprintf("%s:%s@%s/%s?charset=utf8mb4&parseTime=True&loc=Local", user, pass, protocol, dbName)
}

// 実行方法
// 以下をターミナルに打ち込むといける
// go run scripts/init_db.go
