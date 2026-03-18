/* =============================================
   SnipVault — Code Snippet Library
   script.js
   ============================================= */

/* ══════════════════════════════════════════
   STORAGE HELPERS
══════════════════════════════════════════ */

const STORAGE_KEY   = 'snipvault_snippets';
const COPIES_KEY    = 'snipvault_copies';

const DEFAULT_SNIPPETS = [
  {
    id: 'default_1',
    title: 'Debounce Function',
    lang: 'JavaScript',
    tag: 'utility',
    desc: 'Delays a function call until after a specified wait time.',
    code: `function debounce(func, wait) {\n  let timeout;\n  return function (...args) {\n    clearTimeout(timeout);\n    timeout = setTimeout(() => func.apply(this, args), wait);\n  };\n}`,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'default_2',
    title: 'Flexbox Center Utility',
    lang: 'CSS',
    tag: 'layout',
    desc: 'Perfectly center any element using flexbox.',
    code: `.center-flex {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}`,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'default_3',
    title: 'API Calls using JS',
    lang: 'JavaScript',
    tag: 'api',
    desc: 'A simple async wrapper around the Fetch API with error handling.',
    code: `const apiCall = async (url) => {\n  try {\n    const response = await fetch(url);\n    if (!response.ok) {\n      throw new Error(\`HTTP error! status: \${response.status}\`);\n    }\n    const data = await response.json();\n    console.log(data);\n  } catch (error) {\n    console.error('Error:', error);\n  }\n};`,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'default_4',
    title: 'Generate Random Number in Range',
    lang: 'JavaScript',
    tag: 'utility',
    desc: 'Generate a random integer between min and max (inclusive).',
    code: `const randomNumber = Math.floor(Math.random()\n  * (max - min + 1)) + min;`,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'default_5',
    title: 'Date and Time Handling',
    lang: 'Java',
    tag: 'utility',
    desc: 'Get and format the current date using Java time API.',
    code: `import java.time.LocalDate;\nimport java.time.format.DateTimeFormatter;\n\nLocalDate currentDate = LocalDate.now();\nSystem.out.println("Current date: " + currentDate);\n\nDateTimeFormatter formatter =\n  DateTimeFormatter.ofPattern("dd/MM/yyyy");\nString formatted = currentDate.format(formatter);\nSystem.out.println("Formatted: " + formatted);`,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'default_6',
    title: 'Max & Min Value using SQL',
    lang: 'SQL',
    tag: 'query',
    desc: 'Get the maximum and minimum value of a column in a table.',
    code: `SELECT\n  MIN(column_name) AS min_value,\n  MAX(column_name) AS max_value\nFROM table_name;`,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'default_7',
    title: 'Append Text into File using Java',
    lang: 'Java',
    tag: 'file',
    desc: 'Append a string to an existing file using BufferedWriter.',
    code: `try (BufferedWriter out = new BufferedWriter(\n    new FileWriter("filename", true))) {\n  out.write("aString");\n} catch (IOException e) {\n  // error processing code\n}`,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'default_8',
    title: 'Data Analysis using Pandas',
    lang: 'Python',
    tag: 'data',
    desc: 'Create a DataFrame from a dictionary and analyse it with Pandas.',
    code: `import pandas as pd\n\n# Create a dictionary of data\ndata = {\n  'City': ['Tokyo', 'Delhi', 'Shanghai', 'Sao Paulo', 'Mumbai'],\n  'Population_Millions': [37.3, 32.0, 28.5, 22.4, 20.4]\n}\n\n# Convert the dictionary to a DataFrame\ndf = pd.DataFrame(data)\nprint(df)\nprint(df.describe())`,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'default_9',
    title: 'HTML Template',
    lang: 'HTML',
    tag: 'template',
    desc: 'A clean HTML5 boilerplate to start any project.',
    code: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport"\n    content="width=device-width, initial-scale=1.0">\n  <title>Document</title>\n</head>\n<body>\n\n</body>\n</html>`,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'default_10',
    title: 'Reverse a String',
    lang: 'Python',
    tag: 'utility',
    desc: 'One liner to reverse any string in Python.',
    code: `def reverse_string(s):\n    return s[::-1]\n\nprint(reverse_string("hello"))  # olleh`,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'default_11',
    title: 'Responsive Navbar',
    lang: 'HTML',
    tag: 'ui',
    desc: 'A clean semantic navbar structure ready to style.',
    code: `<nav class="navbar">\n  <div class="logo">Brand</div>\n  <ul class="nav-links">\n    <li><a href="#home">Home</a></li>\n    <li><a href="#about">About</a></li>\n    <li><a href="#contact">Contact</a></li>\n  </ul>\n</nav>`,
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
];

function loadSnippets() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (stored && stored.length > 0) return stored;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SNIPPETS));
    return DEFAULT_SNIPPETS;
  } catch {
    return DEFAULT_SNIPPETS;
  }
}

