// Dashboard Rendering Functions - Enhanced with Full Functionality

function renderSidebar(role, activeTab) {
    const roleNames = { admin: 'Administrator', citizen: 'Citizen', observer: 'Election Observer', analyst: 'Data Analyst' };
    const icons = { admin: '🔐', citizen: '🗳️', observer: '👁️', analyst: '📊' };
    const tabs = {
        admin: [['overview', '📊', 'Overview'], ['users', '👥', 'Users'], ['elections', '🗳️', 'Elections'], ['voters', '🪪', 'Voter Database'], ['addvoter', '➕', 'Add Voter'], ['stations', '🏛️', 'Polling Stations'], ['issues', '⚠️', 'Issues'], ['security', '🔒', 'Security'], ['settings', '⚙️', 'Settings']],
        citizen: [['overview', '📊', 'Overview'], ['track', '📍', 'Track Elections'], ['myinfo', '🪪', 'My Voter Info'], ['report', '📝', 'Report Issue'], ['discuss', '💬', 'Discussions'], ['info', 'ℹ️', 'Voter Guide']],
        observer: [['overview', '📊', 'Overview'], ['monitor', '👁️', 'Live Monitor'], ['stations', '🏛️', 'My Stations'], ['report', '📝', 'Report Anomaly'], ['issues', '⚠️', 'All Issues'], ['insights', '💡', 'Insights']],
        analyst: [['overview', '📊', 'Overview'], ['data', '📈', 'Data Analysis'], ['addvoter', '➕', 'Add Voter'], ['states', '🗺️', 'State Wise'], ['candidates', '🏆', 'Candidates'], ['reports', '📋', 'Generate Reports'], ['realtime', '⚡', 'Real-Time Feed']]
    };

    return `
        <aside class="sidebar">
            <div class="sidebar-header">
                <div class="sidebar-avatar">${icons[role]}</div>
                <div class="sidebar-user"><h4>${currentUser.name}</h4><p>${roleNames[role]}</p></div>
            </div>
            <nav class="sidebar-nav">
                <button class="sidebar-link home-btn" onclick="goHome()">🏠 Home</button>
                ${tabs[role].map(([id, icon, label]) => `<button class="sidebar-link ${activeTab === id ? 'active' : ''}" onclick="switchTab('${role}', '${id}')">${icon} ${label}</button>`).join('')}
                <button class="sidebar-link" onclick="logout()" style="margin-top:2rem;color:var(--danger)">🚪 Logout</button>
            </nav>
        </aside>
    `;
}

function switchTab(role, tab) {
    const dashboards = { admin: renderAdminDashboard, citizen: renderCitizenDashboard, observer: renderObserverDashboard, analyst: renderAnalystDashboard };
    dashboards[role](tab);
}

