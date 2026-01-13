// ElectGuard - Main Application Logic (Enhanced with Full Navigation)
let currentUser = null;
let currentPage = 'home';

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initLoadingScreen();
    navigateTo('home');
});

// Custom Cursor
function initCursor() {
    const cursor = document.getElementById('cursor-trail');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    setTimeout(() => {
        document.querySelectorAll('button, a, .login-card, input, select, textarea, .feature-card, .nav-link').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
            });
        });
    }, 3000);
}

// Loading Screen
function initLoadingScreen() {
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hidden');
    }, 2500);
}

// Navigation System
function navigateTo(page) {
    currentPage = page;
    updateNavigation();

    switch (page) {
        case 'home': renderHomePage(); break;
        case 'about': renderAboutPage(); break;
        case 'features': renderFeaturesPage(); break;
        case 'contact': renderContactPage(); break;
        case 'evm': renderEVMTrackingPage(); break;
        case 'states': renderStateTrackingPage(); break;
        default: renderHomePage();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(initCursor, 100);
}

function updateNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === currentPage) {
            link.classList.add('active');
        }
    });
}

function goHome() {
    if (currentUser) {
        logout();
    } else {
        navigateTo('home');
    }
}

// Render Navigation Bar
function renderNavbar() {
    return `
        <nav class="navbar" id="navbar">
            <div class="nav-brand" onclick="goHome()" style="cursor:pointer;">
                <svg viewBox="0 0 100 100" class="nav-logo">
                    <path d="M50 5 L90 20 L90 45 C90 70 70 90 50 95 C30 90 10 70 10 45 L10 20 Z" fill="url(#navGradient)"/>
                    <path d="M35 50 L45 60 L65 40" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
                    <defs>
                        <linearGradient id="navGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#6366f1"/>
                            <stop offset="100%" style="stop-color:#8b5cf6"/>
                        </linearGradient>
                    </defs>
                </svg>
                <span>ElectGuard</span>
            </div>
            <div class="nav-links">
                <a href="#" class="nav-link ${currentPage === 'home' ? 'active' : ''}" data-page="home" onclick="navigateTo('home')">🏠 Home</a>
                <a href="#" class="nav-link ${currentPage === 'features' ? 'active' : ''}" data-page="features" onclick="navigateTo('features')">✨ Features</a>
                <a href="#" class="nav-link ${currentPage === 'about' ? 'active' : ''}" data-page="about" onclick="navigateTo('about')">ℹ️ About</a>
                <a href="#" class="nav-link ${currentPage === 'contact' ? 'active' : ''}" data-page="contact" onclick="navigateTo('contact')">📞 Contact</a>
            </div>
            <button class="learn-btn" onclick="navigateTo('about')">
                <span>Learn More</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            </button>
        </nav>
    `;
}

// ==================== HOME PAGE ====================
function renderHomePage() {
    document.getElementById('navbar').innerHTML = renderNavbar().replace(/<nav[^>]*>/, '').replace(/<\/nav>$/, '');
    document.getElementById('navbar').style.display = 'flex';

    const main = document.getElementById('main-content');
    main.innerHTML = `
        <section class="hero" id="home">
            <div class="hero-background"></div>
            <div class="hero-particles">${generateParticles()}</div>
            <div class="hero-content">
                <div class="hero-badge">🇮🇳 Bharat Election Commission Approved • Trusted by 95 Crore+ Voters</div>
                <h1 class="hero-title">Safeguarding Democracy with <span class="gradient-text">ElectGuard</span></h1>
                <p class="hero-subtitle">India's most trusted election monitoring platform ensuring fair, transparent, and secure elections. Join millions in protecting our democracy.</p>
                
                <div class="quick-actions">
                    <button class="hero-btn primary" onclick="navigateTo('evm')">
                        <span>🖥️</span> EVM/VVPAT Tracking
                    </button>
                    <button class="hero-btn secondary" onclick="navigateTo('states')">
                        <span>🗺️</span> State-wise Tracking
                    </button>
                </div>
                
                <div class="login-grid">
                    ${renderLoginCard('admin', '🔐', 'Admin Portal', 'Manage system, add voters, monitor ECI data, ensure security')}
                    ${renderLoginCard('citizen', '🗳️', 'Citizen Access', 'Track your booth, report issues, join civic discussions')}
                    ${renderLoginCard('observer', '👁️', 'Observer Dashboard', 'Monitor EVM/VVPAT, report anomalies, ensure fairness')}
                    ${renderLoginCard('analyst', '📊', 'Analyst Center', 'Analyze trends, add data, generate comprehensive reports')}
                </div>
            </div>
        </section>
        
        ${renderQuickStatsSection()}
        ${renderWhyChooseSection()}
        ${renderTestimonialsSection()}
        ${renderFooter()}
    `;
}

function generateParticles() {
    let particles = '';
    for (let i = 0; i < 25; i++) {
        const size = Math.random() * 100 + 20;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 10;
        particles += `<div class="particle" style="width:${size}px;height:${size}px;left:${left}%;top:${top}%;animation-delay:-${delay}s;"></div>`;
    }
    return particles;
}

