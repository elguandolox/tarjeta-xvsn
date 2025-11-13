/* ---------------------------------------------------------- */
/* 🎵 MÚSICA AUTOMÁTICA Y BOTÓN DE CONTROL                    */
/* ---------------------------------------------------------- */

// Intento de reproducción automática (algunos navegadores bloquean autoplay con sonido)
const music = document.getElementById('music');
const musicBtn = document.getElementById('music-btn');

/** Intenta reproducir la música automáticamente */
function tryPlayMusic() {
  if (!music) return;
  music.play()
    .then(() => {
      musicBtn.textContent = "🔊 Música (On)";
    })
    .catch(() => {
      // Autoplay bloqueado: espera a interacción del usuario
      musicBtn.textContent = "🔊 Música (activar)";
    });
}

/** Alternar música manualmente */
if (musicBtn) {
  musicBtn.addEventListener('click', () => {
    if (!music) return;

    if (music.paused) {
      music.play();
      musicBtn.textContent = "🔊 Música (On)";
    } else {
      music.pause();
      musicBtn.textContent = "🔈 Música (Off)";
    }
  });
}

/* ---------------------------------------------------------- */
/* ⏳ CUENTA REGRESIVA HACIA EL EVENTO                        */
/* ---------------------------------------------------------- */

function iniciarCuentaRegresiva() {
  const eventDate = new Date("December 6, 2025 19:00:00").getTime();

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function updateCountdown() {
    const now = Date.now();
    const distance = eventDate - now;

    if (distance <= 0) {
      document.querySelector('.countdown').innerHTML =
        '<h3>🎉 ¡El gran día ha llegado! 🎉</h3>';
      clearInterval(timer);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  const timer = setInterval(updateCountdown, 1000);
}

/* ---------------------------------------------------------- */
/* ✨ ANIMACIONES DE APARICIÓN (Intersection Observer)        */
/* ---------------------------------------------------------- */

function animarSecciones() {
  const elementos = document.querySelectorAll('.animado');

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.18 });

  elementos.forEach(el => observador.observe(el));
}

/* ---------------------------------------------------------- */
/* 💖 CONFIRMACIÓN DE ASISTENCIA SIMPLE                       */
/* ---------------------------------------------------------- */

function confirmarAsistencia() {
  alert('¡Gracias por confirmar tu asistencia!');
}

/* ---------------------------------------------------------- */
/* 🚀 INICIALIZACIÓN GLOBAL                                   */
/* ---------------------------------------------------------- */

window.addEventListener('load', () => {
  tryPlayMusic();
  iniciarCuentaRegresiva();
  animarSecciones();
});
