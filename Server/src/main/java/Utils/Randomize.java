package Utils;

import java.util.Random;

public class Randomize {
    public static int getRandom() {
        Random rand = new Random();

        return rand.nextInt(64000 - 12000) + 12000;
    }
}