function renderLoginCard(role, icon, title, desc) {
    return `
        <div class="login-card" onclick="showLogin('${role}')">
            <div class="login-card-icon"><span style="font-size:2rem">${icon}</span></div>
            <h3>${title}</h3>
            <p>${desc}</p>
            <button class="login-btn">Access Portal →</button>
        </div>
    `;
}

function renderQuickStatsSection() {
    const stats = electionData.statistics;
    return `
        <section class="stats">
            <div class="stats-grid">
                <div class="stat-item"><h3>${(stats.totalVoters / 10000000).toFixed(0)}Cr+</h3><p>Registered Voters</p></div>
                <div class="stat-item"><h3>${(stats.activeStations / 100000).toFixed(0)}L+</h3><p>Polling Stations</p></div>
                <div class="stat-item"><h3>${(stats.observersOnline / 1000).toFixed(0)}K+</h3><p>Active Observers</p></div>
                <div class="stat-item"><h3>99.9%</h3><p>System Uptime</p></div>
            </div>
        </section>
    `;
}

function renderWhyChooseSection() {
    return `
        <section class="why-choose">
            <div class="section-header">
                <span class="section-badge">Why ElectGuard?</span>
                <h2 class="section-title">Trusted by Millions Across India</h2>
                <p class="section-subtitle">Our platform is designed to strengthen democracy and ensure every vote counts.</p>
            </div>
            <div class="why-grid">
                <div class="why-card">
                    <div class="why-icon">🔒</div>
                    <h3>Bank-Grade Security</h3>
                    <p>256-bit AES encryption protects all data. Your information is as secure as your bank account.</p>
                </div>
                <div class="why-card">
                    <div class="why-icon">⚡</div>
                    <h3>Real-Time Updates</h3>
                    <p>Get live updates every second. Track voting progress as it happens across India.</p>
                </div>
                <div class="why-card">
                    <div class="why-icon">🇮🇳</div>
                    <h3>Pan-India Coverage</h3>
                    <p>Monitoring all 28 states, 8 UTs, 543 Lok Sabha, and 4000+ Assembly constituencies.</p>
                </div>
                <div class="why-card">
                    <div class="why-icon">📱</div>
                    <h3>Accessible Anywhere</h3>
                    <p>Works on any device - mobile, tablet, or desktop. Available in 22 Indian languages.</p>
                </div>
            </div>
        </section>
    `;
}

function renderTestimonialsSection() {
    return `
        <section class="testimonials">
            <div class="section-header">
                <span class="section-badge">Testimonials</span>
                <h2 class="section-title">What People Say</h2>
            </div>
            <div class="testimonial-grid">
                <div class="testimonial-card">
                    <p>"ElectGuard helped me find my polling booth instantly. The real-time updates kept me informed throughout election day."</p>
                    <div class="testimonial-author"><strong>Priya Sharma</strong><span>First-time Voter, Delhi</span></div>
                </div>
                <div class="testimonial-card">
                    <p>"As an election observer, this platform is invaluable. Reporting issues is seamless and the response time is excellent."</p>
                    <div class="testimonial-author"><strong>Rajesh Kumar</strong><span>Election Observer, Maharashtra</span></div>
                </div>
                <div class="testimonial-card">
                    <p>"The data analytics tools are comprehensive. We can track trends and ensure transparency like never before."</p>
                    <div class="testimonial-author"><strong>Dr. Anjali Patel</strong><span>Political Analyst, Gujarat</span></div>
                </div>
            </div>
        </section>
    `;
}

