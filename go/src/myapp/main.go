package main

import (
	"fmt"
	"log"
	"myapp/config"
	"myapp/database"

	"myapp/routes"
)

func main() {
	// 設定ファイルの読み込み
	config.LoadConfig()

	// データベースに接続
	db := database.ConnectDB()
	defer db.Close()

	// 自動マイグレーション
	database.AutoMigrate(db)

	// 全てのテーブルを取得して表示
	tables, err := database.GetAllTables(db)
	if err != nil {
		log.Fatalf("Error getting all tables: %v", err)
	}

	fmt.Println("Tables in the database:")
	for _, table := range tables {
		fmt.Println(table)
	}

	// ルーターの設定
	router := routes.SetupRouter()

	// サーバーを開始
	router.Run(":8080")
}
