function loadCo2Data() {
    const rawFile = new XMLHttpRequest();
    rawFile.open("GET", "monthly.csv", false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                const allText = rawFile.responseText;
                const lines = allText.split('\n');
                const dateValue = findDateValue(lines);
                if (dateValue) {
                    document.getElementById("result").innerHTML = dateValue;
                    document.getElementById("today").innerHTML = setTodayValue(lines[lines.length - 2]);
                }
            }
        }
    }
    rawFile.send(null);
}

function findDateValue(lines) {
    const date = document.getElementById("birthday").value;
    if (!date || date === "") return undefined;
    const year = date.substring(0,4);
    const month = date.substring(5,7);
    const entry = lines.filter(line => line.startsWith(year+","+month));
    if (!entry || !entry[0]) return undefined;
    return "Average co2 ppm in this month: " + entry[0].split(",")[3];
}

function setTodayValue(latest) {
    const entrySplit = latest.split(",");
    const year = entrySplit[0];
    const month = entrySplit[1];
    const value = entrySplit[3];
    return "Latest measurement (from " + month + "/" + year + "): " + value;
}

function loadTimeline() {
    const rawFile = new XMLHttpRequest();
    rawFile.open("GET", "timeline.csv", false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                const allText = rawFile.responseText;
                const lines = allText.split('\n');
                const timeline = findEvents(lines);
                if (timeline) {
                    document.getElementById("timeline").innerHTML = timeline;
                }
            }
        }
    }
    rawFile.send(null);
}

function findEvents(lines) {
    const date = document.getElementById("birthday").value;
    if (!date || date === "") return undefined;
    const typed = new Date(date);
    const timeline = lines
            .map(line => line.split(","))
            .filter(line => line[0] !== "" && line[0] !== "year")
            .filter(line => new Date(line[0]+"-"+line[1]+"-"+line[2]) >= typed)
            .map(line => line[2] + "/" + line[1] + "/" + line[0] + ": " + line[3] + "<br>")
            .join("");
    if (!timeline || timeline === "") return undefined;
    return "Stuff that happened since the given date:<br>" + timeline;
}

function calculate() {
    document.getElementById("result").innerHTML = "";
    document.getElementById("timeline").innerHTML = "";
    document.getElementById("today").innerHTML = "";
    loadCo2Data();
    loadTimeline();
}

document.getElementById("submit").addEventListener('click', calculate, true);