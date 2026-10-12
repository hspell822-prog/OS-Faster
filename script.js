// ===== CLOCK =====
console.log("Script chal rahi hai!");

function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}
updateClock();
setInterval(updateClock, 1000);

// ===== Z-INDEX TRACKER =====
let zIndex = 100;
// ===== GALLERY WALLPAPERS =====
const galleryWallpapers = [
  // 🌌 Space / Galaxy
  'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920',
  'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920',
  'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=1920',
  'https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=1920',

  // 🎨 Abstract
  'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1920',
  'https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=1920',
  'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=1920',
  'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1920',

  // 🏔️ Nature / Mountains
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920',
  'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1920',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920',

  // 🌃 City / Cyberpunk
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920',
  'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920',

  // 🌊 Ocean / Water
  'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920',
  'https://images.unsplash.com/photo-1439405326854-014607f694d7?w=1920',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920',
  'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1920',

  // 🔥 Sunset / Sunrise
  'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=1920',
  'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1920',
  'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1920',
  'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1920',

  // 🌲 Forest / Green
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1920',
  'https://images.unsplash.com/photo-1511497584788-876760111969?w=1920',
  'https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=1920'
];
// ===== START MENU =====
const startBtn = document.getElementById('start-btn');
const startMenu = document.getElementById('start-menu');

startBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  startMenu.classList.toggle('hidden');
});

document.addEventListener('click', () => {
  startMenu.classList.add('hidden');
});

// ===== ICON + MENU ITEM CLICK =====
document.querySelectorAll('.icon, .menu-item').forEach(el => {
  el.addEventListener('click', () => {
    openWindow(el.dataset.app);
  });
});

// ===== OPEN WINDOW =====
function openWindow(appName) {
  const win = document.createElement('div');
  win.className = 'window';
  const offset = document.querySelectorAll('.window').length*30;
  win.style.top = (80 + offset) + 'px';
  win.style.left = (100 + offset) +'px';
  if (appName === 'gallery'){
    win.style.width = '700px';
    win.style.height = '500px';
  }
  win.style.zIndex = ++zIndex;

  win.innerHTML = `
    <div class="title-bar">
      <span>${getAppName(appName)}</span>
      <div class="window-controls">
        <button class="min-btn">−</button>
        <button class="max-btn">□</button>
        <button class="close-btn">×</button>
      </div>
    </div>
    <div class="window-content">
      ${getAppContent(appName)}
    </div>
  `;

  document.getElementById('windows').appendChild(win);
  initApp(appName, win);

  // Taskbar button
  const taskBtn = document.createElement('div');
  taskBtn.className = 'taskbar-item';
  taskBtn.textContent = appName;

  taskBtn.addEventListener('click', () => {
    win.style.display = 'flex';
    win.style.zIndex = ++zIndex;
    HighlightTaskbar(taskBtn);
  });

  document.getElementById('taskbar-apps').appendChild(taskBtn);

  // MINIMIZE
  win.querySelector('.min-btn').addEventListener('click', () => {
    win.style.display = 'none';
  });

  // MAXIMIZE
  win.querySelector('.max-btn').addEventListener('click', () => {
    if (win.dataset.maximized === 'true') {
      win.style.top = win.dataset.oldTop;
      win.style.left = win.dataset.oldLeft;
      win.style.width = '';
      win.style.height = '';
      win.dataset.maximized = 'false';
    } else {
      win.dataset.oldTop = win.style.top;
      win.dataset.oldLeft = win.style.left;
      win.style.top = '0';
      win.style.left = '0';
      win.style.width = '100vw';
      win.style.height = 'calc(100vh - 48px)';
      win.dataset.maximized = 'true';
    }
  });

  // CLOSE
  win.querySelector('.close-btn').addEventListener('click', () => {
    win.classList.add('closing');
    setTimeout(()=>{
      win.remove();
      taskBtn.remove();
    },200);
  });

  // Focus on click
  win.addEventListener('mousedown', () => {
    win.style.zIndex = ++zIndex;
    HighlightTaskbar(taskBtn);
  });

  // Draggable
  makeDraggable(win, win.querySelector('.title-bar'));
}

// ===== DRAG SYSTEM =====
function makeDraggable(win, handle) {
  let offsetX = 0, offsetY = 0, dragging = false;

  handle.addEventListener('mousedown', (e) => {
    dragging = true;
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;
  });

  document.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    win.style.left = (e.clientX - offsetX) + 'px';
    win.style.top = (e.clientY - offsetY) + 'px';
  });

  document.addEventListener('mouseup', () => {
    dragging = false;
  });
}

