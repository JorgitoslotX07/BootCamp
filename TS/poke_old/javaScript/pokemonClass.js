"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonClass = void 0;
class PokemonClass {
    constructor(id, img, name, tipo, url, visibilidad) {
        this.id = id;
        this.img = img;
        this.name = name;
        this.tipo = tipo;
        this.url = url;
        this.visibilidad = visibilidad;
    }
    cambiarVisibilidad() {
        this.visibilidad = !this.visibilidad;
    }
}
exports.PokemonClass = PokemonClass;
