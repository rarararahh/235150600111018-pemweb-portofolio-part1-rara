const showPage = (pageId) => {
  document.querySelectorAll('.page').forEach(page => {
      page.classList.remove('active');
  });

  const selectedPage = document.getElementById(pageId);
  if (selectedPage) {
      selectedPage.classList.add('active');
  }

  navLinks.classList.remove('active');
  menuToggle.classList.remove('active');

  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
};

let lastScroll = 0;
const header = document.querySelector('.header');

const handleScroll = () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll && currentScroll > 100) {
      header.style.transform = 'translateY(-100%)';
      header.classList.add('nav-up');
  } else {
      header.style.transform = 'translateY(0)';
      header.classList.remove('nav-up');
  }
  lastScroll = currentScroll;
};

window.addEventListener('scroll', handleScroll);

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
  });
});

document.addEventListener('click', (e) => {
  if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
  }
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
      e.preventDefault();
      const pageId = link.getAttribute('href').substring(1);
      showPage(pageId);
      history.pushState(null, '', `#${pageId}`);
  });
});

window.addEventListener('popstate', () => {
  const pageId = window.location.hash.substring(1) || 'Home';
  showPage(pageId);
});

document.addEventListener('DOMContentLoaded', () => {
  const pageId = window.location.hash.substring(1) || 'Home';
  showPage(pageId);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
          targetElement.scrollIntoView({
              behavior: 'smooth'
          });
      }
  });
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
      }
  });
}, observerOptions);

document.querySelectorAll('.content-card').forEach(card => {
  observer.observe(card);
});

const updateActiveNavLink = () => {
  const currentHash = window.location.hash || '#Home';
  document.querySelectorAll('.nav-links a').forEach(link => {
      if (link.getAttribute('href') === currentHash) {
          link.classList.add('active');
      } else {
          link.classList.remove('active');
      }
  });
};

window.addEventListener('load', updateActiveNavLink);
window.addEventListener('hashchange', updateActiveNavLink);

import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(<div>Your content here</div>);
 
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  
  form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      const currentDate = new Date().toLocaleString();
      const formattedMessage = `
Date: ${currentDate}
Name: ${name}
Email: ${email}
Message: ${message}
----------------------------------------
`;
      
      try {
          const formData = new FormData();
          formData.append('message', formattedMessage);
          
          const response = await fetch('save_message.php', {
              method: 'POST',
              body: formData
          });
          
          if (response.ok) {
              showNotification('Message sent successfully!', 'success');
              form.reset();
          } else {
              showNotification('Failed to send message. Please try again.', 'error');
          }
      } catch (error) {
          showNotification('An error occurred. Please try again later.', 'error');
          console.error('Error:', error);
      }
  });
  
  function showNotification(message, type) {
      let notification = document.querySelector('.notification');
      if (!notification) {
          notification = document.createElement('div');
          notification.className = 'notification';
          document.body.appendChild(notification);
      }
      
      notification.textContent = message;
      notification.className = `notification ${type}`;
      notification.style.display = 'block';
      
      setTimeout(() => {
          notification.style.display = 'none';
      }, 3000);
  }
});