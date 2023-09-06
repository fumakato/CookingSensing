package controller

import (
	"cookSensing/model"
	"net/http"

	"github.com/gin-gonic/gin"

	"fmt"

	"log"

	"time"

	"github.com/PuerkitoBio/goquery"
)

func FindTsukurepos(c *gin.Context) {

}
func FindTsukureposById(c *gin.Context) {

}
func CreateTsukurepos(c *gin.Context) {

}
func UpdateTsukureposById(c *gin.Context) {

}

const url = "https://ja.wikipedia.org/wiki/SCADA"

// スクレイピングについて。もう忘れてるや😜
func Scraping(c *gin.Context) {
	var results model.ScrapingResultsByUser
	// var result model.TsukurepoByUser
	res, err := http.Get("https://cookpad.com/tsukurepo/list/37779795")
	if err != nil {
		log.Fatal(err)
	}
	defer res.Body.Close()
	var recipe_id []string
	var tsukurepo_id []string
	var imgurl []string
	var message []string
	// ImgURL   string `json:"img_url"`
	// Message  string `json:"message"`
	// RecipeID string `json:"recipe_id"`

	// Parse the HTML content using goquery
	doc, err := goquery.NewDocumentFromReader(res.Body)
	if err != nil {
		log.Fatal(err)
	}

	// Find all elements with class="message tsukurepo-message"
	doc.Find(".message.tsukurepo-message").Each(func(i int, s *goquery.Selection) {
		// Print the text content of the element
		// fmt.Println(s.Text())
		message = append(message, s.Text())
	})

	// Find the image source
	doc.Find(".tsukurepo-image.large_photo_clickable").Each(func(i int, s *goquery.Selection) {
		src, ok := s.Attr("src")
		if ok {
			// fmt.Println(src)
			imgurl = append(imgurl, src)
		}
	})

	doc.Find(".tsukurepo-recipe-wrapper.recipe-title").Each(func(i int, s *goquery.Selection) {
		recipeID, ok := s.Attr("data-recipe-id")
		if ok {
			// fmt.Println("data-recipe-id:", recipeID)
			recipe_id = append(recipe_id, recipeID)
		}
		tsukurepoID, ok := s.Attr("data-tsukurepo-id")
		if ok {
			// fmt.Println("data-recipe-id:", recipeID)
			tsukurepo_id = append(tsukurepo_id, tsukurepoID)
		}
	})

	i := 0
	for i = 0; i < len(message); i++ {
		newTsukurepoByUser := model.TsukurepoByUser{
			ImgURL:      imgurl[i],
			Message:     message[i],
			RecipeID:    recipe_id[i],
			TsukurepoID: tsukurepo_id[i],
		}
		results.ScrapingResultByUser = append(results.ScrapingResultByUser, newTsukurepoByUser)
	}
	fmt.Println(results)
	time.Sleep(time.Minute * 5)
	c.JSON(http.StatusOK, results)
}