// ==================== FEATURES PAGE ====================
function renderFeaturesPage() {
    document.getElementById('navbar').style.display = 'flex';
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <section class="page-hero">
            <div class="hero-particles">${generateParticles()}</div>
            <h1>✨ Platform Features</h1>
            <p>Discover the powerful tools that make ElectGuard India's leading election monitoring system</p>
        </section>
        
        <section class="features-detail">
            <div class="feature-detail-card" onclick="navigateTo('evm')">
                <div class="feature-detail-icon">🖥️</div>
                <div class="feature-detail-content">
                    <h3>EVM/VVPAT Tracking</h3>
                    <p>Monitor Electronic Voting Machines and Voter Verifiable Paper Audit Trail in real-time. Track machine status, paper trail verification, and ensure complete transparency in the voting process.</p>
                    <ul>
                        <li>Real-time EVM status monitoring</li>
                        <li>VVPAT slip verification tracking</li>
                        <li>Malfunction alerts and reporting</li>
                        <li>Machine-wise vote count verification</li>
                    </ul>
                    <button class="action-btn primary">Explore EVM Tracking →</button>
                </div>
            </div>
            
            <div class="feature-detail-card" onclick="navigateTo('states')">
                <div class="feature-detail-icon">🗺️</div>
                <div class="feature-detail-content">
                    <h3>State-wise Tracking</h3>
                    <p>Track elections across all 28 states and 8 union territories. Get detailed insights into voting patterns, turnout rates, and regional analysis.</p>
                    <ul>
                        <li>All 28 states + 8 union territories</li>
                        <li>543 Lok Sabha constituencies</li>
                        <li>4000+ Assembly constituencies</li>
                        <li>District and booth level data</li>
                    </ul>
                    <button class="action-btn primary">Explore State Tracking →</button>
                </div>
            </div>
            
            <div class="feature-detail-card">
                <div class="feature-detail-icon">📊</div>
                <div class="feature-detail-content">
                    <h3>Real-Time Analytics</h3>
                    <p>Advanced data visualization and analytics to understand voting patterns, demographic trends, and election outcomes.</p>
                    <ul>
                        <li>Live vote counting dashboards</li>
                        <li>Demographic analysis tools</li>
                        <li>Historical comparison charts</li>
                        <li>Predictive modeling</li>
                    </ul>
                    <button class="action-btn" onclick="showLogin('analyst')">Access Analytics →</button>
                </div>
            </div>
            
            <div class="feature-detail-card">
                <div class="feature-detail-icon">🛡️</div>
                <div class="feature-detail-content">
                    <h3>Fraud Detection</h3>
                    <p>AI-powered anomaly detection to identify and prevent election fraud before it impacts results.</p>
                    <ul>
                        <li>Pattern recognition algorithms</li>
                        <li>Unusual activity alerts</li>
                        <li>Cross-verification systems</li>
                        <li>Audit trail maintenance</li>
                    </ul>
                    <button class="action-btn" onclick="showLogin('observer')">Report Anomaly →</button>
                </div>
            </div>
            
            <div class="feature-detail-card">
                <div class="feature-detail-icon">📝</div>
                <div class="feature-detail-content">
                    <h3>Issue Reporting</h3>
                    <p>Citizens and observers can report issues instantly. Our team responds within minutes to resolve problems.</p>
                    <ul>
                        <li>One-click issue reporting</li>
                        <li>Photo/video evidence upload</li>
                        <li>Real-time status tracking</li>
                        <li>Average resolution: 45 minutes</li>
                    </ul>
                    <button class="action-btn" onclick="showLogin('citizen')">Report Issue →</button>
                </div>
            </div>
            
            <div class="feature-detail-card">
                <div class="feature-detail-icon">🪪</div>
                <div class="feature-detail-content">
                    <h3>Voter Database</h3>
                    <p>Comprehensive voter database management with verification status, constituency mapping, and voting history.</p>
                    <ul>
                        <li>95 Crore+ voter records</li>
                        <li>Aadhaar-linked verification</li>
                        <li>Constituency-wise mapping</li>
                        <li>Voting history tracking</li>
                    </ul>
                    <button class="action-btn" onclick="showLogin('admin')">Manage Voters →</button>
                </div>
            </div>
        </section>
        
        ${renderFooter()}
    `;
}

// ==================== ABOUT PAGE ====================
function renderAboutPage() {
    document.getElementById('navbar').style.display = 'flex';
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <section class="page-hero">
            <div class="hero-particles">${generateParticles()}</div>
            <h1>ℹ️ About ElectGuard</h1>
            <p>India's Premier Election Monitoring Platform</p>
        </section>
        
        <section class="about-content">
            <div class="about-grid">
                <div class="about-text">
                    <h2>Our Mission</h2>
                    <p>ElectGuard was founded with a simple yet powerful mission: to ensure every vote in India counts. We believe that transparent, fair, and secure elections are the cornerstone of our democracy.</p>
                    <p>Since our inception, we have monitored over 50 elections across India, tracking more than 500 million votes and helping resolve thousands of issues reported by citizens and observers.</p>
                    
                    <h2>Our Vision</h2>
                    <p>We envision an India where every citizen has complete confidence in the electoral process. Where technology serves democracy, and transparency is not just a goal but a guarantee.</p>
                    
                    <h2>Our Values</h2>
                    <div class="values-grid">
                        <div class="value-item"><span>🎯</span><strong>Accuracy</strong><p>Every data point verified</p></div>
                        <div class="value-item"><span>🔍</span><strong>Transparency</strong><p>Open and accessible to all</p></div>
                        <div class="value-item"><span>⚡</span><strong>Speed</strong><p>Real-time updates always</p></div>
                        <div class="value-item"><span>🤝</span><strong>Trust</strong><p>Earned through integrity</p></div>
                    </div>
                </div>
                
                <div class="about-sidebar">
                    <div class="about-card">
                        <h3>📊 By The Numbers</h3>
                        <div class="about-stat"><span>95 Cr+</span><p>Registered Voters</p></div>
                        <div class="about-stat"><span>10 L+</span><p>Polling Stations</p></div>
                        <div class="about-stat"><span>543</span><p>Lok Sabha Seats</p></div>
                        <div class="about-stat"><span>4000+</span><p>Assembly Seats</p></div>
                        <div class="about-stat"><span>50+</span><p>Elections Monitored</p></div>
                    </div>
                    
                    <div class="about-card">
                        <h3>👥 User Roles</h3>
                        <div class="role-info"><span>🔐</span><strong>Admin</strong><p>System management, voter database, security</p></div>
                        <div class="role-info"><span>🗳️</span><strong>Citizen</strong><p>Track elections, report issues, discussions</p></div>
                        <div class="role-info"><span>👁️</span><strong>Observer</strong><p>Monitor EVM/VVPAT, report anomalies</p></div>
                        <div class="role-info"><span>📊</span><strong>Analyst</strong><p>Data analysis, reports, predictions</p></div>
                    </div>
                </div>
            </div>
            
            <div class="team-section">
                <h2>Our Partners</h2>
                <div class="partner-logos">
                    <div class="partner">🏛️ Election Commission of India</div>
                    <div class="partner">🔒 CERT-IN</div>
                    <div class="partner">📊 NITI Aayog</div>
                    <div class="partner">🌐 Digital India</div>
                </div>
            </div>
        </section>
        
        ${renderFooter()}
    `;
}

