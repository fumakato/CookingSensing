package controller

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/PuerkitoBio/goquery"
	"github.com/gin-gonic/gin"
)

type QueryParams struct {
	Userid string `json:"userid"`
	Word   string `json:"word"`
}

func CarTeat(c *gin.Context) { //なんこれ？
	fmt.Println("CarTeat")
	var queryParams QueryParams
	if err := c.BindJSON(&queryParams); err != nil {
		c.String(http.StatusBadRequest, "Bad request")
		return
	}
	fmt.Println("CarTeat")
	// word := c.Param("word")
	// userid := c.Param("userid")
	fmt.Println(queryParams.Word)
	fmt.Println(queryParams.Userid)
	c.JSON(http.StatusOK, true)
}

func Certification(c *gin.Context) {
	//セットアップ
	fmt.Println("Certification")
	var queryParams QueryParams
	if err := c.BindJSON(&queryParams); err != nil {
		c.String(http.StatusBadRequest, "Bad request")
		return
	}

	word := queryParams.Word
	userid := queryParams.Userid
	fmt.Println("word= " + word)
	fmt.Println("userid= " + userid)

	// userid := "54208270"
	// userid := "54177797"
	// word := "作ってみましたー"

	scrapingResults := scraping(userid)
	ch := make(chan bool)
	fmt.Println("セットアップ完了")

	// ゴルーチンを開始し、定期的に関数を呼び出す
	go repetition(userid, word, scrapingResults, ch)

	// 5分間のタイマーを作成
	// timer := time.NewTimer(5 * time.Minute)
	timer := time.NewTimer(20 * time.Second)

	select {
	case <-timer.C:
		// タイムアウト時の処理
		fmt.Println("5分経ちました。タイムアウトです")
		c.JSON(http.StatusOK, false)
		// c.String(http.StatusNotFound, "Not Found")
	case <-ch:
		fmt.Println("終了条件を達成しました")
		c.JSON(http.StatusOK, true)
	}

	// タイマーを停止
	timer.Stop()
}

// 繰り返しの中身
func repetition(userID string, word string, scrapingResults [][]string, ch chan bool) <-chan struct{} {
	lastResults := scrapingResults
	for {
		fmt.Println("繰り返し中")
		// 関数を呼び出す
		currentResults := scraping(userID)
		if judgment(word, lastResults, currentResults) {
			ch <- true
		}
		lastResults = currentResults

		// 10秒待機する
		time.Sleep(10 * time.Second)
	}
}

// webスクレイピング
func scraping(userID string) [][]string {
	// res, err := http.Get("https://cookpad.com/tsukurepo/list/54208270")
	res, err := http.Get("https://cookpad.com/tsukurepo/list/" + userID)
	if err != nil {
		log.Fatal(err)
	}
	defer res.Body.Close()
	var message []string
	var tsukurepo_id []string

	doc, err := goquery.NewDocumentFromReader(res.Body)
	if err != nil {
		log.Fatal(err)
	}
	doc.Find(".message.tsukurepo-message").Each(func(i int, s *goquery.Selection) {
		message = append(message, s.Text())
		// fmt.Println(s.Text())
	})
	doc.Find(".tsukurepo-recipe-wrapper.recipe-title").Each(func(i int, s *goquery.Selection) {
		tsukurepoID, ok := s.Attr("data-tsukurepo-id")
		if ok {
			// fmt.Println("data-recipe-id:", recipeID)
			tsukurepo_id = append(tsukurepo_id, tsukurepoID)
		}
	})
	scrapingResults := [][]string{tsukurepo_id, message}

	return scrapingResults
}

