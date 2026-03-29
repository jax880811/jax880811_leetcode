
import java.util.Scanner;


/*
第一題： 
請用Java或C#程式語言完成下列簡單的程式： 

（二）設計一個副程式，可以判斷所輸入的整數參數是否為質數。註：此副程式會輸入
一個整數的參數。【13分】
*/

public class java2 {
    private Scanner sc = new Scanner(System.in);
    public static void main(String[] args) {
        java2 j = new java2();
        System.out.println("請輸入一個整數：");
        int sc = j.sc.nextInt();
        boolean isPrime = true;
        for (int i=2 ;i*i<=sc; i++){
            if (sc % i == 0){
                isPrime = false;
            }
        }
        System.out.println(isPrime);
        
    }
}