// ==================== ADMIN DASHBOARD ====================
function renderAdminDashboard(tab = 'overview') {
    const main = document.getElementById('main-content');
    const stats = electionData.statistics;

    let content = '';
    switch (tab) {
        case 'overview':
            content = `
                <div class="stats-cards">
                    <div class="stat-card"><div class="stat-card-header"><div class="stat-card-icon">📊</div><span class="stat-card-trend">↑ 12%</span></div><h3>${(stats.votesRecorded / 10000000).toFixed(1)} Cr</h3><p>Votes Recorded</p></div>
                    <div class="stat-card"><div class="stat-card-header"><div class="stat-card-icon">🏛️</div><span class="stat-card-trend">↑ 5%</span></div><h3>${(stats.activeStations / 100000).toFixed(1)} L</h3><p>Active Stations</p></div>
                    <div class="stat-card"><div class="stat-card-header"><div class="stat-card-icon">⚠️</div><span class="stat-card-trend down">↓ 8%</span></div><h3>${stats.issuesReported}</h3><p>Issues Reported</p></div>
                    <div class="stat-card"><div class="stat-card-header"><div class="stat-card-icon">👁️</div><span class="stat-card-trend">↑ 15%</span></div><h3>${stats.observersOnline}</h3><p>Observers Online</p></div>
                </div>
                <div class="data-table-container">
                    <div class="table-header"><h3>Recent Issues (Priority)</h3><div class="table-search"><input type="text" placeholder="Search issues..." onkeyup="filterTable(this, 'issues-table')"></div></div>
                    <table class="data-table" id="issues-table">
                        <thead><tr><th>ID</th><th>Type</th><th>Station</th><th>State</th><th>Status</th><th>Priority</th><th>Actions</th></tr></thead>
                        <tbody>${electionData.issues.map(i => `<tr><td>#${i.id}</td><td>${i.type}</td><td>${i.station}</td><td>${i.state}</td><td><span class="status-badge ${i.status}">${i.status}</span></td><td><span class="priority-badge ${i.priority}">${i.priority}</span></td><td><button class="small-btn" onclick="resolveIssue(${i.id})">Resolve</button></td></tr>`).join('')}</tbody>
                    </table>
                </div>
            `;
            break;

        case 'users':
            content = `
                <div class="data-table-container">
                    <div class="table-header"><h3>System Users Management</h3><button class="action-btn primary" onclick="showAddUserModal()">+ Add User</button></div>
                    <table class="data-table" id="users-table">
                        <thead><tr><th>ID</th><th>Name</th><th>Username</th><th>Role</th><th>Email</th><th>Status</th><th>Last Login</th><th>Actions</th></tr></thead>
                        <tbody>${systemUsers.map(u => `<tr>
                            <td>#${u.id}</td>
                            <td>${u.name}</td>
                            <td>${u.username}</td>
                            <td><span class="role-badge ${u.role}">${u.role}</span></td>
                            <td>${u.email}</td>
                            <td><span class="status-badge ${u.status}">${u.status}</span></td>
                            <td>${u.lastLogin}</td>
                            <td>
                                <button class="small-btn" onclick="editUser(${u.id})">Edit</button>
                                <button class="small-btn danger" onclick="toggleUserStatus(${u.id})">Toggle</button>
                            </td>
                        </tr>`).join('')}</tbody>
                    </table>
                </div>
            `;
            break;

        case 'elections':
            content = `
                <div class="data-table-container">
                    <div class="table-header"><h3>Election Management</h3><button class="action-btn primary" onclick="showAddElectionModal()">+ Add Election</button></div>
                    <table class="data-table">
                        <thead><tr><th>Name</th><th>Type</th><th>Status</th><th>Dates</th><th>Turnout</th><th>Phase/Details</th><th>Actions</th></tr></thead>
                        <tbody>${electionData.elections.map((e, index) => `
                        <tr style="animation: slideInUp 0.3s ease forwards; animation-delay: ${index * 0.05}s; opacity: 0;">
                            <td>
                                <div style="font-weight:600">${e.name}</div>
                                ${e.positions ? `<small style="color:var(--primary);font-size:0.8em">Voting for: ${e.positions}</small>` : ''}
                            </td>
                            <td>
                                ${e.type}
                                ${e.level ? `<br><small style="color:var(--gray);font-size:0.8em">📍 ${e.level} Level</small>` : ''}
                            </td>
                            <td><span class="status-badge ${e.status}">${e.status}</span></td>
                            <td>${e.startDate}<br><small style="color:var(--gray)">to ${e.endDate}</small></td>
                            <td>
                                <div style="display:flex;align-items:center;gap:0.5rem">
                                    <div style="flex:1;height:6px;background:var(--dark);border-radius:3px;overflow:hidden">
                                        <div style="width:${e.turnoutPercentage}%;height:100%;background:var(--gradient-primary)"></div>
                                    </div>
                                    <span style="font-size:0.9em">${e.turnoutPercentage}%</span>
                                </div>
                            </td>
                            <td>${e.phase}</td>
                            <td>
                                <button class="small-btn" onclick="editElection(${e.id})">Edit</button>
                                <button class="small-btn" onclick="viewElectionDetails(${e.id})">View</button>
                            </td>
                        </tr>`).join('')}</tbody>
                    </table>
                </div>
            `;
            break;

        case 'voters':
            content = `
                <div class="stats-cards" style="margin-bottom:1.5rem;">
                    <div class="stat-card"><h3>${indianVoters.length}</h3><p>Voters in Database</p></div>
                    <div class="stat-card"><h3>${indianVoters.filter(v => v.status === 'Verified').length}</h3><p>Verified Voters</p></div>
                    <div class="stat-card"><h3>${indianVoters.filter(v => v.status === 'Pending').length}</h3><p>Pending Verification</p></div>
                </div>
                <div class="data-table-container">
                    <div class="table-header"><h3>Indian Voter Database</h3><button class="action-btn primary" onclick="switchTab('admin','addvoter')">➕ Add New Voter</button></div>
                    <table class="data-table" id="voters-table">
                        <thead><tr><th>Voter ID</th><th>Name</th><th>Age</th><th>Gender</th><th>State</th><th>Constituency</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>${indianVoters.map(v => `<tr>
                            <td>${v.voterId}</td>
                            <td>${v.name}</td>
                            <td>${v.age}</td>
                            <td>${v.gender}</td>
                            <td>${v.state}</td>
                            <td>${v.constituency}</td>
                            <td><span class="status-badge ${v.status.toLowerCase()}">${v.status}</span></td>
                            <td><button class="small-btn" onclick="viewVoterDetails('${v.id}')">View</button><button class="small-btn" onclick="editVoter('${v.id}')">Edit</button></td>
                        </tr>`).join('')}</tbody>
                    </table>
                </div>
            `;
            break;

        case 'addvoter':
            content = `
                <div class="report-form">
                    <h3>➕ Add New Voter to Database</h3>
                    <p style="color:var(--gray);margin-bottom:1.5rem;">Fill in the voter details to add them to the Indian Voter Database.</p>
                    <form onsubmit="addNewVoter(event)">
                        <div class="form-row">
                            <div class="form-group"><label>Full Name *</label><input type="text" id="new-voter-name" placeholder="Enter full name" required></div>
                            <div class="form-group"><label>Age *</label><input type="number" id="new-voter-age" min="18" max="120" placeholder="Age" required></div>
                        </div>
                        <div class="form-row">
                            <div class="form-group"><label>Gender *</label><select id="new-voter-gender" required><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option></select></div>
                            <div class="form-group"><label>State *</label><select id="new-voter-state" required onchange="updateDistricts()">
                                <option value="">Select State</option>
                                <option>Andhra Pradesh</option><option>Assam</option><option>Bihar</option><option>Delhi</option>
                                <option>Gujarat</option><option>Haryana</option><option>Jharkhand</option><option>Karnataka</option>
                                <option>Kerala</option><option>Madhya Pradesh</option><option>Maharashtra</option><option>Odisha</option>
                                <option>Punjab</option><option>Rajasthan</option><option>Tamil Nadu</option><option>Telangana</option>
                                <option>Uttar Pradesh</option><option>West Bengal</option>
                            </select></div>
                        </div>
                        <div class="form-row">
                            <div class="form-group"><label>District *</label><input type="text" id="new-voter-district" placeholder="Enter district" required></div>
                            <div class="form-group"><label>Constituency *</label><input type="text" id="new-voter-constituency" placeholder="Enter constituency" required></div>
                        </div>
                        <div class="form-row">
                            <div class="form-group"><label>Address</label><textarea id="new-voter-address" placeholder="Full address"></textarea></div>
                        </div>
                        <div class="form-row">
                            <div class="form-group"><label>Aadhaar Number (Optional)</label><input type="text" id="new-voter-aadhaar" placeholder="XXXX XXXX XXXX" maxlength="14"></div>
                            <div class="form-group"><label>Mobile Number</label><input type="tel" id="new-voter-phone" placeholder="+91 XXXXX XXXXX"></div>
                        </div>
                        <button type="submit" class="submit-btn">➕ Add Voter to Database</button>
                    </form>
                </div>
            `;
            break;

        case 'stations':
            content = `
                <div class="data-table-container">
                    <div class="table-header"><h3>Polling Stations</h3><button class="action-btn primary" onclick="showAddStationModal()">+ Add Station</button></div>
                    <table class="data-table">
                        <thead><tr><th>ID</th><th>Station Name</th><th>Region</th><th>State</th><th>Voters/Capacity</th><th>Officers</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>${electionData.pollingStations.map(s => `<tr>
                            <td>#${s.id}</td>
                            <td>${s.name}</td>
                            <td>${s.region}</td>
                            <td>${s.state}</td>
                            <td>${s.voters}/${s.capacity}</td>
                            <td>${s.officers}</td>
                            <td><span class="status-badge ${s.status}">${s.status}</span></td>
                            <td><button class="small-btn" onclick="editStation(${s.id})">Edit</button></td>
                        </tr>`).join('')}</tbody>
                    </table>
                </div>
            `;
            break;

        case 'issues':
            content = `
                <div class="stats-cards" style="margin-bottom:1.5rem;">
                    <div class="stat-card"><h3>${electionData.issues.length}</h3><p>Total Issues</p></div>
                    <div class="stat-card"><h3>${electionData.issues.filter(i => i.status === 'pending').length}</h3><p>Pending</p></div>
                    <div class="stat-card"><h3>${electionData.issues.filter(i => i.status === 'resolved').length}</h3><p>Resolved</p></div>
                    <div class="stat-card"><h3>${electionData.issues.filter(i => i.priority === 'critical' || i.priority === 'high').length}</h3><p>High Priority</p></div>
                </div>
                <div class="data-table-container">
                    <div class="table-header"><h3>All Issues</h3></div>
                    <table class="data-table">
                        <thead><tr><th>ID</th><th>Type</th><th>Station</th><th>Description</th><th>Priority</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>${electionData.issues.map(i => `<tr>
                            <td>#${i.id}</td>
                            <td>${i.type}</td>
                            <td>${i.station}</td>
                            <td>${i.description}</td>
                            <td><span class="priority-badge ${i.priority}">${i.priority}</span></td>
                            <td><span class="status-badge ${i.status}">${i.status}</span></td>
                            <td>
                                <button class="small-btn" onclick="resolveIssue(${i.id})">Resolve</button>
                                <button class="small-btn danger" onclick="escalateIssue(${i.id})">Escalate</button>
                            </td>
                        </tr>`).join('')}</tbody>
                    </table>
                </div>
            `;
            break;

        case 'security':
            content = `
                <div class="glass-card" style="padding:2rem;margin-bottom:1.5rem;">
                    <h3>🔒 System Security Status</h3>
                    <div class="security-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.5rem;margin-top:1.5rem;">
                        <div class="security-item"><span class="status-dot active"></span><strong>Firewall</strong><p>Active - All threats blocked</p></div>
                        <div class="security-item"><span class="status-dot active"></span><strong>SSL Certificate</strong><p>Valid until 2027-01-15</p></div>
                        <div class="security-item"><span class="status-dot active"></span><strong>Data Encryption</strong><p>AES-256 Active</p></div>
                        <div class="security-item"><span class="status-dot warning"></span><strong>Last Audit</strong><p>30 days ago</p></div>
                    </div>
                </div>
                <div class="data-table-container">
                    <div class="table-header"><h3>Recent Security Logs</h3></div>
                    <table class="data-table">
                        <thead><tr><th>Time</th><th>Event</th><th>User</th><th>IP Address</th><th>Status</th></tr></thead>
                        <tbody>
                            <tr><td>16:45:00</td><td>Login Attempt</td><td>admin</td><td>192.168.1.100</td><td><span class="status-badge active">Success</span></td></tr>
                            <tr><td>16:30:00</td><td>Report Generated</td><td>analyst</td><td>192.168.1.105</td><td><span class="status-badge active">Success</span></td></tr>
                            <tr><td>16:15:00</td><td>Data Export</td><td>analyst</td><td>192.168.1.105</td><td><span class="status-badge active">Success</span></td></tr>
                            <tr><td>15:45:00</td><td>Failed Login</td><td>unknown</td><td>103.45.67.89</td><td><span class="status-badge issue">Blocked</span></td></tr>
                        </tbody>
                    </table>
                </div>
            `;
            break;

        case 'settings':
            content = `
                <div class="glass-card" style="padding:2rem;">
                    <h3>⚙️ System Settings</h3>
                    <form class="settings-form" style="margin-top:1.5rem;">
                        <div class="form-group"><label>System Name</label><input type="text" value="ElectGuard India" onchange="showNotification('Setting updated!','success')"></div>
                        <div class="form-group"><label>Admin Email</label><input type="email" value="admin@electguard.gov.in" onchange="showNotification('Setting updated!','success')"></div>
                        <div class="form-group"><label>Data Refresh Interval (seconds)</label><input type="number" value="30" min="10" max="300" onchange="showNotification('Setting updated!','success')"></div>
                        <div class="form-group"><label>Timezone</label><select onchange="showNotification('Setting updated!','success')"><option>Asia/Kolkata (IST)</option><option>UTC</option></select></div>
                        <div class="form-group"><label>Maintenance Mode</label><select onchange="showNotification('Setting updated!','success')"><option>Disabled</option><option>Enabled</option></select></div>
                        <button type="button" class="submit-btn" onclick="showNotification('All settings saved!','success')">Save All Settings</button>
                    </form>
                </div>
            `;
            break;
    }

    main.innerHTML = `
        <div class="dashboard">
            ${renderSidebar('admin', tab)}
            <div class="dashboard-content">
                <div class="dashboard-header">
                    <h1>Admin Dashboard</h1>
                    <div class="dashboard-actions">
                        <button class="action-btn" onclick="refreshData()">🔄 Refresh</button>
                        <button class="action-btn primary" onclick="generatePDFReport('Admin Summary')">📊 Generate Report</button>
                    </div>
                </div>
                ${content}
            </div>
        </div>
    `;
}

// ==================== CITIZEN DASHBOARD ====================
function renderCitizenDashboard(tab = 'overview') {
    const main = document.getElementById('main-content');

    let content = '';
    switch (tab) {
        case 'overview':
            content = `
                <div class="stats-cards">
                    <div class="stat-card"><h3>${electionData.elections.filter(e => e.status === 'active').length}</h3><p>Active Elections</p></div>
                    <div class="stat-card"><h3>${electionData.pollingStations.length}</h3><p>Nearby Stations</p></div>
                    <div class="stat-card"><h3>${electionData.discussions.length}</h3><p>Active Discussions</p></div>
                    <div class="stat-card"><h3>${((electionData.statistics.votesRecorded / electionData.statistics.totalVoters) * 100).toFixed(1)}%</h3><p>National Turnout</p></div>
                </div>
                <div class="chart-container"><div class="chart-header"><h3>📢 Live Election Updates</h3></div>
                    <div style="padding:1rem;">${electionData.realtimeUpdates.map(u => `<div class="update-item ${u.type}"><span class="update-time">${u.time}</span><span class="update-state">${u.state}</span><span class="update-msg">${u.message}</span></div>`).join('')}</div>
                </div>
            `;
            break;

        case 'track':
            content = `
                <div class="data-table-container">
                    <div class="table-header"><h3>🗳️ Current Elections</h3></div>
                    <table class="data-table">
                        <thead><tr><th>Election</th><th>Type</th><th>Status</th><th>Phase</th><th>Turnout</th><th>Your Action</th></tr></thead>
                        <tbody>${electionData.elections.map(e => `<tr>
                            <td>${e.name}</td>
                            <td>${e.type}</td>
                            <td><span class="status-badge ${e.status}">${e.status}</span></td>
                            <td>${e.phase}</td>
                            <td>${e.turnoutPercentage}%</td>
                            <td>${e.status === 'active' ? '<button class="small-btn">Find My Booth</button>' : e.status === 'pending' ? '<button class="small-btn">Set Reminder</button>' : '<button class="small-btn">View Results</button>'}</td>
                        </tr>`).join('')}</tbody>
                    </table>
                </div>
                <div class="glass-card" style="padding:2rem;margin-top:1.5rem;">
                    <h3>🏛️ Nearby Polling Stations</h3>
                    <div style="margin-top:1rem;">${electionData.pollingStations.slice(0, 3).map(s => `<div class="station-item"><strong>${s.name}</strong><p>${s.region}, ${s.state}</p><span class="status-badge ${s.status}">${s.status}</span></div>`).join('')}</div>
                </div>
            `;
            break;

        case 'myinfo':
            const myVoter = indianVoters[0]; // Sample voter info
            content = `
                <div class="glass-card" style="padding:2rem;">
                    <h3>🪪 Your Voter Information</h3>
                    <div class="voter-card" style="margin-top:1.5rem;display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
                        <div><label>Voter ID</label><p><strong>${myVoter.voterId}</strong></p></div>
                        <div><label>Name</label><p>${myVoter.name}</p></div>
                        <div><label>Age</label><p>${myVoter.age} years</p></div>
                        <div><label>Gender</label><p>${myVoter.gender}</p></div>
                        <div><label>State</label><p>${myVoter.state}</p></div>
                        <div><label>District</label><p>${myVoter.district}</p></div>
                        <div><label>Constituency</label><p>${myVoter.constituency}</p></div>
                        <div><label>Status</label><p><span class="status-badge ${myVoter.status.toLowerCase()}">${myVoter.status}</span></p></div>
                        <div><label>Last Voted</label><p>${myVoter.lastVoted}</p></div>
                    </div>
                    <button class="submit-btn" style="margin-top:1.5rem;" onclick="showNotification('Verification request sent!','success')">Request Re-verification</button>
                </div>
            `;
            break;

        case 'report':
            content = `
                <div class="report-form">
                    <h3>📝 Report an Issue</h3>
                    <form onsubmit="submitCitizenReport(event)">
                        <div class="form-row">
                            <div class="form-group"><label>Issue Type</label><select id="report-type" required><option value="">Select Type</option><option>Long Queue</option><option>EVM Issue</option><option>Accessibility Problem</option><option>Voter Intimidation</option><option>Other</option></select></div>
                            <div class="form-group"><label>Polling Station</label><select id="report-station" required>${electionData.pollingStations.map(s => `<option value="${s.name}">${s.name}, ${s.state}</option>`).join('')}</select></div>
                        </div>
                        <div class="form-group"><label>Description</label><textarea id="report-desc" placeholder="Describe the issue in detail..." required></textarea></div>
                        <div class="form-group"><label>Your Contact (Optional)</label><input type="tel" placeholder="Mobile number for updates"></div>
                        <button type="submit" class="submit-btn">Submit Report</button>
                    </form>
                </div>
            `;
            break;

        case 'discuss':
            content = `
                <div class="data-table-container">
                    <div class="table-header"><h3>💬 Civic Discussions</h3><button class="action-btn primary" onclick="showNewDiscussionModal()">+ Start Discussion</button></div>
                    <div style="padding:1rem;">${electionData.discussions.map(d => `<div class="discussion-card glass-card" style="padding:1.5rem;margin-bottom:1rem;cursor:pointer;" onclick="viewDiscussion(${d.id})">
                        <div class="discussion-header"><span class="discussion-category">${d.category}</span><span class="discussion-date">${d.date}</span></div>
                        <h4>${d.title}</h4>
                        <p style="color:var(--gray);margin:0.5rem 0;">By ${d.author}</p>
                        <div class="discussion-stats"><span>💬 ${d.replies} replies</span><span>❤️ ${d.likes} likes</span></div>
                    </div>`).join('')}</div>
                </div>
            `;
            break;

        case 'info':
            content = `
                <div class="glass-card" style="padding:2rem;">
                    <h3>📖 First-Time Voter Guide</h3>
                    <div class="guide-content" style="margin-top:1.5rem;">
                        <div class="guide-section"><h4>📋 Documents Required</h4><ul><li>Voter ID Card (EPIC)</li><li>Aadhaar Card (if linked)</li><li>Any valid photo ID as backup</li></ul></div>
                        <div class="guide-section"><h4>🕐 Voting Hours</h4><p>Polling booths open from 7:00 AM to 6:00 PM. Reach early to avoid queues!</p></div>
                        <div class="guide-section"><h4>📍 Finding Your Booth</h4><p>Check your Voter ID slip or use the 'Track Elections' tab to find your assigned polling station.</p></div>
                        <div class="guide-section"><h4>🗳️ Voting Process</h4><ol><li>Join the queue at your polling booth</li><li>Show your ID to the officer</li><li>Get inked on your finger</li><li>Press the button next to your candidate on EVM</li><li>Verify your vote on VVPAT screen</li><li>Done! Your vote is recorded</li></ol></div>
                        <div class="guide-section"><h4>❓ What is NOTA?</h4><p>NOTA (None Of The Above) allows you to reject all candidates if you're not satisfied with any option.</p></div>
                    </div>
                </div>
            `;
            break;
    }

    main.innerHTML = `
        <div class="dashboard">
            ${renderSidebar('citizen', tab)}
            <div class="dashboard-content">
                <div class="dashboard-header">
                    <h1>Citizen Portal</h1>
                    <div class="dashboard-actions">
                        <button class="action-btn" onclick="refreshData()">🔄 Refresh</button>
                        <button class="action-btn" onclick="window.open('https://eci.gov.in','_blank')">🌐 Visit ECI</button>
                    </div>
                </div>
                ${content}
            </div>
        </div>
    `;
}

// ==================== OBSERVER DASHBOARD ====================
function renderObserverDashboard(tab = 'overview') {
    const main = document.getElementById('main-content');

    let content = '';
    switch (tab) {
        case 'overview':
            content = `
                <div class="stats-cards">
                    <div class="stat-card"><h3>${electionData.pollingStations.length}</h3><p>Assigned Stations</p></div>
                    <div class="stat-card"><h3>${electionData.issues.filter(i => i.reportedBy.includes('Observer')).length}</h3><p>My Reports</p></div>
                    <div class="stat-card"><h3>${electionData.issues.filter(i => i.status === 'pending').length}</h3><p>Pending Issues</p></div>
                    <div class="stat-card"><h3>8.5h</h3><p>On Duty Today</p></div>
                </div>
                <div class="glass-card" style="padding:1.5rem;margin-bottom:1.5rem;">
                    <h3>⚠️ Priority Alerts</h3>
                    <div style="margin-top:1rem;">${electionData.issues.filter(i => i.priority === 'high' || i.priority === 'critical').map(i => `<div class="alert-item ${i.priority}"><strong>${i.type}</strong> at ${i.station}<span class="status-badge ${i.status}">${i.status}</span></div>`).join('')}</div>
                </div>
                <div class="data-table-container">
                    <div class="table-header"><h3>Station Status Overview</h3></div>
                    <table class="data-table">
                        <thead><tr><th>Station</th><th>State</th><th>Status</th><th>Voters</th><th>Issues</th><th>Actions</th></tr></thead>
                        <tbody>${electionData.pollingStations.map(s => `<tr><td>${s.name}</td><td>${s.state}</td><td><span class="status-badge ${s.status}">${s.status}</span></td><td>${s.voters}/${s.capacity}</td><td>${s.issues}</td><td><button class="small-btn" onclick="monitorStation(${s.id})">Monitor</button></td></tr>`).join('')}</tbody>
                    </table>
                </div>
            `;
            break;

        case 'monitor':
            content = `
                <div class="glass-card" style="padding:2rem;text-align:center;">
                    <h3>👁️ Live Monitoring Mode</h3>
                    <p style="color:var(--gray);margin:1rem 0;">Real-time monitoring of polling activities</p>
                    <div class="monitoring-status" style="font-size:3rem;margin:2rem 0;">🔴 LIVE</div>
                    <div class="monitor-stats" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-top:2rem;">
                        <div><h4>${electionData.pollingStations.filter(s => s.status === 'active').length}</h4><p>Active Booths</p></div>
                        <div><h4>${electionData.issues.filter(i => i.status === 'active').length}</h4><p>Active Issues</p></div>
                        <div><h4>${Math.floor(Math.random() * 50) + 150}</h4><p>Votes/Min</p></div>
                    </div>
                    <button class="submit-btn" style="margin-top:2rem;" onclick="showNotification('Monitoring session recorded','success')">End Session</button>
                </div>
            `;
            break;

        case 'stations':
            content = `
                <div class="data-table-container">
                    <div class="table-header"><h3>🏛️ My Assigned Stations</h3></div>
                    <table class="data-table">
                        <thead><tr><th>Station</th><th>Region</th><th>State</th><th>Capacity</th><th>Officers</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>${electionData.pollingStations.map(s => `<tr>
                            <td>${s.name}</td><td>${s.region}</td><td>${s.state}</td><td>${s.capacity}</td><td>${s.officers}</td>
                            <td><span class="status-badge ${s.status}">${s.status}</span></td>
                            <td><button class="small-btn" onclick="updateStationStatus(${s.id})">Update Status</button></td>
                        </tr>`).join('')}</tbody>
                    </table>
                </div>
            `;
            break;

        case 'report':
            content = `
                <div class="report-form">
                    <h3>📝 Report Anomaly</h3>
                    <form onsubmit="submitObserverReport(event)">
                        <div class="form-row">
                            <div class="form-group"><label>Anomaly Type</label><select id="anomaly-type" required><option value="">Select Type</option><option>EVM Malfunction</option><option>VVPAT Issue</option><option>Voter Intimidation</option><option>Procedural Violation</option><option>Security Breach</option><option>Suspicious Activity</option></select></div>
                            <div class="form-group"><label>Severity</label><select id="anomaly-severity" required><option>Low</option><option>Medium</option><option>High</option><option>Critical</option></select></div>
                        </div>
                        <div class="form-group"><label>Polling Station</label><select id="anomaly-station" required>${electionData.pollingStations.map(s => `<option value="${s.name}">${s.name}, ${s.state}</option>`).join('')}</select></div>
                        <div class="form-group"><label>Detailed Observation</label><textarea id="anomaly-desc" placeholder="Describe what you observed in detail..." required></textarea></div>
                        <div class="form-group"><label>Evidence (Photo/Video)</label><input type="file" accept="image/*,video/*"></div>
                        <button type="submit" class="submit-btn">Submit Report</button>
                    </form>
                </div>
            `;
            break;

        case 'issues':
            content = `
                <div class="data-table-container">
                    <div class="table-header"><h3>⚠️ All Reported Issues</h3><div class="table-search"><input type="text" placeholder="Search..." onkeyup="filterTable(this,'observer-issues-table')"></div></div>
                    <table class="data-table" id="observer-issues-table">
                        <thead><tr><th>ID</th><th>Type</th><th>Station</th><th>State</th><th>Priority</th><th>Status</th><th>Reported By</th><th>Time</th></tr></thead>
                        <tbody>${electionData.issues.map(i => `<tr><td>#${i.id}</td><td>${i.type}</td><td>${i.station}</td><td>${i.state}</td><td><span class="priority-badge ${i.priority}">${i.priority}</span></td><td><span class="status-badge ${i.status}">${i.status}</span></td><td>${i.reportedBy}</td><td>${i.time}</td></tr>`).join('')}</tbody>
                    </table>
                </div>
            `;
            break;

        case 'insights':
            content = `
                <div class="stats-cards">
                    <div class="stat-card"><h3>${((electionData.issues.filter(i => i.status === 'resolved').length / electionData.issues.length) * 100).toFixed(0)}%</h3><p>Resolution Rate</p></div>
                    <div class="stat-card"><h3>45 min</h3><p>Avg Resolution Time</p></div>
                    <div class="stat-card"><h3>${electionData.issues.filter(i => i.type === 'EVM Malfunction').length}</h3><p>EVM Issues</p></div>
                    <div class="stat-card"><h3>${electionData.pollingStations.filter(s => s.issues === 0).length}</h3><p>Issue-Free Stations</p></div>
                </div>
                <div class="glass-card" style="padding:2rem;">
                    <h3>📊 Issue Distribution by Type</h3>
                    <div style="margin-top:1.5rem;">
                        ${['EVM Malfunction', 'VVPAT Issue', 'Long Queue', 'Security Breach', 'Accessibility'].map(type => {
                const count = electionData.issues.filter(i => i.type === type).length;
                const pct = (count / electionData.issues.length * 100) || 0;
                return `<div style="margin-bottom:1rem;"><div style="display:flex;justify-content:space-between;margin-bottom:0.5rem;"><span>${type}</span><span>${count} (${pct.toFixed(0)}%)</span></div><div style="height:8px;background:var(--dark);border-radius:4px;"><div style="height:100%;width:${pct}%;background:var(--gradient-primary);border-radius:4px;"></div></div></div>`;
            }).join('')}
                    </div>
                </div>
            `;
            break;
    }

    main.innerHTML = `
        <div class="dashboard">
            ${renderSidebar('observer', tab)}
            <div class="dashboard-content">
                <div class="dashboard-header">
                    <h1>Observer Dashboard</h1>
                    <div class="dashboard-actions">
                        <button class="action-btn" onclick="refreshData()">🔄 Refresh</button>
                        <button class="action-btn primary" onclick="generatePDFReport('Observer Report')">📊 Generate Report</button>
                    </div>
                </div>
                ${content}
            </div>
        </div>
    `;
}

// ==================== ANALYST DASHBOARD ====================
function renderAnalystDashboard(tab = 'overview') {
    const main = document.getElementById('main-content');
    const candidates = electionData.candidates;

    let content = '';
    switch (tab) {
        case 'overview':
            content = `
                <div class="stats-cards">
                    <div class="stat-card"><h3>${electionData.statistics.dataUpdatesPerMinute}</h3><p>Updates/min</p></div>
                    <div class="stat-card"><h3>${((electionData.statistics.votesRecorded / electionData.statistics.totalVoters) * 100).toFixed(1)}%</h3><p>National Turnout</p></div>
                    <div class="stat-card"><h3>${(electionData.statistics.votesRecorded / 10000000).toFixed(1)} Cr</h3><p>Total Votes</p></div>
                    <div class="stat-card"><h3>${electionData.statistics.statesCompleted}/${electionData.statistics.statesCompleted + electionData.statistics.statesVoting + electionData.statistics.statesPending}</h3><p>States Completed</p></div>
                </div>
                <div class="chart-container">
                    <div class="chart-header"><h3>🏆 Candidate-wise Results (Live)</h3></div>
                    <div style="padding:1.5rem;">
                        ${candidates.map(c => `<div style="margin-bottom:1.5rem;"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;"><span><strong>${c.name}</strong> (${c.party}) ${c.symbol}</span><span>${c.percentage}% - ${(c.votes / 10000000).toFixed(1)} Cr votes</span></div><div style="height:30px;background:var(--dark);border-radius:8px;overflow:hidden;"><div style="height:100%;width:${c.percentage}%;background:${c.color};border-radius:8px;transition:width 1s ease;display:flex;align-items:center;padding-left:1rem;color:white;font-weight:600;">${c.percentage}%</div></div></div>`).join('')}
                    </div>
                </div>
            `;
            break;

        case 'data':
            content = `
                <div class="glass-card" style="padding:2rem;margin-bottom:1.5rem;">
                    <h3>📈 Data Analysis Tools</h3>
                    <div class="analysis-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-top:1.5rem;">
                        <button class="analysis-btn glass-card" style="padding:1.5rem;text-align:center;border:1px solid var(--glass-border);" onclick="showNotification('Running trend analysis...','info')"><span style="font-size:2rem;">📊</span><p>Trend Analysis</p></button>
                        <button class="analysis-btn glass-card" style="padding:1.5rem;text-align:center;border:1px solid var(--glass-border);" onclick="showNotification('Generating comparison report...','info')"><span style="font-size:2rem;">⚖️</span><p>State Comparison</p></button>
                        <button class="analysis-btn glass-card" style="padding:1.5rem;text-align:center;border:1px solid var(--glass-border);" onclick="showNotification('Loading demographic data...','info')"><span style="font-size:2rem;">👥</span><p>Demographics</p></button>
                        <button class="analysis-btn glass-card" style="padding:1.5rem;text-align:center;border:1px solid var(--glass-border);" onclick="showNotification('Starting prediction model...','info')"><span style="font-size:2rem;">🔮</span><p>Predictions</p></button>
                    </div>
                </div>
                <div class="data-table-container">
                    <div class="table-header"><h3>Raw Data Export</h3><button class="action-btn" onclick="generatePDFReport('Raw Data Export')">💾 Export CSV</button></div>
                    <table class="data-table">
                        <thead><tr><th>Metric</th><th>Current Value</th><th>Change</th><th>Last Updated</th></tr></thead>
                        <tbody>
                            <tr><td>Total Votes</td><td>${(electionData.statistics.votesRecorded / 10000000).toFixed(2)} Cr</td><td class="positive">+1.2%</td><td>Just now</td></tr>
                            <tr><td>Turnout Rate</td><td>${((electionData.statistics.votesRecorded / electionData.statistics.totalVoters) * 100).toFixed(2)}%</td><td class="positive">+0.5%</td><td>Just now</td></tr>
                            <tr><td>Active Stations</td><td>${electionData.statistics.activeStations.toLocaleString()}</td><td class="neutral">0%</td><td>1 min ago</td></tr>
                            <tr><td>Issues/Hour</td><td>${Math.floor(electionData.statistics.issuesReported / 8)}</td><td class="negative">-15%</td><td>5 min ago</td></tr>
                        </tbody>
                    </table>
                </div>
            `;
            break;

        case 'states':
            content = `
                <div class="data-table-container">
                    <div class="table-header"><h3>🗺️ State-wise Election Data</h3></div>
                    <table class="data-table">
                        <thead><tr><th>State</th><th>Turnout</th><th>Stations</th><th>Total Votes</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>${electionData.states.map(s => `<tr>
                            <td><strong>${s.name}</strong></td>
                            <td><div style="display:flex;align-items:center;gap:0.5rem;"><div style="width:60px;height:8px;background:var(--dark);border-radius:4px;"><div style="height:100%;width:${s.turnout}%;background:${s.turnout > 70 ? 'var(--success)' : s.turnout > 50 ? 'var(--warning)' : 'var(--danger)'};border-radius:4px;"></div></div>${s.turnout}%</div></td>
                            <td>${s.stations.toLocaleString()}</td>
                            <td>${(s.totalVotes / 10000000).toFixed(2)} Cr</td>
                            <td><span class="status-badge ${s.status === 'Completed' ? 'completed' : s.status === 'Voting' ? 'active' : 'pending'}">${s.status}</span></td>
                            <td><button class="small-btn" onclick="viewStateDetails('${s.name}')">Details</button></td>
                        </tr>`).join('')}</tbody>
                    </table>
                </div>
            `;
            break;

        case 'candidates':
            content = `
                <div class="data-table-container">
                    <div class="table-header"><h3>🏆 Candidate Performance</h3></div>
                    <table class="data-table">
                        <thead><tr><th>Rank</th><th>Candidate</th><th>Party</th><th>Symbol</th><th>Votes</th><th>Percentage</th><th>Trend</th></tr></thead>
                        <tbody>${candidates.sort((a, b) => b.votes - a.votes).map((c, i) => `<tr>
                            <td>#${i + 1}</td>
                            <td><strong>${c.name}</strong></td>
                            <td>${c.party}</td>
                            <td style="font-size:1.5rem;">${c.symbol}</td>
                            <td>${(c.votes / 10000000).toFixed(2)} Cr</td>
                            <td><div style="display:flex;align-items:center;gap:0.5rem;"><div style="width:80px;height:12px;background:var(--dark);border-radius:6px;"><div style="height:100%;width:${c.percentage}%;background:${c.color};border-radius:6px;"></div></div>${c.percentage}%</div></td>
                            <td class="${i < 2 ? 'positive' : 'neutral'}">${i < 2 ? '↑' : '→'}</td>
                        </tr>`).join('')}</tbody>
                    </table>
                </div>
            `;
            break;

        case 'reports':
            content = `
                <div class="report-form">
                    <h3>📋 Generate Custom Report</h3>
                    <form onsubmit="event.preventDefault();generatePDFReport(document.getElementById('rpt-type').value);">
                        <div class="form-row">
                            <div class="form-group"><label>Report Type</label><select id="rpt-type" required><option>Full Election Summary</option><option>Turnout Analysis</option><option>State Comparison</option><option>Candidate Performance</option><option>Issue Summary</option><option>Anomaly Report</option></select></div>
                            <div class="form-group"><label>Format</label><select><option>TXT (Text Report)</option><option>PDF (Coming Soon)</option><option>Excel (Coming Soon)</option></select></div>
                        </div>
                        <div class="form-row">
                            <div class="form-group"><label>Date Range</label><input type="date" value="2026-01-13"></div>
                            <div class="form-group"><label>To</label><input type="date" value="2026-01-13"></div>
                        </div>
                        <div class="form-group"><label>Include States</label><select multiple style="height:120px;">${electionData.states.map(s => `<option selected>${s.name}</option>`).join('')}</select></div>
                        <button type="submit" class="submit-btn">📥 Generate & Download Report</button>
                    </form>
                </div>
            `;
            break;

        case 'realtime':
            content = `
                <div class="glass-card" style="padding:1.5rem;margin-bottom:1.5rem;text-align:center;">
                    <span style="font-size:1.5rem;color:var(--success);">● LIVE</span>
                    <h3 style="margin-top:0.5rem;">Real-Time Data Feed</h3>
                    <p style="color:var(--gray);">Updates every ${Math.floor(60000 / electionData.statistics.dataUpdatesPerMinute)} seconds</p>
                </div>
                <div class="data-table-container">
                    <div class="table-header"><h3>⚡ Live Updates</h3><button class="action-btn" onclick="refreshData()">🔄 Refresh Now</button></div>
                    <div style="padding:1rem;max-height:400px;overflow-y:auto;">
                        ${electionData.realtimeUpdates.map(u => `<div class="update-item ${u.type}" style="padding:1rem;border-bottom:1px solid var(--glass-border);display:flex;align-items:center;gap:1rem;">
                            <span style="color:var(--gray);min-width:80px;">${u.time}</span>
                            <span class="update-badge ${u.type}">${u.type}</span>
                            <span style="flex:1;">${u.message}</span>
                            <span style="color:var(--gray);">${u.state}</span>
                        </div>`).join('')}
                    </div>
                </div>
            `;
            break;
    }

    main.innerHTML = `
        <div class="dashboard">
            ${renderSidebar('analyst', tab)}
            <div class="dashboard-content">
                <div class="dashboard-header">
                    <h1>Data Analyst Center</h1>
                    <div class="dashboard-actions">
                        <button class="action-btn" onclick="refreshData()">🔄 Refresh Data</button>
                        <button class="action-btn primary" onclick="generatePDFReport('Complete Analysis')">📊 Export All</button>
                    </div>
                </div>
                ${content}
            </div>
        </div>
    `;
}

// ==================== HELPER FUNCTIONS ====================

function filterTable(input, tableId) {
    const filter = input.value.toLowerCase();
    const table = document.getElementById(tableId);
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(filter) ? '' : 'none';
    });
}

function resolveIssue(id) {
    const issue = electionData.issues.find(i => i.id === id);
    if (issue) {
        issue.status = 'resolved';
        showNotification(`Issue #${id} marked as resolved!`, 'success');
        renderDashboard(currentUser.role);
    }
}

