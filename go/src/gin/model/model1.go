//yadaからもらったのそのまま
//多分構造体を定義している

package model

import (
	"time"

	_ "github.com/go-sql-driver/mysql"
)

type Users struct {
	//ginではuserというテーブルにアクセスするときに自動的にusersを探してしまう。
	//そのためmysqlのテーブル名はusersにする必要がある
	UserId         int       `json:"user_id"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at" `
	FirebaseUid    string    `json:"firebase_uid" `
	Identification bool      `json:"identification"`
	Name           string    `json:"name"`
	Image          string    `json:"image"`
	HistogramId    int       `json:"histogram_id"`
	RadarId        int       `json:"radar_id"`
	LineId         int       `json:"line_id"`
}

// UserId      int       `json:"user_id" gorm:"primaryKey;not null"`
// CreatedAt   time.Time `json:"created_at" gorm:"default:CURRENT_TIMESTAMP"`
// UpdatedAt   time.Time `json:"updated_at" gorm:autoUpdateTime`
// Name        string    `json:"name" gorm:"not null"`

type ChartDatas struct {
	DataId    int       `json:"data_id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	LabelId   int       `json:"label_id"`
	Data1     float32   `json:"data1"`
	Data2     float32   `json:"data2"`
	Data3     float32   `json:"data3"`
	Data4     float32   `json:"data4"`
	Data5     float32   `json:"data5"`
	Data6     float32   `json:"data6"`
	Data7     float32   `json:"data7"`
	Data8     float32   `json:"data8"`
	Data9     float32   `json:"data9"`
	Data10    float32   `json:"data10"`
	Data11    float32   `json:"data11"`
	Data12    float32   `json:"data12"`
	Data13    float32   `json:"data13"`
	Data14    float32   `json:"data14"`
	Data15    float32   `json:"data15"`
	Data16    float32   `json:"data16"`
	Data17    float32   `json:"data17"`
	Data18    float32   `json:"data18"`
	Data19    float32   `json:"data19"`
	Data20    float32   `json:"data20"`
}

type HistogramLabels struct {
	HistogramId    int       `json:"histogram"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
	Type           string    `json:"type"`
	MainTitle      string    `json:"main_title"`
	MainLabel      string    `json:"main_label"`
	BesideTitle    string    `json:"beside"`
	VerticalTitle  string    `json:"vert"`
	BesideLabelNum int       `json:"beside_label_num"`
	BesideLabel1   string    `json:"beside_label1"`
	BesideLabel2   string    `json:"beside_label2"`
	BesideLabel3   string    `json:"beside_label3"`
	BesideLabel4   string    `json:"beside_label4"`
	BesideLabel5   string    `json:"beside_label5"`
	BesideLabel6   string    `json:"beside_label6"`
	BesideLabel7   string    `json:"beside_label7"`
	BesideLabel8   string    `json:"beside_label8"`
	BesideLabel9   string    `json:"beside_label9"`
	BesideLabel10  string    `json:"beside_label10"`
	BesideLabel11  string    `json:"beside_label11"`
	BesideLabel12  string    `json:"beside_label12"`
	BesideLabel13  string    `json:"beside_label13"`
	BesideLabel14  string    `json:"beside_label14"`
	BesideLabel15  string    `json:"beside_label15"`
	BesideLabel16  string    `json:"beside_label16"`
	BesideLabel17  string    `json:"beside_label17"`
	BesideLabel18  string    `json:"beside_label18"`
	BesideLabel19  string    `json:"beside_label19"`
	BesideLabel20  string    `json:"beside_label20"`
}

type RadarLabels struct {
	RadarId   int       `json:"radar_id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Type      string    `json:"type"`
	MainTitle string    `json:"main_title"`
	MainLabel string    `json:"main_label"`
	LabelNum  int       `json:"label_num"`
	Label1    string    `json:"label1"`
	Label2    string    `json:"label2"`
	Label3    string    `json:"label3"`
	Label4    string    `json:"label4"`
	Label5    string    `json:"label5"`
	Label6    string    `json:"label6"`
	Label7    string    `json:"label7"`
	Label8    string    `json:"label8"`
	Label9    string    `json:"label9"`
	Label10   string    `json:"label10"`
	Label11   string    `json:"label11"`
	Label12   string    `json:"label12"`
	Label13   string    `json:"label13"`
	Label14   string    `json:"label14"`
	Label15   string    `json:"label15"`
	Label16   string    `json:"label16"`
	Label17   string    `json:"label17"`
	Label18   string    `json:"label18"`
	Label19   string    `json:"label19"`
	Label20   string    `json:"label20"`
}

type Recipes struct {
	RecipeId    string    `json:"recipe_id"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	Title       string    `json:"title"`
	Explanation string    `json:"explanation"`
	Material    string    `json:"Material"`
	Author      string    `json:"author"`
	Image       string    `json:"image"`
}

type Tsukurepos struct {
	Tsukurepo_Id string    `json:"id"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
	Comment      string    `json:"comment"`
	Image        string    `json:"image"`
	UserId       int       `json:"user_id"`
	HistogramId  int       `json:"histogram_id"`
	RadarId      int       `json:"radius_id"`
}

type CsvDatas struct {
	UserId   int    `json:"user_id"`
	RecipeId int    `json:"recipe_id"`
	CsvFile  string `json:"csv_file"`
}

// type Recipes struct {
// 	Id        string    `json:"id"`
// 	DishName  string    `json:"dish_name"`
// 	CreatedAt time.Time `json:"created_at"`
// 	UpdatedAt time.Time `json:"updated_at"`
// }

type UsersRecipesAccs struct {
	Id             string    `json:"id"`
	UserId         string    `json:"user_id"`
	RecipeId       string    `json:"recipe_id"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
	CutAveragePace string    `json:"cut_average_pace"`
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

// type ScrapingResults struct {
// 	ScrapingResult []Tsukurepo `json:"scraping_result"`
// }

type ScrapingResultsByUser struct {
	ScrapingResultByUser []TsukurepoByUser `json:"scraping_result_by_user"`
}

type TsukurepoByUser struct {
	ImgURL      string `json:"img_url"`
	Message     string `json:"message"`
	RecipeID    string `json:"recipe_id"`
	TsukurepoID string `json:"tsukurepo_id"`
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

//	type Users struct {
//		Id                 string    `json:"id"`
//		CreatedAt          time.Time `json:"created_at"`
//		UpdatedAt          time.Time `json:"updated_at"`
//		Mail               string    `json:"mail"`
//		Name               string    `json:"name"`
//		Pass               string    `json:"pass"`
//		BestCutAveragePace string    `json:"best_cut_average_pace"`
//	}
