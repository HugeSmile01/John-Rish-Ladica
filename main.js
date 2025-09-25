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
          
          // Filter portfolio items with simplified animation
          portfolioItems.forEach((item, index) => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
              item.style.display = 'block';
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            } else {
              item.style.display = 'none';
            }
          });
        });
      });
      
      // Simplified Intersection Observer for Animations
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };
      
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, observerOptions);
      
      // Observe all animate-on-scroll elements with simplified setup
      document.querySelectorAll('.animate-on-scroll').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
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
      
      // Enhanced Gallery Item Hover Effects - Simplified
      portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0)';
        });
      });
      
      // Responsive Navigation Update
      function updateNavigation() {
        // No specific responsive updates needed for top navbar
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
      
      // Performance: Simplified lazy load images
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '1';
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