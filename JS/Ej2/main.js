let nombres = () => {
    let noms = {
        nombre: "Toni",
        apellidos: "Jorda Leon"
    };
    return noms;
}

let nom = nombres();
console.log(nom.nombre + " " + nom.apellidos);

function a(param) {
    console.log(param);
}

a(true);

function vamo(...param) {
    param.forEach(element => {
        console.log(element);
    });
}
vamo(1,2,3,4,5);