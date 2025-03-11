function suma(num1, num2, num3) {
    return num1 + num2 + num3;
}
console.log(suma(3, 7, 10));

function nombre(numbre, apellido1, apellido2) {
    console.log(numbre + " " + apellido1 + " " + apellido2);
}
nombre("Toni", "Jorda", "Leon");

function mayor(num1, num2) {
    if (num1 > num2) {
        return num1;
    } else if (num1 < num2) {
        return num2;
    } else {
        console.warn("Numeros iguales")

        return num1;
    }
}
console.log(mayor(3, 7));