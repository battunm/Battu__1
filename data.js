// ElectGuard - Election Monitoring System - Enhanced Data

// Registered Users Database
let registeredUsers = {
    admin: { username: 'admin', password: 'admin123', name: 'System Admin', role: 'admin', email: 'admin@electguard.org' },
    citizen: { username: 'citizen', password: 'citizen123', name: 'Rahul Sharma', role: 'citizen', email: 'rahul@email.com' },
    observer: { username: 'observer', password: 'observer123', name: 'Priya Patel', role: 'observer', email: 'priya@electguard.org' },
    analyst: { username: 'analyst', password: 'analyst123', name: 'Amit Kumar', role: 'analyst', email: 'amit@electguard.org' }
};

// Indian Voter Details
const indianVoters = [
    { id: 'IND001', name: 'Rajesh Kumar', age: 45, gender: 'Male', state: 'Maharashtra', district: 'Mumbai', constituency: 'Mumbai North', voterId: 'MH/01/234/567890', status: 'Verified', lastVoted: '2024' },
    { id: 'IND002', name: 'Priya Sharma', age: 32, gender: 'Female', state: 'Delhi', district: 'New Delhi', constituency: 'New Delhi Central', voterId: 'DL/02/345/678901', status: 'Verified', lastVoted: '2024' },
    { id: 'IND003', name: 'Amit Patel', age: 28, gender: 'Male', state: 'Gujarat', district: 'Ahmedabad', constituency: 'Ahmedabad East', voterId: 'GJ/03/456/789012', status: 'Verified', lastVoted: '2024' },
    { id: 'IND004', name: 'Sunita Devi', age: 55, gender: 'Female', state: 'Uttar Pradesh', district: 'Lucknow', constituency: 'Lucknow Central', voterId: 'UP/04/567/890123', status: 'Verified', lastVoted: '2024' },
    { id: 'IND005', name: 'Mohammed Irfan', age: 38, gender: 'Male', state: 'Karnataka', district: 'Bangalore', constituency: 'Bangalore South', voterId: 'KA/05/678/901234', status: 'Pending', lastVoted: '2019' },
    { id: 'IND006', name: 'Lakshmi Narayanan', age: 62, gender: 'Female', state: 'Tamil Nadu', district: 'Chennai', constituency: 'Chennai Central', voterId: 'TN/06/789/012345', status: 'Verified', lastVoted: '2024' },
    { id: 'IND007', name: 'Suresh Reddy', age: 41, gender: 'Male', state: 'Telangana', district: 'Hyderabad', constituency: 'Hyderabad North', voterId: 'TS/07/890/123456', status: 'Verified', lastVoted: '2024' },
    { id: 'IND008', name: 'Anjali Mehta', age: 29, gender: 'Female', state: 'Rajasthan', district: 'Jaipur', constituency: 'Jaipur Rural', voterId: 'RJ/08/901/234567', status: 'Verified', lastVoted: '2024' },
    { id: 'IND009', name: 'Deepak Singh', age: 35, gender: 'Male', state: 'Punjab', district: 'Amritsar', constituency: 'Amritsar Central', voterId: 'PB/09/012/345678', status: 'Pending', lastVoted: '2019' },
    { id: 'IND010', name: 'Kavitha Nair', age: 48, gender: 'Female', state: 'Kerala', district: 'Thiruvananthapuram', constituency: 'Trivandrum', voterId: 'KL/10/123/456789', status: 'Verified', lastVoted: '2024' },
    { id: 'IND011', name: 'Ravi Shankar', age: 52, gender: 'Male', state: 'West Bengal', district: 'Kolkata', constituency: 'Kolkata North', voterId: 'WB/11/234/567890', status: 'Verified', lastVoted: '2024' },
    { id: 'IND012', name: 'Meena Kumari', age: 33, gender: 'Female', state: 'Bihar', district: 'Patna', constituency: 'Patna Sahib', voterId: 'BR/12/345/678901', status: 'Verified', lastVoted: '2024' },
    { id: 'IND013', name: 'Vijay Malhotra', age: 44, gender: 'Male', state: 'Madhya Pradesh', district: 'Bhopal', constituency: 'Bhopal Central', voterId: 'MP/13/456/789012', status: 'Pending', lastVoted: '2019' },
    { id: 'IND014', name: 'Sarita Gupta', age: 37, gender: 'Female', state: 'Haryana', district: 'Gurugram', constituency: 'Gurgaon', voterId: 'HR/14/567/890123', status: 'Verified', lastVoted: '2024' },
    { id: 'IND015', name: 'Prakash Joshi', age: 59, gender: 'Male', state: 'Uttarakhand', district: 'Dehradun', constituency: 'Dehradun', voterId: 'UK/15/678/901234', status: 'Verified', lastVoted: '2024' }
];

