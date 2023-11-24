//yadaからもらったファイルそのまま
//  apiのURLの一つ目の部分になる　http://localhost:3000/users/ のusers/の部分
//叩かれたapiの処理している部分

//users
//recipes

package controller

import (
	"cookSensing/database"
	"cookSensing/model"
	"encoding/csv"
	"fmt"
	"net/http"

	"strconv"

	"io"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
)

// 全ユーザの一覧検索(多分使わん)
func FindUsers(c *gin.Context) {
	fmt.Println("FindUsers")
	var user []model.Users
	db := database.Connect()
	defer db.Close()
	if err := db.Find(&user).Error; err != nil {
		c.String(http.StatusNotFound, "Not Found")
		return
	}
	// Response
	c.JSON(http.StatusOK, user)
}

// ユーザをIDで検索
func FindUsersById(c *gin.Context) {
	// Get path pram ":id"
	fmt.Println("FindUsersById")
	id := c.Param("id")
	fmt.Println("id=「" + id + "」")
	var user model.Users
	// Connect database
	db := database.Connect()
	defer db.Close()
	// Find
	// if err := db.First(&user, "id = ?", id).Error; err != nil {
	if err := db.First(&user, "user_id = ?", id).Error; err != nil {
		fmt.Println("見つかりません")
		c.String(http.StatusNotFound, "Not Found")
		return
	}
	// Response
	fmt.Println("見つかりました")
	c.JSON(http.StatusOK, user)
}

func FindUsersByUid(c *gin.Context) {
	// Get path pram ":id"
	fmt.Println("FindUsersByUid")
	id := c.Param("uid")
	fmt.Println("id=「" + id + "」")

	userid := 54208270

	// var user model.Users
	// // Connect database
	// db := database.Connect()
	// defer db.Close()
	// // Find
	// // if err := db.First(&user, "id = ?", id).Error; err != nil {
	// if err := db.First(&user, "user_id = ?", id).Error; err != nil {
	// 	fmt.Println("見つかりません")
	// 	c.String(http.StatusNotFound, "Not Found")
	// 	return
	// }
	// // Response
	// fmt.Println("見つかりました")
	c.JSON(http.StatusOK, userid)
}

// ユーザの登録
func CreateUsers(c *gin.Context) {
	fmt.Println("user 登録のPOST")
	var user model.Users //ここでuserの実体化

	if err := c.BindJSON(&user); err != nil { //引数からuserの方に入れる。入れれるかのチェックもしてる
		c.String(http.StatusBadRequest, "Bad request")
		fmt.Println("型が違う可能性あり。エラー内容:", err) // エラー内容をコンソールに表示
		return
	}
	// Connect database
	db := database.Connect()
	defer db.Close()
	// user.UserId = database.GenerateId() // IDをここで作ってる。でも今回は入力してもらう手筈だから多分要らんくなる
	//上みたいな感じに入力すれば特定の値を変えて登録ができる
	if err := db.Create(&user).Error; err != nil {
		c.String(http.StatusBadRequest, "Bad request")
		fmt.Println("DBに登録する際にエラーが発生。エラー内容:", err)
		return
	}
	// Response
	c.JSON(http.StatusCreated, user)
	fmt.Println("登録完了")
}

// アップデートのやつ
func UpdateUsersById(c *gin.Context) {
	fmt.Println("PUTの関数")

	var updateUser model.Users
	// Validation Check
	if err := c.BindJSON(&updateUser); err != nil {
		fmt.Println("POSTパラメータの取得失敗")
		c.String(http.StatusBadRequest, "Bad request")
		return
	}
	// Connect database
	db := database.Connect()
	defer db.Close()

	var user model.Users

	if err := db.Model(&user).First("user_id = ?", updateUser.UserId).Update(updateUser).Error; err != nil {
		c.String(http.StatusBadRequest, "Bad request")
		return
	}
	// Response
	c.JSON(http.StatusCreated, user)
}

