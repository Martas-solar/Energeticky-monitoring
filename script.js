<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Energetický Monitoring</title>
    <link rel="stylesheet" href="styles.css">
    <script defer src="script.js"></script>
</head>
<body>
    <div class="container">
        <div class="box">
            <p>FTV Napětí: <span id="ftvNapeti">0,0 V</span></p>
            <p>FVT Proud: <span id="ftvProud">0 A</span></p>
            <p>Celková Výroba: <span id="celkovaVyroba">36,8 kW</span></p>
            <p>Aktuální Výkon: <span id="aktualniVykon">0 W</span></p>
        </div>
    </div>

    <script>
    async function fetchData() {
        try {
            const response = await fetch('https://raw.githubusercontent.com/Martas-solar/Energeticky-monitoring/blob/main/Sesit.csv');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.text();
            console.log('CSV Data:', data); // Přidáno pro debugování
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
            result[header.trim()] = values[index] ? values[index].trim() : ''; // Ošetření možného undefined
        });

        console.log('Parsed Data:', result); // Přidáno pro debugování
        return result;
    }

    function updateUI(data) {
        console.log('Updating UI with data:', data); // Přidáno pro debugování
        document.getElementById('ftvNapeti').innerText = data['FTV Napětí'];
        document.getElementById('ftvProud').innerText = data['FVT Proud'];
        document.getElementById('celkovaVyroba').innerText = data['Celková Výroba'];
        document.getElementById('aktualniVykon').innerText = data['Aktuální Výkon'];
        // Další aktualizace hodnot
    }

    async function init() {
        const data = await fetchData();
        if (data) {
            updateUI(data);
        }
    }

    setInterval(init, 5000);  // Aktualizace každých 5 sekund
    </script>
</body>
</html>