function saveSnippets(snippets) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
}

function loadCopies() {
  return parseInt(localStorage.getItem(COPIES_KEY) || '0', 10);
}

function incrementCopies() {
  const n = loadCopies() + 1;
  localStorage.setItem(COPIES_KEY, n);
  document.getElementById('totalCopies').textContent = n;
}

/* ══════════════════════════════════════════
   STATE
══════════════════════════════════════════ */

let snippets      = loadSnippets();
let activeFilter  = 'all';
let editingId     = null;   // null = adding new, string = editing existing
let viewingId     = null;   // currently open in view modal

/* ══════════════════════════════════════════
   LANGUAGE → CSS CLASS MAP
══════════════════════════════════════════ */

function langClass(lang) {
  return 'lang-' + (lang || 'other').toLowerCase().replace(/[^a-z]/g, '');
}

/* ══════════════════════════════════════════
   STATS
══════════════════════════════════════════ */

function updateStats() {
  document.getElementById('totalSnippets').textContent = snippets.length;

  const langs = new Set(snippets.map(s => s.lang).filter(Boolean));
  document.getElementById('totalLangs').textContent = langs.size;

  document.getElementById('totalCopies').textContent = loadCopies();
}

/* ══════════════════════════════════════════
   LANGUAGE FILTER BUTTONS
══════════════════════════════════════════ */

function buildFilterButtons() {
  const container = document.getElementById('langFilters');
  const langs = [...new Set(snippets.map(s => s.lang).filter(Boolean))].sort();

  // Remove all buttons except "All"
  [...container.querySelectorAll('.filter-btn:not([data-lang="all"])')].forEach(b => b.remove());

  langs.forEach(lang => {
    const btn = document.createElement('button');
    btn.className   = 'filter-btn' + (activeFilter === lang ? ' active' : '');
    btn.dataset.lang = lang;
    btn.textContent  = lang;
    btn.onclick      = () => setFilter(lang, btn);
    container.appendChild(btn);
  });
}

function setFilter(lang, btn) {
  activeFilter = lang;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderSnippets();
}

/* ══════════════════════════════════════════
   RENDER SNIPPET GRID
══════════════════════════════════════════ */

