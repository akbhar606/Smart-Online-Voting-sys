# 🗳️ Online Voting System

A secure, web-based voting platform built with HTML, CSS, and JavaScript. Features real-time vote tracking, admin dashboard, and user authentication.

## ✨ Features

### 🔐 User Authentication
- Secure login/registration system
- Mobile number-based authentication
- Password protection

### 🗳️ Voting System
- Real-time candidate selection
- Verification code system
- One-vote-per-user enforcement
- Vote status tracking

### 👨‍💼 Admin Dashboard
- Start/stop voting sessions
- Generate verification codes
- Add/remove candidates
- Real-time vote monitoring
- Remaining voters tracking
- Election reset functionality

### 🎮 Bonus: Jumping Game
- Interactive browser game with music support
- Customizable graphics and audio
- Score tracking and high scores

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/akbhar606/online-voting-system.git
   cd online-voting-system
   ```

2. **Open in browser**
   ```bash
   # Navigate to the project folder
   open index.html
   # or
   python -m http.server 8000
   ```

3. **Default Credentials**
   - **Admin**: ID: `yashna`, Password: `yashna123`
   - **Test Users**: Mobile: `8077488891` or `9511846836`, Password: `123`

## 📁 Project Structure

```
online-voting-system/
├── index.html              # Login page
├── register.html           # User registration
├── vote.html              # Voting interface
├── admin-login.html       # Admin login
├── admin-dashboard.html   # Admin panel
├── modi.html             # Jumping game
├── css/
│   └── style.css         # Styling
└── js/
    └── script.js         # Core functionality
```

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Storage**: LocalStorage API
- **Design**: Responsive CSS Grid/Flexbox
- **Icons**: Emoji & Unicode symbols

## 📱 Screenshots

### Login Interface
Clean, responsive login form with gradient backgrounds

### Admin Dashboard
Comprehensive admin panel with real-time statistics

### Voting Interface
User-friendly candidate selection with verification system

## 🔧 Configuration

### Adding Candidates
```javascript
// Admin can add candidates through the dashboard UI
// Or modify the default candidates in script.js
candidates = [
    { name: 'Candidate Name', position: 'Position', symbol: '🔵', votes: 0 }
];
```

### Customizing Admin Credentials
```javascript
// In script.js, modify the admin login function
if (adminId === 'yashna' && password === 'yashna123') {
    // Admin access granted
}
```

## 🚀 Deployment

### GitHub Pages
1. Push to GitHub repository
2. Go to Settings → Pages
3. Select source branch
4. Access via `https://akbhar606.github.io/online-voting-system`

### Local Server
```bash
# Python
python -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

## 🔒 Security Features

- Input validation and sanitization
- Duplicate vote prevention
- Admin authentication
- Verification code system
- Session management

## 🎯 Use Cases

- **Educational**: School/college elections
- **Corporate**: Team voting, surveys
- **Community**: Local organization decisions
- **Events**: Contest voting, polls

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@akbhar606](https://github.com/akbhar606)
- Email: ansariakbar56748@gmail.com

## 🙏 Acknowledgments

- Icons from Flaticon
- Gradient designs inspiration
- Open source community

---

⭐ **Star this repository if you found it helpful!**
