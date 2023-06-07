package controller

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/PuerkitoBio/goquery"
	"github.com/gin-gonic/gin"
)

func Certification(c *gin.Context) {
	ticker := time.NewTicker(10 * time.Second)
	certificationFlg := false

	//実装用
	duration := 5 * time.Minute
	// word := c.Param("word")
	// userID := c.Param("userid")

	//デバッグ用
	// duration := 30 * time.Second
	word := "美味しくてとっても満足！！"
	userID := "54208270"

	// res, err := http.Get("https://cookpad.com/tsukurepo/list/54208270")
	res, err := http.Get("https://cookpad.com/tsukurepo/list/" + userID)
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
					certificationFlg = true
					break
				} else {
					// fmt.Println("一致してない")
				}
			} else {
				if lastmessage[0] != message[0] { //つくれぽIDで比較した方がいいかも
					if judgment(word, message[0]) {
						fmt.Println("一致してる")
						//ここにデータベースに書き込む関数
						certificationFlg = true
						break
					} else {
						// fmt.Println("一致してない")
					}
				}
			}
			lastmessage = message

			fmt.Println("実行中 at", now)

		}
	}()

	// プログラムを5分間実行するために待機
	if !certificationFlg {
		time.Sleep(duration)
	}
	ticker.Stop()
	if certificationFlg {
		c.JSON(http.StatusOK, true)
	} else {
		c.JSON(http.StatusOK, false)
	}
	fmt.Println("ループ脱出")

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

// package controller

// import (
// 	"fmt"
// 	"time"
// 	"net/http"
// 	"log"
// 	"github.com/PuerkitoBio/goquery"
// 	"github.com/gin-gonic/gin"
// )

// func main() {
// 	certificationFlg := false

// 	//実装用
// 	duration := 5 * time.Minute
// 	// word := c.Param("word")
// 	// userID := c.Param("userid")

// 	//デバッグ用
// 	// duration := 30 * time.Second
// 	word := "美味しくてとっても満足！！"
// 	userID := "54208270"

// 	// res, err := http.Get("https://cookpad.com/tsukurepo/list/54208270")
// 	res, err := http.Get("https://cookpad.com/tsukurepo/list/" + userID)
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	defer res.Body.Close()
// 	var lastmessage []string

// 	doc, err := goquery.NewDocumentFromReader(res.Body)
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	doc.Find(".message.tsukurepo-message").Each(func(i int, s *goquery.Selection) {
// 		lastmessage = append(lastmessage, s.Text())
// 		// fmt.Println(s.Text())
// 	})

// 	// ゴルーチンを開始し、定期的に関数を呼び出す
// 	go callFunctionPeriodically()

// 	// 5分間のタイマーを作成
// 	timer := time.NewTimer(5 * time.Minute)

// 	select {
// 	case <-timer.C:
// 		// タイムアウト時の処理
// 		fmt.Println("5 minutes completed, exiting...")
// 	case <-conditionChan():
// 		// 特定の条件が満たされた場合の処理
// 		fmt.Println("Condition met, exiting...")
// 	}

// 	// タイマーを停止
// 	timer.Stop()
// }

// func callFunctionPeriodically() {
// 	for {
// 		// 関数を呼び出す
// 		callYourFunction()

// 		// 1秒待機する
// 		time.Sleep(1 * time.Second)
// 	}
// }

// func callYourFunction() {
// 	// ここに関数の処理を記述する
// 	fmt.Println("Calling your function...")

// }

// func conditionChan() <-chan struct{} {
// 	ch := make(chan struct{})

// 	// 特定の条件の判定処理を実装する
// 	go func() {
// 		// 例えば、10秒後に条件を満たすとします
// 		time.Sleep(10 * time.Second)

// 		// 条件が満たされた場合、チャネルに値を送信する
// 		ch <- struct{}{}
// 	}()

// 	return ch
// }
