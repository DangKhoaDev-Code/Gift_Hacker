const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = "アカサタナハマヤラワンアイウエオカキクケコサシスセソ";
const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const nums = "0123456789";
const sign = "!@#$%^&*()_+";
const alphabet = katakana + latin + nums + sign;

const fontSize = 20;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

  function drawTechLines() {
  ctx.lineWidth = 0.5;
  ctx.strokeStyle = "rgba(0, 255, 0, 0.05)";
  ctx.beginPath();

  for (let x = 0; x < canvas.width; x += 100) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
  }

  for (let y = 0; y < canvas.height; y += 100) {
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
  }

  ctx.stroke();
  }

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawTechLines();
  ctx.fillStyle = "#0F0";
  ctx.font = fontSize + "px 'Orbitron', monospace";
  for (let i = 0; i < drops.length; i++) {
    const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(drawMatrix, 50);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

});



    // Đoạn code JavaScript để chặn Developer Tools và các thao tác khác
    // Chặn phím tắt F12, Ctrl+Shift+I, Ctrl+U để mở Developer Tools
    document.addEventListener('keydown', (event) => {
      if (
        event.key === 'F12' ||
        (event.ctrlKey && event.shiftKey && event.key === 'I') ||
        (event.ctrlKey && event.key === 'u')
      ) {
        event.preventDefault();
        return false;
      }
    });

    document.addEventListener('contextmenu', (event) => event.preventDefault());
    document.addEventListener('selectstart', (event) => event.preventDefault());
    document.addEventListener('cut', (event) => event.preventDefault());
    document.addEventListener('copy', (event) => event.preventDefault());
    document.addEventListener('paste', (event) => event.preventDefault());
    document.addEventListener('dragstart', (event) => event.preventDefault());

    // Biến trạng thái để theo dõi việc phát hiện Developer Tools


// Biến trạng thái để theo dõi việc phát hiện Developer Tools
let devToolsOpen = false;

// Hàm phát hiện và xử lý khi Developer Tools được mở
function handleDevToolsDetection() {
  const threshold = 160;
  const devToolsIsNowOpen = window.outerWidth - window.innerWidth > threshold || window.outerHeight - window.innerHeight > threshold;

  if (devToolsIsNowOpen && !devToolsOpen) {
    devToolsOpen = true;
    console.warn("Developer Tools đã được phát hiện! Chuyển hướng ngay lập tức.");
    
    // Chuyển hướng đến một trang trắng ngay lập tức
    window.location.href = "about:blank";
  } else if (!devToolsIsNowOpen && devToolsOpen) {
    // Đặt lại trạng thái nếu DevTools đã đóng
    devToolsOpen = false;
  }
}

// Lắng nghe sự kiện thay đổi kích thước và kiểm tra định kỳ
window.addEventListener('resize', handleDevToolsDetection);
setInterval(handleDevToolsDetection, 500);

// Chặn các phím tắt và hành động chuột
document.addEventListener('keydown', (event) => {
  // Chặn phím F12 và các tổ hợp phím khác liên quan đến DevTools
  if (
    event.key === 'F12' ||
    (event.ctrlKey && event.shiftKey && ['I', 'C', 'J', 'K'].includes(event.key.toUpperCase())) ||
    (event.metaKey && event.altKey && ['I', 'J', 'C'].includes(event.key.toUpperCase()))
  ) {
    event.preventDefault();
    event.stopPropagation();
  }
});

// Chặn chuột phải và các hành vi sao chép
document.addEventListener('contextmenu', (event) => event.preventDefault());
document.addEventListener('selectstart', (event) => event.preventDefault());
document.addEventListener('copy', (event) => event.preventDefault());
document.addEventListener('cut', (event) => event.preventDefault());
document.addEventListener('paste', (event) => event.preventDefault());



document.addEventListener('keydown', (event) => {
  // 1. Tổ hợp phím chung
  if (
    event.ctrlKey || event.metaKey || event.altKey || event.shiftKey
  ) {
    // Chặn các tổ hợp phím sao chép, cắt, dán, lưu
    if (
      ['c', 'v', 'x', 'z', 'y', 'a', 's'].includes(event.key.toLowerCase()) ||
      (event.ctrlKey && event.key.toLowerCase() === 'y' && event.shiftKey) // Ctrl + Shift + Y
    ) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  // Chặn Alt + Tab / Cmd + Tab
  if ((event.altKey && event.key === 'Tab') || (event.metaKey && event.key === 'Tab')) {
    event.preventDefault();
    event.stopPropagation();
  }
  // Chặn Alt + F4 / Cmd + Q
  if ((event.altKey && event.key === 'F4') || (event.metaKey && event.key === 'q')) {
    event.preventDefault();
    event.stopPropagation();
  }
  
  // 2. Tổ hợp phím trong VS Code (một số phím trùng với chung)
  if (
    event.ctrlKey || event.metaKey
  ) {
    if (
      ['p', '/', 'd', 'f', 'h', 'b', '`'].includes(event.key.toLowerCase()) ||
      (event.key === 'F' && event.shiftKey) || // Ctrl+Shift+F
      (event.key === 'L' && event.shiftKey) // Ctrl+Shift+L
    ) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  // Chặn di chuyển dòng Alt + ↑/↓
  if (event.altKey && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
    event.preventDefault();
    event.stopPropagation();
  }

  // 3. Tổ hợp phím trong Trình duyệt DevTools
  if (
    event.key === 'F12' ||
    (event.ctrlKey && event.shiftKey && ['I', 'J', 'C'].includes(event.key.toUpperCase())) ||
    (event.metaKey && event.altKey && ['I', 'J', 'C'].includes(event.key.toUpperCase()))
  ) {
    event.preventDefault();
    event.stopPropagation();
  }
  
  // Chặn Ctrl+R, Ctrl+Shift+R
  if (event.ctrlKey && event.key.toLowerCase() === 'r') {
    event.preventDefault();
    event.stopPropagation();
  }
  
  // Chặn Ctrl+Shift+P
  if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'p') {
    event.preventDefault();
    event.stopPropagation();
  }

  // 4. Terminal / Command Line
  if (event.ctrlKey) {
    if (['c', 'l', 'a', 'e', 'u', 'k'].includes(event.key.toLowerCase())) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  // 6. Tổ hợp phím trong thiết kế
  if (event.ctrlKey && event.key.toLowerCase() === 'g') {
    event.preventDefault();
    event.stopPropagation();
    if (event.shiftKey) { // Ctrl+Shift+G
      event.preventDefault();
      event.stopPropagation();
    }
  }
  if (event.key.toLowerCase() === 't' && (event.ctrlKey || event.metaKey)) {
    event.preventDefault();
    event.stopPropagation();
  }
  if (event.key === ' ' && !event.ctrlKey && !event.altKey && !event.shiftKey && !event.metaKey) {
    event.preventDefault();
    event.stopPropagation();
  }
});

document.addEventListener('keydown', (event) => {
  // Kiểm tra nếu phím Ctrl hoặc Cmd (trên Mac) đang được nhấn
  if (event.ctrlKey || event.metaKey) {
    // Ngăn chặn hành vi mặc định của trình duyệt
    event.preventDefault();
    
    // Ngăn chặn sự kiện lan truyền lên các phần tử cha
    event.stopPropagation();
  }
});
