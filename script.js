async function fetchData() {
    try {
        const response = await fetch('http://localhost:8080/Sesit.csv');
        const data = await response.text();
        return parseCSV(data);
    } catch (error) {
        console.error('Chyba při načítání dat:', error);
    }
}

function parseCSV(data) {
    const lines = data.split('\n');
    const headers = lines[0].split(',');
    const values = lines[1].split(',');
    
    const result = {};
    headers.forEach((header, index) => {
        result[header.trim()] = values[index].trim();
    });
    return result;
}

function updateUI(data) {
    document.getElementById('ftvNapeti').innerText = data['FTV Napětí'];
    document.getElementById('ftvProud').innerText = data['FVT Proud'];
    document.getElementById('celkovaVyroba').innerText = data['Celková Výroba'];
    document.getElementById('aktualniVykon').innerText = data['Aktuální Výkon'];
    // Další aktualizace hodnot
}

async function init() {
    const data = await fetchData();
    updateUI(data);
}

setInterval(init, 5000);  // Aktualizace každých 5 sekund
