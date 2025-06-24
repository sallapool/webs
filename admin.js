// Global variables
let users = JSON.parse(localStorage.getItem('mourdakUsers')) || [];
let consultations = JSON.parse(localStorage.getItem('mourdakConsultations')) || [];
let currentSection = 'dashboard';

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check admin authentication
    if (!localStorage.getItem('mourdakAdmin')) {
        window.location.href = 'index.html';
        return;
    }
    
    // Initialize admin panel
    initializeAdmin();
    setupEventListeners();
    
    // Hide loading screen after 2 seconds
    setTimeout(hideLoadingScreen, 2000);
});

// Initialize admin panel
function initializeAdmin() {
    loadDashboardData();
    updateStats();
    loadRecentData();
}

// Hide loading screen
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Sidebar toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    
    sidebarToggle?.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    mobileMenuBtn?.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });
    
    // Search functionality
    const userSearch = document.getElementById('userSearch');
    const consultationSearch = document.getElementById('consultationSearch');
    const consultationFilter = document.getElementById('consultationFilter');
    
    userSearch?.addEventListener('input', filterUsers);
    consultationSearch?.addEventListener('input', filterConsultations);
    consultationFilter?.addEventListener('change', filterConsultations);
    
    // Modal close events
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

// Show section
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected section
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active');
        currentSection = sectionId;
        
        // Add active class to corresponding nav item
        const navLink = document.querySelector(`[onclick="showSection('${sectionId}')"]`);
        if (navLink) {
            navLink.closest('.nav-item').classList.add('active');
        }
        
        // Update page title
        updatePageTitle(sectionId);
        
        // Load section-specific data
        loadSectionData(sectionId);
    }
}

// Update page title
function updatePageTitle(sectionId) {
    const titles = {
        dashboard: 'لوحة التحكم',
        users: 'إدارة المستخدمين',
        consultations: 'إدارة الاستشارات',
        analytics: 'التحليلات والإحصائيات',
        settings: 'إعدادات النظام'
    };
    
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle && titles[sectionId]) {
        pageTitle.textContent = titles[sectionId];
    }
}

// Load section-specific data
function loadSectionData(sectionId) {
    switch (sectionId) {
        case 'dashboard':
            loadDashboardData();
            break;
        case 'users':
            loadUsersData();
            break;
        case 'consultations':
            loadConsultationsData();
            break;
        case 'analytics':
            loadAnalyticsData();
            break;
        case 'settings':
            loadSettingsData();
            break;
    }
}

// Update statistics
function updateStats() {
    const totalUsers = users.length;
    const totalConsultations = consultations.length;
    const pendingConsultations = consultations.filter(c => c.status === 'pending').length;
    const completedConsultations = consultations.filter(c => c.status === 'completed').length;
    
    // Update stat cards
    const totalUsersEl = document.getElementById('totalUsers');
    const totalConsultationsEl = document.getElementById('totalConsultations');
    const pendingConsultationsEl = document.getElementById('pendingConsultations');
    const completedConsultationsEl = document.getElementById('completedConsultations');
    
    if (totalUsersEl) totalUsersEl.textContent = totalUsers;
    if (totalConsultationsEl) totalConsultationsEl.textContent = totalConsultations;
    if (pendingConsultationsEl) pendingConsultationsEl.textContent = pendingConsultations;
    if (completedConsultationsEl) completedConsultationsEl.textContent = completedConsultations;
}

// Load dashboard data
function loadDashboardData() {
    updateStats();
    loadRecentData();
    loadConsultationsChart();
}

// Load recent data
function loadRecentData() {
    loadRecentUsers();
    loadRecentConsultations();
}

// Load recent users
function loadRecentUsers() {
    const recentUsersContainer = document.getElementById('recentUsers');
    if (!recentUsersContainer) return;
    
    const recentUsers = users.slice(-5).reverse();
    
    if (recentUsers.length === 0) {
        recentUsersContainer.innerHTML = '<p style="text-align: center; color: var(--text-light); padding: 2rem;">لا توجد مستخدمين حتى الآن</p>';
        return;
    }
    
    recentUsersContainer.innerHTML = recentUsers.map(user => `
        <div class="recent-item">
            <div class="recent-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="recent-info">
                <div class="recent-name">${user.name}</div>
                <div class="recent-details">${user.email}</div>
            </div>
            <div class="recent-time">${formatDate(user.createdAt)}</div>
        </div>
    `).join('');
}

