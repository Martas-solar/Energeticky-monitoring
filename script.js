async function fetchData() {
    try {
        const response = await fetch('https://api.github.com/repos/Martas-solar/Energeticky-monitoring/contents/Sesit.csv', {
            headers: {
                'Accept': 'application/vnd.github.v3.raw'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.text();
        console.log('Fetched data:', data); // Pro kontrolu
        return parseCSV(data);
    } catch (error) {
        console.error('Chyba při načítání dat:', error);
    }
}

function parseCSV(data) {
    const lines = data.split('\n');
    const headers = lines[0].split(';');
    const values = lines[1].split(';');

    const result = {};
    headers.forEach((header, index) => {
        result[header.trim()] = values[index] ? values[index].trim() : '';
    });
    console.log('Parsed data:', result); // Pro kontrolu
    return result;
}

function updateUI(data) {
    document.getElementById('ftvNapeti').innerText = data['FTV Napětí'] || 'N/A';
    document.getElementById('ftvProud').innerText = data['FTV Proud'] || 'N/A';
    document.getElementById('celkovaVyroba').innerText = data['Celková Výroba'] || 'N/A';
    document.getElementById('aktualniVykon').innerText = data['Aktuální Výkon'] || 'N/A';
    // Další aktualizace hodnot, pokud máte další prvky, které potřebují data
}

async function init() {
    const data = await fetchData();
    if (data) {
        updateUI(data);
    }
}

setInterval(init, 5000);  // Aktualizace každých 5 sekund

// Zavolejte init při načtení stránky
init();