// ==================== CONTACT PAGE ====================
function renderContactPage() {
    document.getElementById('navbar').style.display = 'flex';
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <section class="page-hero">
            <div class="hero-particles">${generateParticles()}</div>
            <h1>📞 Contact Us</h1>
            <p>We're here to help. Reach out to us anytime.</p>
        </section>
        
        <section class="contact-content">
            <div class="contact-grid">
                <div class="contact-info">
                    <h2>Get In Touch</h2>
                    <p>Have questions about ElectGuard? Need help with the platform? We're available 24/7 during election periods.</p>
                    
                    <div class="contact-methods">
                        <div class="contact-method">
                            <span>📧</span>
                            <div><strong>Email</strong><p>support@electguard.gov.in</p></div>
                        </div>
                        <div class="contact-method">
                            <span>📞</span>
                            <div><strong>Helpline (Toll Free)</strong><p>1800-111-VOTE (8683)</p></div>
                        </div>
                        <div class="contact-method">
                            <span>💬</span>
                            <div><strong>WhatsApp</strong><p>+91 98765 43210</p></div>
                        </div>
                        <div class="contact-method">
                            <span>🏢</span>
                            <div><strong>Head Office</strong><p>Nirvachan Sadan, New Delhi - 110001</p></div>
                        </div>
                    </div>
                    
                    <div class="emergency-box">
                        <h3>🚨 Emergency Reporting</h3>
                        <p>For urgent election-related issues, call our emergency hotline:</p>
                        <div class="emergency-number">1800-ECI-HELP</div>
                    </div>
                </div>
                
                <div class="contact-form-section">
                    <h2>Send Us a Message</h2>
                    <form class="contact-form" onsubmit="submitContactForm(event)">
                        <div class="form-row">
                            <div class="form-group"><label>Full Name *</label><input type="text" id="contact-name" required placeholder="Enter your name"></div>
                            <div class="form-group"><label>Email *</label><input type="email" id="contact-email" required placeholder="Enter your email"></div>
                        </div>
                        <div class="form-row">
                            <div class="form-group"><label>Phone</label><input type="tel" id="contact-phone" placeholder="Enter your phone number"></div>
                            <div class="form-group"><label>Subject *</label><select id="contact-subject" required>
                                <option value="">Select Subject</option>
                                <option>General Inquiry</option>
                                <option>Technical Support</option>
                                <option>Report an Issue</option>
                                <option>Partnership Inquiry</option>
                                <option>Media/Press</option>
                                <option>Feedback</option>
                            </select></div>
                        </div>
                        <div class="form-group"><label>Message *</label><textarea id="contact-message" required placeholder="Type your message here..."></textarea></div>
                        <button type="submit" class="submit-btn">Send Message 📤</button>
                    </form>
                </div>
            </div>
            
            <div class="faq-section">
                <h2>Frequently Asked Questions</h2>
                <div class="faq-grid">
                    <div class="faq-item">
                        <h4>How do I find my polling booth?</h4>
                        <p>Login as a Citizen, go to 'Track Elections', and enter your Voter ID to find your assigned polling booth.</p>
                    </div>
                    <div class="faq-item">
                        <h4>How do I report an issue at a polling station?</h4>
                        <p>Login to your account and use the 'Report Issue' feature. You can upload photos and track the resolution status.</p>
                    </div>
                    <div class="faq-item">
                        <h4>Is my data secure on ElectGuard?</h4>
                        <p>Yes, we use bank-grade 256-bit AES encryption. Your data is protected by multiple security layers.</p>
                    </div>
                    <div class="faq-item">
                        <h4>Can I become an election observer?</h4>
                        <p>Yes! Register on our platform and apply through the Observer Dashboard. ECI will verify your application.</p>
                    </div>
                </div>
            </div>
        </section>
        
        ${renderFooter()}
    `;
}

function submitContactForm(e) {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    showNotification(`Thank you ${name}! Your message has been sent. We'll respond within 24 hours.`, 'success');
    e.target.reset();
}

