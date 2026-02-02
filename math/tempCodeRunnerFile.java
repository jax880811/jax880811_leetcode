public static void main(String[] args) {
        int[] tests = {121, -121, 10, 12321, 0, 1221, 1001};
        System.out.println("Palindrome Number Test:");
        for (int n : tests) {
            System.out.printf("%d -> %b\n", n, isPalindrome(n));
        }
    }