// 生データをアップロードするならこれかなー
func DataUpload(c *gin.Context) {

	exe, err := os.Executable()
	if err != nil {
		fmt.Println("実行場所の取得に失敗しました:", err)
		return
	}

	// 実行場所のディレクトリを取得
	dir := filepath.Dir(exe)

	fmt.Println("実行場所:", dir)
	// 🔴🔴フォームからファイルを取得します
	file, header, err := c.Request.FormFile("file")

	// file, header, err := c.
	if err != nil {
		c.String(400, fmt.Sprintf("ファイルの取得エラー: %s", err.Error()))
		return
	}
	defer file.Close()

	// アップロードされたファイルを一時的なフォルダに保存します
	tempDir := "./temp"
	if err := os.MkdirAll(tempDir, os.ModePerm); err != nil {
		c.String(500, fmt.Sprintf("一時フォルダの作成エラー: %s", err.Error()))
		return
	}
	tempFilename := filepath.Join(tempDir, header.Filename)
	tempFile, err := os.Create(tempFilename)
	if err != nil {
		c.String(500, fmt.Sprintf("一時ファイルの作成エラー: %s", err.Error()))
		return
	}
	defer tempFile.Close()
	_, err = io.Copy(tempFile, file)
	if err != nil {
		c.String(500, fmt.Sprintf("一時ファイルの保存エラー: %s", err.Error()))
		return
	}
	// 一時ファイルを開いてデータを変更します
	tempFile, err = os.Open(tempFilename)
	if err != nil {
		c.String(500, fmt.Sprintf("一時ファイルのオープンエラー: %s", err.Error()))
		return
	}
	defer tempFile.Close()

	//ここから
	// 入力となるCSVファイル名と出力CSVファイル名
	inputFileName := "./temp/ayato2_cutData.csv"
	outputFileName := "./temp/output.csv"

	// CSVファイルを読み込み
	inputFile, err := os.Open(inputFileName)
	if err != nil {
		panic(err)
	}
	defer inputFile.Close()

	// 出力用のCSVファイルを作成
	outputFile, err := os.Create(outputFileName)
	if err != nil {
		panic(err)
	}
	defer outputFile.Close()

	// // CSVライターを作成
	csvWriter := csv.NewWriter(outputFile)
	defer csvWriter.Flush()

	// CSVファイルを読み込んで行ごとに処理
	csvReader := csv.NewReader(inputFile)
	for {
		// 1行読み込み
		record, err := csvReader.Read()
		if err != nil {
			break
		}

		// value, err := strconv.Atoi(record[2])
		// if err != nil {
		// 	// 数値でない場合はそのまま出力
		// 	continue
		// }
		// // 条件に応じて値を書き換え
		// if value >= 30 {
		// 	record[2] = "999"
		// }

		// 各列に対して処理
		for i := range record {
			// 数値に変換

			// value, err := strconv.Atoi(record[2])
			// 文字列を浮動小数点数に変換
			value, err := strconv.ParseFloat(record[2], 64)
			if err != nil {
				fmt.Println("変換に失敗しました:", err)
				// 数値でない場合はそのまま出力
				continue
			}
			// 条件に応じて値を書き換え
			if value >= 30 {
				record[2] = "999"
			}
			fmt.Print(i)
		}

		// 更新した行を新しいCSVファイルに書き込み
		if err := csvWriter.Write(record); err != nil {
			panic(err)
		}
	}

	fmt.Println("CSVファイルの処理が完了しました。")
	///ここまで

	// // 一時ファイルの内容を変更して新しいファイルに保存します
	// outputDir := "./uploads"
	// if err := os.MkdirAll(outputDir, os.ModePerm); err != nil {
	// 	c.String(500, fmt.Sprintf("出力フォルダの作成エラー: %s", err.Error()))
	// 	return
	// }
	// outputFilename := filepath.Join(outputDir, header.Filename)
	// outputFile, err := os.Create(outputFilename)
	// if err != nil {
	// 	c.String(500, fmt.Sprintf("出力ファイルの作成エラー: %s", err.Error()))
	// 	return
	// }
	// defer outputFile.Close()

	// scanner := bufio.NewScanner(tempFile)
	// for scanner.Scan() {
	// 	var data string = ""
	// 	line := scanner.Text()
	// 	// 文字列をコンマで分割
	// 	parts := strings.Split(line, ",")
	// 	// 各行の末尾に「aaa」を追加
	// 	for _, part := range parts {
	// 		fmt.Println(part)
	// 		data = fmt.Sprintf("%s,%s", part, "aaa,")
	// 	}
	// 	outputFile.WriteString(data + "\n")
	// }

	c.String(200, fmt.Sprintf("ファイル %s のアップロードが完了し、変更が適用されました", header.Filename))

	// // アップロードされたファイルを保存するフォルダを指定します
	// uploadDir := "./uploads"
	// if err := os.MkdirAll(uploadDir, os.ModePerm); err != nil {
	// 	c.String(500, fmt.Sprintf("フォルダの作成エラー: %s", err.Error()))
	// 	return
	// }
	// // ファイル名を変更して保存します
	// filename := header.Filename
	// newFilename := filepath.Join(uploadDir, filename)
	// out, err := os.Create(newFilename)
	// if err != nil {
	// 	c.String(500, fmt.Sprintf("ファイルの作成エラー: %s", err.Error()))
	// 	return
	// }
	// defer out.Close()

	// _, err = io.Copy(out, file)
	// if err != nil {
	// 	c.String(500, fmt.Sprintf("ファイルの保存エラー: %s", err.Error()))
	// 	return
	// }

	// // ファイルの内容を読み取り、各行の末尾に「。。」を追加します
	// reader := io.TeeReader(file, out)
	// buf := make([]byte, 1024)
	// for {
	// 	n, err := reader.Read(buf)
	// 	if err != nil && err != io.EOF {
	// 		c.String(500, fmt.Sprintf("ファイルの読み取りエラー: %s", err.Error()))
	// 		return
	// 	}
	// 	if n == 0 {
	// 		break
	// 	}
	// }

	// c.String(200, fmt.Sprintf("ファイル %s のアップロードが完了しました", filename))

}