// ==================== EVM/VVPAT TRACKING PAGE ====================
function renderEVMTrackingPage() {
    document.getElementById('navbar').style.display = 'flex';
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <section class="page-hero evm-hero">
            <div class="hero-particles">${generateParticles()}</div>
            <h1>🖥️ EVM/VVPAT Tracking</h1>
            <p>Real-time monitoring of Electronic Voting Machines and Voter Verifiable Paper Audit Trail</p>
        </section>
        
        <section class="evm-content">
            <div class="evm-stats">
                <div class="evm-stat-card">
                    <div class="evm-stat-icon">🖥️</div>
                    <h3>18,00,000</h3>
                    <p>EVMs Deployed</p>
                </div>
                <div class="evm-stat-card">
                    <div class="evm-stat-icon">📜</div>
                    <h3>18,00,000</h3>
                    <p>VVPATs Active</p>
                </div>
                <div class="evm-stat-card">
                    <div class="evm-stat-icon">✅</div>
                    <h3>99.97%</h3>
                    <p>Machines Functional</p>
                </div>
                <div class="evm-stat-card">
                    <div class="evm-stat-icon">🔧</div>
                    <h3>523</h3>
                    <p>Under Maintenance</p>
                </div>
            </div>
            
            <div class="evm-info">
                <div class="info-card">
                    <h3>What is an EVM?</h3>
                    <p>Electronic Voting Machine (EVM) is an electronic device used to record votes. It consists of two units - Control Unit and Balloting Unit. The Control Unit is with the Presiding Officer and the Balloting Unit is placed in the voting compartment.</p>
                    <div class="evm-features">
                        <div class="evm-feature"><span>✓</span> Tamper-proof design</div>
                        <div class="evm-feature"><span>✓</span> Battery operated</div>
                        <div class="evm-feature"><span>✓</span> No internet connection</div>
                        <div class="evm-feature"><span>✓</span> One-time programmable chip</div>
                    </div>
                </div>
                
                <div class="info-card">
                    <h3>What is VVPAT?</h3>
                    <p>Voter Verifiable Paper Audit Trail (VVPAT) is an independent verification printer machine attached to EVMs. It allows voters to verify that their vote has been cast correctly.</p>
                    <div class="evm-features">
                        <div class="evm-feature"><span>✓</span> Printed slip visible for 7 seconds</div>
                        <div class="evm-feature"><span>✓</span> Automatic paper cut</div>
                        <div class="evm-feature"><span>✓</span> Sealed in box for auditing</div>
                        <div class="evm-feature"><span>✓</span> Mandatory since 2019</div>
                    </div>
                </div>
            </div>
            
            <div class="evm-live-status">
                <h3>🔴 Live EVM Status by State</h3>
                <div class="evm-table-container">
                    <table class="data-table">
                        <thead><tr><th>State</th><th>EVMs Deployed</th><th>VVPATs</th><th>Functional</th><th>Issues</th><th>Status</th></tr></thead>
                        <tbody>
                            ${electionData.states.map(s => `<tr>
                                <td><strong>${s.name}</strong></td>
                                <td>${(s.stations * 2).toLocaleString()}</td>
                                <td>${(s.stations * 2).toLocaleString()}</td>
                                <td>${(99.9 + Math.random() * 0.09).toFixed(2)}%</td>
                                <td>${Math.floor(Math.random() * 50)}</td>
                                <td><span class="status-badge active">Online</span></td>
                            </tr>`).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="evm-cta">
                <h3>Report EVM/VVPAT Issue</h3>
                <p>If you notice any issue with an EVM or VVPAT at your polling station, report it immediately.</p>
                <button class="action-btn primary" onclick="showLogin('observer')">Report Issue →</button>
            </div>
        </section>
        
        ${renderFooter()}
    `;
}

// ==================== STATE-WISE TRACKING PAGE ====================
function renderStateTrackingPage() {
    document.getElementById('navbar').style.display = 'flex';
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <section class="page-hero state-hero">
            <div class="hero-particles">${generateParticles()}</div>
            <h1>🗺️ State-wise Tracking</h1>
            <p>Track elections across all 28 states and 8 union territories of India</p>
        </section>
        
        <section class="state-content">
            <div class="state-overview">
                <div class="state-stat-card completed">
                    <h3>${electionData.statistics.statesCompleted}</h3>
                    <p>States Completed</p>
                </div>
                <div class="state-stat-card voting">
                    <h3>${electionData.statistics.statesVoting}</h3>
                    <p>Currently Voting</p>
                </div>
                <div class="state-stat-card pending">
                    <h3>${electionData.statistics.statesPending}</h3>
                    <p>Upcoming</p>
                </div>
            </div>
            
            <div class="states-grid">
                <h3>All States & Union Territories</h3>
                <div class="state-cards">
                    ${electionData.states.map(s => `
                        <div class="state-card ${s.status.toLowerCase()}">
                            <div class="state-card-header">
                                <h4>${s.name}</h4>
                                <span class="status-badge ${s.status === 'Completed' ? 'completed' : s.status === 'Voting' ? 'active' : 'pending'}">${s.status}</span>
                            </div>
                            <div class="state-card-stats">
                                <div><span>📊</span><strong>${s.turnout}%</strong><p>Turnout</p></div>
                                <div><span>🏛️</span><strong>${s.stations.toLocaleString()}</strong><p>Stations</p></div>
                                <div><span>🗳️</span><strong>${(s.totalVotes / 10000000).toFixed(1)}Cr</strong><p>Votes</p></div>
                            </div>
                            <button class="small-btn" onclick="showStateDetails('${s.name}')">View Details</button>
                        </div>
                    `).join('')}
                    
                    <!-- Additional States/UTs -->
                    <div class="state-card pending"><div class="state-card-header"><h4>Andhra Pradesh</h4><span class="status-badge pending">Upcoming</span></div><div class="state-card-stats"><div><span>📊</span><strong>-</strong><p>Turnout</p></div><div><span>🏛️</span><strong>46,120</strong><p>Stations</p></div></div></div>
                    <div class="state-card pending"><div class="state-card-header"><h4>Assam</h4><span class="status-badge pending">Upcoming</span></div><div class="state-card-stats"><div><span>📊</span><strong>-</strong><p>Turnout</p></div><div><span>🏛️</span><strong>33,530</strong><p>Stations</p></div></div></div>
                    <div class="state-card pending"><div class="state-card-header"><h4>Jharkhand</h4><span class="status-badge pending">Upcoming</span></div><div class="state-card-stats"><div><span>📊</span><strong>-</strong><p>Turnout</p></div><div><span>🏛️</span><strong>29,464</strong><p>Stations</p></div></div></div>
                    <div class="state-card pending"><div class="state-card-header"><h4>Odisha</h4><span class="status-badge pending">Upcoming</span></div><div class="state-card-stats"><div><span>📊</span><strong>-</strong><p>Turnout</p></div><div><span>🏛️</span><strong>35,360</strong><p>Stations</p></div></div></div>
                </div>
            </div>
            
            <div class="ut-section">
                <h3>🏝️ Union Territories</h3>
                <div class="ut-cards">
                    <div class="ut-card"><span>🏛️</span><strong>Delhi</strong><p>14,700 stations</p></div>
                    <div class="ut-card"><span>🏝️</span><strong>Andaman & Nicobar</strong><p>419 stations</p></div>
                    <div class="ut-card"><span>⛰️</span><strong>Ladakh</strong><p>897 stations</p></div>
                    <div class="ut-card"><span>🌊</span><strong>Lakshadweep</strong><p>65 stations</p></div>
                    <div class="ut-card"><span>🏖️</span><strong>Puducherry</strong><p>1,023 stations</p></div>
                    <div class="ut-card"><span>🏢</span><strong>Chandigarh</strong><p>680 stations</p></div>
                    <div class="ut-card"><span>🏛️</span><strong>Dadra & Nagar Haveli</strong><p>378 stations</p></div>
                    <div class="ut-card"><span>⛰️</span><strong>Jammu & Kashmir</strong><p>11,629 stations</p></div>
                </div>
            </div>
        </section>
        
        ${renderFooter()}
    `;
}

function showStateDetails(stateName) {
    const state = electionData.states.find(s => s.name === stateName);
    if (state) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h2>📍 ${state.name}</h2>
                    <button class="modal-close" onclick="closeModal(this)">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="state-modal-stats">
                        <div class="stat-row"><label>Status</label><span class="status-badge ${state.status === 'Completed' ? 'completed' : 'active'}">${state.status}</span></div>
                        <div class="stat-row"><label>Turnout</label><span>${state.turnout}%</span></div>
                        <div class="stat-row"><label>Polling Stations</label><span>${state.stations.toLocaleString()}</span></div>
                        <div class="stat-row"><label>Total Votes</label><span>${(state.totalVotes / 10000000).toFixed(2)} Crore</span></div>
                        <div class="stat-row"><label>EVMs Deployed</label><span>${(state.stations * 2).toLocaleString()}</span></div>
                        <div class="stat-row"><label>Observers</label><span>${Math.floor(state.stations / 10).toLocaleString()}</span></div>
                    </div>
                    <button class="submit-btn" onclick="closeModal(this)" style="margin-top:1.5rem;">Close</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('active'), 10);
    }
}

