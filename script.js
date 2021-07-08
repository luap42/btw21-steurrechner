data = {
    "cducsu": [-892, -936, -1093, -2287, -10500],
    "spd": [-3195, -4033, -1019, -1089, 12840],
    "afd": [0, 0, 0, 0, 0], // keine Daten liegen vor
    "fdp": [-2915, -870, -1995, -6559, -18163],
    "linke": [-6492, -5092, -5520, 1777, 191413],
    "gruene": [-3420, -3287, -1932, -747, 12985]
};
ranges = [
     20000,
     40000,
     60000,
    120000,
    300000
]

function recalc(entry) {
    income = parseInt(entry.value);
    let index = 0;
    for (const range of ranges) {
        if (range > income) break;
        index++;
    }
    if (index >= ranges.length) {
        index = ranges.length - 1;
    }

    for (const party of Object.keys(data)) {
        let change = data[party][index];
        const dir = (change > 0) ? 1 : -1;
        change = Math.abs(change);

        bar = document.getElementById(party);
        bar_text = document.getElementById(party+"-text");

        bar_text.innerText = change + " Euro " + ((dir > 0) ? "mehr" : "weniger");

        if(dir > 0) {
            bar.classList.add("is-plus");
            bar.classList.remove("is-minus");
        } else {
            bar.classList.add("is-minus");
            bar.classList.remove("is-plus");
        }
        if (change == 0)
            bar.style.width = "0%"
        else
            bar.style.width = (Math.sqrt(change) / 5) + "%"
    }

    document.querySelector(".output").classList.remove("unloaded")
}

document.querySelector(".entry input").addEventListener("blur", (e) => {
    recalc(e.target);
})
document.querySelector(".entry input").addEventListener("keydown", (e) => {
    if(e.key == "Enter") {
        recalc(e.target);
    }
})