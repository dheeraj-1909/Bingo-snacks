import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { ChevronLeft, ChevronRight, Facebook, Instagram, Youtube, Twitter, ArrowDown, Moon, Sun, Menu, X } from 'lucide-react';

function App() {
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [currentProductSlide, setCurrentProductSlide] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cursorScale, setCursorScale] = useState(1);
  const sectionsRef = useRef([]);

  const heroSlides = [
    {
      image: 'https://s7ap1.scene7.com/is/image/itcportalprod/Homepage_HeroBanner_FC_Desktop_1366x640?fmt=webp-alpha',
      link: '/original-style'
    },
    {
      image: 'https://s7ap1.scene7.com/is/image/itcportalprod/full-range-PC_Homepage%20HeroBanner_Desktop_1366x640?fmt=webp-alpha',
      link: '/potato-chips'
    },
    {
      image: 'https://s7ap1.scene7.com/is/image/itcportalprod/Homepage_MA%20Banner_5120x2880_4x?fmt=webp-alpha',
      link: '/mad-angles'
    },
    {
      image: 'https://s7ap1.scene7.com/is/image/itcportalprod/HeroBanner_TM_Desktop_5120x2880_4x1?fmt=webp-alpha',
      link: '/tedhe-medhe'
    },
    {
      image: 'https://s7ap1.scene7.com/is/image/itcportalprod/untitled-design?fmt=webp-alpha',
      link: '/traditional-snacks'
    },
    {
      image: 'https://s7ap1.scene7.com/is/image/itcportalprod/HeroBanner_MA%20Range_Desktop_5120x2880_4x?fmt=webp-alpha',
      link: '/nachos'
    }
  ];

  const products = [
    {
      image: 'https://s7ap1.scene7.com/is/image/itcportalprod/ProductCard_OrginalStyle_Default_Desktop_1360x1360_4x1?fmt=webp-alpha',
      title: 'TASTE ITNA ORIGINAL, DUPLICATE IMPOSSIBLE',
      link: '/original-style'
    },
    {
      image: 'https://s7ap1.scene7.com/is/image/itcportalprod/ProductCard_MadAngles_Default_Desktop_1360x1360_4x1?fmt=webp-alpha',
      title: 'HAR PROBLEM KA MAD SOLUTION',
      link: '/mad-angles'
    },
    {
      image: 'https://s7ap1.scene7.com/is/image/itcportalprod/ProductCard%20Hashtags_Default_Mobile_968x968_4x?fmt=webp-alpha',
      title: '#ItsTrending',
      link: '/hashtag'
    }
  ];

  const blogs = [
    {
      image: 'https://s7ap1.scene7.com/is/image/itcportalprod/BlogCard1_Desktop_1520x1520_4x?fmt=webp-alpha',
      date: '30 Jun 2023',
      title: '7 Mad Friends in college who will take you to the Seventh Heaven!'
    },
    {
      image: 'https://s7ap1.scene7.com/is/image/itcportalprod/BlogCard2_Desktop_1520x1520_4x?fmt=webp-alpha',
      date: '13 Sep 2023',
      title: 'Survive the exam season with a few Tedhe Medhe tips!'
    },
    {
      image: 'https://s7ap1.scene7.com/is/image/itcportalprod/BlogCard3_Desktop_1520x1520_4x?fmt=webp-alpha',
      date: '04 Oct 2023',
      title: 'No More FOMO! Watch these top 10 all-time favourite American TV shows.'
    }
  ];

  // Custom cursor tracking with scale effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      
      // Scale cursor based on scroll position
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      const scale = 1 + (scrollPercentage / 100) * 0.5;
      setCursorScale(scale);
    };

    const handleMouseEnter = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
        setCursorScale(prevScale => prevScale * 1.5);
      }
    };

    const handleMouseLeave = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        const scale = 1 + (scrollPercentage / 100) * 0.5;
        setCursorScale(scale);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setScrollProgress(progress);
      
      // Update cursor scale based on scroll
      const scale = 1 + (progress / 100) * 0.5;
      setCursorScale(scale);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll(
      '.fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .rotate-in, .slide-reveal, .bounce-in, .flip-in'
    );
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Apply theme to body
  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkTheme]);

  const nextHeroSlide = () => {
    setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevHeroSlide = () => {
    setCurrentHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const nextProductSlide = () => {
    setCurrentProductSlide((prev) => (prev + 1) % products.length);
  };

  const prevProductSlide = () => {
    setCurrentProductSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div className="App">
      {/* Custom Cursor */}
      <div 
        className="custom-cursor"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          transform: `translate(-50%, -50%) scale(${cursorScale})`,
        }}
      >
        <img 
          src="https://images.unsplash.com/photo-1579384264577-79580c9d3a36?w=100&h=100&fit=crop" 
          alt="cursor" 
          className="cursor-chip"
        />
      </div>

      {/* Scroll Progress Bar */}
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />

      {/* Navigation */}
      <nav className="modern-nav fixed top-0  w-full z-50" data-testid="main-navigation">
        <div className="nav-glass ">
          <div className="max-w-7xl mx-auto px-4  sm:px-6 lg:px-8">
            <div className="flex justify-between items-center  h-20">
              {/* Logo */}
              <div className="flex logo-container">
                <img 
                  src="https://s7ap1.scene7.com/is/image/itcportalprod/BingoLogo_Header_128x80_1x%20(1)?fmt=webp-alpha" 
                  alt="Bingo Logo" 
                  className="h-12 logo-image"
                  data-testid="bingo-logo"
                />
              </div>
              
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-8 gap-15">
                <a href="#products" className="nav-link-modern" data-testid="nav-products">
                  <span>Products</span>
                  <div className="nav-underline"></div>
                </a>
                <a href="#about" className="nav-link-modern" data-testid="nav-about">
                  <span>About</span>
                  <div className="nav-underline"></div>
                </a>
                <a href="#blogs" className="nav-link-modern" data-testid="nav-blogs">
                  <span>Blogs</span>
                  <div className="nav-underline"></div>
                </a>
                <a href="#contact" className="nav-link-modern" data-testid="nav-contact">
                  <span>Contact</span>
                  <div className="nav-underline"></div>
                </a>
              </div>

              {/* Social Icons & Theme Toggle */}
              <div className="flex items-center ml-0 gap-10">
                <div className="hidden lg:flex gap-5">
                  <a href="https://www.facebook.com/BingoSnacks/" target="_blank" rel="noopener noreferrer" className="social-icon-nav" data-testid="social-facebook">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href="https://www.instagram.com/BingoSnacks/" target="_blank" rel="noopener noreferrer" className="social-icon-nav" data-testid="social-instagram">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="https://www.youtube.com/@BingoSnacks" target="_blank" rel="noopener noreferrer" className="social-icon-nav" data-testid="social-youtube">
                    <Youtube className="w-4 h-4" />
                  </a>
                  <a href="https://x.com/BingoSnacks" target="_blank" rel="noopener noreferrer" className="social-icon-nav" data-testid="social-twitter">
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>

                {/* Theme Toggle Button */}
                <button 
                  onClick={toggleTheme} 
                  className="theme-toggle-btn"
                  data-testid="theme-toggle"
                  aria-label="Toggle theme"
                >
                  {isDarkTheme ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                {/* Mobile Menu Button */}
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden mobile-menu-btn"
                  data-testid="mobile-menu-toggle"
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
            <div className="px-4 py-6 space-y-4">
              <a href="#products" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>Products</a>
              <a href="#about" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>About</a>
              <a href="#blogs" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>Blogs</a>
              <a href="#contact" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Carousel */}
      <section className="hero-section mt-20 relative overflow-hidden" data-testid="hero-carousel">
        <div className="carousel-container relative h-[600px]">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-slide absolute w-full h-full ${index === currentHeroSlide ? 'active' : ''}`}
              data-testid={`hero-slide-${index}`}
            >
              <img src={slide.image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
              <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                <button className="cta-button" data-testid={`hero-cta-${index}`}>Know More</button>
              </div>
            </div>
          ))}
          <button 
            onClick={prevHeroSlide} 
            className="carousel-nav left"
            data-testid="hero-prev-button"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button 
            onClick={nextHeroSlide} 
            className="carousel-nav right"
            data-testid="hero-next-button"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
        {/* Scroll Down Indicator */}
        <div className="scroll-indicator bounce-animation">
          <ArrowDown className="w-6 h-6 animate-bounce" />
        </div>
      </section>

      {/* Products Section */}
      <section 
        ref={(el) => (sectionsRef.current[0] = el)} 
        className="section-animate py-20" 
        id="products"
        data-testid="products-section"
      >
        <div className="max-w-7xl mx-auto px-4 mt-10">
          <div className="text-center mb-12 fade-in-up">
            <p className="section-subtitle" data-testid="products-subtitle">CRISP AND IRRESISTIBLE</p>
            <h2 className="section-title" data-testid="products-title">Taste the Best of Bingo! Snacks with Unique Flavors</h2>
            <p className="section-description" data-testid="products-description">
              Crunch into the unexpected with chips that speak in flavors and sizzle in surprises!
            </p>
          </div>
          
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentProductSlide * 100}%)` }}
              >
                {products.map((product, index) => (
                  <div key={index} className="min-w-full px-4" data-testid={`product-slide-${index}`}>
                    <div className="product-card group">
                      <div className="overflow-hidden rounded-2xl">
                        <img 
                          src={product.image} 
                          alt={product.title} 
                          className="w-full h-auto transform group-hover:scale-110 group-hover:rotate-3"
                        />
                      </div>
                      <h3 className="text-2xl font-bold mt-6 text-center product-title">{product.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button 
              onClick={prevProductSlide} 
              className="carousel-nav left"
              data-testid="products-prev-button"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextProductSlide} 
              className="carousel-nav right"
              data-testid="products-next-button"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Product 1 */}
      <section 
        ref={(el) => (sectionsRef.current[1] = el)} 
        className="section-animate py-20 overflow-hidden"
        data-testid="mad-angles-section"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 parallax-content">
              <p className="section-subtitle slide-reveal">Immerse in flavours</p>
              <h2 className="section-title mb-6 fade-in-left">THE CHIP CHRONICLES!</h2>
              <p className="section-text fade-in-left" style={{transitionDelay: '0.2s'}}>
                Dive into a world of flavorful innovation with our crisp and bold creations. Marking a fusion of 
                tantalizing flavors and a dash of digital inspiration, our chips are a byte-sized delight that pairs 
                perfectly with your tech adventures. It's time to elevate your snacking experience and savor the taste of innovation!
              </p>
              <button className="cta-button scale-in" data-testid="mad-angles-cta">Know More</button>
            </div>
            <div className="order-1 md:order-2 parallax-image">
              <img 
                src="https://s7ap1.scene7.com/is/image/itcportalprod/FlavourfulDelight_MA_Desktop_2752x2752_4x?fmt=webp-alpha" 
                alt="Mad Angles" 
                className="w-full rounded-3xl shadow-2xl floating-animation"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Product 2 */}
      <section 
        ref={(el) => (sectionsRef.current[2] = el)} 
        className="section-animate py-20 overflow-hidden"
        data-testid="original-style-section"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="parallax-image">
              <img 
                src="https://s7ap1.scene7.com/is/image/itcportalprod/FlavourfulDelight_FC_Desktop_2752x2752_4x?fmt=webp-alpha" 
                alt="Original Style" 
                className="w-full rounded-3xl shadow-2xl rotate-in"
              />
            </div>
            <div className="parallax-content">
              <p className="section-subtitle slide-reveal" style={{color: '#3b82f6'}}>Original Crunch Unleashed</p>
              <h2 className="section-title mb-6 fade-in-right">The original style</h2>
              <p className="section-text fade-in-right" style={{transitionDelay: '0.2s'}}>
                Dive into a world where crunch is an art form, and each chip is a symphony of satisfaction! 
                Bingo! Original Style snacks, the OG legend that started it all, brings you the unadulterated crunchiness. 
                It's not just a snack; it's a crunchy adventure.
              </p>
              <button className="cta-button scale-in" data-testid="original-style-cta">Know More</button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        ref={(el) => (sectionsRef.current[6] = el)} 
        className="section-animate py-20 stats-section overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bounce-in" style={{transitionDelay: '0.1s'}}>
              <div className="text-5xl font-bold mb-2 counter-animation stats-number">50+</div>
              <p className="text-xl stats-label">Flavors</p>
            </div>
            <div className="bounce-in" style={{transitionDelay: '0.2s'}}>
              <div className="text-5xl font-bold mb-2 counter-animation stats-number">1M+</div>
              <p className="text-xl stats-label">Happy Customers</p>
            </div>
            <div className="bounce-in" style={{transitionDelay: '0.3s'}}>
              <div className="text-5xl font-bold mb-2 counter-animation stats-number">25+</div>
              <p className="text-xl stats-label">Awards Won</p>
            </div>
            <div className="bounce-in" style={{transitionDelay: '0.4s'}}>
              <div className="text-5xl font-bold mb-2 counter-animation stats-number">100%</div>
              <p className="text-xl stats-label">Quality Assured</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comedy Section */}
      <section 
        ref={(el) => (sectionsRef.current[3] = el)} 
        className="section-animate py-20 relative overflow-hidden"
        data-testid="comedy-section"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center parallax-bg" 
          style={{ backgroundImage: 'url(https://s7ap1.scene7.com/is/image/itcportalprod/ComedyAdda_Background_Desktop_5120x4692_4x?fmt=webp-alpha)' }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 fade-in-up">BINGE ON OUR LATEST EPISODE</h2>
          <p className="text-xl text-white mb-8 fade-in-up" style={{transitionDelay: '0.2s'}}>
            Watch Dibyendu Sharma, Nikunj Lotia & Varun Sharma on Bingo! Comedy Adda
          </p>
          <button className="cta-button-white scale-in" style={{transitionDelay: '0.4s'}} data-testid="comedy-cta">Explore All Episodes</button>
        </div>
      </section>

      {/* Blogs Section */}
      <section 
        ref={(el) => (sectionsRef.current[4] = el)} 
        className="section-animate py-20" 
        id="blogs"
        data-testid="blogs-section"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 fade-in-up">
            <p className="section-subtitle">Know More</p>
            <h2 className="section-title">DISCOVER MORE ABOUT US</h2>
            <p className="section-description">Stay updated with our latest news, blogs and events</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <div 
                key={index} 
                className="blog-card group flip-in" 
                style={{transitionDelay: `${index * 0.2}s`}}
                data-testid={`blog-card-${index}`}
              >
                <div className="overflow-hidden rounded-xl mb-4 image-reveal">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-64 object-cover transform group-hover:scale-110 group-hover:rotate-2"
                  />
                </div>
                <p className="text-sm blog-date mb-2">{blog.date} | Blogs</p>
                <h3 className="text-xl font-bold blog-title">{blog.title}</h3>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="cta-button scale-in" data-testid="blogs-explore-cta">Explore All</button>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section 
        ref={(el) => (sectionsRef.current[5] = el)} 
        className="section-animate py-20"
        data-testid="social-section"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 fade-in-up">
            <p className="section-subtitle">Connect with us</p>
            <h2 className="section-title">Join the conversation</h2>
            <p className="section-description">Stay updated with our latest happenings on social media</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[0, 1, 2].map((index) => (
              <div 
                key={index}
                className="social-card slide-reveal" 
                style={{transitionDelay: `${index * 0.15}s`}}
                data-testid={`social-card-${index}`}
              >
                <div className="flex items-center mb-4">
                  <img 
                    src="https://s7ap1.scene7.com/is/image/itcportalprod/BIngoLogo_SocialMediaCard?fmt=webp-alpha" 
                    alt="Bingo Logo" 
                    className="h-8 mr-3"
                  />
                  <div>
                    <p className="font-bold social-card-title">Bingo!</p>
                    <p className="text-sm social-card-handle">
                      {index === 0 ? '@bingo_snacks' : index === 1 ? '@bingo_tedhe medhe' : '@bingo_madangles'}
                    </p>
                  </div>
                </div>
                <p className="social-card-text mb-4">
                  {index === 0 
                    ? 'Lure yourself into the world of exciting flavours, those that will always makes your taste buds asking for more!' 
                    : index === 1 
                    ? 'When to #EatPhirRepeat? Only time will tell, and well, it tells well!' 
                    : 'Life of a millennial in a single picture.'}
                </p>
                <img 
                  src={`https://s7ap1.scene7.com/is/image/itcportalprod/SocialMediaCard${index + 1}_Desktop-1?fmt=webp-alpha`}
                  alt="Social Post" 
                  className="w-full rounded-lg image-reveal"
                />
              </div>
            ))}
          </div>
          
          <div className="text-center fade-in-up">
            <p className="social-follow-text mb-6 font-semibold">Follow us on</p>
            <div className="flex justify-center space-x-6">
              <a href="https://www.facebook.com/BingoSnacks" target="_blank" rel="noopener noreferrer" className="social-icon scale-in" style={{transitionDelay: '0.1s'}} data-testid="footer-facebook">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/bingo_snacks/" target="_blank" rel="noopener noreferrer" className="social-icon scale-in" style={{transitionDelay: '0.2s'}} data-testid="footer-instagram">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://www.youtube.com/@BingoSnacks" target="_blank" rel="noopener noreferrer" className="social-icon scale-in" style={{transitionDelay: '0.3s'}} data-testid="footer-youtube">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section py-12 fade-in-up" data-testid="footer">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="slide-reveal">
              <img 
                src="https://bingosnacks.com/content/dam/itc-foods-brands/bingo/bingo-logo.svg" 
                alt="Bingo Logo" 
                className="h-12 mb-4 footer-logo"
              />
              <p className="footer-text">Taste the excitement with every crunch!</p>
            </div>
            <div className="slide-reveal" style={{transitionDelay: '0.1s'}}>
              <h4 className="font-bold mb-4 footer-title">Products</h4>
              <ul className="space-y-2 footer-links">
                <li><a href="#" className="footer-link">Original Style</a></li>
                <li><a href="#" className="footer-link">Mad Angles</a></li>
                <li><a href="#" className="footer-link">Tedhe Medhe</a></li>
                <li><a href="#" className="footer-link">Nachos</a></li>
              </ul>
            </div>
            <div className="slide-reveal" style={{transitionDelay: '0.2s'}}>
              <h4 className="font-bold mb-4 footer-title">Company</h4>
              <ul className="space-y-2 footer-links">
                <li><a href="#" className="footer-link">About Us</a></li>
                <li><a href="#" className="footer-link">Contact</a></li>
                <li><a href="#" className="footer-link">Careers</a></li>
                <li><a href="#" className="footer-link">Privacy Policy</a></li>
              </ul>
            </div>
            <div className="slide-reveal" style={{transitionDelay: '0.3s'}}>
              <h4 className="font-bold mb-4 footer-title">Newsletter</h4>
              <p className="footer-text mb-4">Subscribe to get special offers and updates</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="newsletter-input"
                  data-testid="newsletter-input"
                />
                <button className="newsletter-button" data-testid="newsletter-submit">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copyright">&copy; 2025 Bingo Snacks. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;