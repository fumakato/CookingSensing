/*
scripts説明
データベースを操作するときに使うよ
初期設定だったり
全データ削除だったり

シードデータ（初期値）挿入
go run scripts/manage_db.go -action init

全テーブル削除
go run scripts/manage_db.go -action dropall

任意のテーブル削除
go run scripts/manage_db.go -action droptable -table users
（ users の部分は各テーブルの名称に変更して使用）

*/

package main

import (
	"flag"
	"fmt"
	"log"

	"myapp/config"
	"myapp/database"
	"myapp/model"
)

func initDB() {
	db := database.ConnectDB()
	defer db.Close()

	database.InitData(db)
}

func dropAllTables() {
	db := database.ConnectDB()
	defer db.Close()
	db.DropTableIfExists(&model.User{})
	db.DropTableIfExists(&model.FeatureData{})
	db.DropTableIfExists(&model.BestData{})
	db.DropTableIfExists(&model.Histogram{})
	db.DropTableIfExists(&model.Action{})
	db.DropTableIfExists(&model.DisplayItem{})
}

func dropTable(tableName string) {
	db := database.ConnectDB()
	defer db.Close()

	if err := db.Exec(fmt.Sprintf("DROP TABLE IF EXISTS %s", tableName)).Error; err != nil {
		log.Fatalf("Could not drop table %s: %v", tableName, err)
	}
}

func main() {
	config.LoadConfig()

	action := flag.String("action", "", "Action to perform (init, dropall, droptable)")
	tableName := flag.String("table", "", "Name of the table to drop (required if action is droptable)")
	flag.Parse()

	if *action == "" {
		log.Fatal("Action must be provided")
	}

	switch *action {
	case "init":
		initDB()
	case "dropall":
		dropAllTables()
	case "droptable":
		if *tableName == "" {
			log.Fatal("Table name must be provided for droptable action")
		}
		dropTable(*tableName)
	default:
		log.Fatalf("Unknown action: %s", *action)
	}
}
