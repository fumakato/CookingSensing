//yadaからもらったのそのまま
//多分構造体を定義している

package model

import (
	"time"

	_ "github.com/go-sql-driver/mysql"
)

type Users struct {
	Id                 string    `json:"id"`
	CreatedAt          time.Time `json:"created_at"`
	UpdatedAt          time.Time `json:"updated_at"`
	Mail               string    `json:"mail"`
	Name               string    `json:"name"`
	Pass               string    `json:"pass"`
	BestCutAveragePace string    `json:"best_cut_average_pace"`
}

type UsersRecipesAccs struct {
	Id             string    `json:"id"`
	UserId         string    `json:"user_id"`
	RecipeId       string    `json:"recipe_id"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
	CutAveragePace string    `json:"cut_average_pace"`
}

type Recipes struct {
	Id        string    `json:"id"`
	DishName  string    `json:"dish_name"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type Acc struct {
	Id        string    `json:"id"`
	DishName  string    `json:"dish_name"`
	Url       string    `json:"url"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type HistogramCutPaces struct {
	UpdatedAt      time.Time `json:"updated_at"`
	CutTimes_00_04 string    `json:"cut_times_00_04"`
	CutTimes_04_06 string    `json:"cut_times_04_06"`
	CutTimes_06_08 string    `json:"cut_times_06_08"`
	CutTimes_08_10 string    `json:"cut_times_08_10"`
	CutTimes_10_12 string    `json:"cut_times_10_12"`
	CutTimes_12_14 string    `json:"cut_times_12_14"`
	CutTimes_14_16 string    `json:"cut_times_14_16"`
	CutTimes_16_18 string    `json:"cut_times_16_18"`
	CutTimes_18_20 string    `json:"cut_times_18_20"`
	CutTimes_20_22 string    `json:"cut_times_20_22"`
	CutTimes_22_24 string    `json:"cut_times_22_24"`
	CutTimes_24_26 string    `json:"cut_times_24_26"`
	CutTimes_26_28 string    `json:"cut_times_26_28"`
	CutTimes_28_30 string    `json:"cut_times_28_30"`
	CutTimes_30_32 string    `json:"cut_times_30_32"`
	CutTimes_32_34 string    `json:"cut_times_32_34"`
	CutTimes_34_36 string    `json:"cut_times_34_36"`
	CutTimes_36_38 string    `json:"cut_times_36_38"`
	CutTimes_38_40 string    `json:"cut_times_38_40"`
	CutTimes_40_42 string    `json:"cut_times_40_42"`
	CutTimes_42_44 string    `json:"cut_times_42_44"`
	CutTimes_44_46 string    `json:"cut_times_44_46"`
	CutTimes_46_48 string    `json:"cut_times_46_48"`
	CutTimes_48_50 string    `json:"cut_times_48_50"`
	CutTimes_50_   string    `json:"cut_times_50_"`
}

type ScrapingResults struct {
	ScrapingResult []Tsukurepo `json:"scraping_result"`
}

type Tsukurepo struct {
	Id      string `json:"id"`
	Name    string `json:"name"`
	ImgURL  string `json:"img_url"`
	Message string `json:"message"`
}

type ScrapingResultsByUser struct {
	ScrapingResultByUser []TsukurepoByUser `json:"scraping_result_by_user"`
}

type TsukurepoByUser struct {
	ImgURL   string `json:"img_url"`
	Message  string `json:"message"`
	RecipeID string `json:"recipe_id"`
}

// type User struct {
// 	ID        string    `json:"id"`
// 	Ble       string    `json:"ble"`
// 	Mail      string    `json:"mail"`
// 	Name      string    `json:"name"`
// 	Gender    int       `json:"gender"`
// 	Age       string    `json:"age"`
// 	Height    int       `json:"height"`
// 	Icon      string    `json:"icon"`
// 	CreatedAt time.Time `json:"created_at"`
// 	UpdatedAt time.Time `json:"update_at"`
// }

// type Coordinate struct {
// 	ID        string    `json:"id"`
// 	PutFlag   bool      `json:"put_flag" gorm:"default:false"`
// 	Public    bool      `json:"public" gorm:"default:false"`
// 	Image     string    `json:"image"`
// 	UserID    string    `json:"user_id"`
// 	CreatedAt time.Time `json:"created_at"`
// 	UpdatedAt time.Time `json:"update_at"`
// 	Wears     []Wear    `json:"wears" gorm:"foreignKey:CoordinateID"`
// }

// // 服の情報
// type Wear struct {
// 	ID           string    `json:"id"`
// 	Category     string    `json:"category"`
// 	Brand        string    `json:"brand"`
// 	Price        string    `json:"price"`
// 	CoordinateID string    `json:"coordinate_id"`
// 	CreatedAt    time.Time `json:"created_at"`
// 	UpdatedAt    time.Time `json:"update_at"`
// }

// type Like struct {
// 	ID            string    `json:"id"`
// 	Lat           float32   `json:"lat"`
// 	Lon           float32   `json:"lon"`
// 	SendUserID    string    `json:"send_user_id"`
// 	ReceiveUserID string    `json:"receive_user_id"`
// 	CoordinateID  string    `json:"coordinate_id"`
// 	CreatedAt     time.Time `json:"created_at"`
// 	UpdatedAt     time.Time `json:"update_at"`
// }

//以下yadaが使わなかったであろうもの
//
// type Ble struct {
// 	Coordinate_id string  `json:"coordinate_id"`
// 	Image         string  `json:"image"`
// 	Items         []*Item `json:"items"`
// 	Users         Users   `json:"users"`
// 	Status        bool    `json:"status"`
// }

// type Send_user struct {
// 	Gender int    `json:"gender"`
// 	Age    string `json:"age"`
// 	Height int    `json:"height"`
// 	Lat    string `json:"lat"`
// 	Lng    string `json:"lng"`
// }

// type Map struct {
// 	Coordinate_id string       `json:"coordinate_id"`
// 	User_id       string       `json:"user_id"`
// 	Image         string       `json:"image"`
// 	Send_users    []*Send_user `json:"send_users"`
// }

// type Maps struct {
// 	Maps   []*Map `json:"map"`
// 	Status bool   `json:"status"`
// }

// type ErrorResponse struct {
// 	Status  bool   `json:"status"`
// 	Message string `json:"message"`
// }
// type UserResponse struct {
// 	Status bool   `json:"status"`
// 	Id     string `json:"id"`
// }
// type TrueResponse struct {
// 	Status bool `json:"status"`
// }