// ===== APP NAME =====
function getAppName(appName) {
  if (appName === 'calculator') return 'Calculator';
  if (appName === 'notes') return 'Notes';
  if (appName === 'terminal') return 'Terminal';
  if (appName === 'gallery') return 'Gallery';
  if (appName === 'game') return 'Snake Game'
  return 'Unknown App';
}

// ===== APP CONTENT =====
function getAppContent(appName) {
  if (appName === 'calculator') {
    return `
      <input id="calc-display" readonly value="0" />
      <div class="calc-buttons">
        <button>7</button><button>8</button><button>9</button><button>/</button>
        <button>4</button><button>5</button><button>6</button><button>*</button>
        <button>1</button><button>2</button><button>3</button><button>-</button>
        <button>0</button><button>.</button><button>=</button><button>+</button>
        <button class="clear">C</button>
      </div>
    `;
  }

  if (appName === 'notes') {
    return `<textarea id="notes-area" placeholder="Type your notes..."></textarea>`;
  }

  if (appName === 'terminal') {
    return `
      <div id="term-output"></div>
      <input id="term-input" placeholder="Type command..." />
    `;
  }

  if (appName === 'gallery') {
    return `
      <div class="gallery-grid">
        ${galleryWallpapers.map(url =>
          `<div class="gallery-item" data-url="${url}" style="background-image: url('${url}')"></div>`
        ).join('')}
      </div>
      <div class="gallery-custom">
        <input id="custom-wallpaper" placeholder="Custom image URL..." />
        <button id="apply-custom">Apply</button>
      </div>
    `;
  }
  if (appName === 'game') {
  return `
    <div class="game-info">
      <span>Score: <span class="score" id="snake-score">0</span></span>
      <span>High: <span class="score" id="snake-high">0</span></span>
    </div>
    <canvas id="snake-canvas" width="400" height="400"></canvas>
    <div id="snake-message"></div>
    <button class="game-btn" id="snake-restart">🔄 Restart</button>
  `;
}
  return '<p>App not found</p>';
}

// ===== APP INIT =====
function initApp(appName, win) {
  if (appName === 'calculator') initCalculator(win);
  if (appName === 'notes') initNotes(win);
  if (appName === 'terminal') initTerminal(win);
  if (appName === 'gallery') initGallery(win);
  if (appName === 'game') initSnakeGame(win);
}

// ===== CALCULATOR =====
function initCalculator(win) {
  const display = win.querySelector('#calc-display');
  const buttons = win.querySelectorAll('.calc-buttons button');
  let expression = '';

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const value = btn.textContent;

      if (value === 'C') {
        expression = '';
        display.value = '0';
        return;
      }

      if (value === '=') {
        try {
          expression = String(eval(expression));
          display.value = expression;
        } catch {
          display.value = 'Error';
          expression = '';
        }
        return;
      }

      expression += value;
      display.value = expression;
    });
  });
}

// ===== NOTES =====
function initNotes(win) {
  const textarea = win.querySelector('#notes-area');
  textarea.value = localStorage.getItem('fastos-notes') || '';

  textarea.addEventListener('input', () => {
    localStorage.setItem('fastos-notes', textarea.value);
  });
}

// ===== TERMINAL =====
function initTerminal(win) {
  const output = win.querySelector('#term-output');
  const input = win.querySelector('#term-input');

  function print(text) {
    output.innerHTML += text + '<br>';
    output.scrollTop = output.scrollHeight;
  }

  print('FastOS Terminal v1.0 — type "help"');

  input.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;

    const command = input.value.trim();
    input.value = '';

    print('> ' + command);

    if (command === 'help') {
      print('Commands: help, date, clear, echo [text], whoami');
    } else if (command === 'date') {
      print(new Date().toString());
    } else if (command === 'clear') {
      output.innerHTML = '';
    } else if (command === 'whoami') {
      print('guest@fastos');
    } else if (command.startsWith('echo ')) {
      print(command.slice(5));
    } else if (command === '') {
      // khaali
    } else {
      print('Unknown command: ' + command);
    }
  });
}

