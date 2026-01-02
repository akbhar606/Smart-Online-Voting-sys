// Data Storage
let users = [];
let candidates = [];
let votingActive = false;
let verificationCode = '';
let currentUser = null;
let selectedCandidateIndex = null;

// Initialize with sample data
function initializeData() {
    // Sample users
    users = [
        { name: 'Shahebaz', email: 'pathanshahebazkk@gmail.com', mobile: '8077488891', dob: '09/21/2021', password: '123', address: 'Mumbai', hasVoted: false },
        { name: 'Deepak', email: 'deepak@gmail.com', mobile: '9511846836', dob: '01/15/2000', password: '123', address: 'Delhi', hasVoted: false }
    ];
    
    // Sample candidates
    candidates = [
        { name: 'Shahebaz', position: 'MLA', symbol: '🔵', votes: 0 },
        { name: 'Sohel', position: 'MLA', symbol: '⭕', votes: 0 },
        { name: 'Faizan', position: 'MLA', symbol: '🔶', votes: 0 }
    ];
    
    // Save to localStorage
    saveData();
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('votingUsers', JSON.stringify(users));
    localStorage.setItem('votingCandidates', JSON.stringify(candidates));
    localStorage.setItem('votingActive', JSON.stringify(votingActive));
    localStorage.setItem('verificationCode', verificationCode);
}

// Load data from localStorage
function loadData() {
    const savedUsers = localStorage.getItem('votingUsers');
    const savedCandidates = localStorage.getItem('votingCandidates');
    const savedVotingActive = localStorage.getItem('votingActive');
    const savedCode = localStorage.getItem('verificationCode');
    
    if (savedUsers) {
        users = JSON.parse(savedUsers);
    } else {
        initializeData();
    }
    
    if (savedCandidates) {
        candidates = JSON.parse(savedCandidates);
    }
    
    if (savedVotingActive) {
        votingActive = JSON.parse(savedVotingActive);
    }
    
    if (savedCode) {
        verificationCode = savedCode;
    }
}

// User Login (index.html)
function handleUserLogin() {
    loadData();
    
    const mobile = document.getElementById('loginMobile').value;
    const password = document.getElementById('loginPassword').value;
    const errorDiv = document.getElementById('loginError');
    
    if (!mobile || !password) {
        errorDiv.textContent = 'Please enter mobile and password!';
        errorDiv.style.display = 'block';
        return;
    }
    
    const user = users.find(u => u.mobile === mobile && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'vote.html';
    } else {
        errorDiv.textContent = 'Invalid mobile number or password!';
        errorDiv.style.display = 'block';
    }
}

