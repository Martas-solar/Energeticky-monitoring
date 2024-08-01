async function fetchData() {
    try {
        // Načítání CSV souboru z URL
        const response = await fetch(''http://127.0.0.1:8080/Sesit.csv'');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.text();
        console.log('CSV Data:', data); // Debugování: zobrazí data CSV souboru
        return parseCSV(data);
    } catch (error) {
        console.error('Chyba při načítání dat:', error);
    }
}

function parseCSV(data) {
    // Rozdělení dat na řádky
    const lines = data.split('\n').filter(line => line.trim() !== ''); // Odstranění prázdných řádků
    if (lines.length < 2) {
        console.error('CSV soubor nemá dostatek dat.');
        return {};
    }
    
    // Rozdělení prvního řádku na záhlaví a druhého řádku na hodnoty
    const headers = lines[0].split(',');
    const values = lines[1].split(',');
    
    // Vytvoření objektu s hodnotami
    const result = {};
    headers.forEach((header, index) => {
        result[header.trim()] = values[index] ? values[index].trim() : ''; // Ošetření možného undefined
    });
    
    console.log('Parsed Data:', result); // Debugování: zobrazí zpracovaná data
    return result;
}

function updateUI(data) {
    // Aktualizace HTML elementů na základě načtených dat
    document.getElementById('ftvNapeti').innerText = data['FTV Napětí'] || 'N/A';
    document.getElementById('ftvProud').innerText = data['FVT Proud'] || 'N/A';
    document.getElementById('celkovaVyroba').innerText = data['Celková Výroba'] || 'N/A';
    document.getElementById('aktualniVykon').innerText = data['Aktuální Výkon'] || 'N/A';
    // Další aktualizace hodnot
}

async function init() {
    // Načítání dat a aktualizace UI
    const data = await fetchData();
    if (data) {
        updateUI(data);
    }
}

// Inicializace a aktualizace každých 5 sekund
setInterval(init, 5000);

