//yadaからもらったのそのまま
//データベースとの接続に関わることをしているっぽい

package database

import (
	"fmt"
	"time"

	"cookSensing/model"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	"github.com/teris-io/shortid"
)

func Connect() (database *gorm.DB) {
	DBMS := "mysql"
	USER := "root"
	PASS := "rootcooksensing"
	PROTOCOL := "tcp(localhost:3306)"
	DB_NAME := "cook_sensing"
	CONNECT := USER + ":" + PASS + "@" + PROTOCOL + "/" + DB_NAME + "?charset=utf8&parseTime=true&loc=Asia%2FTokyo"
	if db, err := gorm.Open(DBMS, CONNECT); err != nil {
		panic(err.Error())
	} else {
		return db
	}
}

// IDに使用するユニークキーをここで作る
func GenerateId() string {
	if sid, err := shortid.New(1, shortid.DefaultABC, 2342); err != nil {
		panic(err.Error())
	} else {
		return sid.MustGenerate()
	}
}

// 今の時間を取得
func GetDateNow() time.Time {
	return time.Now()
}

// //userのモデルのフラグをアップデートする。それぞれの値に入れる値を入れる
// //引数にdb と user_Idをもらっている
// func UpdatePutFlag(db *gorm.DB, user_id string) {
// 	db.Model(model.Coordinate{}).Where("user_id = ?", user_id).Updates(model.Coordinate{
// 		PutFlag:   false,
// 		UpdatedAt: GetDateNow(),
// 	})
// }

// マイグレートをする。データベースの操作に必要になるらしい
func Migrate(db *gorm.DB) {
	db.AutoMigrate(&model.Users{})
	// db.AutoMigrate(&model.UsersRecipesAccs{})
	// db.AutoMigrate(&model.Recipes{})
	//db.AutoMigrate(&model.Acc{})
	// db.AutoMigrate(&model.HistogramCutPaces{})
	db.AutoMigrate(&model.Users{})

}

func ShowUser(db *gorm.DB) {
	user := []*model.Users{}
	if err := db.Find(&user).Error; err != nil {
		return
	}
	fmt.Println("=== user ===")
	for _, user_one := range user {
		fmt.Println(user_one)
	}
}

func ShowChartData(db *gorm.DB) {
	datas := []*model.ChartDatas{}
	if err := db.Find(&datas).Error; err != nil {
		return
	}
	fmt.Println("=== chart_data ===")
	for _, data := range datas {
		fmt.Println(data)
	}
}

func ShowHistogramLabel(db *gorm.DB) {
	datas := []*model.HistogramLabels{}
	if err := db.Find(&datas).Error; err != nil {
		return
	}
	fmt.Println("=== histogram_label ===")
	for _, data := range datas {
		fmt.Println(data)
	}
}

func ShowRadarLabel(db *gorm.DB) {
	datas := []*model.RadarLabels{}
	if err := db.Find(&datas).Error; err != nil {
		return
	}
	fmt.Println("=== radar_label ===")
	for _, data := range datas {
		fmt.Println(data)
	}
}

func ShowRecipe(db *gorm.DB) {
	datas := []*model.Recipes{}
	if err := db.Find(&datas).Error; err != nil {
		return
	}
	fmt.Println("=== recipe ===")
	for _, data := range datas {
		fmt.Println(data)
	}
}

func ShowTsukurepo(db *gorm.DB) {
	datas := []*model.Tsukurepos{}
	if err := db.Find(&datas).Error; err != nil {
		return
	}
	fmt.Println("=== tsukurepo ===")
	for _, data := range datas {
		fmt.Println(data)
	}
}

// func ShowUsersRecipesAccs(db *gorm.DB) {
// 	usersAcc := []*model.UsersRecipesAccs{}
// 	if err := db.Find(&usersAcc).Error; err != nil {
// 		return
// 	}
// 	fmt.Println("=== users_recipes_accs ===")
// 	for _, usersacc := range usersAcc {
// 		fmt.Println(usersacc)
// 	}
// }

// func ShowRecipes(db *gorm.DB) {
// 	recipes := []*model.Recipes{}
// 	if err := db.Find(&recipes).Error; err != nil {
// 		return
// 	}
// 	fmt.Println("=== recipes ===")
// 	for _, recipe := range recipes {
// 		fmt.Println(recipe)
// 	}
// }

// func ShowHistogramCutPaces(db *gorm.DB) {
// 	datas := []*model.HistogramCutPaces{}
// 	if err := db.Find(&datas).Error; err != nil {
// 		return
// 	}
// 	fmt.Println("=== histogram_cut_paces ===")
// 	for _, data := range datas {
// 		fmt.Println(data)
// 	}
// }

// func ShowCoordinate(db *gorm.DB) {
// 	coordinates := []*model.Coordinate{}
// 	if err := db.Find(&coordinates).Error; err != nil {
// 		return
// 	}
// 	fmt.Println("=== coordinates ===")
// 	for _, coordinate := range coordinates {
// 		fmt.Println(coordinate)
// 	}
// }

// func ShowLike(db *gorm.DB) {
// 	Likes := []*model.Like{}
// 	if err := db.Find(&Likes).Error; err != nil {
// 		return
// 	}
// 	fmt.Println("=== likes ===")
// 	for _, like := range Likes {
// 		fmt.Println(like)
// 	}
// }

// // デリートする。多分使わん
// func DeleteAll(db *gorm.DB) {
// 	db.Delete(&model.Coordinate{})
// 	db.Delete(&model.User{})
// 	db.Delete(&model.Like{})
// }
