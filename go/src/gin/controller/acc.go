package controller

import (
	"cookSensing/database"
	"cookSensing/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateAcc(c *gin.Context) {
	var recipe model.Recipes //ここでuserの実体化
	// Validation Check
	if err := c.BindJSON(&recipe); err != nil { //引数からuserの方に入れる。入れれるかのチェックもしてる
		c.String(http.StatusBadRequest, "Bad request")
		return
	}
	// Connect database
	db := database.Connect()
	defer db.Close()
	// Create coordinate
	// recipe.Id = database.GenerateId()//🔴ここは変更する必要あり
	if err := db.Create(&recipe).Error; err != nil {
		c.String(http.StatusBadRequest, "Bad request")
		return
	}
	// Response
	c.JSON(http.StatusCreated, recipe)
}
