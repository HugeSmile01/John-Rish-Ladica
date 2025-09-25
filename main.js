    // Enhanced Portfolio Website JavaScript with Security Features
    document.addEventListener('DOMContentLoaded', function() {
      // Security: Input validation and XSS prevention
      const sanitizeInput = (input) => {
        return DOMPurify.sanitize(input);
      };
      
      // DOM Elements
      const sidebarToggle = document.getElementById('sidebarToggle');
      const sidebar = document.getElementById('sidebar');
      const navLinks = document.querySelectorAll('.nav-link');
      const filterButtons = document.querySelectorAll('.filter-btn');
      const portfolioItems = document.querySelectorAll('.gallery-item');
      
      // Enhanced Sidebar Toggle with Accessibility
      sidebarToggle.addEventListener('click', function(e) {
        e.preventDefault();
        const isOpen = sidebar.classList.contains('show');
        
        if (isOpen) {
          sidebar.classList.remove('show');
          sidebar.classList.add('hide');
          this.setAttribute('aria-expanded', 'false');
          this.innerHTML = '<i class="fas fa-bars"></i>';
        } else {
          sidebar.classList.add('show');
          sidebar.classList.remove('hide');
          this.setAttribute('aria-expanded', 'true');
          this.innerHTML = '<i class="fas fa-times"></i>';
        }
      });
      
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
            // Calculate offset for fixed sidebar
            const offset = window.innerWidth <= 768 ? 0 : 80;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            // Smooth scroll with easing
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
          
          // Close sidebar on mobile after navigation
          if (window.innerWidth <= 768) {
            sidebar.classList.remove('show');
            sidebar.classList.add('hide');
            sidebarToggle.setAttribute('aria-expanded', 'false');
            sidebarToggle.innerHTML = '<i class="fas fa-bars"></i>';
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
      
      // Close sidebar when clicking outside (mobile)
      document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 &&
          !sidebar.contains(e.target) &&
          !sidebarToggle.contains(e.target) &&
          sidebar.classList.contains('show')) {
          
          sidebar.classList.remove('show');
          sidebar.classList.add('hide');
          sidebarToggle.setAttribute('aria-expanded', 'false');
          sidebarToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
      });
      
      // Enhanced Gallery Item Hover Effects
      portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0) scale(1)';
        });
      });
      
      // Responsive Navigation Update
      function updateNavigation() {
        if (window.innerWidth > 768) {
          sidebar.classList.remove('show');
          sidebar.classList.remove('hide');
          sidebarToggle.setAttribute('aria-expanded', 'false');
          sidebarToggle.innerHTML = '<i class="fas fa-bars"></i>';
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
        // ESC key closes mobile sidebar
        if (e.key === 'Escape' && sidebar.classList.contains('show')) {
          sidebar.classList.remove('show');
          sidebar.classList.add('hide');
          sidebarToggle.setAttribute('aria-expanded', 'false');
          sidebarToggle.innerHTML = '<i class="fas fa-bars"></i>';
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
      
      console.log('Portfolio website initialized successfully with security features');
    });
    
    // Error handling wrapper
    window.addEventListener('error', function(e) {
      console.error('Portfolio Error:', e.error);
      // Could implement error reporting here in production
    });
    
    // Performance monitoring (optional)
    window.addEventListener('load', function() {
      const loadTime = performance.now();
      console.log(`Portfolio loaded in ${Math.round(loadTime)}ms`);
    });