// Election Data
let electionData = {
    elections: [
        { id: 1, name: 'Lok Sabha General Election 2026', type: 'General', status: 'active', startDate: '2026-04-15', endDate: '2026-05-20', registeredVoters: 950000000, votesCount: 567000000, turnoutPercentage: 59.7, regions: 543, phase: 'Phase 3 of 7' },
        { id: 2, name: 'Maharashtra State Assembly', type: 'State Assembly', status: 'active', startDate: '2026-01-15', endDate: '2026-01-15', registeredVoters: 89000000, votesCount: 52340000, turnoutPercentage: 58.8, regions: 288, phase: 'Single Phase' },
        { id: 3, name: 'Gujarat Municipal Elections', type: 'Municipal', status: 'pending', startDate: '2026-02-20', endDate: '2026-02-20', registeredVoters: 15000000, votesCount: 0, turnoutPercentage: 0, regions: 156, phase: 'Upcoming' },
        { id: 4, name: 'Delhi MCD Elections', type: 'Municipal', status: 'completed', startDate: '2025-12-04', endDate: '2025-12-04', registeredVoters: 14700000, votesCount: 7497000, turnoutPercentage: 51.0, regions: 250, phase: 'Completed' },
        // Panchayati Raj Elections
        { id: 5, name: 'Uttar Pradesh Gram Panchayat Election', type: 'Panchayat - Gram', status: 'active', startDate: '2026-01-10', endDate: '2026-01-25', registeredVoters: 120000000, votesCount: 78000000, turnoutPercentage: 65.0, regions: 58189, phase: 'Phase 2 of 4', level: 'Village', positions: 'Gram Pradhan, Ward Members' },
        { id: 6, name: 'Rajasthan Panchayat Samiti Election', type: 'Panchayat - Block', status: 'pending', startDate: '2026-02-15', endDate: '2026-02-28', registeredVoters: 45000000, votesCount: 0, turnoutPercentage: 0, regions: 295, phase: 'Upcoming', level: 'Block', positions: 'Pramukh, Samiti Members' },
        { id: 7, name: 'Bihar Zila Parishad Election', type: 'Panchayat - District', status: 'pending', startDate: '2026-03-01', endDate: '2026-03-15', registeredVoters: 75000000, votesCount: 0, turnoutPercentage: 0, regions: 38, phase: 'Upcoming', level: 'District', positions: 'Zila Pramukh, Members' },
        { id: 8, name: 'Madhya Pradesh Gram Panchayat Election', type: 'Panchayat - Gram', status: 'active', startDate: '2026-01-05', endDate: '2026-01-20', registeredVoters: 52000000, votesCount: 36400000, turnoutPercentage: 70.0, regions: 22814, phase: 'Phase 3 of 3', level: 'Village', positions: 'Sarpanch, Panch' },
        { id: 9, name: 'West Bengal Panchayat General Election', type: 'Panchayat - All Tiers', status: 'completed', startDate: '2025-12-01', endDate: '2025-12-15', registeredVoters: 62000000, votesCount: 48360000, turnoutPercentage: 78.0, regions: 3354, phase: 'Completed', level: 'All Levels', positions: 'Gram Panchayat, Panchayat Samiti, Zila Parishad' },
        { id: 10, name: 'Karnataka Gram Panchayat Election', type: 'Panchayat - Gram', status: 'pending', startDate: '2026-03-10', endDate: '2026-03-25', registeredVoters: 48000000, votesCount: 0, turnoutPercentage: 0, regions: 5628, phase: 'Upcoming', level: 'Village', positions: 'Gram Panchayat President, Members' },
        { id: 11, name: 'Tamil Nadu Panchayat Union Election', type: 'Panchayat - Block', status: 'active', startDate: '2026-01-12', endDate: '2026-01-22', registeredVoters: 55000000, votesCount: 38500000, turnoutPercentage: 70.0, regions: 385, phase: 'Voting', level: 'Block', positions: 'Panchayat Union Chairman, Ward Members' },
        { id: 12, name: 'Odisha Zilla Parishad Election', type: 'Panchayat - District', status: 'pending', startDate: '2026-04-01', endDate: '2026-04-10', registeredVoters: 32000000, votesCount: 0, turnoutPercentage: 0, regions: 30, phase: 'Upcoming', level: 'District', positions: 'Zilla Parishad President, Members' }
    ],

    candidates: [
        { id: 1, name: 'Narendra Modi', party: 'Bharatiya Janata Party (BJP)', symbol: '🪷', votes: 234521897, percentage: 41.4, color: '#FF9933' },
        { id: 2, name: 'Rahul Gandhi', party: 'Indian National Congress (INC)', symbol: '✋', votes: 187245632, percentage: 33.0, color: '#00BFFF' },
        { id: 3, name: 'Arvind Kejriwal', party: 'Aam Aadmi Party (AAP)', symbol: '🧹', votes: 85432178, percentage: 15.1, color: '#0066CC' },
        { id: 4, name: 'Mamata Banerjee', party: 'All India Trinamool Congress', symbol: '🌸', votes: 59847925, percentage: 10.5, color: '#228B22' }
    ],

    pollingStations: [
        { id: 1, name: 'Government School, Connaught Place', region: 'New Delhi', state: 'Delhi', status: 'active', voters: 12450, capacity: 15000, issues: 0, officers: 4 },
        { id: 2, name: 'Community Hall, Andheri', region: 'Mumbai Suburban', state: 'Maharashtra', status: 'active', voters: 8923, capacity: 10000, issues: 1, officers: 3 },
        { id: 3, name: 'Town Hall, MG Road', region: 'Bangalore Urban', state: 'Karnataka', status: 'active', voters: 15632, capacity: 20000, issues: 0, officers: 5 },
        { id: 4, name: 'Primary School, Salt Lake', region: 'Kolkata', state: 'West Bengal', status: 'issue', voters: 5421, capacity: 8000, issues: 3, officers: 3 },
        { id: 5, name: 'Govt College, Anna Nagar', region: 'Chennai', state: 'Tamil Nadu', status: 'active', voters: 9875, capacity: 12000, issues: 0, officers: 4 },
        { id: 6, name: 'Municipal Office, Navrangpura', region: 'Ahmedabad', state: 'Gujarat', status: 'active', voters: 11234, capacity: 14000, issues: 0, officers: 4 },
        { id: 7, name: 'High School, Sector 17', region: 'Chandigarh', state: 'Punjab', status: 'active', voters: 7856, capacity: 9000, issues: 1, officers: 3 }
    ],

    issues: [
        { id: 1, type: 'EVM Malfunction', station: 'Primary School, Salt Lake', state: 'West Bengal', description: 'EVM not responding after 500 votes', status: 'pending', priority: 'high', reportedBy: 'Observer #234', time: '10:45 AM' },
        { id: 2, type: 'Long Queue', station: 'Community Hall, Andheri', state: 'Maharashtra', description: 'Wait time exceeding 3 hours', status: 'active', priority: 'medium', reportedBy: 'Citizen #892', time: '11:30 AM' },
        { id: 3, type: 'Accessibility', station: 'Primary School, Salt Lake', state: 'West Bengal', description: 'No ramp for wheelchair access', status: 'resolved', priority: 'medium', reportedBy: 'Observer #189', time: '09:15 AM' },
        { id: 4, type: 'Security Breach', station: 'Town Hall, MG Road', state: 'Karnataka', description: 'Unauthorized person near EVM storage', status: 'resolved', priority: 'high', reportedBy: 'Security Team', time: '12:00 PM' },
        { id: 5, type: 'VVPAT Issue', station: 'Primary School, Salt Lake', state: 'West Bengal', description: 'VVPAT slip mismatch reported', status: 'pending', priority: 'critical', reportedBy: 'Observer #456', time: '01:15 PM' },
        { id: 6, type: 'Voter Intimidation', station: 'High School, Sector 17', state: 'Punjab', description: 'Reports of voters being influenced outside booth', status: 'active', priority: 'high', reportedBy: 'Observer #321', time: '02:30 PM' }
    ],

    states: [
        { name: 'Maharashtra', turnout: 58.8, stations: 96654, totalVotes: 52340000, status: 'Voting' },
        { name: 'Uttar Pradesh', turnout: 54.2, stations: 163336, totalVotes: 89560000, status: 'Voting' },
        { name: 'Tamil Nadu', turnout: 71.5, stations: 68879, totalVotes: 45230000, status: 'Completed' },
        { name: 'West Bengal', turnout: 76.8, stations: 77246, totalVotes: 52890000, status: 'Completed' },
        { name: 'Karnataka', turnout: 65.3, stations: 58545, totalVotes: 34560000, status: 'Voting' },
        { name: 'Gujarat', turnout: 63.1, stations: 51782, totalVotes: 28970000, status: 'Voting' },
        { name: 'Rajasthan', turnout: 68.9, stations: 51693, totalVotes: 35120000, status: 'Completed' },
        { name: 'Kerala', turnout: 74.2, stations: 40771, totalVotes: 21450000, status: 'Completed' }
    ],

    statistics: {
        totalVoters: 950000000,
        votesRecorded: 567000000,
        activeStations: 1035741,
        issuesReported: 2847,
        issuesResolved: 2156,
        observersOnline: 45678,
        dataUpdatesPerMinute: 8500,
        evmsDeployed: 1800000,
        statesCompleted: 12,
        statesVoting: 16,
        statesPending: 8
    },

    discussions: [
        { id: 1, title: 'How EVM and VVPAT Work Together', author: 'ElectionExpert', replies: 145, likes: 892, category: 'Education', date: '2026-01-12' },
        { id: 2, title: 'First Time Voter Guide - Documents Needed', author: 'VoterHelper', replies: 234, likes: 1256, category: 'Guide', date: '2026-01-11' },
        { id: 3, title: 'Understanding NOTA Option', author: 'CivicEducator', replies: 89, likes: 534, category: 'Education', date: '2026-01-10' },
        { id: 4, title: 'Report: Phase 2 Voting Analysis', author: 'DataAnalyst', replies: 67, likes: 423, category: 'Report', date: '2026-01-09' },
        { id: 5, title: 'Accessibility Features at Polling Booths', author: 'AccessAdvocate', replies: 56, likes: 312, category: 'Information', date: '2026-01-08' }
    ],

    realtimeUpdates: [
        { time: '1 min ago', message: 'Maharashtra crosses 55% turnout mark', type: 'milestone', state: 'Maharashtra' },
        { time: '3 min ago', message: 'EVM issue resolved at Salt Lake booth', type: 'success', state: 'West Bengal' },
        { time: '5 min ago', message: 'New booth opened in Ahmedabad due to crowd', type: 'info', state: 'Gujarat' },
        { time: '8 min ago', message: '500 million votes milestone reached', type: 'milestone', state: 'National' },
        { time: '12 min ago', message: 'Kerala completes voting with 74.2% turnout', type: 'success', state: 'Kerala' },
        { time: '15 min ago', message: 'Queue management improved in Mumbai', type: 'success', state: 'Maharashtra' }
    ]
};