function escalateIssue(id) {
    const issue = electionData.issues.find(i => i.id === id);
    if (issue) {
        issue.priority = 'critical';
        showNotification(`Issue #${id} escalated to critical!`, 'warning');
        renderDashboard(currentUser.role);
    }
}

function toggleUserStatus(id) {
    const user = systemUsers.find(u => u.id === id);
    if (user) {
        user.status = user.status === 'active' ? 'inactive' : 'active';
        showNotification(`User ${user.name} is now ${user.status}`, 'success');
        renderDashboard(currentUser.role);
    }
}

function editUser(id) {
    showNotification(`Opening editor for user #${id}...`, 'info');
}

function editElection(id) {
    showNotification(`Opening election editor #${id}...`, 'info');
}

function viewElectionDetails(id) {
    const election = electionData.elections.find(e => e.id === id);
    if (election) {
        alert(`Election: ${election.name}\nType: ${election.type}\nStatus: ${election.status}\nPhase: ${election.phase}\nRegistered Voters: ${(election.registeredVoters / 10000000).toFixed(1)} Crore\nVotes Cast: ${(election.votesCount / 10000000).toFixed(1)} Crore\nTurnout: ${election.turnoutPercentage}%`);
    }
}

function viewVoterDetails(id) {
    const voter = indianVoters.find(v => v.id === id);
    if (voter) {
        alert(`Voter Details:\n\nName: ${voter.name}\nVoter ID: ${voter.voterId}\nAge: ${voter.age}\nGender: ${voter.gender}\nState: ${voter.state}\nDistrict: ${voter.district}\nConstituency: ${voter.constituency}\nStatus: ${voter.status}\nLast Voted: ${voter.lastVoted}`);
    }
}

