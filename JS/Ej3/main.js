let numRandom = Math.round(Math.random(0,1))

function caraCruz(num) {
    if (num == 1) {
        console.log("🙄");
    } else if (num == 0) {
        console.log("⚔")
    } else {
        console.error("Porque pinche marico >:L")
    }
}
caraCruz(numRandom);