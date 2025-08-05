
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add click tracking for script links
    const scriptLinks = document.querySelectorAll('.script-link');
    
    scriptLinks.forEach(link => {
        link.addEventListener('click', function() {
            const scriptName = this.closest('.script-card').querySelector('.script-name').textContent;
            console.log(`Accessing script: ${scriptName}`);
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
            }, 100);
        });
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // Add search functionality
    function addSearchFilter() {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.style.cssText = `
            margin-bottom: 2rem;
            text-align: center;
        `;
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search scripts...';
        searchInput.className = 'search-input';
        searchInput.style.cssText = `
            padding: 1rem 1.5rem;
            background: rgba(42, 42, 42, 0.8);
            border: 1px solid #333;
            border-radius: 8px;
            color: #fff;
            font-size: 1rem;
            width: 100%;
            max-width: 400px;
            transition: all 0.3s ease;
        `;
        
        searchInput.addEventListener('focus', function() {
            this.style.borderColor = '#00ff88';
            this.style.boxShadow = '0 0 0 2px rgba(0, 255, 136, 0.2)';
        });
        
        searchInput.addEventListener('blur', function() {
            this.style.borderColor = '#333';
            this.style.boxShadow = 'none';
        });
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const scriptCards = document.querySelectorAll('.script-card');
            
            scriptCards.forEach(card => {
                const scriptName = card.querySelector('.script-name').textContent.toLowerCase();
                const scriptDescription = card.querySelector('.script-description').textContent.toLowerCase();
                
                if (scriptName.includes(searchTerm) || scriptDescription.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.3s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
        
        searchContainer.appendChild(searchInput);
        
        const scriptsSection = document.querySelector('.scripts-section');
        const sectionTitle = scriptsSection.querySelector('.section-title');
        sectionTitle.insertAdjacentElement('afterend', searchContainer);
    }
    
    // Add search functionality
    addSearchFilter();

    // Add copy link functionality
    scriptLinks.forEach(link => {
        const card = link.closest('.script-card');
        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy Link';
        copyButton.className = 'copy-button';
        copyButton.style.cssText = `
            background: transparent;
            border: 1px solid #555;
            color: #ccc;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            margin-left: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.85rem;
        `;
        
        copyButton.addEventListener('click', function(e) {
            e.preventDefault();
            navigator.clipboard.writeText(link.href).then(() => {
                copyButton.textContent = 'Copied!';
                copyButton.style.borderColor = '#00ff88';
                copyButton.style.color = '#00ff88';
                
                setTimeout(() => {
                    copyButton.textContent = 'Copy Link';
                    copyButton.style.borderColor = '#555';
                    copyButton.style.color = '#ccc';
                }, 2000);
            });
        });
        
        copyButton.addEventListener('mouseenter', function() {
            this.style.borderColor = '#00ff88';
            this.style.color = '#00ff88';
        });
        
        copyButton.addEventListener('mouseleave', function() {
            if (this.textContent !== 'Copied!') {
                this.style.borderColor = '#555';
                this.style.color = '#ccc';
            }
        });
        
        link.parentNode.appendChild(copyButton);
    });
});