// func FindUsers(c *gin.Context) {
// 	var users []model.User
// 	// Connect database
// 	db := database.Connect()
// 	defer db.Close()
// 	// Find coordinates
// 	if err := db.Find(&users).Error; err != nil {
// 		c.String(http.StatusNotFound, "Not Found")
// 		return
// 	}
// 	// Response
// 	c.JSON(http.StatusOK, users)
// }

// func FindUsersByMail(c *gin.Context) {
// 	// Get path pram ":mail"
// 	mail := c.Param("mail")
// 	var user model.User
// 	// Connect database
// 	db := database.Connect()
// 	defer db.Close()
// 	// Find coordinates
// 	if err := db.Where("mail = ?", mail).First(&user).Error; err != nil {
// 		c.String(http.StatusNotFound, "Not Found")
// 		return
// 	}
// 	// Response
// 	c.JSON(http.StatusOK, user)
// }

// func FindUsersById(c *gin.Context) {
// 	// Get path pram ":id"
// 	id := c.Param("id")
// 	var user model.User
// 	// Connect database
// 	db := database.Connect()
// 	defer db.Close()
// 	// Find coordinates
// 	if err := db.First(&user, "id = ?", id).Error; err != nil {
// 		c.String(http.StatusNotFound, "Not Found")
// 		return
// 	}
// 	// Response
// 	c.JSON(http.StatusOK, user)
// }

