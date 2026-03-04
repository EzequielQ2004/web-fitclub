// Default config
const defaultConfig = {
  gym: {
    name: "PowerFit Gym",
    logo: { text: "PF" }
  },
  contact: {
    whatsapp: "+5491123456789",
    address: "Av. Corrientes 1234, CABA"
  },
  schedule: {
    monday: { open: "06:00", close: "23:00" },
    tuesday: { open: "06:00", close: "23:00" },
    wednesday: { open: "06:00", close: "23:00" },
    thursday: { open: "06:00", close: "23:00" },
    friday: { open: "06:00", close: "22:00" },
    saturday: { open: "08:00", close: "20:00" },
    sunday: { open: "08:00", close: "14:00" }
  },
  classes: [
    {
      id: 1,
      name: "Boxeo",
      description: "Clases de boxeo para todos los niveles. Aprende técnica, defensa y condición física.",
      image: "https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      intensity: "Alta",
      duration: "60 min",
      instructor: "Carlos Rodríguez",
      schedule: ["Lunes 18:00", "Miércoles 18:00", "Viernes 17:00"]
    },
    {
      id: 2,
      name: "Yoga",
      description: "Sesiones de yoga para mejorar flexibilidad, equilibrio y bienestar mental.",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      intensity: "Baja-Media",
      duration: "75 min",
      instructor: "María González",
      schedule: ["Lunes 07:00", "Martes 19:00", "Jueves 07:00", "Sábado 10:00"]
    },
    {
      id: 3,
      name: "CrossFit",
      description: "Entrenamiento funcional de alta intensidad para superar tus límites.",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      intensity: "Muy Alta",
      duration: "50 min",
      instructor: "Diego Martínez",
      schedule: ["Martes 07:00", "Jueves 07:00", "Sábado 09:00"]
    },
    {
      id: 4,
      name: "Spinning",
      description: "Clases de ciclismo indoor con música motivadora y gran quema calórica.",
      image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      intensity: "Media-Alta",
      duration: "45 min",
      instructor: "Ana López",
      schedule: ["Lunes 19:00", "Miércoles 19:00", "Viernes 18:00"]
    },
    {
      id: 5,
      name: "Pilates",
      description: "Fortalecimiento del core, mejora de postura y flexibilidad con método Pilates.",
      image: "https://images.unsplash.com/photo-1598971388198-e09a9d63b649?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      intensity: "Media",
      duration: "60 min",
      instructor: "Laura Fernández",
      schedule: ["Martes 08:00", "Jueves 08:00", "Sábado 11:00"]
    },
    {
      id: 6,
      name: "HIIT",
      description: "Entrenamiento de intervalos de alta intensidad para máxima quema calórica.",
      image: "https://images.unsplash.com/photo-1554284447-8ac13281312f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      intensity: "Alta",
      duration: "30 min",
      instructor: "Roberto Silva",
      schedule: ["Lunes 20:00", "Miércoles 20:00", "Viernes 19:00"]
    }
  ],
  colors: {
    primary: "#dc2626",
    secondary: "#991b1b"
  },
  socialMedia: {
    instagram: "#",
    facebook: "#"
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
  
  const whatsappUrl = getWhatsAppUrl('¡Hola! Estoy interesado/a en agendar una clase de prueba.');
  heroCTA.href = whatsappUrl;
  mobileWhatsApp.href = whatsappUrl;
  navbarWhatsApp.href = whatsappUrl;
  
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
        <img src="${cls.image}" alt="${cls.name}" onerror="this.src='https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'">
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
    
    const open = formatTime(schedule.open);
    const close = formatTime(schedule.close);
    
    return `
      <div class="schedule-day">
        <div class="schedule-day-emoji">${day.icon}</div>
        <div class="schedule-day-name">${day.name}</div>
        <div class="schedule-day-time">
          <div>${open}</div>
          <div>a</div>
          <div>${close}</div>
        </div>
      </div>
    `;
  }).join('');
}

// Format time
function formatTime(time) {
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
  locationWhatsApp.href = getWhatsAppUrl('¡Hola! Quisiera conocer más sobre el gimnasio.');
  
  // Location Phone button
  const locationPhone = document.querySelector('.location-phone');
  locationPhone.href = `tel:${gymConfig.contact.phone}`;
}

// Render Footer
function renderFooter() {
  document.getElementById('footer-gym-name').textContent = gymConfig.gym.name;
  document.getElementById('footer-instagram').href = gymConfig.socialMedia.instagram || '#';
  document.getElementById('footer-facebook').href = gymConfig.socialMedia.facebook || '#';
  document.getElementById('footer-twitter').href = gymConfig.socialMedia.twitter || '#';
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
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
