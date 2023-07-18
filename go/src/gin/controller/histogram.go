package controller

import (
	"cookSensing/database"
	"cookSensing/model"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Histogram struct {
	Datas  []int `json:"datas"`
	Titles Title `json:"titles"`
	Grade  int   `json:"grade"`
}

type Title struct {
	Maintitle     string   `json:"maintitle"`
	Besidetitle   string   `json:"besidetitle"`
	Verticaltitle string   `json:"verticaltitle"`
	Besidelabel   []string `json:"besidelabel"`
}

func TestHistogram(c *gin.Context) {
	var mtitle string = "切る速さ"
	var btitle string = "グレード"
	var vtitle string = "人数"
	var besidelabel []string = []string{"a", "b", "c", "d", "e", "f", "g", "h", "i", "j"}

	var testdata []int = []int{1, 1, 3, 4, 5, 6, 7, 4, 4, 1}
	var testtitle Title = Title{mtitle, btitle, vtitle, besidelabel}
	var testgrade int = 3

	var histogram Histogram = Histogram{testdata, testtitle, testgrade}
	fmt.Println(histogram)
	fmt.Println(testtitle)
	c.JSON(http.StatusOK, histogram)
}

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
