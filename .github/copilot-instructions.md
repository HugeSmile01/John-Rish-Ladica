# GitHub Copilot Instructions

## Project Overview

This is a professional portfolio website for John Rish Ladica, a Canva Template Creator specializing in educational design solutions. The portfolio showcases 80+ professional templates and demonstrates expertise in Canva-based design with a proven track record of reaching 300+ students through institutional partnerships.

## Technology Stack

- **HTML5**: Semantic markup structure (57.5%)
- **CSS3**: Modern styling with custom animations (26%)
- **JavaScript**: Interactive functionality (16.5%)
- **FineStyle Framework**: Custom CSS framework (fs-2.4.min.css, fs-2.0.min.js)
- **Font Awesome**: Professional iconography
- **Google Fonts**: Inter typography for readability
- **DOMPurify**: XSS protection and security
- **PWA**: Service Worker implementation for offline functionality

## Project Structure

```
John-Rish-Ladica/
├── index.html              # Main portfolio page
├── style.css              # Custom styles and animations
├── main.js                # Interactive functionality
├── res/
│   ├── fs-2.4.min.css    # FineStyle framework
│   └── fs-2.0.min.js     # Framework JavaScript
├── img/                   # Image assets and template screenshots
├── manifest.json          # PWA manifest
├── sw.js                  # Service worker for PWA
└── README.md              # Project documentation
```

## Coding Standards

### HTML
- Use semantic HTML5 elements
- Maintain proper accessibility attributes (ARIA labels, alt text)
- Include comprehensive SEO meta tags
- Follow structured data schema (JSON-LD)
- Keep markup clean and well-indented

### CSS
- Follow BEM-like naming conventions
- Use CSS custom properties (variables) for theming
- Implement mobile-first responsive design
- Use CSS Grid and Flexbox for layouts
- Apply smooth animations with proper transitions
- Maintain consistent spacing using the FineStyle framework variables

### JavaScript
- Write vanilla JavaScript (no frameworks)
- Use modern ES6+ syntax
- Implement proper error handling
- Add comments for complex logic
- Ensure cross-browser compatibility
- Follow DOMPurify best practices for XSS prevention

## Design Philosophy

### Visual Design
- **Color Palette**: Uses a Canva-inspired theme with cyan/teal accents (#00c4cc, #007bff)
- **Typography**: Inter font family for readability and modern aesthetics
- **Animations**: Subtle fade-in and scroll animations for enhanced user experience
- **Responsive**: Mobile-first approach with breakpoints for tablet and desktop

### User Experience
- Clean and professional layout
- Easy navigation with fixed navbar
- Category-based template filtering
- Optimized loading with lazy image loading
- Progressive Web App capabilities for offline access

## Content Guidelines

### Portfolio Categories
1. **Educational Templates** (Primary focus)
   - School presentations, ID cards, schedules, research posters
2. **Social Media Templates**
   - Instagram posts, Facebook covers, story templates
3. **Professional Templates**
   - Business presentations, thesis layouts, proposals
4. **Certificates & Awards**
   - Achievement certificates, participation awards

### Writing Tone
- Professional yet approachable
- Highlight measurable achievements (80+ templates, 300+ students)
- Emphasize educational design specialization
- Showcase institutional partnerships

## Development Workflow

### Testing
- Test responsiveness across devices (mobile, tablet, desktop)
- Verify cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- Check accessibility with screen readers
- Validate HTML and CSS
- Test PWA functionality

### Deployment
- Static site hosted on GitHub Pages
- Automatic deployment via GitHub Actions workflow
- Service worker caching for offline access

## Best Practices

### Performance
- Optimize images (use appropriate formats and compression)
- Lazy load images below the fold
- Minify CSS and JavaScript when possible
- Use CDN resources for external libraries
- Implement browser caching via service worker

### SEO
- Maintain comprehensive meta tags (Open Graph, Twitter Cards)
- Use semantic HTML structure
- Include structured data (Schema.org)
- Optimize page titles and descriptions
- Ensure fast page load times

### Accessibility
- Use proper heading hierarchy (h1-h6)
- Include alt text for all images
- Ensure sufficient color contrast
- Support keyboard navigation
- Test with accessibility tools

### Security
- Sanitize user inputs with DOMPurify
- Use HTTPS for all external resources
- Implement Content Security Policy headers
- Validate and escape dynamic content

## Contact & Collaboration

**Professional Email**: scantr4ck@gmail.com  
**Location**: Hingatungan, Silago, Southern Leyte, Philippines  
**Specialization**: Canva-based design solutions  
**Repository Owner**: HugeSmile01

## Key Features to Maintain

1. **Responsive Gallery**: Interactive template showcase with category filtering
2. **Scroll Animations**: Smooth fade-in effects on scroll
3. **PWA Support**: Offline functionality via service worker
4. **SEO Optimization**: Rich meta tags and structured data
5. **Professional Branding**: Canva-themed color scheme and design elements
6. **Achievement Highlights**: Metrics and institutional partnerships
7. **Contact Integration**: Professional inquiry channels

## Contributing

When making changes:
- Preserve the existing design aesthetic and Canva theme
- Maintain responsive design across all viewports
- Test thoroughly before committing
- Update README.md if adding new features
- Follow the established code style and structure
- Ensure accessibility standards are met
