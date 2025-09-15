import React, { useState, useEffect, useRef } from 'react';
import { Camera, Menu, X, ChevronLeft, ChevronRight, Mail, Phone, MapPin, Instagram, Facebook, Heart, ArrowDown, Play, Pause, Award, Users } from 'lucide-react';

// Enhanced mock data with more variety
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

// Premium Loading Animation
const LoadingScreen = ({ isLoading, setIsLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setIsLoading(false), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isLoading, setIsLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-900 flex items-center justify-center">
      <div className="text-center space-y-8">
        <div className="w-16 h-16 border-2 border-stone-300 rounded-full animate-spin border-t-transparent mx-auto"></div>
        <div className="space-y-4">
          <h1 className="text-4xl font-serif italic text-stone-100">Samey RUSOM</h1>
          <div className="w-64 h-0.5 bg-stone-700 mx-auto overflow-hidden">
            <div 
              className="h-full bg-stone-300 transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-stone-400 text-sm tracking-wider">CHARGEMENT {progress}%</p>
        </div>
      </div>
    </div>
  );
};

// Sophisticated Navigation
const Navigation = ({ isMenuOpen, setIsMenuOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      setIsVisible(currentScrollY < lastScrollY.current || currentScrollY < 100);
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
      isScrolled ? 'py-4 bg-white/95 backdrop-blur-xl shadow-xl' : 'py-6 bg-transparent'
    } ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4 group cursor-pointer">
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
          </div>

          <div className="hidden lg:flex items-center space-x-12">
            {[
              { label: 'Accueil', id: 'home' },
              { label: 'Portfolio', id: 'portfolio' },
              { label: 'À Propos', id: 'about' },
              { label: 'Services', id: 'services' },
              { label: 'Contact', id: 'contact' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative py-2 px-1 text-stone-700 hover:text-stone-900 font-light tracking-wide transition-all duration-300 group"
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-stone-800 transition-all duration-500 group-hover:w-full"></span>
              </button>
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
            {[
              { label: 'Accueil', id: 'home' },
              { label: 'Portfolio', id: 'portfolio' },
              { label: 'À Propos', id: 'about' },
              { label: 'Services', id: 'services' },
              { label: 'Contact', id: 'contact' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left text-xl text-stone-700 hover:text-stone-900 font-light tracking-wide transition-colors py-2"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

// Cinematic Hero Section
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  
  const heroImages = [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=1080&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1920&h=1080&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1920&h=1080&fit=crop&auto=format'
  ];

  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoplay, heroImages.length]);

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Dynamic Background Slideshow */}
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

      {/* Slideshow Controls */}
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

      {/* Hero Content */}
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
                onClick={() => document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' })}
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

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4 text-white/60">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/40 to-transparent relative">
          <div className="w-px h-6 bg-white absolute top-0 animate-pulse"></div>
        </div>
        <span className="text-xs tracking-[0.3em] uppercase font-light">Défiler</span>
      </div>
    </section>
  );
};

// Advanced Masonry Grid Component
const MasonryGrid = ({ photos, onPhotoClick }) => {
  const gridRef = useRef(null);
  
  const getGridItemClass = (photo) => {
    switch (photo.size) {
      case 'large':
        return 'md:col-span-2 md:row-span-2';
      case 'wide':
        return 'md:col-span-2';
      case 'tall':
        return 'md:row-span-2';
      default:
        return '';
    }
  };

  return (
    <div 
      ref={gridRef}
      className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr"
    >
      {photos.map((photo, index) => (
        <MasonryItem
          key={photo.id}
          photo={photo}
          onClick={onPhotoClick}
          className={getGridItemClass(photo)}
          index={index}
        />
      ))}
    </div>
  );
};

// Enhanced Photo Card with Animations
const MasonryItem = ({ photo, onClick, className, index }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            if (cardRef.current) {
              cardRef.current.style.transform = 'translateY(0) scale(1)';
              cardRef.current.style.opacity = '1';
            }
          }, index * 100);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      onClick={() => onClick(photo)}
      className={`group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 transform translate-y-8 opacity-0 ${className}`}
      style={{ 
        transitionDelay: `${index * 50}ms`,
        aspectRatio: photo.size === 'wide' ? '16/9' : photo.size === 'large' ? '4/5' : '3/4'
      }}
    >
      <div className="relative h-full overflow-hidden">
        <img
          src={photo.url}
          alt={photo.title}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
        
        {/* Loading placeholder */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-stone-200 animate-pulse flex items-center justify-center">
            <Camera className="w-8 h-8 text-stone-400" />
          </div>
        )}

        {/* Featured badge */}
        {photo.featured && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-stone-900/80 backdrop-blur-sm rounded-full text-white text-xs font-light tracking-wider uppercase">
            Sélection
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="absolute bottom-6 left-6 right-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex justify-between items-end">
              <div className="space-y-2">
                <h3 className="font-serif text-xl md:text-2xl leading-tight">{photo.title}</h3>
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

// Premium Portfolio Section
const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const filteredPhotos = activeCategory === 'all' 
    ? mockPhotos 
    : mockPhotos.filter(photo => photo.category === activeCategory);

  const handleCategoryChange = async (categoryId) => {
    if (categoryId === activeCategory) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    setActiveCategory(categoryId);
    setIsLoading(false);
  };

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
    <>
      <section id="portfolio" className="py-32 bg-gradient-to-b from-white to-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-8xl font-serif italic text-stone-800 mb-8 leading-tight">
              Portfolio
            </h2>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-stone-400 to-transparent mx-auto mb-12"></div>
            <p className="text-xl md:text-2xl text-stone-600 font-light max-w-4xl mx-auto leading-relaxed">
              Une collection d'œuvres soigneusement sélectionnées, où chaque image 
              raconte une histoire unique et révèle la beauté de l'instant.
            </p>
          </div>

          {/* Enhanced Filter Navigation */}
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                disabled={isLoading}
                className={`group relative px-8 py-4 font-light text-sm tracking-[0.2em] uppercase transition-all duration-500 ${
                  activeCategory === category.id
                    ? 'text-stone-900'
                    : 'text-stone-500 hover:text-stone-700'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>{category.label}</span>
                  <span className="text-xs opacity-60 font-normal">({category.count})</span>
                </span>
                
                {/* Active indicator */}
                <span
                  className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-px bg-stone-800 transition-all duration-500 ${
                    activeCategory === category.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
                
                {/* Featured dot */}
                {activeCategory === category.id && (
                  <span className="absolute -top-2 -right-2 w-2 h-2 bg-stone-800 rounded-full animate-pulse"></span>
                )}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center space-x-4">
                <div className="w-6 h-6 border-2 border-stone-300 border-t-stone-800 rounded-full animate-spin"></div>
                <span className="text-stone-600 font-light tracking-wider">Chargement...</span>
              </div>
            </div>
          ) : (
            /* Enhanced Masonry Grid */
            <MasonryGrid photos={filteredPhotos} onPhotoClick={openLightbox} />
          )}
        </div>
      </section>

      {lightboxOpen && (
        <PremiumLightbox
          photos={filteredPhotos}
          currentIndex={currentPhotoIndex}
          onClose={closeLightbox}
          onNext={() => setCurrentPhotoIndex((prev) => (prev + 1) % filteredPhotos.length)}
          onPrev={() => setCurrentPhotoIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length)}
        />
      )}
    </>
  );
};

// Premium Lightbox with Advanced Features
const PremiumLightbox = ({ photos, currentIndex, onClose, onNext, onPrev }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === ' ') {
        e.preventDefault();
        setIsZoomed(!isZoomed);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext, isZoomed]);

  useEffect(() => {
    setIsLoading(true);
    setIsZoomed(false);
  }, [currentIndex]);

  if (!photos[currentIndex]) return null;

  const currentPhoto = photos[currentIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md">
      {/* Header */}
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

      {/* Navigation */}
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

      {/* Main Image */}
      <div className="flex items-center justify-center h-full p-4 pt-24 pb-32">
        <div className="relative max-w-6xl max-h-full">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
          <img
            ref={imageRef}
            src={currentPhoto.url}
            alt={currentPhoto.title}
            className={`max-w-full max-h-full object-contain rounded-xl shadow-2xl cursor-zoom-in transition-all duration-500 ${
              isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100'
            } ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={() => setIsLoading(false)}
            onClick={() => setIsZoomed(!isZoomed)}
          />
        </div>
      </div>

      {/* Footer Info */}
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
          <div className="text-right text-sm text-white/50">
            <p>Espace : Zoom • Flèches : Navigation • Échap : Fermer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Elegant About Section
const AboutSection = () => {
  return (
    <section id="about" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="aspect-[4/5] relative overflow-hidden rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=750&fit=crop&auto=format"
                alt="Samey Rusom"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-gradient-to-br from-stone-800 to-stone-600 rounded-3xl flex items-center justify-center shadow-2xl">
              <Camera className="w-16 h-16 text-white" />
            </div>
          </div>
          
          <div className="space-y-12">
            <div>
              <h2 className="text-6xl md:text-7xl font-serif italic text-stone-800 mb-8 leading-tight">
                À Propos
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-stone-400 to-transparent mb-12"></div>
            </div>
            
            <div className="space-y-8 text-stone-600 font-light text-lg leading-relaxed">
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
              
              <blockquote className="relative italic text-stone-700 text-xl leading-relaxed py-8 pl-12">
                <span className="absolute left-0 top-0 text-6xl text-stone-300 font-serif">"</span>
                La photographie révèle la poésie cachée dans l'ordinaire et immortalise 
                l'extraordinaire dans l'éternel.
                <span className="absolute right-4 bottom-0 text-6xl text-stone-300 font-serif">"</span>
              </blockquote>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-12">
              {[
                { number: '8+', label: 'Années d\'Excellence', icon: Award },
                { number: '200+', label: 'Mariages Capturés', icon: Heart },
                { number: '500+', label: 'Clients Satisfaits', icon: Users },
                { number: '25+', label: 'Villes Visitées', icon: MapPin }
              ].map((stat, index) => (
                <div key={index} className="group text-center p-8 bg-stone-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-500">
                  <stat.icon className="w-8 h-8 text-stone-600 mx-auto mb-4 group-hover:text-stone-800 transition-colors" />
                  <div className="text-4xl font-serif text-stone-800 mb-3 group-hover:scale-110 transition-transform">
                    {stat.number}
                  </div>
                  <div className="text-xs text-stone-500 uppercase tracking-[0.2em] font-light">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Premium Services Section
const ServicesSection = () => {
  const services = [
    {
      title: 'Mariages d\'Exception',
      price: 'À partir de 2 800€',
      description: 'Immortaliser votre union avec l\'élégance de la tradition française',
      features: [
        'Couverture complète 8-12 heures',
        'Galerie privée sécurisée',
        '200+ photos haute résolution',
        'Tirages d\'art premium inclus',
        'Retouches artistiques personnalisées'
      ],
      popular: true
    },
    {
      title: 'Portraits Artistiques',
      price: 'À partir de 450€',
      description: 'Révéler votre essence unique à travers un regard artistique',
      features: [
        'Séance personnalisée 2 heures',
        '25 photos d\'art retouchées',
        'Coaching pose et style',
        'Tirage premium 30x40cm offert',
        'Consultation préparatoire incluse'
      ]
    },
    {
      title: 'Événements Corporate',
      price: 'À partir de 950€',
      description: 'Sublimer vos événements professionnels avec sophistication',
      features: [
        'Reportage événementiel complet',
        'Livraison express sous 48h',
        'Droits d\'usage commercial inclus',
        'Galerie web dédiée',
        'Photos optimisées réseaux sociaux'
      ]
    }
  ];

  return (
    <section id="services" className="py-32 bg-gradient-to-b from-stone-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-8xl font-serif italic text-stone-800 mb-8">
            Services
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-stone-400 to-transparent mx-auto mb-12"></div>
          <p className="text-xl md:text-2xl text-stone-600 font-light max-w-4xl mx-auto leading-relaxed">
            Des prestations d'exception conçues pour sublimer vos moments les plus précieux, 
            alliant savoir-faire français et vision artistique contemporaine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`relative group p-10 rounded-3xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 ${
                service.popular 
                  ? 'bg-gradient-to-br from-stone-800 to-stone-700 text-white ring-4 ring-stone-300' 
                  : 'bg-white hover:bg-stone-50'
              }`}
            >
              {service.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-stone-600 to-stone-500 text-white text-xs uppercase tracking-wider rounded-full">
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
                      <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                        service.popular ? 'bg-stone-300' : 'bg-stone-400'
                      }`}></span>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-4 rounded-xl font-light tracking-[0.1em] text-sm uppercase transition-all duration-500 ${
                  service.popular
                    ? 'bg-white text-stone-800 hover:bg-stone-100'
                    : 'border-2 border-stone-300 text-stone-700 hover:bg-stone-800 hover:text-white hover:border-stone-800'
                }`}>
                  Découvrir l'Offre
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Enhanced Contact Section
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
  };

  return (
    <section id="contact" className="py-32 bg-gradient-to-b from-white to-stone-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-8xl font-serif italic text-stone-800 mb-8">
            Contact
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-stone-400 to-transparent mx-auto mb-12"></div>
          <p className="text-xl md:text-2xl text-stone-600 font-light max-w-4xl mx-auto leading-relaxed">
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
                      <h3 className="font-medium text-stone-800 mb-2 group-hover:text-stone-900">{item.label}</h3>
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
            <div className="bg-white p-12 rounded-3xl shadow-xl">
              <div className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { key: 'name', placeholder: 'Votre nom', type: 'text' },
                    { key: 'email', placeholder: 'Votre email', type: 'email' }
                  ].map((field) => (
                    <div key={field.key} className="relative group">
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.key]}
                        onChange={(e) => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                        className="w-full px-6 py-4 bg-stone-50 border-0 rounded-xl text-stone-800 placeholder-stone-500 font-light focus:outline-none focus:ring-2 focus:ring-stone-400 focus:bg-white transition-all"
                        required
                      />
                    </div>
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
                  className="group w-full py-5 bg-gradient-to-r from-stone-800 to-stone-700 text-white font-light tracking-[0.1em] text-sm uppercase transition-all duration-500 rounded-xl hover:from-stone-700 hover:to-stone-600 hover:shadow-xl hover:-translate-y-1"
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
    </section>
  );
};

// Elegant Footer
const Footer = () => {
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
            {['Instagram', 'Facebook', 'LinkedIn', 'Contact'].map((link) => (
              <button 
                key={link} 
                className="text-stone-400 hover:text-white font-light text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:scale-110"
              >
                {link}
              </button>
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

// Main App with Loading
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-white">
      <LoadingScreen isLoading={isLoading} setIsLoading={setIsLoading} />
      
      {!isLoading && (
        <>
          <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          <HeroSection />
          <PortfolioSection />
          <AboutSection />
          <ServicesSection />
          <ContactSection />
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;