// ===== GALLERY =====
function initGallery(win) {
  const items = win.querySelectorAll('.gallery-item');

  items.forEach(item => {
    item.addEventListener('click', () => {
      const url = item.dataset.url;
      setWallpaper(url);
      localStorage.setItem('fastos-wallpaper', url);

      items.forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');
    });
  });

  const customInput = win.querySelector('#custom-wallpaper');
  const applyBtn = win.querySelector('#apply-custom');

  applyBtn.addEventListener('click', () => {
    const url = customInput.value.trim();
    if (url) {
      setWallpaper(url);
      localStorage.setItem('fastos-wallpaper', url);
    }
  });

  // Current wallpaper highlight
  const current = localStorage.getItem('fastos-wallpaper');
  if (current) {
    items.forEach(item => {
      if (item.dataset.url === current) {
        item.classList.add('selected');
      }
    });
  }
}

// ===== WALLPAPER =====
function setWallpaper(url) {
  const img = new Image();
  img.onload = () => {
    document.body.style.backgroundImage = `url('${url}')`;
  };
  img.onerror = () => {
    alert('Ye image load nahi ho rahi. URL check karo.');
  };
  img.src = url;
}

// ===== CONTEXT MENU =====
const contextMenu = document.getElementById('context-menu');

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  contextMenu.style.left = e.clientX + 'px';
  contextMenu.style.top = e.clientY + 'px';
  contextMenu.classList.remove('hidden');
});

document.addEventListener('click', () => {
  contextMenu.classList.add('hidden');
});

document.querySelectorAll('.context-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.stopPropagation();
    const action = item.dataset.action;

    if (action === 'wallpaper') {
      const url = prompt('Wallpaper URL daalo:');
      if (url) setWallpaper(url);
    }
    if (action === 'note') {
      openWindow('notes');
    }
    if (action === 'refresh') {
      location.reload();
    }
  });
});

// ===== BOOT ANIMATION =====
window.addEventListener('load', () => {
  setTimeout(() => {
    const boot = document.getElementById('boot-screen');
    boot.classList.add('fade-out');
    setTimeout(() => boot.remove(), 500);
  }, 1500);
});

// ===== TASKBAR HIGHLIGHT =====
function HighlightTaskbar(activeBtn) {
  document.querySelectorAll('.taskbar-item').forEach(btn => {
    btn.classList.remove('active');
  });
  activeBtn.classList.add('active');
}

// ===== GLOBAL ERROR HANDLER =====
window.addEventListener('error', (e) => {
  console.error('OS Error:', e.message);
});

// ===== THEME PICKER =====
const themewallpapers = {
  default: 'assets/background.jpg',
  cyberpunk: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920',
  matrix: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1920',
  ocean: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920',
  sunset: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=1920'
};

const themeBtn = document.getElementById('theme-btn');
const themeMenu = document.getElementById('theme-menu');

function applyTheme(themeName) {
  document.body.classList.remove(
    'theme-cyberpunk',
    'theme-matrix',
    'theme-ocean',
    'theme-sunset'
  );

  if (themeName !== 'default') {
    document.body.classList.add('theme-' + themeName);
  }

  document.body.style.backgroundImage = `url('${themewallpapers[themeName]}')`;
  localStorage.setItem('fastos-theme', themeName);
}

// Saved theme load karo
const savedTheme = localStorage.getItem('fastos-theme') || 'default';
applyTheme(savedTheme);

// Theme button click
themeBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  themeMenu.classList.toggle('hidden');
});

// Bahar click pe band
document.addEventListener('click', () => {
  themeMenu.classList.add('hidden');
});

// Theme option click
document.querySelectorAll('.theme-option').forEach(opt => {
  opt.addEventListener('click', (e) => {
    e.stopPropagation();
    applyTheme(opt.dataset.theme);
    themeMenu.classList.add('hidden');
  });
});

// ===== LOAD SAVED WALLPAPER =====
const savedWallpaper = localStorage.getItem('fastos-wallpaper');
if (savedWallpaper) {
  document.body.style.backgroundImage = `url('${savedWallpaper}')`;
}

