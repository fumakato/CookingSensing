package main

import (
	"net/http"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
)

var (
	mutexMap     = make(map[string]*sync.Mutex)   // idごとにミューテックスを保持するマップ
	mutexMapLock = sync.RWMutex{}                 // マップへのアクセスを制御するためのミューテックス
	runningIDs   = make(map[string]struct{})      // 実行中のIDを管理するマップ
	stopChannels = make(map[string]chan struct{}) // リクエスト停止用のチャネルマップ
)

// RootHandler はルートエンドポイントのハンドラーです
func RootHandler(c *gin.Context) {
	id := c.Param("id")

	mutexMapLock.RLock()
	if _, ok := runningIDs[id]; ok {
		c.JSON(http.StatusConflict, gin.H{
			"message": "ID is already running",
		})
		mutexMapLock.RUnlock()
		return
	}
	mutexMapLock.RUnlock()

	// IDが実行中でなければ処理を開始
	mutexMapLock.Lock()
	mutex, ok := mutexMap[id]
	if !ok {
		mutex = &sync.Mutex{}
		mutexMap[id] = mutex
		stopChannels[id] = make(chan struct{}) // stopChannelsに新しいチャンネルを作成
	}
	mutexMapLock.Unlock()

	mutex.Lock()                // ミューテックスをロック
	runningIDs[id] = struct{}{} // 実行中のIDを登録
	defer func() {
		mutex.Unlock() // 処理後にミューテックスをアンロック
		mutexMapLock.Lock()
		delete(runningIDs, id) // 実行中のIDを削除
		mutexMapLock.Unlock()
	}()

	ticker := time.NewTicker(5 * time.Second)
	defer ticker.Stop()

	go func() {
		for {
			select {
			case <-ticker.C:
				println(id)
			case <-stopChannels[id]:
				return
			}
		}
	}()

	time.Sleep(1 * time.Minute)

	c.JSON(http.StatusOK, gin.H{
		"message": "Printed 'aaa' for 1 minute!",
	})
}

// StopHandler は'/stop'エンドポイントのハンドラーです
func StopHandler(c *gin.Context) {
	id := c.Param("id")

	mutexMapLock.RLock()
	if _, ok := runningIDs[id]; !ok {
		c.JSON(http.StatusNotFound, gin.H{
			"message": "ID is not running",
		})
		mutexMapLock.RUnlock()
		return
	}
	mutexMapLock.RUnlock()

	// IDが実行中ならばRootHandlerを停止
	mutexMapLock.Lock()
	if _, ok := runningIDs[id]; ok {
		close(stopChannels[id])
		delete(runningIDs, id)
	}
	mutexMapLock.Unlock()

	c.JSON(http.StatusOK, gin.H{
		"message": "Stopped 'RootHandler' for ID",
	})
}

func main() {
	// Ginのルーターを作成
	router := gin.Default()

	// ルートエンドポイントへのGETリクエストに対するハンドラー
	router.GET("/:id", RootHandler) // handlers.go の関数を呼び出し

	// '/stop'エンドポイントへのGETリクエストに対するハンドラー
	router.GET("/stop/:id", StopHandler) // handlers.go の関数を呼び出し

	// サーバーを起動
	router.Run(":8080")
}
