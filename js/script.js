document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelectorAll('.sidebar-nav a');

    // Get current filename for active state
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split('/').pop() || 'index.html';

    // Set Active Link based on filename
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const linkFile = href.split('/').pop();

        if (currentFile === linkFile) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Mobile Menu Toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // Close sidebar when clicking a link on mobile
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                sidebar.classList.remove('active');
            }
        });
    });

    // Code copy button logic (Bonus Feature)
    const codeBlocks = document.querySelectorAll('pre');
    codeBlocks.forEach(block => {
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.innerHTML = '<i class="far fa-copy"></i>';
        block.style.position = 'relative';
        block.appendChild(button);

        button.addEventListener('click', () => {
            const code = block.querySelector('code').innerText;
            navigator.clipboard.writeText(code).then(() => {
                button.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    button.innerHTML = '<i class="far fa-copy"></i>';
                }, 2000);
            });
        });
    });
});

// Add floating animation via JS injected style
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        from { transform: translateY(0px); }
        to { transform: translateY(-20px); }
    }
    .copy-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(255,255,255,0.1);
        border: none;
        color: #fff;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s;
    }
    pre:hover .copy-btn {
        opacity: 1;
    }
    .copy-btn:hover {
        background: rgba(255,255,255,0.2);
    }
`;
document.head.appendChild(style);