func judgment(word string, lastResults [][]string, currentResults [][]string) bool {
	result := false
	// fmt.Println(lastResults)
	// fmt.Println(currentResults)
	if len(currentResults[0]) >= 2 { //2件以上ないと比べられないため
		if len(lastResults[0]) < len(currentResults[0]) { //12件以下で追加があったとき
			if word == currentResults[1][0] {
				result = true
				fmt.Println("一致しています")
			} else {
				fmt.Println("不一致")
			}
		} else if lastResults[0][0] == currentResults[0][1] { //12件以上で追加があったとき tsukurepo-idの比較
			if word == currentResults[1][0] {
				result = true
				fmt.Println("一致しています")
			} else {
				fmt.Println("不一致")
			}
		} else {
			fmt.Println("待機中")
		}
	} else {
		fmt.Println("比べるには数が足りない")
	}
	return result
}

func ScrapingByID(c *gin.Context) {
	fmt.Println("スクレイピングByID")
	userID := c.Param("id")
	// res, err := http.Get("https://cookpad.com/tsukurepo/list/54208270")
	res, err := http.Get("https://cookpad.com/tsukurepo/list/" + userID)
	if err != nil {
		log.Fatal(err)
	}
	defer res.Body.Close()
	var message []string
	var tsukurepo_id []string
	var tsukurepo_image []string
	var recipe_image []string
	var recipe_title []string
	var date []string

	doc, err := goquery.NewDocumentFromReader(res.Body)
	if err != nil {
		log.Fatal(err)
	}
	doc.Find(".message.tsukurepo-message").Each(func(i int, s *goquery.Selection) {
		message = append(message, s.Text())
	})
	doc.Find(".tsukurepo-recipe-wrapper.recipe-title").Each(func(i int, s *goquery.Selection) {
		tsukurepoID, ok := s.Attr("data-tsukurepo-id")
		if ok {
			tsukurepo_id = append(tsukurepo_id, tsukurepoID)
		}
	})
	doc.Find(".tsukurepo-recipe-title").Each(func(i int, s *goquery.Selection) {
		recipe_title = append(recipe_title, s.Text())
	})
	doc.Find(".tsukurepo-post-date").Each(func(i int, s *goquery.Selection) {
		date = append(date, s.Text())
	})
	doc.Find("img.tsukurepo-recipe-image").Each(func(i int, s *goquery.Selection) {
		recipe_image = append(recipe_image, s.AttrOr("src", ""))
	})
	doc.Find("img.tsukurepo-image.large_photo_clickable").Each(func(i int, s *goquery.Selection) {
		tsukurepo_image = append(tsukurepo_image, s.AttrOr("src", ""))
	})
	fmt.Println("date")
	fmt.Println(date)
	fmt.Println("recipe_title")
	fmt.Println(recipe_title)
	fmt.Println("recipe_image")
	fmt.Println(recipe_image)
	fmt.Println("tsukurepo_id")
	fmt.Println(tsukurepo_id)
	fmt.Println("tsukurepo_image")
	fmt.Println(tsukurepo_image)

	type Scraping struct {
		Date           string `json:"date"`
		Message        string `json:"message"`
		TsukurepoId    string `json:"tsukurepo_id"`
		TsukurepoImage string `json:"tsukurepo_image"`
		RecipeImage    string `json:"recipe_image"`
		RecipeTitle    string `json:"recipe_title"`
	}
	var scrapingResults []Scraping
	for i := 0; i < len(date); i++ {
		data := Scraping{
			Date:           date[i],
			Message:        message[i],
			TsukurepoId:    tsukurepo_id[i],
			TsukurepoImage: tsukurepo_image[i],
			RecipeImage:    recipe_image[i],
			RecipeTitle:    recipe_title[i],
		}
		scrapingResults = append(scrapingResults, data)
	}
	fmt.Println(scrapingResults)
	c.JSON(http.StatusOK, scrapingResults)
}

// var user model.Users //ここでuserの実体化
// 	if err := c.BindJSON(&user); err != nil { //引数からuserの方に入れる。入れれるかのチェックもしてる
// 		c.String(http.StatusBadRequest, "Bad request")
// 		fmt.Println("型が違う可能性あり。エラー内容:", err) // エラー内容をコンソールに表示
// 		return
// 	}