// // coordinateidをもとにその服を評価したlikesを受け取り、その中からsenduserを取り出しいいねをしたuser情報を返す
// func FindUsersBySendUser(c *gin.Context) {
// 	// Get path pram ":id"
// 	id := c.Param("id")
// 	var likes []model.Like
// 	// Connect database
// 	db := database.Connect()
// 	defer db.Close()
// 	// Find Likes
// 	if err := db.Where("coordinate_id = ?", id).Find(&likes).Error; err != nil {
// 		c.String(http.StatusBadRequest, "Bad request : Not Exist CoordinateID")
// 		return
// 	}
// 	var sendUsers []string
// 	for _, senduser := range likes {
// 		sendUsers = append(sendUsers, senduser.SendUserID)
// 	}

// 	var users []model.User
// 	if err := db.Where("id IN (?)", sendUsers).Find(&users).Error; err != nil {
// 		c.String(http.StatusNotFound, "Not Found")
// 		return
// 	}
// 	// Response
// 	c.JSON(http.StatusOK, users)
// }

// func FindUsersByPublicSendUser(c *gin.Context) {
// 	var coordinates []model.Coordinate
// 	// Connect database
// 	db := database.Connect()
// 	defer db.Close()
// 	// Find coordinates
// 	if err := db.Where("public = ?", true).Find(&coordinates).Error; err != nil {
// 		c.String(http.StatusNotFound, "Not Found")
// 		return
// 	}
// 	var coordinateIds []string
// 	for _, coordinate := range coordinates {
// 		coordinateIds = append(coordinateIds, coordinate.ID)

// 	}

// 	var likes []model.Like

// 	if err := db.Where("coordinate_id IN (?)", coordinateIds).Find(&likes).Error; err != nil {
// 		c.String(http.StatusNotFound, "Not Found")
// 		return
// 	}

// 	var sendusers []string
// 	for _, like := range likes {
// 		sendusers = append(sendusers, like.SendUserID)

// 	}

// 	var users []model.User
// 	if err := db.Where("id IN (?)", sendusers).Find(&users).Error; err != nil {
// 		c.String(http.StatusNotFound, "Not Found")
// 		return
// 	}

// 	// Response
// 	c.JSON(http.StatusOK, users)
// }
// func FindUsersByReceiveUserIdLikesSendUser(c *gin.Context) {
// 	// Get path pram ":id"
// 	id := c.Param("id")
// 	var likes []model.Like
// 	// Connect database
// 	db := database.Connect()
// 	defer db.Close()
// 	// Find coordinates
// 	if err := db.Where("receive_user_id = ?", id).Find(&likes).Error; err != nil {
// 		c.String(http.StatusNotFound, "Not Found")
// 		return
// 	}
// 	var sendusers []string
// 	for _, like := range likes {
// 		sendusers = append(sendusers, like.SendUserID)

// 	}
// 	var users []model.User
// 	if err := db.Where("id IN (?)", sendusers).Find(&users).Error; err != nil {
// 		c.String(http.StatusNotFound, "Not Found")
// 		return
// 	}

// 	// Response
// 	c.JSON(http.StatusOK, users)
// }

// func UpdateUsersById(c *gin.Context) {
// 	// Get path pram ":id"
// 	id := c.Param("id")
// 	var user model.User
// 	// Validation Check
// 	if err := c.BindJSON(&user); err != nil {
// 		c.String(http.StatusBadRequest, "Bad request")
// 		return
// 	}
// 	// Connect database
// 	db := database.Connect()
// 	defer db.Close()
// 	// Update coordinate
// 	user.ID = id
// 	if err := db.Save(&user).Error; err != nil {
// 		c.String(http.StatusBadRequest, "Bad request")
// 		return
// 	}
// 	// Response
// 	c.JSON(http.StatusCreated, user)
// }

// func DeleteUsersById(c *gin.Context) {
// 	// Get path pram ":id"
// 	id := c.Param("id")
// 	// Connect database
// 	db := database.Connect()
// 	defer db.Close()
// 	// Delete coordinate
// 	if err := db.Delete(&model.User{}, "id = ?", id).Error; err != nil {
// 		c.String(http.StatusInternalServerError, "Server Error")
// 		return
// 	}
// 	c.JSON(http.StatusCreated, "OK")
// }
