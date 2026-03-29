/*
請以 任何程式 語言利用“for”迴圈指令設計
一可以產生右列輸出結果的程式。【10 分】

H G F E D C B A
G F E D C B A
F E D C B A
E D C B A
D C B A
C B A
B A
A
 */

public class JAVA3 {

    public static void main(String[] args) {
        // 定義原始字串，作為我們輸出的字元來源庫
        String s = "HGFEDCBA";

        // 外層迴圈：控制「總共有幾行」以及「每一行從哪個位置開始讀取」
        // i 從 0 變動到 7（總共 8 行）
        for (int i = 0; i < s.length(); i++) {

            // 內層迴圈：負責印出「目前這一行」的所有字元
            // 關鍵點：j 的起始值是 i，這代表每一行會比前一行少一個字（從更後面開始印）
            for (int j = i; j < s.length(); j++) {
                // 使用 charAt(j) 抓取字串中第 j 個位置的字元
                System.out.print(s.charAt(j) + " "); 
            }

            // 內層迴圈結束後，執行換行，準備印下一行
            System.out.println();
        }
    }
}
