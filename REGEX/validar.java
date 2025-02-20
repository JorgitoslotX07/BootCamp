import java.io.File;
import java.io.IOException;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;

public class validar {
    public static void main(String[] args) {
        String csvFile = "file2.csv";
        BufferedReader br = null;
        String line = "";
        // Se define separador ","
        String cvsSplitBy = ";";

        CSVReader csvReader = new CSVReader(new FileReader(archCSV));
        String[] fila = null;
        while ((fila = csvReader.readNext()) != null) {
            System.out.println(fila[0]
                    + " | " + fila[1]
                    + " |  " + fila[2]);
        }

        csvReader.close();
    }
}