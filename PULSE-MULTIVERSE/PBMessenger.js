
    const toast = document.getElementById('toast');
    let toastTimer;
    function showToast(message) {
      toast.textContent = message;
      toast.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
    }
    document.querySelectorAll('[data-toast]').forEach(button => {
      button.addEventListener('click', () => showToast(button.dataset.toast));
    });
    document.querySelectorAll('.bottom-item').forEach(item => {
      item.addEventListener('click', () => {
        document.querySelectorAll('.bottom-item').forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        showToast(item.dataset.toast);
      });
    });
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        showToast(`${tab.dataset.tab} selected`);
      });
    });
    document.getElementById('friendSearch').addEventListener('input', event => {
      const query = event.target.value.toLowerCase();
      document.querySelectorAll('.friend').forEach(friend => {
        friend.style.display = friend.dataset.name.toLowerCase().includes(query) ? 'grid' : 'none';
      });
    });
    document.querySelectorAll('.friend').forEach(friend => {
      friend.addEventListener('click', event => {
        if (event.target.classList.contains('star')) {
          event.target.classList.toggle('fa-solid');
          event.target.classList.toggle('fa-regular');
        } else {
          showToast(`Opening conversation with ${friend.dataset.name}`);
        }
      });
    });

    if (PulseRealm.PulseUser) document.title = `PulseMessenger — ` + PulseRealm.PulseUser;
    