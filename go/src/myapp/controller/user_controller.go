package controller

import (
	"myapp/database"
	"myapp/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

// 全てのユーザーを取得
func GetUsers(c *gin.Context) {
	db := database.ConnectDB()
	defer db.Close()

	var users []model.User
	db.Find(&users)

	c.JSON(http.StatusOK, users)
}

// 新しいユーザーを作成
func CreateUser(c *gin.Context) {
	db := database.ConnectDB()
	defer db.Close()

	var user model.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db.Create(&user)
	c.JSON(http.StatusOK, user)
}
