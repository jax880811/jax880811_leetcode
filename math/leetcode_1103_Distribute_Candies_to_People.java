
class Solution {

    public static int[] distributeCandies(int candies, int num_people) {
        int[] result = new int[num_people];

        int i = 0;
        int candy = 1;
        while (candies > 0) {
            if (candy >= candies) {
                result[i] = result[i] + candy;
            } else {
                result[i] = result[i] + candies;
            }
            i++;
            candy++;
            if (i >= num_people) {
                i = 0;
            }
        }
        return result;
    }

}

public class leetcode_1103_Distribute_Candies_to_People {

    public static void main(String[] args) {
        int candies = 10;
        int num_people = 3;
        int[] result = Solution.distributeCandies(candies, num_people);
        System.out.println("Result: " + java.util.Arrays.toString(result));
    }
}
