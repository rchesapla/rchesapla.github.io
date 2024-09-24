async function fetchDiscordData() {
    try {
        const response = await fetch('https://discord.com/api/guilds/1138486229969670234/widget.json');
        if (!response.ok) {
            throw new Error('Ağ kalitesi iyi değil lütfen kalitenizi yükseltin :)');
        }
        const data = await response.json();
        
        // Update server details
        document.querySelector('.status').textContent = `Aktif Üye: ${data.presence_count} ◄`;
        document.querySelector('#server-name').textContent = data.name;
        document.querySelector('#server-icon').src = data.icon_url || 'https://cdn.discordapp.com/icons/1138486229969670234/a84924f612bcdef3d15e6549de10d135.png';

    } catch (error) {
        console.error('Error fetching Discord data:', error);
        document.querySelector('.status').textContent = 'Veri yüklenemedi!';
    }
}

function joinDiscord() {
    window.open('https://discord.com/invite/rxeTK9wJU6', '_blank');
}

// Fetch Discord data on page load
fetchDiscordData();


//TELGRAM İÇİN AYARLAR
  document.querySelector('.my-float').addEventListener('click', function() {

    window.open('https://t.me/bilgilendiriyor', '_blank');