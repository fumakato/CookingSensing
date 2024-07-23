package initialdata

import (
	"cookSensing/model"

	"gorm.io/gorm"
)

func InsertInitialData(db *gorm.DB) error {
	// 初期データの挿入
	initialUsers := []model.User{
		{
			TsukurepoID: "initial_user_1",
			Name:        "User1",
			Email:       "user1@example.com",
			Password:    "password1",
		},
		{
			TsukurepoID: "initial_user_2",
			Name:        "User2",
			Email:       "user2@example.com",
			Password:    "password2",
		},
	}
	for _, user := range initialUsers {
		if err := db.FirstOrCreate(&user, model.User{Email: user.Email}).Error; err != nil {
			return err
		}
	}

	// 他のテーブルの初期データ
	initialActions := []model.Action{
		{Type: "Action1"},
		{Type: "Action2"},
	}
	for _, action := range initialActions {
		if err := db.FirstOrCreate(&action, model.Action{Type: action.Type}).Error; err != nil {
			return err
		}
	}

	initialDisplayItems := []model.DisplayItem{
		{Item: "Item1"},
		{Item: "Item2"},
	}
	for _, item := range initialDisplayItems {
		if err := db.FirstOrCreate(&item, model.DisplayItem{Item: item.Item}).Error; err != nil {
			return err
		}
	}

	return nil
}
