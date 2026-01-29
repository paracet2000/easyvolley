// Configuration
// const API = 'http://localhost:3000/api';
const API = '/api';

// Select DOM Elements
const elements = {
  home: {
    league: document.getElementById('leagueSelect1'),
    team: document.getElementById('teamSelect1'),
    preview: document.getElementById('preview1'),
    // gradient: ... ลบออกแล้ว เพราะจะสร้างใหม่จากข้อมูลทีม
  },
  away: {
    league: document.getElementById('leagueSelect2'),
    team: document.getElementById('teamSelect2'),
    preview: document.getElementById('preview2'),
    // gradient: ... ลบออกแล้ว เพราะจะสร้างใหม่จากข้อมูลทีม
  }
};

// 1. Initial Load: Fetch Leagues
async function loadLeagues() {
  try {
    const res = await fetch(`${API}/leagues`);
    const result = await res.json();
    const leagues = result.data;

    // Helper to add options to a select element
    const addOptions = (selectElement) => {
      leagues.forEach(l => {
        const opt = document.createElement('option');
        opt.value = l._id;
        opt.textContent = l.name;
        selectElement.appendChild(opt);
      });
    };

    addOptions(elements.home.league);
    addOptions(elements.away.league);

  } catch (error) {
    console.error("Error loading leagues:", error);
  }
}

// 2. Generic function to handle League Change
async function handleLeagueChange(sideKey) {
  const config = elements[sideKey];
  const leagueId = config.league.value;

  // Reset Team Select
  config.team.innerHTML = '<option value="">Select Team</option>';
  config.team.disabled = true;
  config.preview.innerHTML = '';
  config.preview.style.background = 'transparent';

  if (!leagueId) return;

  try {
    const res = await fetch(`${API}/leagues/${leagueId}/teams`);
    const result = await res.json();
    const teams = result.data;

    teams.forEach(t => {
      const opt = document.createElement('option');
      opt.value = t._id;
      opt.textContent = t.name;
      config.team.appendChild(opt);
    });

    config.team.disabled = false;
  } catch (error) {
    console.error("Error loading teams:", error);
  }
}

// 3. Generic function to handle Team Change & Render
async function handleTeamChange(sideKey) {
  const config = elements[sideKey];
  const leagueId = config.league.value;
  const teamId = config.team.value;

  if (!leagueId || !teamId) return;

  try {
    const res = await fetch(`${API}/team-thumbnail?leagueId=${leagueId}&teamId=${teamId}`);
    const data = await res.json();
    
    // UPDATE: ไม่ต้องส่ง config.gradient แล้ว ส่งแค่ data, element, และ side
    renderPreview(data, config.preview, sideKey); 

  } catch (error) {
    console.error("Error fetching thumbnail data:", error);
  }
}

// 4. Unified Render Function
// UPDATE: ลบ parameter 'backgroundStyle' ออก เพราะเราจะสร้างเองข้างใน
function renderPreview(data, container, side) {
  const stars = data.stars || [];
  let starHtml = '';

  if (stars.length > 0) {
    // Determine class based on number of stars
    const starClass = stars.length >= 2 ? 'double' : 'single';
    
    // Create Image tags
    const imgs = stars.slice(0, 2).map(s => `<img src="${s.photoUrl}" alt="Player" />`).join('');
    
    starHtml = `
      <div class="star-hero ${starClass}">
        ${imgs}
      </div>
    `;
  }

  // Determine card class (preview-card for home, preview-card-reverse for away)
  const cardClass = side === 'away' ? 'preview-card reverse' : 'preview-card';

  // --- NEW: Dynamic Gradient Logic ---
  // ดึงสีจาก Data ถ้าไม่มีให้ใช้สี Default (สีเทาเข้ม/ดำ)
  const color1 = data.team.primaryColor || '#333333';
  const color2 = data.team.secondaryColor || '#000000';

  // สร้าง String Gradient
  const dynamicGradient = `linear-gradient(135deg, ${color1}, ${color2})`;

  container.innerHTML = `
    <div class="${cardClass}">
      ${starHtml}
      <div class="team-info">
        <img class="team-logo" src="${data.team.logo}" alt="Logo" />
        <h3 class="team-name">${data.team.name}</h3>
      </div>
    </div>`;
  
  // Apply Dynamic Gradient
  container.style.background = dynamicGradient;
}

// Event Listeners
elements.home.league.addEventListener('change', () => handleLeagueChange('home'));
elements.away.league.addEventListener('change', () => handleLeagueChange('away'));

elements.home.team.addEventListener('change', () => handleTeamChange('home'));
elements.away.team.addEventListener('change', () => handleTeamChange('away'));

// Init
loadLeagues();