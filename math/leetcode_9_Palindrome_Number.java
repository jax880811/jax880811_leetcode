import java.lang.*;

/**
 * LeetCode 9. Palindrome Number
 *
 * 要求：判斷一個整數是否為回文數（正向與反向讀取相同）。
 * 限制：不使用將整數轉為字串的額外空間（以數學方法處理）。
 *
 * 做法（不使用字串）：
 * - 若 x < 0 => 不是回文（負號使其不同）。
 * - 若 x 結尾為 0 並且 x != 0 => 不是回文（因為前導零不算）。
 * - 反轉數字的一半（reverted），直到原數 x <= reverted。
 *   這樣可以避免整數反轉溢位，且能比較反轉的一半與剩下的一半是否相等。
 * - 最後，如果 x == reverted（偶數位數）或 x == reverted/10（奇數位數）即為回文。
 */
public class leetcode_9_Palindrome_Number {

    /**
     * 判斷整數是否為回文數（不使用字串）。
     *
     * 步驟說明：
     * 1. 負數不是回文（含 '-' 符號）。
     * 2. 結尾為 0 的正整數（但不是 0 本身）也不是回文，例如 10。
     * 3. 透過反轉數字的後半段並與前半段比較：
     *    - 每次取出 x 的最後一位加入到 reverted：reverted = reverted * 10 + x % 10
     *    - 同時將 x 去掉最後一位：x = x / 10
     *    - 當 x <= reverted 時，表示已反轉至少半數位數。
     * 4. 比對結果：若偶數位數 -> x == reverted；若奇數位數 -> x == reverted/10（中間位數不影響）。
     */
    public static boolean isPalindrome(int x) {
        // 1. 負數一定不是回文
        if (x < 0) return false;
        // 2. 若尾數為 0 且 x != 0，不可能是回文（例如 10 -> 01 != 10）
        if (x % 10 == 0 && x != 0) return false;

        int reverted = 0; // 用來儲存反轉後的一半數字

        // 反轉後半數字直到原數小於或等於反轉數
        while (x > reverted) {
            // 取出原數的最後一位並加到 reverted
            reverted = reverted * 10 + x % 10;
            // 刪去原數的最後一位
            x /= 10;
        }

        // 當數字長度為偶數時，x 應與 reverted 相等；
        // 當長度為奇數時，中間那位會被包含在 reverted 的最後一位，移除它再比較。
        return x == reverted || x == reverted / 10;
    }

    // 測試範例：列出數組並顯示是否為回文
    public static void main(String[] args) {
        int[] tests = {121, -121, 10, 12321, 0, 1221, 1001};
        System.out.println("Palindrome Number Test:");
        for (int n : tests) {
            System.out.printf("%d -> %b\n", n, isPalindrome(n));
        }
    }
}