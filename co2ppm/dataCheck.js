function loadCsv() {
    const rawFile = new XMLHttpRequest();
    rawFile.open("GET", "monthly.csv", false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                const allText = rawFile.responseText;
                const lines = allText.split('\n')
                const dateValue = findDateValue(lines)
                document.getElementById("result").innerHTML = dateValue ? dateValue : "No data available";
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

function calculate() {
    loadCsv();
}

document.getElementById("submit").addEventListener('click', calculate, true);