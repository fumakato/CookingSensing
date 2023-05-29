package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/PuerkitoBio/goquery"
)

func main() {
	duration := 3 * time.Minute
	ticker := time.NewTicker(10 * time.Second)
	word := "美味しくてとっても満足！！"

	res, err := http.Get("https://cookpad.com/tsukurepo/list/54208270")
	if err != nil {
		log.Fatal(err)
	}
	defer res.Body.Close()
	var lastmessage []string

	doc, err := goquery.NewDocumentFromReader(res.Body)
	if err != nil {
		log.Fatal(err)
	}
	doc.Find(".message.tsukurepo-message").Each(func(i int, s *goquery.Selection) {
		lastmessage = append(lastmessage, s.Text())
		// fmt.Println(s.Text())
	})

	// 5分間繰り返す
	go func() {
		endTime := time.Now().Add(duration)
		for now := range ticker.C {
			if now.After(endTime) {
				break
			}

			// 実行する関数の呼び出し
			message := scraping()
			if len(lastmessage) != len(message) {

				if judgment(word, message[0]) {
					fmt.Println("一致してる")
					//ここにデータベースに書き込む関数
					break
				} else {
					// fmt.Println("一致してない")
				}
			} else {
				if lastmessage[0] != message[0] { //つくれぽIDで比較した方がいいかも
					if judgment(word, message[0]) {
						fmt.Println("一致してる")
						//ここにデータベースに書き込む関数
						break
					} else {
						// fmt.Println("一致してない")
					}
				}
			}
			lastmessage = message

			fmt.Println("Function executed at", now)

		}
	}()

	// プログラムを5分間実行するために待機
	time.Sleep(duration)
	ticker.Stop()
}

// 実行する関数
func scraping() []string {
	// fmt.Println("Running myFunction...")
	// // ここに実行したい処理を記述
	res, err := http.Get("https://cookpad.com/tsukurepo/list/54208270")
	if err != nil {
		log.Fatal(err)
	}
	defer res.Body.Close()
	var mes []string

	doc, err := goquery.NewDocumentFromReader(res.Body)
	if err != nil {
		log.Fatal(err)
	}
	doc.Find(".message.tsukurepo-message").Each(func(i int, s *goquery.Selection) {
		mes = append(mes, s.Text())
	})
	return mes
}

func judgment(word string, message string) bool {
	if word == message {
		return true
	}
	return false
}