// ======== Snake Game ======== 
function initSnakeGame(win) {
  const canvas = win.querySelector('#snake-canvas');
  const ctx = canvas.getContext('2d');
  const scoreEl = win.querySelector('#snake-score');
  const highEl = win.querySelector('#snake-high');
  const messageEl = win.querySelector('#snake-message');
  const restartBtn = win.querySelector('#snake-restart');

  const GRID = 20;
  const CELL = canvas.width / GRID;
  const SPEED = 120;

  let snake, direction, nextDirection, food, score, high, gameLoop, gameOver;

  // High score load
  high = parseInt(localStorage.getItem('fastos-snake-high')) || 0;
  highEl.textContent = high;

  function reset() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    score = 0;
    gameOver = false;
    scoreEl.textContent = 0;
    messageEl.innerHTML = '';
    placeFood();
  }

  function placeFood() {
    food = {
      x: Math.floor(Math.random() * GRID),
      y: Math.floor(Math.random() * GRID)
    };
    if (snake.some(s => s.x === food.x && s.y === food.y)) {
      placeFood();
    }
  }

  function draw() {
    // Background
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid lines
    ctx.strokeStyle = '#222';
    for (let i = 0; i <= GRID; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL, 0);
      ctx.lineTo(i * CELL, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL);
      ctx.lineTo(canvas.width, i * CELL);
      ctx.stroke();
    }

    // Snake
    snake.forEach((seg, i) => {
      ctx.fillStyle = i === 0 ? '#00ff88' : '#00aa55';
      ctx.fillRect(seg.x * CELL, seg.y * CELL, CELL - 1, CELL - 1);
    });

    // Food
    ctx.fillStyle = '#ff3355';
    ctx.beginPath();
    ctx.arc(
      food.x * CELL + CELL / 2,
      food.y * CELL + CELL / 2,
      CELL / 2 - 2,
      0, Math.PI * 2
    );
    ctx.fill();
  }

  function update() {
    if (gameOver) return;

    direction = nextDirection;

    const head = {
      x: snake[0].x + direction.x,
      y: snake[0].y + direction.y
    };

    // Wall collision
    if (head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID) {
      return endGame();
    }

    // Self collision
    if (snake.some(s => s.x === head.x && s.y === head.y)) {
      return endGame();
    }

    snake.unshift(head);

    // Food?
    if (head.x === food.x && head.y === food.y) {
      score++;
      scoreEl.textContent = score;
      placeFood();
    } else {
      snake.pop();
    }

    draw();
  }

  function endGame() {
    gameOver = true;
    clearInterval(gameLoop);
    messageEl.innerHTML = '<div class="game-over">💀 Game Over!</div>';

    if (score > high) {
      high = score;
      highEl.textContent = high;
      localStorage.setItem('fastos-snake-high', high);
    }
  }

  function start() {
    reset();
    draw();
    clearInterval(gameLoop);
    gameLoop = setInterval(update, SPEED);
  }

  function handleKey(e) {
    const key = e.key;
    if (key === 'ArrowUp' && direction.y === 0) {
      nextDirection = { x: 0, y: -1 };
    } else if (key === 'ArrowDown' && direction.y === 0) {
      nextDirection = { x: 0, y: 1 };
    } else if (key === 'ArrowLeft' && direction.x === 0) {
      nextDirection = { x: -1, y: 0 };
    } else if (key === 'ArrowRight' && direction.x === 0) {
      nextDirection = { x: 1, y: 0 };
    }
  }

  document.addEventListener('keydown', handleKey);
  restartBtn.addEventListener('click', start);

  // Cleanup
  const observer = new MutationObserver(() => {
    if (!document.body.contains(win)) {
      clearInterval(gameLoop);
      document.removeEventListener('keydown', handleKey);
      observer.disconnect();
    }
  });
  observer.observe(document.getElementById('windows'), { childList: true });

  start();
}

// ======== key board short cut

document.addEventListener('keydown',(e)=>{
  //ctrl +N new note
  if(e.ctrlKey&&e.key=='n'){
    e.preventDefault();
    openWindow('notes');
  }
  // ctrl+t terminal
  if(e.ctrlKey&&e.key ==='t'){
    e.preventDefault();
    openWindow('terminal');
  }
  //ctrl + G Gallery
  if(e.ctrlKey&&e.key==='g'){
    e.preventDefault()
    openWindow('gallery');
  }
  // Escape sare menu band 
  if(e.key === 'Escape'){
    document.getElementById('start-menu').classList.add('hidden');
    document.getElementById('context-menu').classList.add('hidden');
    document.getElementById('theme-menu').classList.add('hidden');    
  }
})

// ======= Toast notifications

function showToast(message,type = 'info'){
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
toast.className = `toast ${type}`;   // ✅  toast.textContent = message;
  container.appendChild(toast);
setTimeout(() => {
  toast.classList.add('hiding');
  setTimeout(() => {
    toast.remove();
  }, 300);
}, 3000);
}