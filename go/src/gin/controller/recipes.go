package controller

import (
	"cookSensing/database"
	"cookSensing/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateRecipe(c *gin.Context) {
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

// 先頭一致
// これはREACT側でやるべきかも
//
//	https://cookpad.com/recipe/   これと一致しているがどうか
//
// var s = "https://cookpad.com/recipe/3883935"
// fmt.Println(strings.HasPrefix(s, "https://cookpad.com/recipe/")) // -> true
// fmt.Println(s[26:])
func FindRecipes(c *gin.Context) {

}
func FindRecipesById(c *gin.Context) {

}
func CreateRecipes(c *gin.Context) {

}
func UpdateRecipesById(c *gin.Context) {

}