// ==================== FOOTER ====================
function renderFooter() {
    return `
        <footer class="footer">
            <div class="footer-grid">
                <div class="footer-col">
                    <div class="footer-brand" onclick="goHome()" style="cursor:pointer;">
                        <svg viewBox="0 0 100 100" width="35" height="35"><path d="M50 5 L90 20 L90 45 C90 70 70 90 50 95 C30 90 10 70 10 45 L10 20 Z" fill="url(#footGrad)"/><defs><linearGradient id="footGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#6366f1"/><stop offset="100%" style="stop-color:#8b5cf6"/></linearGradient></defs></svg>
                        ElectGuard
                    </div>
                    <p style="color:var(--gray)">Ensuring fair and transparent elections across India. Your vote is your voice.</p>
                    <div class="social-links">
                        <a href="#" class="social-link">📘</a>
                        <a href="#" class="social-link">🐦</a>
                        <a href="#" class="social-link">📸</a>
                        <a href="#" class="social-link">▶️</a>
                    </div>
                </div>
                <div class="footer-col">
                    <h4>Quick Links</h4>
                    <div class="footer-links">
                        <a href="#" onclick="navigateTo('home')">🏠 Home</a>
                        <a href="#" onclick="navigateTo('features')">✨ Features</a>
                        <a href="#" onclick="navigateTo('about')">ℹ️ About Us</a>
                        <a href="#" onclick="navigateTo('contact')">📞 Contact</a>
                    </div>
                </div>
                <div class="footer-col">
                    <h4>Features</h4>
                    <div class="footer-links">
                        <a href="#" onclick="navigateTo('evm')">🖥️ EVM Tracking</a>
                        <a href="#" onclick="navigateTo('states')">🗺️ State Tracking</a>
                        <a href="#" onclick="showLogin('citizen')">📝 Report Issue</a>
                        <a href="#" onclick="showLogin('analyst')">📊 Analytics</a>
                    </div>
                </div>
                <div class="footer-col">
                    <h4>Contact</h4>
                    <div class="footer-links">
                        <a href="#">📧 support@electguard.gov.in</a>
                        <a href="#">📞 1800-111-VOTE</a>
                        <a href="#">💬 WhatsApp Support</a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>© 2026 ElectGuard India. All rights reserved. | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
                <p style="margin-top:0.5rem;">जय हिंद 🇮🇳 | Made with ❤️ for Indian Democracy</p>
            </div>
        </footer>
    `;
}

