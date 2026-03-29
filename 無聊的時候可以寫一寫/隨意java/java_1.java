
/*
第一題： 
請用Java或C#程式語言完成下列簡單的程式： 
（一）設計一個含for迴圈程式，可以找出1-100中的數字含有9的數字，例如：9, 19, 
29, …, 90, 91, …, 99。【12分】 
（二）設計一個副程式，可以判斷所輸入的整數參數是否為質數。註：此副程式會輸入
一個整數的參數。【13分】
*/


public class java_1 {

    

    public static void main(String[] args) {
        for(int i=0 ; i<=100; i++){
            int temp = i;
            while(temp>0){
                if(temp%10 == 9){
                    System.out.println(i);
                    break;
                }
                temp /= 10;
            }
        }
        
    }
}