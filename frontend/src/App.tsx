import React, { useState, useEffect, useRef } from 'react';
import { Camera, Menu, X, ChevronLeft, ChevronRight, Mail, Phone, MapPin, Instagram, Facebook, Heart, ArrowDown, Play, Pause, Award, Users, ArrowRight, Star, Clock, CheckCircle } from 'lucide-react';

// Mock Router Implementation (since we can't import react-router-dom)
const Router = ({ children }) => children;
const Route = ({ path, element, isActive }) => isActive ? element : null;
const Link = ({ to, children, className, onClick }) => (
  <button onClick={onClick} className={className}>
    {children}
  </button>
);

// Enhanced mock data
const mockPhotos = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1200&fit=crop&auto=format',
    category: 'wedding',
    title: 'Château de Versailles',
    subtitle: 'Un mariage d\'exception',
    location: 'Versailles',
    year: '2024',
    likes: 145,
    featured: true,
    size: 'large'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1494790108755-2616c6ef2933?w=600&h=800&fit=crop&auto=format',
    category: 'portrait',
    title: 'Lumière Parisienne',
    subtitle: 'Portrait artistique',
    location: 'Paris',
    year: '2024',
    likes: 89,
    featured: false,
    size: 'medium'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=600&h=600&fit=crop&auto=format',
    category: 'event',
    title: 'Soirée d\'Excellence',
    subtitle: 'Événement corporate',
    location: 'Lyon',
    year: '2024',
    likes: 67,
    featured: false,
    size: 'small'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&h=1000&fit=crop&auto=format',
    category: 'wedding',
    title: 'Romance Provençale',
    subtitle: 'Mariage intime',
    location: 'Provence',
    year: '2024',
    likes: 203,
    featured: true,
    size: 'large'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=700&h=900&fit=crop&auto=format',
    category: 'commercial',
    title: 'Mode Parisienne',
    subtitle: 'Campagne haute couture',
    location: 'Paris',
    year: '2024',
    likes: 312,
    featured: true,
    size: 'medium'
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop&auto=format',
    category: 'portrait',
    title: 'Excellence Corporate',
    subtitle: 'Portrait dirigeant',
    location: 'Lyon',
    year: '2024',
    likes: 78,
    featured: false,
    size: 'medium'
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=400&fit=crop&auto=format',
    category: 'event',
    title: 'Gala de Charité',
    subtitle: 'Événement caritatif',
    location: 'Monaco',
    year: '2024',
    likes: 156,
    featured: false,
    size: 'wide'
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=900&fit=crop&auto=format',
    category: 'wedding',
    title: 'Élégance Bordelaise',
    subtitle: 'Mariage dans les vignes',
    location: 'Bordeaux',
    year: '2024',
    likes: 234,
    featured: false,
    size: 'medium'
  }
];

const categories = [
  { id: 'all', label: 'Tous', count: mockPhotos.length },
  { id: 'wedding', label: 'Mariages', count: mockPhotos.filter(p => p.category === 'wedding').length },
  { id: 'portrait', label: 'Portraits', count: mockPhotos.filter(p => p.category === 'portrait').length },
  { id: 'event', label: 'Événements', count: mockPhotos.filter(p => p.category === 'event').length },
  { id: 'commercial', label: 'Commercial', count: mockPhotos.filter(p => p.category === 'commercial').length }
];

// Page Transition Component
const PageTransition = ({ children, isVisible }) => (
  <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
    {children}
  </div>
);

