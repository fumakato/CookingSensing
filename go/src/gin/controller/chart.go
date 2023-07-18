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
	id := c.Param("userid")
	var mtitle string = "タイトル"
	var mainlabel string = "idは" + id
	var besidelabel []string = []string{"a", "b", "c", "d", "e", "f", "g", "h", "i", "j"}

	var testdata []int = []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	var testtitle Title1 = Title1{mtitle, mainlabel, besidelabel}

	var radar Radar = Radar{testdata, testtitle}
	fmt.Println(radar)
	c.JSON(http.StatusOK, radar)
}
