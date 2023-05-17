package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// GETリクエストでクエリパラメータを受け取る
	// r.GET("/example/:name", func(c *gin.Context) {
	r.GET("/example", func(c *gin.Context) {

		// クエリパラメータの取得
		name := c.Param("name")
		// age := c.Param("age")

		// name := "a"
		// age := "aa"

		// 取得したクエリパラメータの利用
		response := fmt.Sprintf("name: %s", name)
		// response := fmt.Sprintf("name: %s, age: %s", name, age)
		c.JSON(http.StatusOK, gin.H{"message": response})
	})

	r.Run(":8080")
}

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