function editStation(id) {
    showNotification(`Opening station editor #${id}...`, 'info');
}

function monitorStation(id) {
    showNotification(`Starting live monitor for station #${id}...`, 'info');
}

function updateStationStatus(id) {
    const station = electionData.pollingStations.find(s => s.id === id);
    if (station) {
        const newStatus = station.status === 'active' ? 'issue' : 'active';
        station.status = newStatus;
        showNotification(`Station status updated to ${newStatus}`, 'success');
        renderDashboard(currentUser.role);
    }
}

function viewStateDetails(stateName) {
    const state = electionData.states.find(s => s.name === stateName);
    if (state) {
        alert(`State: ${state.name}\nTurnout: ${state.turnout}%\nPolling Stations: ${state.stations.toLocaleString()}\nTotal Votes: ${(state.totalVotes / 10000000).toFixed(2)} Crore\nStatus: ${state.status}`);
    }
}

function submitCitizenReport(e) {
    e.preventDefault();
    const type = document.getElementById('report-type').value;
    const station = document.getElementById('report-station').value;
    const desc = document.getElementById('report-desc').value;

    electionData.issues.push({
        id: electionData.issues.length + 1,
        type: type,
        station: station,
        state: 'Submitted',
        description: desc,
        status: 'pending',
        priority: 'medium',
        reportedBy: `Citizen: ${currentUser.name}`,
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    });

    showNotification('Issue reported successfully! Thank you for your contribution.', 'success');
    document.getElementById('report-desc').value = '';
}