// Navigation Component
const Navigation = ({ currentPage, setCurrentPage, isMenuOpen, setIsMenuOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'about', label: 'À Propos' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavigation = (pageId) => {
    setCurrentPage(pageId);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'py-4 bg-white/95 backdrop-blur-xl shadow-xl' : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          <Link
            to="home"
            onClick={() => handleNavigation('home')}
            className="flex items-center space-x-4 group cursor-pointer"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-stone-800 to-stone-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-serif text-2xl text-stone-800 leading-tight">
                <span className="font-light italic">Samey</span>
                <span className="font-semibold"> RUSOM</span>
              </div>
              <div className="text-xs text-stone-500 tracking-[0.3em] uppercase font-light">
                Photographe d'Excellence
              </div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-12">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`relative py-2 px-1 font-light tracking-wide transition-all duration-300 group ${
                  currentPage === item.id ? 'text-stone-900' : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                <span className={`absolute bottom-0 left-0 h-0.5 bg-stone-800 transition-all duration-500 ${
                  currentPage === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-3 rounded-full hover:bg-stone-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white/98 backdrop-blur-xl border-t border-stone-200 shadow-2xl">
          <div className="px-6 py-8 space-y-6">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`block w-full text-left text-xl font-light tracking-wide transition-colors py-2 ${
                  currentPage === item.id ? 'text-stone-900' : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

// Home Page
const HomePage = ({ setCurrentPage }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const heroImages = [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=1080&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1920&h=1080&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1920&h=1080&fit=crop&auto=format'
  ];

  const testimonials = [
    {
      name: "Marie & Pierre Dubois",
      type: "Mariage au Château de Versailles",
      content: "Samey a immortalisé notre mariage avec une sensibilité artistique exceptionnelle. Chaque photo raconte notre histoire avec une élégance rare.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&auto=format"
    },
    {
      name: "Catherine Moreau",
      type: "Séance Portrait Corporate",
      content: "Un photographe d'une rare qualité humaine et artistique. Les portraits corporate révèlent une personnalité authentique et professionnelle.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format"
    },
    {
      name: "Alexandre Rémy",
      type: "Événement d'Entreprise",
      content: "Travail remarquable lors de notre gala annuel. Samey sait capturer l'essence de nos événements avec un œil artistique inégalé.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format"
    }
  ];

  const awards = [
    { year: "2024", title: "Prix Excellence Photographique", organization: "Association Française des Photographes" },
    { year: "2023", title: "Mariage de l'Année", organization: "Wedding Photography Awards" },
    { year: "2022", title: "Portrait d'Art Distingué", organization: "Salon International de la Photo" }
  ];

  const recentWork = mockPhotos.slice(0, 6);

  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoplay, heroImages.length]);

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(testimonialInterval);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-2000 ease-in-out ${
                index === currentSlide ? 'opacity-40 scale-105' : 'opacity-0 scale-100'
              }`}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-800/40 to-stone-900/80" />
        </div>

        <div className="absolute top-1/2 right-8 -translate-y-1/2 z-20 space-y-4">
          <button
            onClick={() => setIsAutoplay(!isAutoplay)}
            className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/20"
          >
            {isAutoplay ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
          </button>
          
          <div className="space-y-3">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`block w-1 h-12 rounded-full transition-all duration-500 ${
                  index === currentSlide ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 h-full flex items-center justify-center text-center">
          <div className="max-w-6xl mx-auto px-6">
            <div className="space-y-12 text-white">
              <div className="space-y-6">
                <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-serif leading-none tracking-tight">
                  <span className="font-light italic block transform hover:scale-105 transition-transform duration-700">Samey</span>
                  <span className="font-bold">RUSOM</span>
                </h1>
                
                <div className="space-y-8">
                  <div className="w-32 h-px bg-white/50 mx-auto"></div>
                  <p className="text-2xl md:text-4xl font-light tracking-[0.4em] uppercase">
                    Photographe d'Art
                  </p>
                  <p className="text-xl md:text-2xl font-light italic max-w-4xl mx-auto leading-relaxed opacity-90">
                    "Capturer l'essence de vos moments les plus précieux avec l'élégance de l'art français"
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <button
                  onClick={() => {
                    setCurrentPage('portfolio');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group inline-flex items-center space-x-6 px-12 py-6 border-2 border-white/30 text-white font-light tracking-[0.3em] text-sm uppercase hover:bg-white hover:text-stone-900 transition-all duration-700 backdrop-blur-sm"
                >
                  <span>Découvrir Mon Univers</span>
                  <ArrowDown className="w-5 h-5 group-hover:translate-y-2 transition-transform duration-500" />
                </button>

                <div className="flex items-center justify-center space-x-12 text-sm text-white/70">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4" />
                    <span>8+ Années</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>500+ Clients</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>France & Europe</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20 bg-gradient-to-b from-stone-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif italic text-stone-800 mb-6">
              Reconnaissances
            </h2>
            <div className="w-24 h-px bg-stone-400 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {awards.map((award, index) => (
              <div key={index} className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-br from-stone-800 to-stone-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-serif text-stone-800 mb-2">{award.year}</div>
                <h3 className="text-lg font-medium text-stone-700 mb-3">{award.title}</h3>
                <p className="text-sm text-stone-500 font-light">{award.organization}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work Preview */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-serif italic text-stone-800 mb-6">
              Œuvres Sélectionnées
            </h2>
            <div className="w-24 h-px bg-stone-400 mx-auto mb-8"></div>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">
              Découvrez une sélection de mes créations les plus remarquables
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {mockPhotos.filter(p => p.featured).slice(0, 3).map((photo, index) => (
              <div key={photo.id} className="group cursor-pointer">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="font-serif text-lg mb-1">{photo.title}</h3>
                      <p className="text-sm opacity-90">{photo.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => {
                setCurrentPage('portfolio');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center space-x-3 px-8 py-4 bg-stone-800 text-white font-light tracking-wider uppercase hover:bg-stone-700 transition-all duration-300"
            >
              <span>Voir Tout le Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Recent Work Gallery */}
      <section className="py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-serif italic text-stone-800 mb-6">
              Créations Récentes
            </h2>
            <div className="w-24 h-px bg-stone-400 mx-auto mb-8"></div>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">
              Les dernières œuvres de mon atelier, capturées avec passion et créativité
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {recentWork.map((photo, index) => (
              <div key={photo.id} className="group cursor-pointer">
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center">
                      <Camera className="w-6 h-6 mx-auto mb-2" />
                      <p className="text-xs font-light">{photo.category}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-serif italic text-stone-800 mb-6">
              Témoignages Clients
            </h2>
            <div className="w-24 h-px bg-stone-400 mx-auto mb-8"></div>
            <p className="text-lg text-stone-600">
              Les mots de ceux qui ont fait confiance à mon regard artistique
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-8">
                    <div className="text-center space-y-8">
                      <div className="flex justify-center mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      
                      <blockquote className="text-xl md:text-2xl font-light italic text-stone-700 leading-relaxed max-w-3xl mx-auto">
                        "{testimonial.content}"
                      </blockquote>
                      
                      <div className="flex items-center justify-center space-x-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="text-left">
                          <h4 className="font-medium text-stone-800">{testimonial.name}</h4>
                          <p className="text-sm text-stone-500 font-light">{testimonial.type}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center space-x-2 mt-12">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-stone-800' : 'bg-stone-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-32 bg-gradient-to-b from-stone-50 to-stone-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-serif italic text-stone-800 mb-6">
              Mes Services
            </h2>
            <div className="w-24 h-px bg-stone-400 mx-auto mb-8"></div>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">
              Des prestations sur mesure pour immortaliser vos moments précieux
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Mariages",
                description: "Votre jour J immortalisé avec élégance",
                price: "À partir de 2 800€",
                image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop&auto=format"
              },
              {
                title: "Portraits",
                description: "Révélez votre essence authentique",
                price: "À partir de 450€",
                image: "https://images.unsplash.com/photo-1494790108755-2616c6ef2933?w=400&h=300&fit=crop&auto=format"
              },
              {
                title: "Événements",
                description: "Vos moments corporate sublimés",
                price: "À partir de 950€",
                image: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=400&h=300&fit=crop&auto=format"
              }
            ].map((service, index) => (
              <div key={index} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-serif text-xl mb-1">{service.title}</h3>
                    <p className="text-sm opacity-90">{service.price}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-stone-600 leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => {
                setCurrentPage('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center space-x-3 px-8 py-4 border-2 border-stone-800 text-stone-800 font-light tracking-wider uppercase hover:bg-stone-800 hover:text-white transition-all duration-300"
            >
              <span>Découvrir Tous les Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 bg-gradient-to-br from-stone-800 to-stone-700 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-serif italic mb-8">
            Créons Ensemble
          </h2>
          <div className="w-24 h-px bg-white/50 mx-auto mb-12"></div>
          <p className="text-xl md:text-2xl font-light leading-relaxed mb-12 opacity-90">
            Votre histoire mérite d'être racontée avec l'art et la passion 
            qui caractérisent chaque création de mon atelier.
          </p>
          
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button
                onClick={() => {
                  setCurrentPage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-12 py-6 bg-white text-stone-800 font-light tracking-wider uppercase hover:bg-stone-100 transition-all duration-300 transform hover:scale-105"
              >
                Commencer Votre Projet
              </button>
              
              <button
                onClick={() => {
                  setCurrentPage('portfolio');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-12 py-6 border-2 border-white text-white font-light tracking-wider uppercase hover:bg-white hover:text-stone-800 transition-all duration-300"
              >
                Explorer le Portfolio
              </button>
            </div>
            
            <div className="flex items-center justify-center space-x-8 text-sm text-white/70">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Consultation Gratuite</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Devis Personnalisé</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Satisfaction Garantie</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Portfolio Page
const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const filteredPhotos = activeCategory === 'all' 
    ? mockPhotos 
    : mockPhotos.filter(photo => photo.category === activeCategory);

  const openLightbox = (photo) => {
    const index = filteredPhotos.findIndex(p => p.id === photo.id);
    setCurrentPhotoIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-serif italic text-stone-800 mb-8">
            Portfolio
          </h1>
          <div className="w-32 h-px bg-stone-400 mx-auto mb-8"></div>
          <p className="text-xl text-stone-600 max-w-4xl mx-auto">
            Une collection complète de mes œuvres photographiques, 
            organisée par catégories pour votre exploration.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`group relative px-6 py-3 font-light text-sm tracking-wider uppercase transition-all duration-300 ${
                activeCategory === category.id ? 'text-stone-900' : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              <span className="flex items-center space-x-2">
                <span>{category.label}</span>
                <span className="text-xs opacity-60">({category.count})</span>
              </span>
              <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-px bg-stone-800 transition-all duration-300 ${
                activeCategory === category.id ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPhotos.map((photo, index) => (
            <PhotoCard key={photo.id} photo={photo} onClick={openLightbox} index={index} />
          ))}
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox
          photos={filteredPhotos}
          currentIndex={currentPhotoIndex}
          onClose={closeLightbox}
          onNext={() => setCurrentPhotoIndex((prev) => (prev + 1) % filteredPhotos.length)}
          onPrev={() => setCurrentPhotoIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length)}
        />
      )}
    </div>
  );
};

// About Page
const AboutPage = () => {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-serif italic text-stone-800 mb-8">
            À Propos
          </h1>
          <div className="w-32 h-px bg-stone-400 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="relative group">
            <div className="aspect-[4/5] relative overflow-hidden rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=750&fit=crop&auto=format"
                alt="Samey Rusom"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-gradient-to-br from-stone-800 to-stone-600 rounded-3xl flex items-center justify-center shadow-2xl">
              <Camera className="w-16 h-16 text-white" />
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="space-y-6 text-stone-600 font-light text-lg leading-relaxed">
              <p>
                Photographe passionné basé entre Lyon et Paris, je capture depuis plus de huit ans 
                l'essence authentique des émotions humaines. Mon approche privilégie la spontanéité 
                et l'élégance naturelle, révélant la beauté unique de chaque instant.
              </p>
              
              <p>
                Formé aux Beaux-Arts de Lyon et nourri par mes voyages européens, mon style marie 
                harmonieusement tradition française et vision contemporaine. Chaque image devient 
                une œuvre d'art intemporelle, transcendant les époques.
              </p>
              
              <blockquote className="relative italic text-stone-700 text-xl leading-relaxed py-6 pl-8 border-l-4 border-stone-300">
                "La photographie révèle la poésie cachée dans l'ordinaire et immortalise 
                l'extraordinaire dans l'éternel."
              </blockquote>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">
          {[
            { number: '8+', label: 'Années d\'Excellence', icon: Award },
            { number: '200+', label: 'Mariages Capturés', icon: Heart },
            { number: '500+', label: 'Clients Satisfaits', icon: Users },
            { number: '25+', label: 'Villes Visitées', icon: MapPin }
          ].map((stat, index) => (
            <div key={index} className="text-center p-8 bg-stone-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-500">
              <stat.icon className="w-8 h-8 text-stone-600 mx-auto mb-4" />
              <div className="text-4xl font-serif text-stone-800 mb-3">
                {stat.number}
              </div>
              <div className="text-xs text-stone-500 uppercase tracking-wider font-light">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif italic text-stone-800 mb-6">
            Mon Processus Créatif
          </h2>
          <div className="w-24 h-px bg-stone-400 mx-auto mb-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              step: '01',
              title: 'Consultation',
              description: 'Échange approfondi pour comprendre votre vision et vos attentes uniques.'
            },
            {
              step: '02',
              title: 'Création',
              description: 'Capture artistique de vos moments avec un œil expert et une approche personnalisée.'
            },
            {
              step: '03',
              title: 'Livraison',
              description: 'Retouche minutieuse et livraison de vos souvenirs sous forme d\'œuvres d\'art.'
            }
          ].map((process, index) => (
            <div key={index} className="text-center space-y-6">
              <div className="w-16 h-16 bg-stone-800 text-white rounded-full flex items-center justify-center text-xl font-light mx-auto">
                {process.step}
              </div>
              <h3 className="text-xl font-serif text-stone-800">{process.title}</h3>
              <p className="text-stone-600 leading-relaxed">{process.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Services Page
const ServicesPage = () => {
  const services = [
    {
      title: 'Mariages d\'Exception',
      price: 'À partir de 2 800€',
      duration: '8-12 heures',
      description: 'Immortaliser votre union avec l\'élégance de la tradition française',
      features: [
        'Couverture complète de votre journée',
        'Galerie privée sécurisée',
        '200+ photos haute résolution retouchées',
        'Tirages d\'art premium inclus',
        'Retouches artistiques personnalisées',
        'Consultation pré-mariage offerte'
      ],
      popular: true,
      color: 'from-stone-800 to-stone-700'
    },
    {
      title: 'Portraits Artistiques',
      price: 'À partir de 450€',
      duration: '2 heures',
      description: 'Révéler votre essence unique à travers un regard artistique',
      features: [
        'Séance personnalisée et coaching',
        '25 photos d\'art retouchées',
        'Conseils pose et style vestimentaire',
        'Tirage premium 30x40cm offert',
        'Consultation préparatoire incluse',
        'Retouches beauté subtiles'
      ],
      color: 'from-stone-700 to-stone-600'
    },
    {
      title: 'Événements Corporate',
      price: 'À partir de 950€',
      duration: '4-8 heures',
      description: 'Sublimer vos événements professionnels avec sophistication',
      features: [
        'Reportage événementiel complet',
        'Livraison express sous 48h',
        'Droits d\'usage commercial inclus',
        'Galerie web dédiée sécurisée',
        'Photos optimisées réseaux sociaux',
        'Portraits corporate bonus'
      ],
      color: 'from-stone-600 to-stone-500'
    }
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-serif italic text-stone-800 mb-8">
            Services
          </h1>
          <div className="w-32 h-px bg-stone-400 mx-auto mb-8"></div>
          <p className="text-xl text-stone-600 max-w-4xl mx-auto">
            Des prestations d'exception conçues pour sublimer vos moments les plus précieux, 
            alliant savoir-faire français et vision artistique contemporaine.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`relative group p-10 rounded-3xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 ${
                service.popular 
                  ? `bg-gradient-to-br ${service.color} text-white` 
                  : 'bg-white hover:bg-stone-50 border border-stone-200'
              }`}
            >
              {service.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-stone-600 to-stone-500 text-white text-xs uppercase tracking-wider rounded-full">
                  <Star className="w-3 h-3 inline mr-1" />
                  Populaire
                </div>
              )}
              
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className={`font-serif text-2xl leading-tight ${
                    service.popular ? 'text-white' : 'text-stone-800'
                  }`}>
                    {service.title}
                  </h3>
                  
                  <div className={`flex items-center space-x-2 text-sm ${
                    service.popular ? 'text-stone-200' : 'text-stone-500'
                  }`}>
                    <Clock className="w-4 h-4" />
                    <span>{service.duration}</span>
                  </div>
                  
                  <p className={`font-light leading-relaxed ${
                    service.popular ? 'text-stone-200' : 'text-stone-600'
                  }`}>
                    {service.description}
                  </p>
                </div>
                
                <div className={`text-3xl font-light border-t pt-6 ${
                  service.popular 
                    ? 'text-white border-stone-600' 
                    : 'text-stone-800 border-stone-200'
                }`}>
                  {service.price}
                </div>
                
                <ul className="space-y-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className={`text-sm font-light flex items-start space-x-3 ${
                      service.popular ? 'text-stone-200' : 'text-stone-600'
                    }`}>
                      <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        service.popular ? 'text-stone-300' : 'text-stone-400'
                      }`} />
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-4 rounded-xl font-light tracking-wider text-sm uppercase transition-all duration-500 ${
                  service.popular
                    ? 'bg-white text-stone-800 hover:bg-stone-100'
                    : 'border-2 border-stone-300 text-stone-700 hover:bg-stone-800 hover:text-white hover:border-stone-800'
                }`}>
                  Réserver une Consultation
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="bg-stone-50 rounded-3xl p-12 text-center">
          <h3 className="text-2xl font-serif italic text-stone-800 mb-6">
            Besoin d'une Prestation Personnalisée ?
          </h3>
          <p className="text-stone-600 mb-8 max-w-2xl mx-auto">
            Chaque projet est unique. Contactez-moi pour discuter de vos besoins spécifiques 
            et créer ensemble une offre sur mesure parfaitement adaptée à votre vision.
          </p>
          <Link
            to="contact"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-stone-800 text-white font-light tracking-wider uppercase hover:bg-stone-700 transition-all duration-300"
          >
            <span>Discutons de Votre Projet</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

// Contact Page
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-serif italic text-stone-800 mb-8">
            Contact
          </h1>
          <div className="w-32 h-px bg-stone-400 mx-auto mb-8"></div>
          <p className="text-xl text-stone-600 max-w-4xl mx-auto">
            Chaque projet raconte une histoire unique. Partagez-moi votre vision 
            et créons ensemble des souvenirs qui traverseront les générations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <div className="space-y-8">
              {[
                { icon: Mail, label: 'Email', value: 'samey@rusomphotographie.fr' },
                { icon: Phone, label: 'Téléphone', value: '+33 (0)6 12 34 56 78' },
                { icon: MapPin, label: 'Studios', value: 'Lyon & Paris, France' }
              ].map((item, index) => (
                <div key={index} className="group">
                  <div className="flex items-start space-x-6 hover:scale-105 transition-transform duration-300">
                    <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center group-hover:bg-stone-800 transition-colors">
                      <item.icon className="w-5 h-5 text-stone-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-medium text-stone-800 mb-2">{item.label}</h3>
                      <p className="text-stone-600 font-light">{item.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-stone-200">
              <h3 className="font-medium text-stone-800 mb-6">Suivez Mon Univers</h3>
              <div className="flex space-x-4">
                {[Instagram, Facebook].map((Icon, index) => (
                  <button 
                    key={index} 
                    className="w-14 h-14 bg-stone-100 rounded-full flex items-center justify-center text-stone-600 hover:bg-stone-800 hover:text-white hover:scale-110 transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white p-12 rounded-3xl shadow-xl border border-stone-100">
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { key: 'name', placeholder: 'Votre nom', type: 'text' },
                    { key: 'email', placeholder: 'Votre email', type: 'email' }
                  ].map((field) => (
                    <input
                      key={field.key}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.key]}
                      onChange={(e) => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                      className="w-full px-6 py-4 bg-stone-50 border-0 rounded-xl text-stone-800 placeholder-stone-500 font-light focus:outline-none focus:ring-2 focus:ring-stone-400 focus:bg-white transition-all"
                      required
                    />
                  ))}
                </div>
                
                <input
                  type="text"
                  placeholder="Type de projet (mariage, portrait, événement...)"
                  value={formData.project}
                  onChange={(e) => setFormData(prev => ({ ...prev, project: e.target.value }))}
                  className="w-full px-6 py-4 bg-stone-50 border-0 rounded-xl text-stone-800 placeholder-stone-500 font-light focus:outline-none focus:ring-2 focus:ring-stone-400 focus:bg-white transition-all"
                />
                
                <textarea
                  placeholder="Parlez-moi de votre vision, vos rêves, et ce qui rend votre projet unique..."
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  rows={6}
                  className="w-full px-6 py-4 bg-stone-50 border-0 rounded-xl text-stone-800 placeholder-stone-500 font-light focus:outline-none focus:ring-2 focus:ring-stone-400 focus:bg-white transition-all resize-none"
                  required
                />
                
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="group w-full py-5 bg-gradient-to-r from-stone-800 to-stone-700 text-white font-light tracking-wider text-sm uppercase transition-all duration-500 rounded-xl hover:from-stone-700 hover:to-stone-600 hover:shadow-xl hover:-translate-y-1"
                >
                  <span className="group-hover:tracking-[0.2em] transition-all duration-300">
                    Envoyer la Demande
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Photo Card Component
const PhotoCard = ({ photo, onClick, index }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div
      onClick={() => onClick(photo)}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={photo.url}
          alt={photo.title}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
        
        {!isLoaded && (
          <div className="absolute inset-0 bg-stone-200 animate-pulse flex items-center justify-center">
            <Camera className="w-8 h-8 text-stone-400" />
          </div>
        )}

        {photo.featured && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-stone-900/80 backdrop-blur-sm rounded-full text-white text-xs font-light tracking-wider uppercase">
            Sélection
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="absolute bottom-6 left-6 right-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex justify-between items-end">
              <div className="space-y-2">
                <h3 className="font-serif text-xl leading-tight">{photo.title}</h3>
                <p className="text-sm opacity-90 font-light">{photo.subtitle}</p>
                <div className="flex items-center space-x-4 text-xs opacity-75">
                  <span>{photo.location}</span>
                  <span>•</span>
                  <span>{photo.year}</span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLiked(!isLiked);
                }}
                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110"
              >
                <Heart 
                  className={`w-5 h-5 transition-all ${
                    isLiked ? 'text-red-400 fill-current scale-110' : 'text-white'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Lightbox Component
const Lightbox = ({ photos, currentIndex, onClose, onNext, onPrev }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    setIsLoading(true);
  }, [currentIndex]);

  if (!photos[currentIndex]) return null;

  const currentPhoto = photos[currentIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md">
      <div className="absolute top-0 left-0 right-0 z-10 p-8 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex justify-between items-center text-white">
          <div className="space-y-1">
            <h3 className="font-serif text-2xl">{currentPhoto.title}</h3>
            <p className="text-white/70 font-light">{currentPhoto.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      <button
        onClick={onPrev}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-10 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/20"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        onClick={onNext}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-10 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/20"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      <div className="flex items-center justify-center h-full p-4 pt-24 pb-32">
        <div className="relative max-w-6xl max-h-full">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={currentPhoto.url}
            alt={currentPhoto.title}
            className={`max-w-full max-h-full object-contain rounded-xl shadow-2xl transition-all duration-500 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex justify-between items-end text-white max-w-6xl mx-auto">
          <div className="space-y-3">
            <div className="flex items-center space-x-6 text-sm text-white/70">
              <span>{categories.find(c => c.id === currentPhoto.category)?.label}</span>
              <span>•</span>
              <span>{currentPhoto.location}</span>
              <span>•</span>
              <span>{currentPhoto.year}</span>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-white/60">
                <Heart className="w-4 h-4" />
                <span>{currentPhoto.likes} j'aime</span>
              </div>
              <div className="text-white/40 text-sm">
                {currentIndex + 1} / {photos.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer = ({ setCurrentPage }) => {
  return (
    <footer className="py-20 bg-gradient-to-t from-stone-900 to-stone-800 text-stone-300">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="space-y-12">
          <div className="flex items-center justify-center space-x-4 group cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-stone-100 to-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Camera className="w-6 h-6 text-stone-800" />
            </div>
            <div className="font-serif text-3xl tracking-wide text-white">
              <span className="font-light italic">Samey</span> 
              <span className="font-bold"> RUSOM</span>
            </div>
          </div>
          
          <div className="flex justify-center space-x-12">
            {[
              { label: 'Portfolio', page: 'portfolio' },
              { label: 'À Propos', page: 'about' },
              { label: 'Services', page: 'services' },
              { label: 'Contact', page: 'contact' }
            ].map((link) => (
              <Link
                key={link.page}
                to={link.page}
                onClick={() => {
                  setCurrentPage(link.page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-stone-400 hover:text-white font-light text-sm uppercase tracking-wider transition-all duration-300 hover:scale-110"
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-stone-700 to-transparent"></div>
          
          <div className="space-y-4 text-stone-400 font-light">
            <p className="text-lg">
              © 2024 Samey Rusom. Tous droits réservés.
            </p>
            <p className="text-sm opacity-75">
              Photographe d'art professionnel • Lyon & Paris, France
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pageTransition, setPageTransition] = useState(true);

  useEffect(() => {
    setPageTransition(false);
    const timer = setTimeout(() => setPageTransition(true), 100);
    return () => clearTimeout(timer);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'portfolio':
        return <PortfolioPage />;
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage setCurrentPage={setCurrentPage} />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navigation 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        
        <PageTransition isVisible={pageTransition}>
          {renderPage()}
        </PageTransition>
        
        <Footer setCurrentPage={setCurrentPage} />
      </div>
    </Router>
  );
};

export default App;