    // Enhanced Portfolio Website JavaScript with Security Features
    document.addEventListener('DOMContentLoaded', function() {
      // Security: Input validation and XSS prevention
      const sanitizeInput = (input) => {
        // Use DOMPurify if available, otherwise return input as-is for basic functionality
        return window.DOMPurify ? window.DOMPurify.sanitize(input) : input;
      };
      
      // DOM Elements
      const sidebarToggle = document.getElementById('navbarToggle');
      const sidebar = document.getElementById('sidebarRight');
      const sidebarBackdrop = document.getElementById('sidebarBackdrop');
      const navLinks = document.querySelectorAll('.nav-link');
      const filterButtons = document.querySelectorAll('.filter-btn');
      const portfolioItems = document.querySelectorAll('.gallery-item');
      
      // Enhanced Sidebar Toggle with Accessibility
      if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function(e) {
          e.preventDefault();
          const isOpen = sidebar.classList.contains('show');
          
          if (isOpen) {
            sidebar.classList.remove('show');
            if (sidebarBackdrop) sidebarBackdrop.classList.remove('active');
            this.setAttribute('aria-expanded', 'false');
          } else {
            sidebar.classList.add('show');
            if (sidebarBackdrop) sidebarBackdrop.classList.add('active');
            this.setAttribute('aria-expanded', 'true');
          }
        });
      }

      // Close sidebar when clicking backdrop
      if (sidebarBackdrop) {
        sidebarBackdrop.addEventListener('click', function() {
          sidebar.classList.remove('show');
          sidebarBackdrop.classList.remove('active');
          sidebarToggle.setAttribute('aria-expanded', 'false');
        });
      }
      
      // Enhanced Navigation with Smooth Scrolling
      navLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Remove active class from all links
          navLinks.forEach(l => l.classList.remove('active'));
          
          // Add active class to clicked link
          this.classList.add('active');
          
          // Get target section
          const targetId = this.getAttribute('href');
          const targetSection = document.querySelector(targetId);
          
          if (targetSection) {
            // Calculate offset for fixed navbar (80px)
            const offset = 100;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            // Smooth scroll with easing
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
          
          // Close sidebar after navigation
          if (sidebar && sidebar.classList.contains('show')) {
            sidebar.classList.remove('show');
            if (sidebarBackdrop) sidebarBackdrop.classList.remove('active');
            if (sidebarToggle) sidebarToggle.setAttribute('aria-expanded', 'false');
          }
        });
      });
      
      // Enhanced Portfolio Filter with Animation
      filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
          e.preventDefault();
          const filter = sanitizeInput(this.getAttribute('data-filter'));
          
          // Remove active class from all buttons
          filterButtons.forEach(btn => btn.classList.remove('active'));
          
          // Add active class to clicked button
          this.classList.add('active');
          
          // Filter portfolio items with staggered animation
          let delay = 0;
          portfolioItems.forEach((item, index) => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
              setTimeout(() => {
                item.style.display = 'block';
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                  item.style.transition = 'all 0.4s cubic-bezier(0.4,0,0.2,1)';
                  item.style.opacity = '1';
                  item.style.transform = 'translateY(0)';
                }, 50);
              }, delay);
              delay += 100;
            } else {
              item.style.transition = 'all 0.3s ease';
              item.style.opacity = '0';
              item.style.transform = 'translateY(-20px)';
              
              setTimeout(() => {
                item.style.display = 'none';
              }, 300);
            }
          });
        });
      });
      
      // Enhanced Intersection Observer for Animations
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };
      
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, index * 100);
          }
        });
      }, observerOptions);
      
      // Observe all animate-on-scroll elements
      document.querySelectorAll('.animate-on-scroll').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4,0,0.2,1)';
        observer.observe(el);
      });
      
      // Close sidebar when clicking outside
      document.addEventListener('click', function(e) {
        if (sidebar && sidebar.classList.contains('show') &&
          !sidebar.contains(e.target) &&
          !sidebarToggle.contains(e.target)) {
          
          sidebar.classList.remove('show');
          if (sidebarBackdrop) sidebarBackdrop.classList.remove('active');
          if (sidebarToggle) sidebarToggle.setAttribute('aria-expanded', 'false');
        }
      });
      
      // Enhanced Gallery Item Hover Effects with Mobile Support
      portfolioItems.forEach(item => {
        // Desktop hover effects
        item.addEventListener('mouseenter', function() {
          if (window.innerWidth > 768) {
            this.style.transform = 'translateY(-10px) scale(1.02)';
          }
        });
        
        item.addEventListener('mouseleave', function() {
          if (window.innerWidth > 768) {
            this.style.transform = 'translateY(0) scale(1)';
          }
        });

        // Mobile touch effects with haptic feedback simulation
        item.addEventListener('touchstart', function() {
          this.style.transition = 'transform 0.1s ease';
          this.style.transform = 'scale(0.98)';
        });

        item.addEventListener('touchend', function() {
          this.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
          this.style.transform = 'scale(1)';
        });

        // Enhanced click/tap handling
        item.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Add ripple effect for better feedback
          const ripple = document.createElement('div');
          ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(0, 196, 204, 0.3);
            width: 10px;
            height: 10px;
            left: ${e.offsetX - 5}px;
            top: ${e.offsetY - 5}px;
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1000;
          `;
          
          this.style.position = 'relative';
          this.appendChild(ripple);
          
          setTimeout(() => {
            ripple.remove();
          }, 600);
        });
      });
      
      // Responsive Navigation Update - Enhanced
      function updateNavigation() {
        const isMobile = window.innerWidth <= 768;
        const navbar = document.querySelector('.liquid-navbar');
        
        if (isMobile) {
          // Add mobile-specific classes and behaviors
          navbar?.classList.add('mobile');
          
          // Enhanced touch feedback for mobile devices
          document.querySelectorAll('.nav-link, .filter-btn, .gallery-item').forEach(element => {
            element.addEventListener('touchstart', function() {
              this.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', function() {
              setTimeout(() => {
                this.style.transform = '';
              }, 150);
            });
          });
          
        } else {
          navbar?.classList.remove('mobile');
        }
      }
      
      // Throttled resize handler for performance
      let resizeTimeout;
      window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateNavigation, 150);
      });
      
      // Enhanced Keyboard Navigation
      document.addEventListener('keydown', function(e) {
        // ESC key closes sidebar
        if (e.key === 'Escape' && sidebar && sidebar.classList.contains('show')) {
          sidebar.classList.remove('show');
          if (sidebarBackdrop) sidebarBackdrop.classList.remove('active');
          if (sidebarToggle) sidebarToggle.setAttribute('aria-expanded', 'false');
        }
      });
      
      // Performance: Lazy load images
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            
            setTimeout(() => {
              img.style.opacity = '1';
            }, 100);
            
            observer.unobserve(img);
          }
        });
      });
      
      document.querySelectorAll('.gallery-item img').forEach(img => {
        imageObserver.observe(img);
      });
      
      // Initialize FineStyle Framework
      if (window.FineStyle && typeof window.FineStyle.initAdvanced === 'function') {
        window.FineStyle.initAdvanced();
      }

      // Mobile-specific enhancements
      if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Add pull-to-refresh visual feedback (concept only)
        let startY = 0;
        let pullDistance = 0;
        const pullThreshold = 100;
        
        document.addEventListener('touchstart', function(e) {
          startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchmove', function(e) {
          if (window.scrollY === 0) {
            pullDistance = e.touches[0].clientY - startY;
            if (pullDistance > 0 && pullDistance < pullThreshold) {
              document.body.style.transform = `translateY(${pullDistance * 0.5}px)`;
              document.body.style.opacity = 1 - (pullDistance / pullThreshold) * 0.1;
            }
          }
        });
        
        document.addEventListener('touchend', function() {
          document.body.style.transform = '';
          document.body.style.opacity = '';
          pullDistance = 0;
        });

        // Optimize scroll performance for mobile
        let ticking = false;
        function updateScrollEffects() {
          // Add subtle parallax effect for hero section
          const heroSection = document.querySelector('.hero-section');
          if (heroSection) {
            const scrolled = window.pageYOffset;
            heroSection.style.transform = `translateY(${scrolled * 0.2}px)`;
          }
          ticking = false;
        }

        document.addEventListener('scroll', function() {
          if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
          }
        });
      }
      
      // Assign permanent template images to gallery items
      function assignPermanentGalleryImages() {
        const galleryImages = document.querySelectorAll('.gallery-item img');
        
        // Permanent image assignments for each gallery item
        const permanentAssignments = [
          'img/1.png',   // Educational Template 1
          'img/2.png',   // Educational Template 2  
          'img/3.png',   // Social Media Template 1
          'img/4.png',   // Social Media Template 2
          'img/6.png',   // Presentation Template 1
          'img/7.png',   // Presentation Template 2
          'img/8.png',   // Certificate Template 1
          'img/9.png'    // Certificate Template 2
        ];
        
        galleryImages.forEach((img, index) => {
          if (index < permanentAssignments.length) {
            const originalSrc = img.src;
            img.src = permanentAssignments[index];
            
            // Fallback to placeholder if image fails to load
            img.onerror = function() {
              this.src = originalSrc;
              console.log('Fallback: Using placeholder for gallery item', index);
            };
            
            // Add loading optimization
            img.loading = 'lazy';
          }
        });
        
        console.log('Gallery images assigned with permanent template photos! 📸');
      }
      
      // Initialize gallery images with permanent assignments
      assignPermanentGalleryImages();
      
      // Add new feature: Enhanced smooth scrolling with custom easing
      function addSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        navLinks.forEach(link => {
          link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
              const navbar = document.querySelector('.liquid-navbar');
              const navbarHeight = navbar ? navbar.offsetHeight : 80;
              const targetPosition = targetSection.offsetTop - navbarHeight - 20;
              
              // Custom smooth scroll with easing
              const startPosition = window.pageYOffset;
              const distance = targetPosition - startPosition;
              const duration = 800;
              let start = null;
              
              function ease(t) {
                return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
              }
              
              function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const progress = Math.min(timeElapsed / duration, 1);
                
                window.scrollTo(0, startPosition + distance * ease(progress));
                
                if (timeElapsed < duration) {
                  requestAnimationFrame(animation);
                }
              }
              
              requestAnimationFrame(animation);
            }
          });
        });
      }
      
      // Add feature: Keyboard navigation support
      function addKeyboardNavigation() {
        document.addEventListener('keydown', function(e) {
          // Enhanced accessibility - keyboard navigation
          if (e.key === 'Escape') {
            // Close sidebar on Escape
            const sidebar = document.getElementById('sidebarRight');
            const backdrop = document.getElementById('sidebarBackdrop');
            const toggle = document.getElementById('navbarToggle');
            
            if (sidebar && sidebar.classList.contains('show')) {
              sidebar.classList.remove('show');
              if (backdrop) backdrop.classList.remove('active');
              if (toggle) toggle.setAttribute('aria-expanded', 'false');
            }
          }
          
          // Tab navigation enhancement
          if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
          }
        });
        
        // Remove keyboard navigation class on mouse interaction
        document.addEventListener('mousedown', function() {
          document.body.classList.remove('keyboard-navigation');
        });
      }
      
      // Add feature: Lazy loading optimization for images
      function addLazyLoadingEnhancements() {
        if ('IntersectionObserver' in window) {
          const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                  img.src = img.dataset.src;
                  img.classList.remove('lazy');
                  imageObserver.unobserve(img);
                }
              }
            });
          });
          
          document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
          });
        }
      }
      
      // Initialize new features
      addSmoothScrolling();
      addKeyboardNavigation();
      addLazyLoadingEnhancements();
      
      console.log('Enhanced features initialized: smooth scrolling, keyboard navigation, lazy loading');
      
      console.log('Portfolio website initialized successfully with security features');
    });
    
    // Error handling wrapper with better reporting
    window.addEventListener('error', function(e) {
      console.error('Portfolio Error:', e.error);
      
      // Handle external resource loading failures gracefully
      if (e.target && e.target.tagName) {
        if (e.target.tagName === 'LINK' && e.target.rel === 'stylesheet') {
          console.warn('External CSS failed to load:', e.target.href);
        } else if (e.target.tagName === 'SCRIPT') {
          console.warn('External script failed to load:', e.target.src);
        }
      }
    });
    
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', function(e) {
      console.error('Unhandled Promise Rejection:', e.reason);
      e.preventDefault(); // Prevent the default browser error handling
    });
    
    // Performance monitoring with Web Vitals
    window.addEventListener('load', function() {
      const loadTime = performance.now();
      console.log(`Portfolio loaded in ${Math.round(loadTime)}ms`);
      
      // Monitor Core Web Vitals if available
      if ('PerformanceObserver' in window) {
        try {
          const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
              if (entry.entryType === 'largest-contentful-paint') {
                console.log('LCP:', Math.round(entry.startTime), 'ms');
              }
              if (entry.entryType === 'first-input') {
                console.log('FID:', Math.round(entry.processingStart - entry.startTime), 'ms');
              }
              if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
                console.log('CLS:', entry.value);
              }
            });
          });
          
          observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
        } catch (error) {
          console.log('Performance monitoring not fully supported');
        }
      }
    });