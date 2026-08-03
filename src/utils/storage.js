// LocalStorage Keys
const GALLERY_KEY = 'sanjari_gallery';
const BOOKINGS_KEY = 'sanjari_bookings';
const SERVICES_KEY = 'sanjari_services';
const SESSION_KEY = 'sanjari_admin_session';

const defaultGallery = [
  { id: 1, cat: 'Wedding', title: 'Golden Hour Romance', aspect: 'tall', img: '/images/gallery_wedding_1.png', colors: ['#1B3A6B', '#C9A84C'] },
  { id: 2, cat: 'Portrait', title: 'Ethereal Portraits', aspect: 'wide', img: '/images/gallery_portrait_1.png', colors: ['#0D2744', '#8B9DC3'] },
  { id: 3, cat: 'Cinematic', title: 'Epic Landscape Film', aspect: 'square', img: '/images/gallery_cinematic_1.png', colors: ['#1a1a2e', '#4A90D9'] },
  { id: 4, cat: 'Fashion', title: 'Haute Couture Editorial', aspect: 'tall', img: '/images/gallery_fashion_1.png', colors: ['#2D1B69', '#C9A84C'] },
  { id: 5, cat: 'Wedding', title: 'Twilight Ceremony', aspect: 'wide', img: '/images/gallery_wedding_2.png', colors: ['#0D2744', '#F0C040'] },
  { id: 6, cat: 'Corporate', title: 'Brand Identity Shoot', aspect: 'square', img: '/images/gallery_corporate_1.png', colors: ['#0f1624', '#2A5298'] },
  { id: 7, cat: 'Portrait', title: 'Dramatic Chiaroscuro', aspect: 'tall', img: '/images/gallery_portrait_2.png', colors: ['#1a0a0a', '#C9A84C'] },
  { id: 8, cat: 'Cinematic', title: 'City Lights Reel', aspect: 'wide', img: '/images/gallery_cinematic_2.png', colors: ['#0D1F3C', '#6BA3BE'] },
  { id: 9, cat: 'Fashion', title: 'Urban Street Style', aspect: 'square', img: '/images/gallery_fashion_2.png', colors: ['#1B2838', '#C9A84C'] },
  { id: 10, cat: 'Wedding', title: 'Vows in the Woods', aspect: 'wide', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800', colors: ['#1c2920', '#C9A84C'] },
  { id: 11, cat: 'Corporate', title: 'Executive Summit', aspect: 'square', img: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&q=80&w=800', colors: ['#0A1118', '#385A82'] },
  { id: 12, cat: 'Portrait', title: 'Neon Nights', aspect: 'tall', img: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=800', colors: ['#290B3B', '#1FB2C4'] },
  { id: 13, cat: 'Cinematic', title: 'Desert Mirage', aspect: 'wide', img: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80&w=800', colors: ['#291A0A', '#D4863A'] },
  { id: 14, cat: 'Fashion', title: 'Avant-Garde Studio', aspect: 'tall', img: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&q=80&w=800', colors: ['#292828', '#A93838'] },
  { id: 15, cat: 'Wedding', title: 'Vintage Elegance', aspect: 'square', img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800', colors: ['#3A3026', '#E2D1A7'] }
];

const defaultBookings = [
  { id: 1, name: 'Aarav Sharma', email: 'aarav@gmail.com', service: 'wedding', date: '2026-08-15', status: 'Confirmed', amount: 85000, message: 'Need dual camera setup, drone coverage and high end cinematic trailer.' },
  { id: 2, name: 'Meera Patel', email: 'meera@yahoo.com', service: 'videography', date: '2026-07-20', status: 'Completed', amount: 65000, message: 'Highlight reel for our annual brand summit.' },
  { id: 3, name: 'Rohan Verma', email: 'rohan@hotmail.com', service: 'portrait', date: '2026-08-08', status: 'Pending', amount: 15000, message: 'Need some dark-themed moody portfolios for modeling.' },
  { id: 4, name: 'Aisha Khan', email: 'aisha.k@gmail.com', service: 'fashion', date: '2026-07-30', status: 'Cancelled', amount: 45000, message: 'Collaborative editorial fashion shoot.' },
  { id: 5, name: 'Priya Nair', email: 'priya@gmail.com', service: 'wedding', date: '2026-06-25', status: 'Completed', amount: 150000, message: 'Destination wedding in Udaipur. Full coverage of all functions.' },
  { id: 6, name: 'Vikram Singh', email: 'vikram.s@outlook.com', service: 'corporate', date: '2026-08-25', status: 'Confirmed', amount: 55000, message: 'Corporate headshots and office ambient shoots.' },
  { id: 7, name: 'Neha Gupta', email: 'neha.gupta@gmail.com', service: 'aerial', date: '2026-09-02', status: 'Pending', amount: 25000, message: 'Real estate aerial mapping and scenic landscape video.' }
];

const defaultServices = [
  { id: 'wedding', name: 'Wedding Photography', category: 'Wedding', basePrice: 85000, bookingsCount: 12 },
  { id: 'videography', name: 'Cinematic Videography', category: 'Videography', basePrice: 65000, bookingsCount: 8 },
  { id: 'portrait', name: 'Portrait Session', category: 'Portrait', basePrice: 15000, bookingsCount: 19 },
  { id: 'corporate', name: 'Corporate Events', category: 'Corporate', basePrice: 55000, bookingsCount: 5 },
  { id: 'fashion', name: 'Fashion & Editorial', category: 'Fashion', basePrice: 45000, bookingsCount: 9 },
  { id: 'aerial', name: 'Aerial Drone Shots', category: 'Aerial', basePrice: 25000, bookingsCount: 7 }
];

export const initStorage = () => {
  if (!localStorage.getItem(GALLERY_KEY)) {
    localStorage.setItem(GALLERY_KEY, JSON.stringify(defaultGallery));
  }
  if (!localStorage.getItem(BOOKINGS_KEY)) {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(defaultBookings));
  }
  if (!localStorage.getItem(SERVICES_KEY)) {
    localStorage.setItem(SERVICES_KEY, JSON.stringify(defaultServices));
  }
};

export const getGallery = () => {
  initStorage();
  return JSON.parse(localStorage.getItem(GALLERY_KEY));
};

export const saveGallery = (items) => {
  localStorage.setItem(GALLERY_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event('sanjari-gallery-updated'));
};

export const getBookings = () => {
  initStorage();
  return JSON.parse(localStorage.getItem(BOOKINGS_KEY));
};

export const saveBookings = (bookings) => {
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  window.dispatchEvent(new Event('sanjari-bookings-updated'));
};

export const getServices = () => {
  initStorage();
  return JSON.parse(localStorage.getItem(SERVICES_KEY));
};

export const saveServices = (services) => {
  localStorage.setItem(SERVICES_KEY, JSON.stringify(services));
  window.dispatchEvent(new Event('sanjari-services-updated'));
};

export const isAdminAuthenticated = () => {
  return localStorage.getItem(SESSION_KEY) === 'true';
};

export const loginAdmin = (password) => {
  if (password === 'admin123') {
    localStorage.setItem(SESSION_KEY, 'true');
    return true;
  }
  return false;
};

export const logoutAdmin = () => {
  localStorage.removeItem(SESSION_KEY);
};