function submitObserverReport(e) {
    e.preventDefault();
    const type = document.getElementById('anomaly-type').value;
    const severity = document.getElementById('anomaly-severity').value;
    const station = document.getElementById('anomaly-station').value;
    const desc = document.getElementById('anomaly-desc').value;

    electionData.issues.push({
        id: electionData.issues.length + 1,
        type: type,
        station: station,
        state: 'Observer Report',
        description: desc,
        status: 'pending',
        priority: severity.toLowerCase(),
        reportedBy: `Observer: ${currentUser.name}`,
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    });

    showNotification('Anomaly report submitted successfully!', 'success');
    document.getElementById('anomaly-desc').value = '';
}

function showAddUserModal() {
    showNotification('Add User modal - Feature available in full version', 'info');
}

function showAddElectionModal() {
    showNotification('Add Election modal - Feature available in full version', 'info');
}

function showAddStationModal() {
    showNotification('Add Station modal - Feature available in full version', 'info');
}

function showNewDiscussionModal() {
    showNotification('New Discussion modal - Feature available in full version', 'info');
}

function viewDiscussion(id) {
    const discussion = electionData.discussions.find(d => d.id === id);
    if (discussion) {
        alert(`${discussion.title}\n\nBy: ${discussion.author}\nCategory: ${discussion.category}\nReplies: ${discussion.replies}\nLikes: ${discussion.likes}\nDate: ${discussion.date}`);
    }
}

