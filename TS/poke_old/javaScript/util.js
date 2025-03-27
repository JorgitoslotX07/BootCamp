"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.primeraLetra = primeraLetra;
function primeraLetra(texto) {
    if (!texto)
        return "";
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}
