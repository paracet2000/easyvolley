const leagueSelect = document.getElementById('leagueSelect');
const teamSelect = document.getElementById('teamSelect');
const preview = document.getElementById('preview');

const API = '/api';

// 1. โหลดลีกทั้งหมด
async function loadLeagues() {
  const res = await fetch(`${API}/leagues`);
  const result = await res.json();
    const leagues = result.data;
  

  leagues.forEach(l => {
    const opt = document.createElement('option');
    opt.value = l._id;
    opt.textContent = l.name;
    leagueSelect.appendChild(opt);
  });
}

// 2. โหลดทีมเมื่อเลือกลีก
leagueSelect.addEventListener('change', async () => {
  const leagueId = leagueSelect.value;
  console.log('selected Data: ',leagueId);  // undefined
  teamSelect.innerHTML = '<option value="">Select Team</option>';
  preview.innerHTML = '';
  teamSelect.disabled = true;

  if (!leagueId) return;

  const res = await fetch(`${API}/leagues/${leagueId}/teams`);
  const result = await res.json();
  const teams = result.data;
  
  teams.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t._id;
    opt.textContent = t.name;
    teamSelect.appendChild(opt);
  });

  teamSelect.disabled = false;
});

// 3. โหลด thumbnail เมื่อเลือกทีม
teamSelect.addEventListener('change', async () => {
  const leagueId = leagueSelect.value;
  const teamId = teamSelect.value;

  if (!leagueId || !teamId) return;

  const res = await fetch(
    `${API}/team-thumbnail?leagueId=${leagueId}&teamId=${teamId}`
  );
  const data = await res.json();

  renderPreview(data);
});

function renderPreview(data) {
  const stars = data.stars || [];

  let starHtml = '';

  if (stars.length === 1) {
    starHtml = `
      <div class="star-hero single">
        <img src="${stars[0].photoUrl}" />
      </div>
    `;
  }

  if (stars.length >= 2) {
    starHtml = `
      <div class="star-hero double">
        <img src="${stars[0].photoUrl}" />
        <img src="${stars[1].photoUrl}" />
      </div>
    `;
  }
  
  preview.innerHTML = `
    <div class="preview-card">
      ${starHtml}
      <div class="team">
        <img class="team-logo" src="${data.team.logo}" />
        <h3 class="team-name">${data.team.name}</h3>
      </div>

    </div>`;
  preview.style.background = `
  linear-gradient(135deg,rgb(87, 87, 194),rgb(48, 90, 48)
  )
`;

}
// init
loadLeagues();