// ==================== LOGIN & AUTH ====================
function showLogin(role) {
    const roleNames = { admin: 'Admin', citizen: 'Citizen', observer: 'Election Observer', analyst: 'Data Analyst' };
    const div = document.createElement('div');
    div.className = 'modal-overlay login-modal';
    div.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h2>${roleNames[role]} Login</h2>
                <button class="modal-close" onclick="closeModal(this)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
            </div>
            <div class="modal-body">
                <form class="login-form" onsubmit="handleLogin(event, '${role}')">
                    <div class="form-group">
                        <label>Username</label>
                        <input type="text" id="login-username" placeholder="Enter username" required>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" id="login-password" placeholder="Enter password" required>
                    </div>
                    <button type="submit" class="submit-btn">Sign In</button>
                    <div class="auth-links">
                        <button type="button" class="link-btn" onclick="showForgotPassword('${role}')">Forgot Password?</button>
                        <button type="button" class="link-btn" onclick="showSignup('${role}')">New User? Sign Up</button>
                    </div>
                    <p style="text-align:center;color:var(--gray);font-size:0.85rem;margin-top:1rem;">Demo: ${role}/${role}123</p>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(div);
    setTimeout(() => div.classList.add('active'), 10);
}

function showSignup(role) {
    closeModal(document.querySelector('.login-modal .modal-close'));
    const roleNames = { admin: 'Admin', citizen: 'Citizen', observer: 'Election Observer', analyst: 'Data Analyst' };
    const div = document.createElement('div');
    div.className = 'modal-overlay signup-modal';
    div.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h2>Sign Up - ${roleNames[role]}</h2>
                <button class="modal-close" onclick="closeModal(this)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
            </div>
            <div class="modal-body">
                <form class="login-form" onsubmit="handleSignup(event, '${role}')">
                    <div class="form-group"><label>Full Name</label><input type="text" id="signup-name" placeholder="Enter your full name" required></div>
                    <div class="form-group"><label>Email</label><input type="email" id="signup-email" placeholder="Enter your email" required></div>
                    <div class="form-group"><label>Username</label><input type="text" id="signup-username" placeholder="Choose a username" required></div>
                    <div class="form-group"><label>Password</label><input type="password" id="signup-password" placeholder="Create password (min 6 chars)" required minlength="6"></div>
                    <div class="form-group"><label>Confirm Password</label><input type="password" id="signup-confirm" placeholder="Confirm your password" required></div>
                    ${role === 'citizen' ? `<div class="form-group"><label>Voter ID (Optional)</label><input type="text" id="signup-voterid" placeholder="e.g., MH/01/234/567890"></div>` : ''}
                    <button type="submit" class="submit-btn">Create Account</button>
                    <div class="auth-links"><button type="button" class="link-btn" onclick="closeModal(this);showLogin('${role}')">Already have an account? Login</button></div>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(div);
    setTimeout(() => div.classList.add('active'), 10);
}

function handleSignup(e, role) {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;

    if (password !== confirm) { alert('Passwords do not match!'); return; }
    if (registeredUsers[username]) { alert('Username already exists!'); return; }

    registeredUsers[username] = { username, password, name, role, email };
    systemUsers.push({ id: systemUsers.length + 1, name, username, role, email, status: 'active', lastLogin: 'Never', created: new Date().toISOString().split('T')[0] });

    alert('Account created successfully! Please login.');
    closeModal(document.querySelector('.signup-modal .modal-close'));
    showLogin(role);
}

