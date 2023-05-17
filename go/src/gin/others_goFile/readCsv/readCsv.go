package main

import (
	"encoding/csv"
	"fmt"
	"log"
	"os"
)

func main() {
	file, err := os.Open("ayato2_cutData.csv") // 先ほど入手した郵便番号データをos.Openで開く
	if err != nil {
		log.Fatal(err) //なかった場合にはエラー文を表示しているっぽい
	}
	defer file.Close()

	r := csv.NewReader(file) //fileの中身をrに保存してるっぽい
	rows, err := r.ReadAll() // csvを一度に全て読み込む  //rowsの中に配列として入れているっぽい
	if err != nil {
		log.Fatal(err) //なかった場合にはエラー文を表示しているっぽい
	}

	// [][]stringなのでループする
	for _, v := range rows { //データの数だけループ
		fmt.Println(v) //vは中の一次配列っぽい
	}
}