function renderSnippets() {
  const query  = document.getElementById('searchInput').value.trim().toLowerCase();
  const grid   = document.getElementById('snippetGrid');
  const empty  = document.getElementById('emptyState');
  const noSearch = document.getElementById('emptySearch');

  grid.innerHTML = '';
  empty.style.display    = 'none';
  noSearch.style.display = 'none';

  // Filter by language
  let filtered = activeFilter === 'all'
    ? snippets
    : snippets.filter(s => s.lang === activeFilter);

  // Filter by search query
  if (query) {
    filtered = filtered.filter(s =>
      s.title.toLowerCase().includes(query) ||
      (s.desc  || '').toLowerCase().includes(query) ||
      (s.tag   || '').toLowerCase().includes(query) ||
      (s.lang  || '').toLowerCase().includes(query) ||
      s.code.toLowerCase().includes(query)
    );
  }

  // No snippets at all
  if (snippets.length === 0) {
    empty.style.display = 'block';
    return;
  }

  // No results for current filter/search
  if (filtered.length === 0) {
    noSearch.style.display = 'block';
    return;
  }

  // Render cards newest first
  [...filtered].reverse().forEach((snippet, index) => {
    const card = document.createElement('div');
    card.className = 'snippet-card';
    card.style.animationDelay = `${index * 50}ms`;

    const cls       = langClass(snippet.lang);
    const preview   = escapeHtml(snippet.code.slice(0, 300));
    const dateStr   = new Date(snippet.createdAt).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric'
    });

    card.innerHTML = `
      <div class="card-topbar">
        <div class="card-dots">
          <span class="cdot"></span>
          <span class="cdot"></span>
          <span class="cdot"></span>
        </div>
        <span class="lang-pill ${cls}">${escapeHtml(snippet.lang)}</span>
        <span class="card-date">${dateStr}</span>
      </div>
      <div class="card-preview">${preview}</div>
      <div class="card-footer">
        <span class="card-title">${escapeHtml(snippet.title)}</span>
        ${snippet.tag ? `<span class="card-tag">${escapeHtml(snippet.tag)}</span>` : ''}
        <button class="btn-copy-card" onclick="copySnippet(event, '${snippet.id}')">Copy</button>
      </div>`;

    // Click card body (not copy button) → open view modal
    card.querySelector('.card-topbar').addEventListener('click', () => openViewModal(snippet.id));
    card.querySelector('.card-preview').addEventListener('click', () => openViewModal(snippet.id));
    card.querySelector('.card-title').addEventListener('click', () => openViewModal(snippet.id));

    grid.appendChild(card);
  });
}

/* ══════════════════════════════════════════
   COPY TO CLIPBOARD
══════════════════════════════════════════ */

function copySnippet(event, id) {
  event.stopPropagation();
  const snippet = snippets.find(s => s.id === id);
  if (!snippet) return;

  navigator.clipboard.writeText(snippet.code).then(() => {
    const btn = event.target;
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'Copy';
      btn.classList.remove('copied');
    }, 2000);
    incrementCopies();
    showToast('Copied to clipboard');
  });
}

function copyFromView() {
  const snippet = snippets.find(s => s.id === viewingId);
  if (!snippet) return;

  navigator.clipboard.writeText(snippet.code).then(() => {
    const btn = document.getElementById('copyTopBtn');
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'Copy';
      btn.classList.remove('copied');
    }, 2000);
    incrementCopies();
    showToast('Copied to clipboard');
  });
}

/* ══════════════════════════════════════════
   TOAST
══════════════════════════════════════════ */

let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

/* ══════════════════════════════════════════
   ADD / EDIT MODAL
══════════════════════════════════════════ */

function openAddModal(id = null) {
  editingId = id;
  const isEdit = id !== null;

  document.getElementById('modalTitle').textContent = isEdit ? 'Edit Snippet' : 'New Snippet';
  clearFormErrors();

  if (isEdit) {
    const s = snippets.find(sn => sn.id === id);
    if (!s) return;
    document.getElementById('fTitle').value = s.title;
    document.getElementById('fLang').value  = s.lang;
    document.getElementById('fTag').value   = s.tag  || '';
    document.getElementById('fDesc').value  = s.desc || '';
    document.getElementById('fCode').value  = s.code;
    document.getElementById('editorLangTag').textContent = s.lang.toLowerCase();
  } else {
    document.getElementById('fTitle').value = '';
    document.getElementById('fLang').value  = '';
    document.getElementById('fTag').value   = '';
    document.getElementById('fDesc').value  = '';
    document.getElementById('fCode').value  = '';
    document.getElementById('editorLangTag').textContent = 'code';
  }

  document.getElementById('addModal').classList.add('open');
}

function closeAddModal() {
  document.getElementById('addModal').classList.remove('open');
  editingId = null;
}

// Update lang tag in editor as user selects
document.getElementById('fLang').addEventListener('change', function () {
  document.getElementById('editorLangTag').textContent = this.value.toLowerCase() || 'code';
});

function clearFormErrors() {
  ['errTitle', 'errLang', 'errCode'].forEach(id => {
    document.getElementById(id).textContent = '';
  });
}

