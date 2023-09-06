package controller

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Radar struct {
	Datas  []int  `json:"datas"`
	Titles Title1 `json:"titles"`
}

type Title1 struct {
	Maintitle string   `json:"maintitle"`
	Mainlabel string   `json:"mainlabel"`
	Label     []string `json:"label"`
}

func RadarTest(c *gin.Context) {
	// id := c.Param("userid")
	var mtitle string = "あなたの実力"
	// var mainlabel string = "idは" + id
	var mainlabel string = "fuma さん"
	// var besidelabel []string = []string{"a", "b", "c", "d", "e", "f", "g", "h", "i", "j"}
	var besidelabel []string = []string{"動作の速さ", "安定性", "無駄のなさ", "計画性"}

	// var testdata []int = []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	var testdata []int = []int{5, 6, 4, 8}
	var testtitle Title1 = Title1{mtitle, mainlabel, besidelabel}

	var radar Radar = Radar{testdata, testtitle}
	fmt.Println(radar)
	c.JSON(http.StatusOK, radar)
}
func FindCharts(c *gin.Context) {

}
func FindChartsById(c *gin.Context) {

}
func CreateCharts(c *gin.Context) {

}
func UpdateChartsById(c *gin.Context) {

}
