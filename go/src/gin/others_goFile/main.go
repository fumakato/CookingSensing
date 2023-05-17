package main

import (
	// "xclothes/controller"	//apiを受信した時の動きが書いてある
	// "xclothes/database"		//データベース

	"net/http"

	"github.com/gin-contrib/cors" //ginというものを使ってサーバを組み立てる
	"github.com/gin-gonic/gin"    // これらはインポートする必要があると思われる
)

// func connectDatabase() {//データベースとの接続。データベース作ってから触ってみる
// 	db := database.Connect()
// 	defer db.Close()
// 	// database.DeleteAll(db)
// 	database.Migrate(db)
// 	database.ShowUser(db)
// 	database.ShowCoordinate(db)
// 	database.ShowLike(db)
// }

func main() { //ここでサーバを開いている
	//connectDatabase() //データベースに接続（上に関数あり）
	engine := gin.Default()

	//設定
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowMethods = []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Accept", "Origin", "Content-Type"}
	config.AllowCredentials = true
	engine.Use(cors.New(config))

	usersEngine := engine.Group("/users")
	{
		usersEngine.GET("", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "hello world",
			})
		})
	}
	engine.Run(":3000")
}

// usersEngine := engine.Group("/users")
// {
// 	usersEngine.POST("/signup", controller.CreateUsers)
// 	usersEngine.GET("", controller.FindUsers)
// 	usersEngine.GET("/:id", controller.FindUsersById)
// 	usersEngine.GET("/mail/:mail", controller.FindUsersByMail)
// 	usersEngine.GET("/:id/coordinates", controller.FindCoordinatesByUserId)
// 	usersEngine.GET("/:id/coordinates/likes", controller.FindLikesByUserId)
// 	usersEngine.PUT("/:id", controller.UpdateUsersById)
// 	usersEngine.DELETE("/:id", controller.DeleteUsersById)
// }
//
// coordinatesEngine := engine.Group("/coordinates")
// {
// 	coordinatesEngine.POST("", controller.CreateCoordinates)
// 	coordinatesEngine.POST("/:id/likes", controller.CreateLikeByCoordinateId)
// 	coordinatesEngine.GET("", controller.FindCoordinates)
// 	coordinatesEngine.GET("/:id", controller.FindCoordinatesById)
// 	coordinatesEngine.GET("/ble/:uuid", controller.FindCoordinatesByBle)
// 	coordinatesEngine.GET("/:id/likes", controller.FindLikesByCoordinateId)
// 	coordinatesEngine.GET("/public/likes", controller.FindLikesByCoordinatePublic)
// 	coordinatesEngine.GET("/public/likes/senduser/users", controller.FindUsersByPublicSendUser)
// 	coordinatesEngine.GET("/public/coordinateId/likes", controller.FindLikesByCoordinatePublicLikes)
// 	coordinatesEngine.GET("/public/coordinates", controller.FindCoordinatesByPublic)
// 	coordinatesEngine.GET("/:id/likes/senduser/users", controller.FindUsersBySendUser)
// 	coordinatesEngine.PUT("/:id", controller.UpdateCoordinatesById)
// 	coordinatesEngine.DELETE("/:id", controller.DeleteCoordinatesById)
// }
//
// LikesEngine := engine.Group("/likes")
// {
// 	LikesEngine.POST("", controller.CreateLikes)
// 	LikesEngine.GET("", controller.FindLikes)
// 	LikesEngine.GET("/:id", controller.FindLikesById)
// 	LikesEngine.GET("/:id/likes", controller.FindLikesByReceiveUserId)
// 	LikesEngine.GET("/:id/likes/senduser/users", controller.FindUsersByReceiveUserIdLikesSendUser)
// 	LikesEngine.PUT("/:id", controller.UpdateLikesById)
// 	LikesEngine.DELETE("/:id", controller.DeleteLikesById)
// }
