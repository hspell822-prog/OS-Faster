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
  win.style.top = '100px';
  win.style.left = '200px';
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
    win.remove();
    taskBtn.remove();
  });

  // Focus on click
  win.addEventListener('mousedown', () => {
    win.style.zIndex = ++zIndex;
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

  return '<p>App not found</p>';
}

// ===== APP INIT =====
function initApp(appName, win) {
  if (appName === 'calculator') initCalculator(win);
  if (appName === 'notes') initNotes(win);
  if (appName === 'terminal') initTerminal(win);
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

// ===== WALLPAPER =====
function setWallpaper(url) {
  const img = new Image();
  img.onload = ()=>{
  document.body.style.backgroundImage = `url('${url}')`;  };
  img.onerror = ()=>{
    alert('ye image load ni ho rhi hai.url check kray');
  };
  img.src=url;
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

// === taskbar 2
taskbtn.addEventListener('click',()=>{
  win.style.display = 'flex'
  win.style.zIndex = ++zIndex
})

// ==== window focus hilight
win.addEventListener('mousedown',()=>{
  win.style.zIndex = ++zIndex;
  HighlightTaskbar(taskbtn);
});

function HighlightTaskbar (activebtn){
  document.querySelectorAll('.taskbar-item').forEach(btn =>{
    btn.classList.remove('active')
  });
  activebtn.classList.add('active');
}
window.addEventListener('error',(e) =>{
  console.error('OS Error:',e.message);
});