// User Registration (register.html)
function handleRegister() {
    loadData();
    
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const mobile = document.getElementById('regMobile').value;
    const dob = document.getElementById('regDob').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    const address = document.getElementById('regAddress').value;
    
    const errorDiv = document.getElementById('regError');
    const successDiv = document.getElementById('regSuccess');
    
    // Reset messages
    errorDiv.style.display = 'none';
    successDiv.style.display = 'none';
    
    // Validation
    if (!name || !email || !mobile || !dob || !password || !address) {
        errorDiv.textContent = 'Please fill all required fields!';
        errorDiv.style.display = 'block';
        return;
    }
    
    if (password !== confirmPassword) {
        errorDiv.textContent = 'Passwords do not match!';
        errorDiv.style.display = 'block';
        return;
    }
    
    // Check if mobile already exists
    if (users.find(u => u.mobile === mobile)) {
        errorDiv.textContent = 'Mobile number already registered!';
        errorDiv.style.display = 'block';
        return;
    }
    
    // Create new user
    const newUser = {
        name: name,
        email: email,
        mobile: mobile,
        dob: dob,
        password: password,
        address: address,
        hasVoted: false
    };
    
    users.push(newUser);
    saveData();
    
    successDiv.textContent = 'Registration successful! Redirecting to login...';
    successDiv.style.display = 'block';
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

// Admin Login (admin-login.html)
function handleAdminLogin() {
    const adminId = document.getElementById('adminId').value;
    const password = document.getElementById('adminPassword').value;
    const errorDiv = document.getElementById('adminError');
    
    // Default admin credentials
    if (adminId === 'yashna' && password === 'yashna123') {
        localStorage.setItem('isAdmin', 'true');
        window.location.href = 'admin-dashboard.html';
    } else {
        errorDiv.textContent = 'Invalid Admin ID or Password!';
        errorDiv.style.display = 'block';
    }
}

// Load Vote Page (vote.html)
function loadVotePage() {
    loadData();
    
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) {
        window.location.href = 'index.html';
        return;
    }
    
    currentUser = JSON.parse(userStr);
    
    // Update user from users array (in case voted status changed)
    const updatedUser = users.find(u => u.mobile === currentUser.mobile);
    if (updatedUser) {
        currentUser = updatedUser;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    
    // Display user info
    document.getElementById('voterName').textContent = currentUser.name;
    document.getElementById('voterMobile').textContent = currentUser.mobile;
    document.getElementById('voterAddress').textContent = currentUser.address;
    document.getElementById('voterDob').textContent = currentUser.dob;
    
    const statusSpan = document.getElementById('voterStatus');
    if (currentUser.hasVoted) {
        statusSpan.textContent = 'Voted';
        statusSpan.style.color = '#4CAF50';
    } else {
        statusSpan.textContent = 'Not Voted';
        statusSpan.style.color = '#f44336';
    }
    
    // Display candidates
    displayCandidates();
}

// Display Candidates (vote.html)
function displayCandidates() {
    const container = document.getElementById('candidatesList');
    
    if (candidates.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#666;">No candidates available yet.</p>';
        return;
    }
    
    container.innerHTML = '';
    
    candidates.forEach((candidate, index) => {
        const card = document.createElement('div');
        card.className = 'candidate-card';
        card.id = `candidate-${index}`;
        
        if (currentUser.hasVoted) {
            card.style.cursor = 'not-allowed';
            card.style.opacity = '0.6';
        } else {
            card.onclick = () => selectCandidate(index);
        }
        
        card.innerHTML = `
            <div class="candidate-info">
                <div class="candidate-symbol">${candidate.symbol || '📋'}</div>
                <div class="candidate-details">
                    <h4>${candidate.position}</h4>
                    <p>( ${candidate.name} )</p>
                </div>
            </div>
            <button class="btn-vote" ${currentUser.hasVoted ? 'disabled' : ''}>Vote</button>
        `;
        
        container.appendChild(card);
    });
}

// Select Candidate
function selectCandidate(index) {
    if (currentUser.hasVoted) {
        alert('You have already voted!');
        return;
    }
    
    // Remove selection from all cards
    document.querySelectorAll('.candidate-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selection to clicked card
    document.getElementById(`candidate-${index}`).classList.add('selected');
    selectedCandidateIndex = index;
}

// Get Verification Code
function getVerificationCode() {
    loadData();
    
    if (!verificationCode) {
        alert('Verification code has not been generated yet!\n\nPlease ask the admin to generate a code.');
        return;
    }
    
    // Show code on page
    document.getElementById('codeDisplay').style.display = 'block';
    document.getElementById('displayedCode').textContent = verificationCode;
    
    alert(`Your verification code is: ${verificationCode}\n\nThe code is also displayed below.`);
}

// Verify and Vote
function verifyAndVote() {
    loadData();
    
    if (currentUser.hasVoted) {
        alert('You have already voted!');
        return;
    }
    
    if (selectedCandidateIndex === null) {
        alert('Please select a candidate first!');
        return;
    }
    
    const enteredCode = document.getElementById('verifyCode').value;
    
    if (!enteredCode) {
        alert('Please enter the verification code!');
        return;
    }
    
    if (!verificationCode) {
        alert('Verification code has not been generated by admin!');
        return;
    }
    
    if (enteredCode !== verificationCode) {
        alert('Invalid verification code! Please check and try again.');
        return;
    }
    
    // Cast vote
    candidates[selectedCandidateIndex].votes += 1;
    
    // Mark user as voted
    currentUser.hasVoted = true;
    const userIndex = users.findIndex(u => u.mobile === currentUser.mobile);
    if (userIndex !== -1) {
        users[userIndex].hasVoted = true;
    }
    
    // Save data
    saveData();
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    alert('Vote cast successfully! Thank you for voting.');
    
    // Reload page to update status
    window.location.reload();
}

// Load Admin Dashboard (admin-dashboard.html)
function loadAdminDashboard() {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
        window.location.href = 'index.html';
        return;
    }
    
    loadData();
    updateVotingStatus();
    displayCandidatesAdmin();
    displayRemainingVoters();
}

// Toggle Voting
function toggleVoting() {
    votingActive = !votingActive;
    saveData();
    
    const btn = document.getElementById('toggleVotingBtn');
    if (votingActive) {
        btn.textContent = 'Stop Voting';
        btn.classList.remove('btn-start');
        btn.classList.add('stop');
        alert('Voting has been started!');
    } else {
        btn.textContent = 'Start Voting';
        btn.classList.add('btn-start');
        btn.classList.remove('stop');
        alert('Voting has been stopped!');
    }
    
    updateVotingStatus();
}

// Update Voting Status
function updateVotingStatus() {
    const container = document.getElementById('votingStatusContent');
    
    if (votingActive) {
        const votedCount = users.filter(u => u.hasVoted).length;
        const totalUsers = users.length;
        
        container.innerHTML = `
            <p style="font-size: 2.5em; font-weight: bold; margin: 20px 0;">${votedCount} / ${totalUsers}</p>
            <p style="font-size: 1.2em;">Votes done</p>
            <p style="color: #f44336; font-weight: bold; font-size: 1.3em; margin-top: 20px;">Remaining votes</p>
        `;
    } else {
        container.innerHTML = `
            <p>No status available.<br>Soon data will be available when election process is started.</p>
            <p class="status-instructions">Click on <strong>Start Voting</strong> button to start election process.<br>Click <strong>Stop Voting</strong> button to stop election process.</p>
        `;
    }
}

// Generate Verification Code
function generateVerificationCode() {
    verificationCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    saveData();
    
    document.getElementById('generatedCodeDisplay').textContent = verificationCode;
    alert(`Verification code generated: ${verificationCode}`);
}

// Add Candidate
function addCandidate() {
    const name = document.getElementById('candName').value;
    const position = document.getElementById('candPosition').value;
    const symbol = document.getElementById('candSymbol').value;
    
    if (!name || !position) {
        alert('Please enter Name and Position!');
        return;
    }
    
    const newCandidate = {
        name: name,
        position: position,
        symbol: symbol || '📋',
        votes: 0
    };
    
    candidates.push(newCandidate);
    saveData();
    
    // Clear inputs
    document.getElementById('candName').value = '';
    document.getElementById('candPosition').value = '';
    document.getElementById('candSymbol').value = '';
    
    alert('Candidate added successfully!');
    displayCandidatesAdmin();
}

// Display Candidates in Admin Panel
function displayCandidatesAdmin() {
    const container = document.getElementById('candidatesListAdmin');
    
    if (candidates.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#666; padding: 20px;">No candidates added yet. Add candidates using the form above.</p>';
        return;
    }
    
    container.innerHTML = '';
    
    candidates.forEach((candidate, index) => {
        const item = document.createElement('div');
        item.className = 'candidate-admin-item';
        
        item.innerHTML = `
            <div class="candidate-admin-info">
                <span class="candidate-admin-symbol">${candidate.symbol || '📋'}</span>
                <span><strong>${candidate.name}</strong> - ${candidate.position}</span>
            </div>
            <div class="candidate-admin-details">
                <span style="color: #4CAF50; font-weight: bold;">Votes: ${candidate.votes}</span>
                <button class="btn-remove" onclick="removeCandidate(${index})">Remove</button>
            </div>
        `;
        
        container.appendChild(item);
    });
}

// Remove Candidate
function removeCandidate(index) {
    const candidate = candidates[index];
    
    if (confirm(`Are you sure you want to remove ${candidate.name}?`)) {
        candidates.splice(index, 1);
        saveData();
        alert(`${candidate.name} has been removed successfully!`);
        displayCandidatesAdmin();
    }
}

// Display Remaining Voters
function displayRemainingVoters() {
    const tbody = document.getElementById('votersTableBody');
    const remainingVoters = users.filter(u => !u.hasVoted);
    
    if (remainingVoters.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align:center; color:#666;">All users have voted!</td></tr>';
        return;
    }
    
    tbody.innerHTML = '';
    
    remainingVoters.forEach((voter, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${voter.name}</td>
            <td>${voter.mobile}</td>
        `;
        tbody.appendChild(row);
    });
}

// Reset Election
function resetElection() {
    if (!confirm('Are you sure you want to reset the election?\n\nThis will:\n- Reset all vote counts to 0\n- Mark all users as "Not Voted"\n- Stop voting')) {
        return;
    }
    
    // Reset all candidate votes
    candidates = candidates.map(c => ({ ...c, votes: 0 }));
    
    // Reset all users' voting status
    users = users.map(u => ({ ...u, hasVoted: false }));
    
    // Stop voting
    votingActive = false;
    
    saveData();
    
    alert('Election has been reset successfully!');
    window.location.reload();
}

// Edit Title
function editTitle() {
    const newTitle = prompt('Enter new title:', 'Online Voting System');
    if (newTitle) {
        document.querySelectorAll('.header-title').forEach(el => {
            el.textContent = newTitle;
        });
        alert('Title updated! (Note: This change is temporary and will reset on page reload)');
    }
}

// Change Logo
function changeLogo() {
    const newLogoUrl = prompt('Enter new logo URL:', 'https://cdn-icons-png.flaticon.com/512/1828/1828640.png');
    if (newLogoUrl) {
        document.querySelectorAll('img[alt="Logo"], img[alt="Voting"]').forEach(img => {
            img.src = newLogoUrl;
        });
        alert('Logo updated! (Note: This change is temporary and will reset on page reload)');
    }
}

// Logout
function handleLogout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAdmin');
    window.location.href = 'index.html';
}

// Initialize data on first load
if (!localStorage.getItem('votingUsers')) {
    initializeData();
}    