let str, num, bol, nel, und, simbo, obj, arr;

str = "No quiero";
num = 73;
bol = false;
nel = null;
und = undefined; //pa' que lo hago si ya esta asa >_>
simbo = Symbol("Ahora tampoco quiero")
obj = {
    name: "halo",
    nog: "NIET"
}
arr = [
    str, num, bol, nel, und, simbo, obj
]

console.log(str, typeof str);
console.log(num, typeof num);
console.log(bol, typeof bol);
console.log(nel, typeof nel);
console.log(und, typeof und);
console.log(simbo, typeof simbo);
console.log(obj, typeof obj);
console.log(arr, typeof arr);

var glob = "Soy una variable global :P"

function local() {
    var local = "Soy una Loc, ty :l"
    console.warn("Entro de local()")
    console.log(local);
    console.log(glob);
    console.warn("Fuera de local()")

}
local()
console.log(local);
console.log(glob);