// Load recent consultations
function loadRecentConsultations() {
    const recentConsultationsContainer = document.getElementById('recentConsultations');
    if (!recentConsultationsContainer) return;
    
    const recentConsultations = consultations.slice(-5).reverse();
    
    if (recentConsultations.length === 0) {
        recentConsultationsContainer.innerHTML = '<p style="text-align: center; color: var(--text-light); padding: 2rem;">لا توجد استشارات حتى الآن</p>';
        return;
    }
    
    recentConsultationsContainer.innerHTML = recentConsultations.map(consultation => `
        <div class="recent-item">
            <div class="recent-avatar">
                <i class="fas fa-comment"></i>
            </div>
            <div class="recent-info">
                <div class="recent-name">${consultation.name}</div>
                <div class="recent-details">${getServiceName(consultation.service)}</div>
            </div>
            <div class="recent-time">${formatDate(consultation.createdAt)}</div>
        </div>
    `).join('');
}

// Load consultations chart
function loadConsultationsChart() {
    const canvas = document.getElementById('consultationsChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Simple chart implementation
    const pending = consultations.filter(c => c.status === 'pending').length;
    const completed = consultations.filter(c => c.status === 'completed').length;
    const cancelled = consultations.filter(c => c.status === 'cancelled').length;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Draw simple bar chart
    const barWidth = canvas.width / 4;
    const maxHeight = canvas.height - 40;
    const maxValue = Math.max(pending, completed, cancelled, 1);
    
    // Draw bars
    const bars = [
        { value: pending, color: '#f59e0b', label: 'معلقة' },
        { value: completed, color: '#10b981', label: 'مكتملة' },
        { value: cancelled, color: '#ef4444', label: 'ملغية' }
    ];
    
    bars.forEach((bar, index) => {
        const height = (bar.value / maxValue) * maxHeight;
        const x = (index + 0.5) * barWidth;
        const y = canvas.height - height - 20;
        
        // Draw bar
        ctx.fillStyle = bar.color;
        ctx.fillRect(x - barWidth/4, y, barWidth/2, height);
        
        // Draw value
        ctx.fillStyle = '#1f2937';
        ctx.font = '14px Cairo';
        ctx.textAlign = 'center';
        ctx.fillText(bar.value.toString(), x, y - 5);
        
        // Draw label
        ctx.fillText(bar.label, x, canvas.height - 5);
    });
}

// Load users data
function loadUsersData() {
    const usersTableBody = document.getElementById('usersTableBody');
    if (!usersTableBody) return;
    
    if (users.length === 0) {
        usersTableBody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 2rem; color: var(--text-light);">لا توجد مستخدمين مسجلين</td></tr>';
        return;
    }
    
    usersTableBody.innerHTML = users.map(user => `
        <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${formatDate(user.createdAt)}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-sm btn-primary" onclick="viewUser(${user.id})">
                        <i class="fas fa-eye"></i>
                        عرض
                    </button>
                    <button class="btn-sm btn-danger" onclick="deleteUser(${user.id})">
                        <i class="fas fa-trash"></i>
                        حذف
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Load consultations data
function loadConsultationsData() {
    const consultationsTableBody = document.getElementById('consultationsTableBody');
    if (!consultationsTableBody) return;
    
    let filteredConsultations = [...consultations];
    
    // Apply filters
    const filter = document.getElementById('consultationFilter')?.value;
    if (filter && filter !== 'all') {
        filteredConsultations = filteredConsultations.filter(c => c.status === filter);
    }
    
    const search = document.getElementById('consultationSearch')?.value.toLowerCase();
    if (search) {
        filteredConsultations = filteredConsultations.filter(c => 
            c.name.toLowerCase().includes(search) ||
            c.email.toLowerCase().includes(search) ||
            getServiceName(c.service).toLowerCase().includes(search)
        );
    }
    
    if (filteredConsultations.length === 0) {
        consultationsTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-light);">لا توجد استشارات</td></tr>';
        return;
    }
    
    consultationsTableBody.innerHTML = filteredConsultations.map(consultation => `
        <tr>
            <td>${consultation.name}</td>
            <td>${consultation.email}</td>
            <td>${getServiceName(consultation.service)}</td>
            <td>${formatDate(consultation.createdAt)}</td>
            <td>
                <span class="status-badge status-${consultation.status || 'pending'}">
                    ${getStatusName(consultation.status || 'pending')}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn-sm btn-primary" onclick="viewConsultation(${consultation.id})">
                        <i class="fas fa-eye"></i>
                        عرض
                    </button>
                    <button class="btn-sm btn-success" onclick="updateConsultationStatus(${consultation.id}, 'completed')">
                        <i class="fas fa-check"></i>
                        إكمال
                    </button>
                    <button class="btn-sm btn-danger" onclick="deleteConsultation(${consultation.id})">
                        <i class="fas fa-trash"></i>
                        حذف
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Load analytics data
function loadAnalyticsData() {
    loadUsersGrowthChart();
    loadServicesChart();
}

// Load users growth chart
function loadUsersGrowthChart() {
    const canvas = document.getElementById('usersGrowthChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Simple line chart showing user growth over last 7 days
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        last7Days.push(date);
    }
    
    const userCounts = last7Days.map(date => {
        return users.filter(user => {
            const userDate = new Date(user.createdAt);
            return userDate.toDateString() === date.toDateString();
        }).length;
    });
    
    // Draw line chart
    const padding = 40;
    const chartWidth = canvas.width - 2 * padding;
    const chartHeight = canvas.height - 2 * padding;
    const maxValue = Math.max(...userCounts, 1);
    
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    userCounts.forEach((count, index) => {
        const x = padding + (index / (userCounts.length - 1)) * chartWidth;
        const y = padding + chartHeight - (count / maxValue) * chartHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
        
        // Draw point
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw value
        ctx.fillStyle = '#1f2937';
        ctx.font = '12px Cairo';
        ctx.textAlign = 'center';
        ctx.fillText(count.toString(), x, y - 10);
    });
    
    ctx.stroke();
}

// Load services chart
function loadServicesChart() {
    const canvas = document.getElementById('servicesChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Count services
    const serviceCounts = {};
    consultations.forEach(consultation => {
        const service = consultation.service || 'other';
        serviceCounts[service] = (serviceCounts[service] || 0) + 1;
    });
    
    const services = Object.keys(serviceCounts);
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
    
    // Draw pie chart
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    
    let currentAngle = 0;
    const total = Object.values(serviceCounts).reduce((sum, count) => sum + count, 0);
    
    services.forEach((service, index) => {
        const count = serviceCounts[service];
        const sliceAngle = (count / total) * 2 * Math.PI;
        
        // Draw slice
        ctx.fillStyle = colors[index % colors.length];
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fill();
        
        // Draw label
        const labelAngle = currentAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(labelAngle) * (radius + 30);
        const labelY = centerY + Math.sin(labelAngle) * (radius + 30);
        
        ctx.fillStyle = '#1f2937';
        ctx.font = '12px Cairo';
        ctx.textAlign = 'center';
        ctx.fillText(getServiceName(service), labelX, labelY);
        ctx.fillText(`(${count})`, labelX, labelY + 15);
        
        currentAngle += sliceAngle;
    });
}

// Load settings data
function loadSettingsData() {
    // Settings are mostly static for this demo
    console.log('Settings loaded');
}

// Filter functions
function filterUsers() {
    const search = document.getElementById('userSearch').value.toLowerCase();
    const rows = document.querySelectorAll('#usersTableBody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(search) ? '' : 'none';
    });
}

function filterConsultations() {
    loadConsultationsData(); // Reload with filters applied
}

// View functions
function viewUser(userId) {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    
    alert(`معلومات المستخدم:\n\nالاسم: ${user.name}\nالبريد الإلكتروني: ${user.email}\nرقم الهاتف: ${user.phone}\nتاريخ التسجيل: ${formatDate(user.createdAt)}`);
}

function viewConsultation(consultationId) {
    const consultation = consultations.find(c => c.id === consultationId);
    if (!consultation) return;
    
    const modal = document.getElementById('consultationModal');
    const content = document.getElementById('consultationModalContent');
    
    if (modal && content) {
        content.innerHTML = `
            <div class="consultation-detail">
                <div class="consultation-header">
                    <h2>تفاصيل الاستشارة</h2>
                    <span class="status-badge status-${consultation.status || 'pending'}">
                        ${getStatusName(consultation.status || 'pending')}
                    </span>
                </div>
                
                <div class="consultation-info">
                    <div class="info-item">
                        <span class="info-label">الاسم</span>
                        <span class="info-value">${consultation.name}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">البريد الإلكتروني</span>
                        <span class="info-value">${consultation.email}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">رقم الهاتف</span>
                        <span class="info-value">${consultation.phone}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">الخدمة المطلوبة</span>
                        <span class="info-value">${getServiceName(consultation.service)}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">تاريخ الطلب</span>
                        <span class="info-value">${formatDate(consultation.createdAt)}</span>
                    </div>
                </div>
                
                <div class="consultation-message">
                    <h4>تفاصيل الطلب:</h4>
                    <p>${consultation.message}</p>
                </div>
                
                <div class="consultation-actions">
                    <button class="btn-primary" onclick="updateConsultationStatus(${consultation.id}, 'completed'); closeModal('consultationModal');">
                        <i class="fas fa-check"></i>
                        تم الإكمال
                    </button>
                    <button class="btn-secondary" onclick="updateConsultationStatus(${consultation.id}, 'cancelled'); closeModal('consultationModal');">
                        <i class="fas fa-times"></i>
                        إلغاء
                    </button>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
    }
}

// Update consultation status
function updateConsultationStatus(consultationId, status) {
    const consultationIndex = consultations.findIndex(c => c.id === consultationId);
    if (consultationIndex !== -1) {
        consultations[consultationIndex].status = status;
        localStorage.setItem('mourdakConsultations', JSON.stringify(consultations));
        
        // Reload current section data
        loadSectionData(currentSection);
        updateStats();
        
        showNotification(`تم تحديث حالة الاستشارة إلى: ${getStatusName(status)}`, 'success');
    }
}

// Delete functions
function deleteUser(userId) {
    if (confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
        users = users.filter(u => u.id !== userId);
        localStorage.setItem('mourdakUsers', JSON.stringify(users));
        
        loadUsersData();
        updateStats();
        showNotification('تم حذف المستخدم بنجاح', 'success');
    }
}

function deleteConsultation(consultationId) {
    if (confirm('هل أنت متأكد من حذف هذه الاستشارة؟')) {
        consultations = consultations.filter(c => c.id !== consultationId);
        localStorage.setItem('mourdakConsultations', JSON.stringify(consultations));
        
        loadConsultationsData();
        updateStats();
        showNotification('تم حذف الاستشارة بنجاح', 'success');
    }
}

// Export data
function exportData() {
    const data = {
        users: users,
        consultations: consultations,
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `mourdak-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showNotification('تم تصدير البيانات بنجاح', 'success');
}

// Clear data
function clearData() {
    if (confirm('هل أنت متأكد من مسح جميع البيانات؟ هذا الإجراء لا يمكن التراجع عنه.')) {
        if (confirm('تأكيد أخير: سيتم مسح جميع المستخدمين والاستشارات!')) {
            localStorage.removeItem('mourdakUsers');
            localStorage.removeItem('mourdakConsultations');
            
            users = [];
            consultations = [];
            
            // Reload current section
            loadSectionData(currentSection);
            updateStats();
            
            showNotification('تم مسح جميع البيانات', 'success');
        }
    }
}

// Logout
function logout() {
    if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
        localStorage.removeItem('mourdakAdmin');
        window.location.href = 'index.html';
    }
}

// Modal functions
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function getServiceName(serviceKey) {
    const serviceNames = {
        import: 'الاستيراد',
        inspection: 'الفحص',
        representation: 'التمثيل',
        compliance: 'الامتثال',
        documentation: 'التوثيق',
        shipping: 'الشحن',
        pricing: 'خطة تسعيرية',
        marketing: 'خطة تسويقية',
        feasibility: 'دراسة جدوى',
        other: 'أخرى'
    };
    
    return serviceNames[serviceKey] || 'غير محدد';
}

function getStatusName(status) {
    const statusNames = {
        pending: 'معلقة',
        completed: 'مكتملة',
        cancelled: 'ملغية'
    };
    
    return statusNames[status] || 'غير محدد';
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles if not exist
    if (!document.getElementById('notificationStyles')) {
        const style = document.createElement('style');
        style.id = 'notificationStyles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                left: 20px;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 10000;
                animation: slideInLeft 0.3s ease;
            }
            .notification-success { background: var(--success-color); }
            .notification-error { background: var(--error-color); }
            .notification-info { background: var(--primary-color); }
            @keyframes slideInLeft {
                from { transform: translateX(-100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInLeft 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Export functions for global access
window.showSection = showSection;
window.viewUser = viewUser;
window.viewConsultation = viewConsultation;
window.updateConsultationStatus = updateConsultationStatus;
window.deleteUser = deleteUser;
window.deleteConsultation = deleteConsultation;
window.exportData = exportData;
window.clearData = clearData;
window.logout = logout;
window.closeModal = closeModal;