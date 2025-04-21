class Solution {
    /**
     * 反轉字串 II：每 2k 個字元反轉前 k 個
     * @param s - 輸入字串
     * @param k - 每段反轉的長度
     * @returns 處理後的字串
     */
    reverseStr(s: string, k: number): string {
        const arr: string[] = s.split('');
        const n: number = arr.length;

        for (let i = 0; i < n; i += 2 * k) {
            let start: number = i;
            let end: number = Math.min(i + k - 1, n - 1);

            while (start < end) {
                [arr[start], arr[end]] = [arr[end], arr[start]];
                start++;
                end--;
            }
        }

        return arr.join('');
    }
}

// 測試範例
const s: string = "abcdefg";
const k: number = 2;
const solution = new Solution();

console.log(solution.reverseStr(s, k)); // 輸出: "bacdfeg"
