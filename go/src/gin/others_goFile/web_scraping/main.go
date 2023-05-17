package main

import (
	"fmt"
	"os"
	"os/exec"
	"strings"
	"time"
)

func main() {
	now := time.Now() // ①
	// url := "https://cookpad.com/recipe/1438866"
	url := "https://cookpad.com/kitchen/37779795"
	// Pythonスクリプトのパスと引数を指定
	cmd := exec.Command("python3", "./cookpad.py", url)
	fmt.Printf("①経過: %vms\n", time.Since(now).Milliseconds())
	// 標準出力をキャプチャするためのバッファを作成
	stdout, err := cmd.Output()
	if err != nil {
		fmt.Println("エラー:", err)
		os.Exit(1)
	}
	// fmt.Printf("②経過: %vms\n", time.Since(now).Milliseconds())
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
	}
	if lines[0] == "not supported" {
		fmt.Println("対応外のURLです")
	} else if len(message) == 0 {
		fmt.Println("つくれぽが見つかりませんでした")
	} else {
		fmt.Println("tsukurepo_id")
		for _, id := range tsukurepo_id {
			fmt.Println(id)
		}
		fmt.Println()
		fmt.Println("name")
		for _, name := range name {
			fmt.Println(name)
		}
		fmt.Println()
		fmt.Println("imgUrl")
		for _, url := range imgurl {
			fmt.Println(url)
		}
		fmt.Println()
		fmt.Println("message")
		for _, mes := range message {
			fmt.Println(mes)
		}
	}
	// fmt.Printf("③経過: %vms\n", time.Since(now).Milliseconds())
}
