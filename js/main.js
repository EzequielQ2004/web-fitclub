// Default config
const defaultConfig = {
  gym: {
    name: "FitClub",
    logo: { text: "FC" }
  },
  contact: {
    whatsapp: "+5492604392982",
    phone: "02604392982",
    address: "Av. Los Sauces 788, M5600 San Rafael, Mendoza"
  },
  schedule: {
    monday: { open: "08:00", close: "21:00" },
    tuesday: { open: "08:00", close: "09:00", open2: "14:30", close2: "21:00" },
    wednesday: { open: "08:00", close: "11:00", open2: "14:30", close2: "21:00" },
    thursday: { open: "08:00", close: "09:00", open2: "14:30", close2: "21:00" },
    friday: { open: "08:00", close: "11:00", open2: "14:30", close2: "21:00" },
    saturday: { open: "09:00", close: "10:00" },
    sunday: { open: "Cerrado" }
  },
  classes: [
    {
      id: 1,
      name: "Funcional/Musculación",
      description: "Entrenamiento funcional y de musculación para tonificar y fortalecer todo el cuerpo.",
      image: "images/classes/funcional-musculacion.jpg",
      intensity: "Media-Alta",
      duration: "60 min",
      instructor: "FitClub Team",
      schedule: ["Lunes 8:00-9:00", "Lunes 9:00-10:00", "Lunes 15:00-16:00", "Lunes 19:00-20:00", "Lunes 20:00-21:00", "Martes 8:00-9:00", "Martes 15:00-16:00", "Martes 20:00-21:00", "Miércoles 8:00-9:00", "Miércoles 9:00-10:00", "Miércoles 15:00-16:00", "Miércoles 19:00-20:00", "Miércoles 20:00-21:00", "Jueves 8:00-9:00", "Jueves 15:00-16:00", "Jueves 20:00-21:00", "Viernes 8:00-9:00", "Viernes 9:00-10:00", "Viernes 15:00-16:00", "Viernes 19:00-20:00", "Viernes 20:00-21:00"]
    },
    {
      id: 2,
      name: "Crossfit",
      description: "Entrenamiento funcional de alta intensidad para superar tus límites.",
      image: "images/classes/crossfit.jpg",
      intensity: "Muy Alta",
      duration: "60 min",
      instructor: "FitClub Team",
      schedule: ["Lunes 14:00-15:00", "Lunes 18:00-19:00", "Lunes 21:00-22:00", "Martes 14:00-15:00", "Martes 18:00-19:00", "Martes 21:00-22:00", "Miércoles 14:00-15:00", "Miércoles 18:00-19:00", "Miércoles 21:00-22:00", "Jueves 14:00-15:00", "Jueves 18:00-19:00", "Jueves 21:00-22:00", "Viernes 14:00-15:00", "Viernes 18:00-19:00", "Viernes 21:00-22:00"]
    },
    {
      id: 3,
      name: "Act. Física Adultos Mayores",
      description: "Actividades físicas adaptadas para adultos mayores, mejorando movilidad y salud.",
      image: "images/classes/adultos-mayores.jpg",
      intensity: "Baja-Media",
      duration: "60 min",
      instructor: "FitClub Team",
      schedule: ["Lunes 10:00-11:00", "Miércoles 10:00-11:00", "Viernes 10:00-11:00"]
    },
    {
      id: 4,
      name: "Danza Aérea (Tela)",
      description: "Clases de danza aérea en tela, combinando fuerza, flexibilidad y elegancia.",
      image: "images/classes/danza-aerea.jpg",
      intensity: "Media",
      duration: "60 min",
      instructor: "FitClub Team",
      schedule: ["Lunes 16:00-17:00", "Miércoles 16:00-17:00", "Viernes 16:00-17:00"]
    },
    {
      id: 5,
      name: "Taekwondo",
      description: "Artes marciales coreanas para defensa personal, disciplina y condición física.",
      image: "images/classes/taekwondo.jpg",
      intensity: "Media-Alta",
      duration: "60 min",
      instructor: "FitClub Team",
      schedule: ["Martes 19:00-20:00", "Jueves 19:00-20:00"]
    }
  ],
  colors: {
    primary: "#dc2626",
    secondary: "#991b1b"
  },
  socialMedia: {
    instagram: "https://www.instagram.com/fitclub.sanrafael/?hl=es-la",
    facebook: "https://www.facebook.com/people/FitClub-San-Rafael/61572482191640/",
    twitter: "#"
  }
};

