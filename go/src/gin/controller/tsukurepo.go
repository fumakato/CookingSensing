package controller

import (
	"cookSensing/model"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"

	"fmt"
	"os/exec"
	"strings"

	"log"

	"github.com/PuerkitoBio/goquery"
)

const url = "https://ja.wikipedia.org/wiki/SCADA"

func Scraping(c *gin.Context) {
	var results model.ScrapingResultsByUser
	// var result model.TsukurepoByUser
	res, err := http.Get("https://cookpad.com/tsukurepo/list/37779795")
	if err != nil {
		log.Fatal(err)
	}
	defer res.Body.Close()
	var recipe_id []string
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
	})
	i := 0
	for i = 0; i < len(message); i++ {
		newTsukurepoByUser := model.TsukurepoByUser{
			ImgURL:   imgurl[i],
			Message:  message[i],
			RecipeID: recipe_id[i],
		}
		results.ScrapingResultByUser = append(results.ScrapingResultByUser, newTsukurepoByUser)
	}

	c.JSON(http.StatusOK, results)
}

func Scraping2(c *gin.Context) {

	// url := c.Param("url")
	// url := "https://cookpad.com/recipe/1438866"
	url := "https://cookpad.com/kitchen/37779795"
	var results model.ScrapingResults

	// Pythonスクリプトのパスと引数を指定
	cmd := exec.Command("python3", "controller/cookpad2.py", url)
	// 標準出力をキャプチャするためのバッファを作成
	// stdout, err := cmd.Output()
	stdout, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Println("エラー(スクレイピング):", err)
		fmt.Println(string(stdout))
		os.Exit(1)
	}
	fmt.Println("tesuto")
	fmt.Println(string(stdout))
	fmt.Println(stdout)
	fmt.Println("tesuto")
	lines := strings.Split(string(stdout), "\n")
	i := 0
	var tsukurepo_id []string
	var name []string
	var imgurl []string
	var message []string
	if lines[0] == "recipe" || lines[0] == "kitchen" {
		lines = lines[1:]
		for _, line := range lines {
			if i%4 == 0 {
				tsukurepo_id = append(tsukurepo_id, line)
			} else if i%4 == 1 {
				name = append(name, line)
			} else if i%4 == 2 {
				imgurl = append(imgurl, line)
			} else if i%4 == 3 {
				message = append(message, line)
			}
			i += 1
		}
		for i = 0; i < len(message); i++ {
			newTsukurepo := model.Tsukurepo{
				Id:      tsukurepo_id[i],
				Name:    name[i],
				ImgURL:  imgurl[i],
				Message: message[i],
			}
			results.ScrapingResult = append(results.ScrapingResult, newTsukurepo)
		}
	}
	c.JSON(http.StatusOK, results)
}
