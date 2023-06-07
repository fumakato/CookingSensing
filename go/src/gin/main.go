package main

import (
	// "xclothes/controller"	//apiを受信した時の動きが書いてある
	// "xclothes/database"		//データベース

	"cookSensing/controller"
	"cookSensing/database"

	"github.com/gin-contrib/cors" //ginというものを使ってサーバを組み立てる
	"github.com/gin-gonic/gin"    // これらはインポートする必要があると思われる
)

func connectDatabase() { //データベースとの接続。データベース作ってから触ってみる
	db := database.Connect()
	defer db.Close()
	// // database.DeleteAll(db)
	// //上の一文は多分全部消すやつだからコメントアウトしなきゃダメ
	database.Migrate(db)
	database.ShowUsers(db)
	database.ShowRecipes(db)
	database.ShowUsersRecipesAccs(db)
	database.ShowHistogramCutPaces(db)
}

func main() { //ここでサーバを開いている
	connectDatabase() //データベースに接続（上に関数あり）
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
		usersEngine.GET("/:id", controller.FindUsersById)
		usersEngine.GET("", controller.FindUsers)
		usersEngine.POST("", controller.CreateUsers) //未実装
		usersEngine.GET("/login", controller.Login)  //未実装

		// usersEngine.GET("", func(c *gin.Context) {
		// 	c.JSON(http.StatusOK, gin.H{
		// 		"message": "hello",
		// 	})
		// })
	}

	tsukurepoEngine := engine.Group("/tsukurepo")
	{
		tsukurepoEngine.GET("", controller.Scraping)
	}

	certificationEngine := engine.Group("/certification")
	{
		certificationEngine.GET("", controller.Certification)
	}

	accEngine := engine.Group("/acc")
	{
		accEngine.GET("", controller.FindCutPace)                         //未実装
		accEngine.POST("", controller.FindCutPace)                        //未実装
		accEngine.GET("/findbyuser/:userid", controller.FindCutPace)      //未実装
		accEngine.GET("/findsbyrecipe/:recipeid", controller.FindCutPace) //未実装
		accEngine.GET("/findbyacc/:accid", controller.FindCutPace)        //未実装

	}

	histogramEngine := engine.Group("/histogram")
	{
		histogramEngine.GET("/cut-paces", controller.FindCutPace)
		histogramEngine.GET("", controller.FindCutPace) //未実装
	}

	recipesEngine := engine.Group("/recipes")
	{
		recipesEngine.GET("", controller.CreateRecipe)       //未実装
		recipesEngine.GET("/:name", controller.CreateRecipe) //未実装
		recipesEngine.PUT("", controller.CreateRecipe)
	}

	// accsEngine := engine.Group("/accs")
	// {
	// 	accsEngine.GET("/", pull)
	// }

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
	engine.Run(":3000")
}