let gymConfig = defaultConfig;

// Load config
async function loadConfig() {
  try {
    const response = await fetch('config.json');
    if (response.ok) {
      const customConfig = await response.json();
      gymConfig = { ...defaultConfig, ...customConfig };
    }
  } catch (error) {
    console.log('Using default config');
  }
  applyColors();
  renderContent();
}

// Apply color theme from config
function applyColors() {
  const root = document.documentElement;
  const colors = gymConfig.colors || {};
  
  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, value);
  });
}

// Render dynamic content
function renderContent() {
  // Navbar - only update if config has different values
  const navbarName = document.querySelector('.navbar-gym-name');
  const navbarLogo = document.querySelector('.navbar-logo-box');
  if (gymConfig.gym) {
    if (navbarName && !navbarName.textContent.trim()) {
      navbarName.textContent = gymConfig.gym.name;
    }
    if (navbarLogo && gymConfig.gym.logo) {
      navbarLogo.textContent = gymConfig.gym.logo.text;
    }
  }
  
  // Hero
  const heroCTA = document.querySelector('.hero-cta-primary');
  const mobileWhatsApp = document.querySelector('.navbar-mobile-whatsapp');
  const navbarWhatsApp = document.querySelector('.navbar-whatsapp');
  
  const whatsappUrl = getWhatsAppUrl('Hola, vengo de la web y quiero info de las clases');
  
  if (heroCTA) {
    heroCTA.href = whatsappUrl;
    console.log('Hero CTA WhatsApp updated:', whatsappUrl);
  } else {
    console.log('Hero CTA not found');
  }
  
  if (mobileWhatsApp) {
    mobileWhatsApp.href = whatsappUrl;
    console.log('Mobile WhatsApp updated:', whatsappUrl);
  } else {
    console.log('Mobile WhatsApp not found');
  }
  
  if (navbarWhatsApp) {
    navbarWhatsApp.href = whatsappUrl;
    console.log('Navbar WhatsApp updated:', whatsappUrl);
  } else {
    console.log('Navbar WhatsApp not found');
  }
  
  // Classes Grid
  renderClasses();
  
  // Schedules
  renderSchedules();
  
  // Location
  renderLocation();
  
  // Footer
  renderFooter();
}

