const tg = window.Telegram?.WebApp;
const app = {
  currentView: 'home',
  state: { user: null, balance: 0, orders: [] }
};

function showView(viewName) {
  document.querySelectorAll('.view').forEach(view => view.classList.add('hidden'));
  document.getElementById(`view-${viewName}`).classList.remove('hidden');
  document.querySelectorAll('.nav-item').forEach(btn => btn.classList.toggle('active', btn.dataset.tab === viewName));
  app.currentView = viewName;
}

function setTitle(title) {
  document.getElementById('pageTitle').textContent = title;
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.remove('hidden');
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => toast.classList.add('hidden'), 1800);
}

function renderHome() {
  document.getElementById('userName').textContent = app.state.user?.first_name || 'Foydalanuvchi';
  document.getElementById('balanceValue').textContent = app.state.balance;
  document.getElementById('popularPackages').innerHTML = '';
  ['50 Stars', '100 Stars', 'Premium'].forEach((label, index) => {
    const card = document.createElement('button');
    card.className = 'package-card';
    card.textContent = label;
    card.onclick = () => showToast('Paket tanlandi');
    document.getElementById('popularPackages').appendChild(card);
  });
  setTitle('Mila Gateway');
}

function renderOrders() {
  const ordersList = document.getElementById('ordersList');
  if (!app.state.orders.length) {
    ordersList.innerHTML = '<div class="empty">Hozircha buyurtma yo‘q</div>';
    return;
  }
  ordersList.innerHTML = app.state.orders.map(order => `
    <div class="list-card">
      <div class="list-title">${order.item_name}</div>
      <div class="muted">Status: ${order.status}</div>
    </div>
  `).join('');
}

function initButtons() {
  document.querySelectorAll('[data-goto]').forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.goto;
      showView(view);
      if (view === 'orders') renderOrders();
    });
  });

  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => showView(btn.dataset.tab));
  });

  document.getElementById('menuBtn').addEventListener('click', () => showToast('Menyu ochildi'));
  document.getElementById('modalCancel').addEventListener('click', () => document.getElementById('paymentModal').classList.add('hidden'));
  document.getElementById('giftModalCancel').addEventListener('click', () => document.getElementById('giftModal').classList.add('hidden'));
}

function initTelegram() {
  if (tg) {
    tg.ready();
    tg.expand();
    tg.enableClosingBehavior();
    app.state.user = {
      first_name: tg.initDataUnsafe?.user?.first_name || 'Foydalanuvchi'
    };
    document.getElementById('profileName').textContent = app.state.user.first_name;
    document.getElementById('profileUsername').textContent = `@${tg.initDataUnsafe?.user?.username || 'username'}`;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  initTelegram();
  initButtons();
  renderHome();
  showView('home');
  document.body.classList.add('ready');
});
