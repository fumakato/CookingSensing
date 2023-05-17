package controller

import (
	"cookSensing/database"
	"cookSensing/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

func FindCutPace(c *gin.Context) {
	// Get path pram ":id"
	//id := c.Param("id")
	var comp model.HistogramCutPaces
	// Connect database
	db := database.Connect()
	defer db.Close() //deferを使うと全て終わった後に実行される
	// Find coordinates
	if err := db.First(&comp, "id = 1").Error; err != nil {
		c.String(http.StatusNotFound, "Not Found")
		return
	}
	// Response
	c.JSON(http.StatusOK, comp)
}