// Get WhatsApp URL
function getWhatsAppUrl(message) {
  const phoneNumber = gymConfig.contact.whatsapp.replace(/[^\d]/g, '');
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

// Render Classes
function renderClasses() {
  const classesGrid = document.getElementById('classes-grid');
  if (!classesGrid || !gymConfig.classes) return;
  
  classesGrid.innerHTML = gymConfig.classes.map(cls => `
    <div class="glass-card class-card">
      <div class="image-overlay">
        <img src="${cls.image}?v=${Date.now()}" alt="${cls.name}" onerror="this.src='https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'">
      </div>
      <div class="class-card-content">
        <div>
          <div class="class-card-header">
            <h3 class="class-card-name">${cls.name}</h3>
            <span class="intensity-badge ${getIntensityColor(cls.intensity)}">${getIntensityLabel(cls.intensity)}</span>
          </div>
          <p style="color: var(--text-secondary); margin-top: 0.5rem;">${cls.description}</p>
        </div>
        
        <div class="class-card-info">
          <div>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width: 1rem; height: 1rem; display: inline-block; margin-right: 0.5rem; color: var(--primary);">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            ${cls.duration}
          </div>
          <div>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width: 1rem; height: 1rem; display: inline-block; margin-right: 0.5rem; color: var(--primary);">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            ${cls.instructor}
          </div>
        </div>
        
        <button class="btn btn-primary class-card-button" onclick="location.href='${getWhatsAppUrl(`Hola, me interesa la clase de ${cls.name}.`)}'" style="margin-top: 1rem;">
          Agendar
        </button>
      </div>
    </div>
  `).join('');
}

// Get intensity color
function getIntensityColor(intensity) {
  const colorMap = {
    'baja-media': 'bg-green-500/20 text-green-400 border-green-500/30',
    'media': 'bg-green-500/20 text-green-400 border-green-500/30',
    'media-alta': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    'alta': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    'muy alta': 'bg-red-500/20 text-red-400 border-red-500/30'
  };
  
  for (const [key, value] of Object.entries(colorMap)) {
    if (intensity.toLowerCase().includes(key)) {
      return value;
    }
  }
  return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
}

// Get intensity label
function getIntensityLabel(intensity) {
  const intensityMap = {
    'baja-media': 'Baja-Media',
    'media-alta': 'Media-Alta',
    'muy alta': 'Muy Alta'
  };
  return intensityMap[intensity.toLowerCase()] || intensity;
}

// Render Schedules
function renderSchedules() {
  const schedulesGrid = document.getElementById('schedules-grid');
  if (!schedulesGrid || !gymConfig.schedule) return;
  
  const days = [
    { key: 'monday', name: 'Lunes', icon: '🏋️' },
    { key: 'tuesday', name: 'Martes', icon: '💪' },
    { key: 'wednesday', name: 'Miércoles', icon: '🥊' },
    { key: 'thursday', name: 'Jueves', icon: '🧘' },
    { key: 'friday', name: 'Viernes', icon: '🏃' },
    { key: 'saturday', name: 'Sábado', icon: '🚴' },
    { key: 'sunday', name: 'Domingo', icon: '🏊' }
  ];
  
  schedulesGrid.innerHTML = days.map(day => {
    const schedule = gymConfig.schedule[day.key];
    if (!schedule) return '';
    
    if (schedule.open === "Cerrado") {
      return `
        <div class="schedule-day">
          <div class="schedule-day-emoji">${day.icon}</div>
          <div class="schedule-day-name">${day.name}</div>
          <div class="schedule-day-time closed">
            <div>Cerrado</div>
          </div>
        </div>
      `;
    }
    
    const open = formatTime(schedule.open);
    const close = formatTime(schedule.close);
    
    let timeHtml = `
      <div>${open}</div>
      <div>a</div>
      <div>${close}</div>
    `;
    
    if (schedule.open2 && schedule.close2) {
      const open2 = formatTime(schedule.open2);
      const close2 = formatTime(schedule.close2);
      timeHtml += `
        <div class="schedule-split">y</div>
        <div>${open2}</div>
        <div>a</div>
        <div>${close2}</div>
      `;
    }
    
    return `
      <div class="schedule-day">
        <div class="schedule-day-emoji">${day.icon}</div>
        <div class="schedule-day-name">${day.name}</div>
        <div class="schedule-day-time">
          ${timeHtml}
        </div>
      </div>
    `;
  }).join('');
}

// Format time
function formatTime(time) {
  if (time === "Cerrado") return time;
  
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${formattedHour}:${minutes} ${ampm}`;
}

// Render Location
function renderLocation() {
  document.getElementById('location-address').textContent = gymConfig.contact.address;
  document.getElementById('location-whatsapp').textContent = gymConfig.contact.whatsapp;
  document.getElementById('location-phone').textContent = gymConfig.contact.phone;
  
  // Location WhatsApp button
  const locationWhatsApp = document.querySelector('.location-github-whatsapp');
  if (locationWhatsApp) {
    locationWhatsApp.href = getWhatsAppUrl('Hola, vengo de la web y quiero info de las clases');
    console.log('Location WhatsApp updated');
  } else {
    console.log('Location WhatsApp not found');
  }
  
  // Location Phone button
  const locationPhone = document.querySelector('.location-phone');
  locationPhone.href = `tel:${gymConfig.contact.phone}`;
}

// Render Footer
function renderFooter() {
  document.getElementById('footer-gym-name').textContent = gymConfig.gym.name;
  document.getElementById('footer-instagram').href = gymConfig.socialMedia.instagram || '#';
  document.getElementById('footer-facebook').href = gymConfig.socialMedia.facebook || '#';
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuToggle?.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking a link
mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]:not(.navbar-whatsapp):not(.navbar-mobile-whatsapp):not(.hero-cta-primary):not(.location-github-whatsapp)').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Load config on page load
document.addEventListener('DOMContentLoaded', loadConfig);
