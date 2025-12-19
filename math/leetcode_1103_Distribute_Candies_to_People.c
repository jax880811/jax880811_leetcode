/*
 * leetcode_1103_Distribute_Candies_to_People.c
 *
 * 將 Python 解法轉為 C 語言實作，並加入完整逐行中文註解與詳細筆記。
 * 範例行為與原 Python 檔案一致：分配遞增數列的糖果給多人，剩餘不足時給當前人。
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/*
 * distributeCandies
 * 參數：
 *  - candies: 糖果總數
 *  - num_people: 人數
 *  - returnSize: 指向整數，用來回傳結果陣列大小
 * 回傳值：指向動態配置之整數陣列（使用者需負責 free），內容為每人的糖果數量
 *
 * 行為說明（對應 Python 版）：
 *  - 若 candies == 0 或 num_people <= 0，回傳一個單元素陣列 [0]（方便在 C 中處理）
 *  - 否則回傳長度為 num_people 的陣列，模擬遞增分配流程
 */
int* distributeCandies(int candies, int num_people, int* returnSize) {
    // 邊界情況處理：若沒人或糖果為 0，回傳單一 0
    if (candies == 0 || num_people <= 0) {
        *returnSize = 1;
        int* res = (int*)malloc(sizeof(int));
        if (!res) return NULL; // 配置失敗
        res[0] = 0;
        return res;
    }

    // 配置結果陣列，並初始化為 0
    *returnSize = num_people;
    int* result = (int*)calloc(num_people, sizeof(int));
    if (!result) return NULL; // 配置失敗

    // i: 當前分配對象的索引（0-based）
    int i = 0;

    // give: 本次要分配的糖果數量，從 1 開始
    int give = 1;

    // 只要還有糖果就持續分配
    while (candies > 0) {
        if (give <= candies) {
            // 若剩餘糖果足夠給完整的 give 顆，直接加給當前人
            result[i] += give;
        } else {
            // 若不足，將剩餘糖果全部給當前人
            result[i] += candies;
        }

        // 減去剛剛分配出去的數量
        candies -= give;

        // 下一個人
        i += 1;

        // 下一輪要發放的數字遞增
        give += 1;

        // 若超過最後一個人，回到第一個人（輪詢）
        if (i >= num_people) i = 0;
    }

    return result;
}

/*
 * helper: print array
 * 把陣列內容以 [a,b,c] 格式輸出
 */
void print_array(int* arr, int size) {
    if (!arr || size <= 0) {
        printf("[0]\n");
        return;
    }
    printf("[");
    for (int k = 0; k < size; ++k) {
        printf("%d", arr[k]);
        if (k + 1 < size) printf(", ");
    }
    printf("]\n");
}

int main(void) {
    /* 範例執行：
     * 對應 Python 範例 candies = 7, num_people = 4
     */
    int candies = 7;
    int num_people = 4;

    int returnSize = 0;
    int* ans = distributeCandies(candies, num_people, &returnSize);
    if (!ans) {
        fprintf(stderr, "Memory allocation failed\n");
        return 1;
    }

    // 輸出結果
    print_array(ans, returnSize);

    // 釋放資源
    free(ans);
    return 0;
}


/*
 * 詳細筆記 - LeetCode 1103: Distribute Candies to People（C 版）
 *
 * 題目翻譯：
 * 給定整數 candies（糖果總數）與 num_people（人數），依序分配遞增的糖果數列給每個人，
 * 當剩餘糖果不足以給完整數量時，將剩下的糖果全部給當前人並結束。
 *
 * C 實作重點：
 * - 在 C 中要管理記憶體，這裡使用 calloc 分配並初始化結果陣列，最後呼叫者需 free。
 * - 為了在 num_people 為 0 或 candies 為 0 時仍回傳合理值，函式會在這些情況下回傳單元素陣列 [0]。
 *
 * 時間與空間複雜度：
 * - 時間複雜度：O(k)，其中 k 為迴圈次數，滿足 1 + 2 + ... + k >= 初始 candies，
 *   因此 k = O(sqrt(candies))，每次迴圈為 O(1) 操作。
 * - 空間複雜度：O(num_people)，用於結果陣列。
 *
 * 範例解析（candies=7, num_people=4）：
 * - 第 0 人拿 1（剩 6） => [1,0,0,0]
 * - 第 1 人拿 2（剩 4） => [1,2,0,0]
 * - 第 2 人拿 3（剩 1） => [1,2,3,0]
 * - 第 3 人欲拿 4，但只剩 1 => 給第 3 人 1 => [1,2,3,1]
 *
 * 注意事項與可優化方向：
 * - 本實作以模擬為主，直觀且易於驗證；若 candies 非常大，可改用數學公式先求出完整發放的輪數
 *   與每位的總和以降低迴圈次數（但實作較複雜）。
 * - 在實際使用中，呼叫者需負責釋放 distributeCandies 回傳的陣列。
 */