function showForgotPassword(role) {
    closeModal(document.querySelector('.login-modal .modal-close'));
    const div = document.createElement('div');
    div.className = 'modal-overlay forgot-modal';
    div.innerHTML = `
        <div class="modal">
            <div class="modal-header"><h2>Reset Password</h2><button class="modal-close" onclick="closeModal(this)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button></div>
            <div class="modal-body">
                <form class="login-form" onsubmit="handleForgotPassword(event, '${role}')">
                    <p style="color:var(--gray);margin-bottom:1.5rem;">Enter your email to receive a password reset link.</p>
                    <div class="form-group"><label>Email Address</label><input type="email" id="forgot-email" placeholder="Enter your registered email" required></div>
                    <button type="submit" class="submit-btn">Send Reset Link</button>
                    <div class="auth-links"><button type="button" class="link-btn" onclick="closeModal(this);showLogin('${role}')">Back to Login</button></div>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(div);
    setTimeout(() => div.classList.add('active'), 10);
}

function handleForgotPassword(e, role) {
    e.preventDefault();
    const email = document.getElementById('forgot-email').value;
    alert(`Password reset link sent to ${email}!`);
    closeModal(document.querySelector('.forgot-modal .modal-close'));
    showLogin(role);
}

function handleLogin(e, role) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    let foundUser = null;
    for (let key in registeredUsers) {
        if (registeredUsers[key].username === username && registeredUsers[key].password === password) {
            foundUser = registeredUsers[key]; break;
        }
    }

    if (foundUser && foundUser.role === role) {
        currentUser = { ...foundUser };
        closeModal(document.querySelector('.login-modal .modal-close'));
        document.getElementById('navbar').style.display = 'none';
        renderDashboard(role);
    } else if (foundUser && foundUser.role !== role) {
        alert(`This account is registered as ${foundUser.role}. Please use the correct portal.`);
    } else {
        alert('Invalid credentials. Please try again or sign up.');
    }
}

function logout() {
    currentUser = null;
    document.getElementById('navbar').style.display = 'flex';
    navigateTo('home');
}

function closeModal(btn) {
    const overlay = btn.closest('.modal-overlay');
    overlay.classList.remove('active');
    setTimeout(() => overlay.remove(), 300);
}

// ==================== UTILITIES ====================
function generatePDFReport(reportType) {
    const stats = electionData.statistics;
    const date = new Date().toLocaleString('en-IN');

    let reportContent = `
ELECTGUARD - ELECTION MONITORING SYSTEM
========================================
Report Type: ${reportType}
Generated: ${date}
Generated By: ${currentUser.name} (${currentUser.role})

========================================
ELECTION STATISTICS SUMMARY
========================================

Total Registered Voters: ${(stats.totalVoters / 10000000).toFixed(1)} Crore
Votes Recorded: ${(stats.votesRecorded / 10000000).toFixed(1)} Crore
Overall Turnout: ${((stats.votesRecorded / stats.totalVoters) * 100).toFixed(1)}%

Active Polling Stations: ${stats.activeStations.toLocaleString()}
EVMs Deployed: ${(stats.evmsDeployed / 100000).toFixed(1)} Lakh
Observers Online: ${stats.observersOnline.toLocaleString()}

Issues Reported: ${stats.issuesReported}
Issues Resolved: ${stats.issuesResolved}
Resolution Rate: ${((stats.issuesResolved / stats.issuesReported) * 100).toFixed(1)}%

========================================
STATE-WISE TURNOUT
========================================
`;

    electionData.states.forEach(state => {
        reportContent += `\n${state.name}: ${state.turnout}% (${state.status})`;
    });

    reportContent += `\n\n========================================
CANDIDATE-WISE RESULTS (Preliminary)
========================================
`;

    electionData.candidates.forEach((c, i) => {
        reportContent += `\n${i + 1}. ${c.name} (${c.party}): ${c.percentage}%`;
    });

    reportContent += `\n\n========================================
END OF REPORT
========================================
This is an auto-generated report from ElectGuard.
For official results, please visit eci.gov.in
`;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ElectGuard_${reportType.replace(/\s+/g, '_')}_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showNotification('Report generated and downloaded!', 'success');
}

function showNotification(message, type = 'info') {
    const notif = document.createElement('div');
    notif.className = `notification ${type}`;
    notif.innerHTML = `<span>${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span><span>${message}</span>`;
    document.body.appendChild(notif);
    setTimeout(() => notif.classList.add('show'), 10);
    setTimeout(() => { notif.classList.remove('show'); setTimeout(() => notif.remove(), 300); }, 3000);
}

function refreshData() {
    showNotification('Refreshing data...', 'info');
    electionData.statistics.votesRecorded += Math.floor(Math.random() * 100000);
    electionData.statistics.dataUpdatesPerMinute = 8000 + Math.floor(Math.random() * 1000);
    electionData.states.forEach(state => {
        if (state.status === 'Voting') {
            state.turnout = Math.min(100, state.turnout + Math.random() * 0.5);
            state.turnout = parseFloat(state.turnout.toFixed(1));
        }
    });
    setTimeout(() => {
        renderDashboard(currentUser.role);
        showNotification('Data refreshed!', 'success');
    }, 1000);
}

function renderDashboard(role) {
    const dashboards = { admin: renderAdminDashboard, citizen: renderCitizenDashboard, observer: renderObserverDashboard, analyst: renderAnalystDashboard };
    dashboards[role]();
    setTimeout(initCursor, 100);
}