// Add New Voter Function
function addNewVoter(e) {
    e.preventDefault();
    const name = document.getElementById('new-voter-name').value;
    const age = parseInt(document.getElementById('new-voter-age').value);
    const gender = document.getElementById('new-voter-gender').value;
    const state = document.getElementById('new-voter-state').value;
    const district = document.getElementById('new-voter-district').value;
    const constituency = document.getElementById('new-voter-constituency').value;

    // Generate Voter ID based on state
    const stateCode = state.substring(0, 2).toUpperCase();
    const randomNum = Math.floor(Math.random() * 900000) + 100000;
    const voterId = `${stateCode}/${String(Math.floor(Math.random() * 99) + 1).padStart(2, '0')}/${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}/${randomNum}`;

    const newVoter = {
        id: `V${indianVoters.length + 1}`,
        voterId: voterId,
        name: name,
        age: age,
        gender: gender,
        state: state,
        district: district,
        constituency: constituency,
        status: 'Pending',
        lastVoted: 'Never'
    };

    indianVoters.push(newVoter);
    showNotification(`Voter ${name} added successfully! Voter ID: ${voterId}`, 'success');

    // Switch back to voters list
    setTimeout(() => {
        switchTab(currentUser.role, 'voters');
    }, 1500);
}

function editVoter(id) {
    const voter = indianVoters.find(v => v.id === id);
    if (voter) {
        showNotification(`Opening editor for voter ${voter.name}...`, 'info');
    }
}

function updateDistricts() {
    // This would populate district dropdown based on selected state
    showNotification('State selected - district options updated', 'info');
}

