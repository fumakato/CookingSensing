package controller

// import (
// 	// "myapp/database"
// 	// "myapp/model"
// 	// "net/http"

// 	"github.com/gin-gonic/gin"
// )

import (
	"myapp/database"
	"net/http"

	"myapp/model"

	"errors" // 追加

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetUserAll(c *gin.Context) {
	// BestDataを取得
	userData, err := database.FindAllUser()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve data"})
		return
	}

	// 成功した場合、データをJSONで返す
	c.JSON(http.StatusOK, gin.H{"data": userData})
}

func CreateUser(c *gin.Context) {
	var user model.User

	// リクエストボディからJSONをパース
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	// ポインタとして渡してデータベースにユーザーを追加
	if err := database.AddUser(&user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add user"})
		return
	}

	// 成功レスポンスとしてIDを含めて返す
	c.JSON(http.StatusOK, gin.H{
		"message": "User created successfully",
		"id":      user.ID, // IDをレスポンスに含める
	})
}

// UserEmailRequest is used to bind the JSON request body for email search
type UserFirebaseAuthUidRequest struct {
	FirebaseAuthUid string `json:"firebase_auth_uid" binding:"required"`
}

// SearchUserByEmailHandler handles the POST request to search for a user by email
func SearchUserByFirebaseAuthUidHandler(c *gin.Context) {
	var req UserFirebaseAuthUidRequest

	// Bind JSON data from request body
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid firebase_auth_uid format"})
		return
	}

	// Search for user by firebase_auth_uid
	user, err := database.FindUserByFirebaseAuthUid(req.FirebaseAuthUid)
	if err != nil {
		// If the user is not found, return a 404 status
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"message": "User not found"})
		} else {
			// For other errors, return a 500 status
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		}
		return
	}
	// If user is found, return the user data
	c.JSON(http.StatusOK, user)
}

// UserEmailRequest is used to bind the JSON request body for email search
type UserEmailRequest struct {
	Email string `json:"email" binding:"required"`
}

// SearchUserByEmailHandler handles the POST request to search for a user by email
func SearchUserByEmailHandler(c *gin.Context) {
	var req UserEmailRequest

	// Bind JSON data from request body
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid email format"})
		return
	}

	// Search for user by email
	user, err := database.FindUserByEmail(req.Email)
	if err != nil {
		// If the user is not found, return a 404 status
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"message": "User not found"})
		} else {
			// For other errors, return a 500 status
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		}
		return
	}

	// If user is found, return the user data
	c.JSON(http.StatusOK, user)
}

// 全てのユーザーを取得
func GetUsers(c *gin.Context) {
	// db := database.ConnectDB()
	// defer db.Close()

	// var users []model.User
	// db.Find(&users)

	// c.JSON(http.StatusOK, users)
}

// 新しいユーザーを作成
// func CreateUser(c *gin.Context) {
// db := database.ConnectDB()
// defer db.Close()

// var user model.User
// if err := c.ShouldBindJSON(&user); err != nil {
// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 	return
// }

// db.Create(&user)
// c.JSON(http.StatusOK, user)
// }
