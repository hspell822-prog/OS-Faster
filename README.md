# ⚡ FastOS

Ek **browser-based operating system** jo HTML, CSS aur vanilla JavaScript mein bana hai.

Boot animation, draggable windows, multiple apps, themes, wallpaper gallery aur ek Snake game — sab kuch browser mein!

---

## 🎬 Screenshots

### Boot Screen
![Boot Screen](screenshots/boot.png)

### Desktop
![Desktop](screenshots/desktop.png)

### Apps
![Calculator](screenshots/calculator.png)
![Notes](screenshots/notes.png)
![Terminal](screenshots/terminal.png)
![Gallery](screenshots/gallery.png)
![Snake Game](screenshots/snake.png)

### Themes
![Cyberpunk](screenshots/cyberpunk.png)
![Matrix](screenshots/matrix.png)
![Ocean](screenshots/ocean.png)
![Sunset](screenshots/sunset.png)

---

## ✨ Features

### 🖥️ Desktop
- Glass-style icons (hover pe bounce)
- Right-click **context menu** (Change Wallpaper, New Note, Refresh)
- Custom wallpaper (gallery se ya URL se)
- **28 wallpapers** — Space, Abstract, Nature, City, Ocean, Sunset, Forest

### 🪟 Window System
- **Draggable** windows (title bar se pakad kar)
- **Minimize / Maximize / Close** buttons
- **Window snap** — screen ke kinare pe drag karo → auto-resize
- **Z-index** — jo window click karo woh upar aaye
- **Active taskbar highlight** — pulse glow animation
- **Open/close animations** — smooth fade + scale
- Multiple windows ek saath

### 🎨 5 Themes
| Theme | Colors |
|-------|--------|
| ⬛ Default | Blue + white |
| 🌌 Cyberpunk | Magenta + cyan |
| 🍃 Matrix | Black + neon green |
| 🌊 Ocean | Deep blue + teal |
| 🔥 Sunset | Orange + pink |

Har theme ka apna **wallpaper**, **accent color** aur **glow** hai. Choice `localStorage` mein save hoti hai.

### 📱 Apps

#### 🧮 Calculator
- Basic operations (+, -, *, /)
- Clear button
- Error handling (galat expression pe "Error")

#### 📝 Notes
- Type karo — **auto-save** localStorage mein
- Refresh ke baad bhi text rehta hai

#### 💻 Terminal
- Commands: `help`, `date`, `clear`, `echo [text]`, `whoami`
- Green-on-black hacker theme
- Scrollable output

#### 🖼️ Wallpaper Gallery
- **28 curated wallpapers** (4 columns grid)
- Click pe lag jaye
- **Custom URL** input — koi bhi image URL daalo
- Current wallpaper highlighted

#### 🐍 Snake Game
- **Canvas-based** game (20x20 grid)
- **Arrow keys** se control
- Food khaao → score badhe
- Wall ya self collision → Game Over
- **High score** localStorage mein save
- Restart button

### 🔔 Notifications
- Toast notifications (alert ki jagah)
- **3 types**: success (green), error (red), info (accent)
- Smooth slide-in/out animation

### ⌨️ Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| `Ctrl + N` | New Note |
| `Ctrl + T` | Terminal |
| `Ctrl + G` | Gallery |
| `Ctrl + K` | Calculator |
| `Esc` | Saare menus band |

### 🎬 Boot Animation
- "Fast" — har letter alag color + 3D shadow
- "OS" — glass transparent box, green O + red S
- Loading spinner
- 1.5 sec baad fade out

### 📜 Custom Scrollbar
- Thin, rounded, theme ke saath match
- Hover pe bright
- Firefox + Chrome dono support

### 📱 Responsive
- Mobile pe bhi kaam karta hai (768px breakpoint)
- Chhote icons, fonts, windows

### ⚠️ Error Handling
- Galat image URL → toast notification
- Global error handler → console mein log
- OS crash nahi hota

---

Screen Shots

<img width="1918" height="930" alt="Screenshot_2026-10-13_00-49-22" src="https://github.com/user-attachments/assets/8f07df82-befc-4fe7-acbc-520afd8627f9" />
<img width="1920" height="934" alt="Screenshot_2026-10-13_00-48-54" src="https://github.com/user-attachments/assets/2bfc9deb-b283-4d9d-95cf-8461c20b2d87" />
<img width="1918" height="942" alt="Screenshot_2026-10-13_00-48-38" src="https://github.com/user-attachments/assets/7010418d-c6c1-4a60-8127-97664c4c3728" />
<img width="1914" height="950" alt="Screenshot_2026-10-13_00-48-12" src="https://github.com/user-attachments/assets/f42d3719-b3ff-4baa-b29d-8fc97543f2ac" />


## 🚀 Kaise Chalao

### Method 1: https://hspell822-prog.github.io/OS-Faster/
1. Repo clone karo:
   ```bash
   git clone https://github.com/TUMHARA-USERNAME/fastos.git