// System Users for Admin Dashboard
let systemUsers = [
    { id: 1, name: 'System Admin', username: 'admin', role: 'admin', email: 'admin@electguard.org', status: 'active', lastLogin: '2026-01-13 16:00', created: '2025-01-01' },
    { id: 2, name: 'Rahul Sharma', username: 'citizen', role: 'citizen', email: 'rahul@email.com', status: 'active', lastLogin: '2026-01-13 15:30', created: '2026-01-10' },
    { id: 3, name: 'Priya Patel', username: 'observer', role: 'observer', email: 'priya@electguard.org', status: 'active', lastLogin: '2026-01-13 14:45', created: '2025-06-15' },
    { id: 4, name: 'Amit Kumar', username: 'analyst', role: 'analyst', email: 'amit@electguard.org', status: 'active', lastLogin: '2026-01-13 16:10', created: '2025-03-20' },
    { id: 5, name: 'Neha Singh', username: 'neha_obs', role: 'observer', email: 'neha@electguard.org', status: 'active', lastLogin: '2026-01-13 12:00', created: '2025-08-10' },
    { id: 6, name: 'Vikram Joshi', username: 'vikram_analyst', role: 'analyst', email: 'vikram@electguard.org', status: 'inactive', lastLogin: '2026-01-10 09:00', created: '2025-04-05' },
    { id: 7, name: 'Anita Desai', username: 'anita_citizen', role: 'citizen', email: 'anita@email.com', status: 'active', lastLogin: '2026-01-13 11:30', created: '2026-01-05' }
];

// Export for global access
window.electionData = electionData;
window.indianVoters = indianVoters;
window.registeredUsers = registeredUsers;
window.systemUsers = systemUsers;
