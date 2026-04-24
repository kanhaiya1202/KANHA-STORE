// ─────────────────────────────────────────────────────────────────────────────
// auth.js  –  Import this in every HTML page:
//             <script type="module" src="./src/auth.js"></script>
// ─────────────────────────────────────────────────────────────────────────────

const API = 'http://localhost:5000/api';

// ── Token helpers ─────────────────────────────────────────────────────────────
export const getToken = () =>
  localStorage.getItem('kanha_token') || sessionStorage.getItem('kanha_token');

export const getUser = () => {
  const u = localStorage.getItem('kanha_user');
  return u ? JSON.parse(u) : null;
};

export const isLoggedIn = () => !!getToken();

// ── Logout ────────────────────────────────────────────────────────────────────
export const logout = () => {
  localStorage.removeItem('kanha_token');
  localStorage.removeItem('kanha_user');
  sessionStorage.removeItem('kanha_token');
  window.location.href = './sing_in.html';
};

// ── Fetch with auth header ────────────────────────────────────────────────────
export const authFetch = async (url, options = {}) => {
  const token = getToken();
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
};

// ── Update navbar based on login state ───────────────────────────────────────
export const updateNavbar = () => {
  const signInEl  = document.querySelector('.sing_in_up a[href*="sing_in"]');
  const signUpEl  = document.querySelector('.sing_in_up a[href*="sing_up"]');
  const signInUpWrapper = document.querySelector('.sing_in_up');

  if (!signInUpWrapper) return;

  if (isLoggedIn()) {
    const user = getUser();
    const firstName = user?.name?.split(' ')[0] || 'Account';

    signInUpWrapper.innerHTML = `
      <span style="font-size:1.4rem; color:#fff; font-weight:500;">
        👋 Hi, ${firstName}
      </span>
      <a href="./sing_in.html" id="logoutBtn"
         style="font-size:1.4rem; color:#ffb3b3; font-weight:600; cursor:pointer; text-decoration:none;">
        SIGN OUT
      </a>
    `;

    document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
      e.preventDefault();
      logout();
    });
  } else {
    // Already correct links — just make sure they point correctly
    signInUpWrapper.innerHTML = `
      <a href="./sing_in.html" style="font-size:1.4rem; color:#fff;">SIGN IN</a>
      <a href="./sing_up.html" style="font-size:1.4rem; color:#fff;">SIGN UP</a>
    `;
  }
};

// ── Protect a page: redirect to login if not authenticated ───────────────────
export const requireAuth = () => {
  if (!isLoggedIn()) {
    window.location.href = './sing_in.html';
  }
};

// ── Auto-run: update navbar on every page load ────────────────────────────────
document.addEventListener('DOMContentLoaded', updateNavbar);