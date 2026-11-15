
// TCC Online Enrollment Gateway interactions

const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

// MOBILE MENU
menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');

  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

// DROPDOWN MENU
document.querySelectorAll('.dropdown-trigger').forEach((trigger) => {

  trigger.addEventListener('click', () => {

    const parent = trigger.closest('.nav-dropdown');

    document.querySelectorAll('.nav-dropdown').forEach((item) => {
      if (item !== parent) {
        item.classList.remove('open');
      }
    });

    parent.classList.toggle('open');
  });

});

// CLOSE MOBILE MENU AFTER CLICKING A LINK
document.querySelectorAll('.main-nav a').forEach((link) => {

  link.addEventListener('click', () => {

    mainNav.classList.remove('open');

    menuToggle.setAttribute('aria-expanded', 'false');

  });

});

// LOGIN MODAL
const modal = document.getElementById('loginModal');
const closeModal = document.getElementById('closeModal');
const authSubmit = document.getElementById('authSubmit');
const toast = document.getElementById('toast');

let activeTab = 'signin';

// OPEN LOGIN MODAL
function openLoginModal(tab = 'signin') {

  modal.classList.add('show');

  modal.setAttribute('aria-hidden', 'false');

  setAuthTab(tab);

  document.body.style.overflow = 'hidden';

}

// CLOSE LOGIN MODAL
function hideLoginModal() {

  modal.classList.remove('show');

  modal.setAttribute('aria-hidden', 'true');

  document.body.style.overflow = '';

}

// SWITCH SIGN IN / SIGN UP
function setAuthTab(tab) {

  activeTab = tab;

  document.querySelectorAll('.tab').forEach((button) => {

    button.classList.toggle(
      'active',
      button.dataset.tab === tab
    );

  });

  authSubmit.textContent =
    tab === 'signin' ? 'Sign In' : 'Create Account';

  document.getElementById('modalTitle').textContent =
    tab === 'signin'
      ? 'Welcome to TCC'
      : 'Create Your Account';

}

// LOGIN LINKS
document.querySelectorAll('a[href="#login"]').forEach((link) => {

  link.addEventListener('click', (event) => {

    event.preventDefault();

    openLoginModal('signin');

  });

});

// TAB BUTTONS
document.querySelectorAll('.tab').forEach((button) => {

  button.addEventListener('click', () => {

    setAuthTab(button.dataset.tab);

  });

});

// CLOSE BUTTON
closeModal.addEventListener('click', hideLoginModal);

// CLOSE WHEN CLICKING OUTSIDE
modal.addEventListener('click', (event) => {

  if (event.target === modal) {

    hideLoginModal();

  }

});

// CLOSE USING ESCAPE KEY
document.addEventListener('keydown', (event) => {

  if (event.key === 'Escape') {

    hideLoginModal();

  }

});

// TOAST MESSAGE
function showToast(message) {

  toast.textContent = message;

  toast.classList.add('show');

  window.setTimeout(() => {

    toast.classList.remove('show');

  }, 3000);

}

// LOGIN / SIGN UP FORM
document.getElementById('authForm').addEventListener('submit', (event) => {

  event.preventDefault();

  // FRONT-END DEMO ONLY
  // Connect this form to your server/database for real authentication.

  showToast(
    activeTab === 'signin'
      ? 'Demo only: connect sign-in to your enrollment system.'
      : 'Demo only: connect account registration to your enrollment system.'
  );

  hideLoginModal();

  event.target.reset();

});

// LOAD ICONS
if (window.lucide) {

  lucide.createIcons();

}
