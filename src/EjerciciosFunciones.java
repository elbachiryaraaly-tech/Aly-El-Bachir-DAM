import java.util.Arrays;
import java.util.Scanner;

public class EjerciciosFunciones {

    /**
     * Calcula la potencia de un número usando exponenciación rápida iterativa.
     *
     * @param base      Base en formato decimal.
     * @param exponente Exponente entero (positivo, negativo o cero).
     * @return Resultado de elevar {@code base} a {@code exponente}.
     */
    public static double potencia(double base, int exponente) {
        if (base == 0 && exponente == 0) {
            throw new IllegalArgumentException("0^0 no está definido");
        }

        long exp = exponente;
        boolean negativo = exp < 0;
        if (negativo) {
            exp = -exp;
        }

        double resultado = 1.0;
        double factor = base;

        while (exp > 0) {
            if ((exp & 1L) == 1L) {
                resultado *= factor;
            }
            factor *= factor;
            exp >>= 1;
        }

        return negativo ? 1.0 / resultado : resultado;
    }

    /**
     * Devuelve el mayor de dos números enteros.
     */
    public static int mayorDeDos(int a, int b) {
        return (a >= b) ? a : b;
    }

    /**
     * Determina si un número entero es primo.
     */
    public static boolean esPrimo(int numero) {
        if (numero < 2) {
            return false;
        }
        if (numero == 2) {
            return true;
        }
        if ((numero & 1) == 0) {
            return false;
        }
        for (int divisor = 3; divisor * divisor <= numero; divisor += 2) {
            if (numero % divisor == 0) {
                return false;
            }
        }
        return true;
    }

    /**
     * Devuelve el mayor valor de un conjunto arbitrario de enteros.
     */
    public static int mayorDeVarios(int... numeros) {
        if (numeros == null || numeros.length == 0) {
            throw new IllegalArgumentException("Se requiere al menos un número");
        }
        int maximo = numeros[0];
        for (int i = 1; i < numeros.length; i++) {
            if (numeros[i] > maximo) {
                maximo = numeros[i];
            }
        }
        return maximo;
    }

    /**
     * Calcula la media aritmética de un array de doubles.
     */
    public static double media(double[] valores) {
        if (valores == null || valores.length == 0) {
            throw new IllegalArgumentException("El array no puede estar vacío");
        }
        double suma = 0;
        for (double valor : valores) {
            suma += valor;
        }
        return suma / valores.length;
    }

    /**
     * Muestra un array bidimensional fila por fila.
     */
    public static void mostrarArrayBidimensional(int[][] matriz) {
        if (matriz == null) {
            System.out.println("La matriz es nula");
            return;
        }
        for (int fila = 0; fila < matriz.length; fila++) {
            if (matriz[fila] == null) {
                System.out.println("Fila " + fila + ": null");
                continue;
            }
            System.out.println("Fila " + fila + ": " + Arrays.toString(matriz[fila]));
        }
    }

    /**
     * Solicita cinco números al usuario e informa si cada uno es primo.
     */
    public static void procesarCincoPrimos(Scanner scanner) {
        final int totalNumeros = 5;
        for (int i = 1; i <= totalNumeros; i++) {
            System.out.print("Introduce el numero " + i + ": ");
            while (!scanner.hasNextInt()) {
                System.out.print("Entrada inválida. Introduce un entero: ");
                scanner.next();
            }
            int valor = scanner.nextInt();
            if (esPrimo(valor)) {
                System.out.println(valor + " es primo.");
            } else {
                System.out.println(valor + " no es primo.");
            }
        }
    }

    public static void main(String[] args) {
        try (Scanner scanner = new Scanner(System.in)) {
            System.out.println("Ejercicio 1: Potencia");
            System.out.println("2.5 ^ 3 = " + potencia(2.5, 3));

            System.out.println("\nEjercicio 2: Mayor de dos números");
            System.out.println("Mayor entre 42 y 17 = " + mayorDeDos(42, 17));

            System.out.println("\nEjercicio 3: Números primos (introduce cinco valores)");
            procesarCincoPrimos(scanner);

            System.out.println("\nEjercicio 4: Mayor de varios números");
            System.out.println("Mayor = " + mayorDeVarios(3, 81, -2, 50, 19));

            System.out.println("\nEjercicio 5: Media de un array");
            double[] valores = {4, 8, 15, 16, 23, 42};
            System.out.println("Media = " + media(valores));

            System.out.println("\nEjercicio 6: Mostrar array bidimensional");
            int[][] matriz = {
                    {1, 2, 3},
                    {4, 5, 6},
                    {7, 8, 9}
            };
            mostrarArrayBidimensional(matriz);
        }
    }
}