function saveSnippet() {
  clearFormErrors();

  const title = document.getElementById('fTitle').value.trim();
  const lang  = document.getElementById('fLang').value;
  const tag   = document.getElementById('fTag').value.trim();
  const desc  = document.getElementById('fDesc').value.trim();
  const code  = document.getElementById('fCode').value;

  let valid = true;
  if (!title) { document.getElementById('errTitle').textContent = 'Title is required'; valid = false; }
  if (!lang)  { document.getElementById('errLang').textContent  = 'Select a language'; valid = false; }
  if (!code.trim()) { document.getElementById('errCode').textContent = 'Code cannot be empty'; valid = false; }
  if (!valid) return;

  if (editingId) {
    // Update existing
    snippets = snippets.map(s => s.id === editingId
      ? { ...s, title, lang, tag, desc, code, updatedAt: Date.now() }
      : s
    );
    showToast('Snippet updated');
  } else {
    // Add new
    snippets.push({
      id:        'snip_' + Date.now(),
      title, lang, tag, desc, code,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
    showToast('Snippet saved');
  }

  saveSnippets(snippets);
  closeAddModal();
  buildFilterButtons();
  updateStats();
  renderSnippets();
}

/* ══════════════════════════════════════════
   VIEW MODAL
══════════════════════════════════════════ */

function openViewModal(id) {
  const s = snippets.find(sn => sn.id === id);
  if (!s) return;
  viewingId = id;

  document.getElementById('viewTitle').textContent = s.title;
  document.getElementById('viewLangTag').textContent = s.lang.toLowerCase();
  document.getElementById('viewCode').textContent    = s.code;
  document.getElementById('viewDesc').textContent    = s.desc || '';
  document.getElementById('viewDesc').style.display  = s.desc ? 'block' : 'none';

  const dateStr = new Date(s.createdAt).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric'
  });

  document.getElementById('viewMeta').innerHTML = `
    <span class="lang-pill ${langClass(s.lang)}">${escapeHtml(s.lang)}</span>
    <span class="view-meta-item">${dateStr}</span>
    ${s.tag ? `<span class="view-meta-item">· #${escapeHtml(s.tag)}</span>` : ''}
  `;

  const copyBtn = document.getElementById('copyTopBtn');
  copyBtn.textContent = 'Copy';
  copyBtn.classList.remove('copied');

  document.getElementById('viewModal').classList.add('open');
}

function closeViewModal() {
  document.getElementById('viewModal').classList.remove('open');
  viewingId = null;
}

function editFromView() {
  const id = viewingId;
  closeViewModal();
  openAddModal(id);
}

function deleteFromView() {
  if (!viewingId) return;
  const s = snippets.find(sn => sn.id === viewingId);
  if (!s) return;

  if (!confirm(`Delete "${s.title}"? This cannot be undone.`)) return;

  snippets = snippets.filter(sn => sn.id !== viewingId);
  saveSnippets(snippets);
  closeViewModal();
  buildFilterButtons();
  updateStats();
  renderSnippets();
  showToast('Snippet deleted');
}

/* ══════════════════════════════════════════
   CLOSE MODALS ON OVERLAY CLICK
══════════════════════════════════════════ */

document.getElementById('addModal').addEventListener('click', function (e) {
  if (e.target === this) closeAddModal();
});
document.getElementById('viewModal').addEventListener('click', function (e) {
  if (e.target === this) closeViewModal();
});

/* ══════════════════════════════════════════
   KEYBOARD SHORTCUTS
══════════════════════════════════════════ */

document.addEventListener('keydown', e => {
  // Escape closes any open modal
  if (e.key === 'Escape') {
    closeAddModal();
    closeViewModal();
  }
  // Ctrl/Cmd + K → open add modal
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    openAddModal();
  }
});

/* ══════════════════════════════════════════
   UTILITY — HTML escape
══════════════════════════════════════════ */

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ══════════════════════════════════════════
   BOOTSTRAP — run on page load
══════════════════════════════════════════ */

updateStats();
buildFilterButtons();
renderSnippets();