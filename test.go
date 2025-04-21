package main

import (
	"fmt"
)

func countAnswer(data1 []int, data2 []int) map[int]int {
	// 使用 map 模擬 Counter
	counts := make(map[int]int)

	// 先統計 data1 中所有數字的次數
	for _, num := range data1 {
		counts[num]++
	}

	// 建立結果 map，僅包含 data2 中的數字及其在 data1 中的出現次數
	result := make(map[int]int)
	for _, num := range data2 {
		result[num] = counts[num] // 若 counts[num] 不存在，預設為 0（Go 零值）
	}

	return result
}

func main() {
	data1 := []int{1, 1, 1, 6, 3, 5, 4, 8, 7, 6, 3}
	data2 := []int{1, 6, 8}

	result := countAnswer(data1, data2)

	fmt.Println("出現次數統計：")
	for k, v := range result {
		fmt.Printf("%d 出現 %d 次\n", k, v)
	}
}