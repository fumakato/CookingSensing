package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/PuerkitoBio/goquery"
)

func main() {
	//セットアップ
	userID := "54208270"
	//userID := "54177797"
	word := "作ってみましたー"
	scrapingResults := scraping(userID)
	ch := make(chan bool)
	fmt.Println("セットアップ完了")

	// ゴルーチンを開始し、定期的に関数を呼び出す
	go repetition(userID, word, scrapingResults, ch)

	// 5分間のタイマーを作成
	timer := time.NewTimer(5 * time.Minute)
	// timer := time.NewTimer(20 * time.Second)

	select {
	case <-timer.C:
		// タイムアウト時の処理
		fmt.Println("5分経ちました。タイムアウトです")
	case <-ch:
		fmt.Println("終了条件を達成しました")
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

// 1時間→七グラム
// 750ml * 11.5 * 0.8 / 100 = 69g
// 700ml * 5 * 0.8 /100 = 28g
// 69g + 28g = 97g
// 97 / 7 = 13.8571428571 約14時間
