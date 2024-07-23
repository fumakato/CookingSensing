package routes

import (
	"myapp/controller"
	"myapp/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()

	// ミドルウェアを追加
	router.Use(middleware.Logger())

	// APIルートの設定
	userRoutes := router.Group("/users")
	{
		userRoutes.GET("/", controller.GetUsers)
		userRoutes.POST("/", controller.CreateUser)
	}

	return router
}
