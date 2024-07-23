package database

import (
	"log"
	"myapp/config"
	"myapp/model"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

// DB接続
func ConnectDB() *gorm.DB {
	dsn := config.GetDBConfig()
	db, err := gorm.Open("mysql", dsn)
	if err != nil {
		log.Fatalf("Could not connect to the database: %v", err)
	}
	return db
}

// 自動マイグレーション
func AutoMigrate(db *gorm.DB) {
	db.AutoMigrate(&model.User{})
	db.AutoMigrate(&model.FeatureData{})
	db.AutoMigrate(&model.BestData{})
	db.AutoMigrate(&model.Histogram{})
	db.AutoMigrate(&model.Action{})
	db.AutoMigrate(&model.DisplayItem{})
	// db.AutoMigrate(&model.Label{})
}

// 初期データの登録
func InitData(db *gorm.DB) {
	if db.First(&model.User{}).RecordNotFound() {
		for _, tmp := range model.UserInitData {
			db.Create(&tmp)
		}
	}

}

func GetAllTables(db *gorm.DB) ([]string, error) {
	var tables []string
	rows, err := db.Raw("SHOW TABLES").Rows()
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var table string
		if err := rows.Scan(&table); err != nil {
			return nil, err
		}
		tables = append(tables, table)
	}
	return tables, nil
}
