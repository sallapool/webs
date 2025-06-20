// Admin Dashboard Manager
class AdminDashboard {
    constructor() {
        this.users = [];
        this.consultations = [];
        this.activities = [];
        this.currentConsultation = null;
        this.init();
    }

    init() {
        this.loadData();
        this.bindEvents();
        this.updateStats();
        this.renderUsers();
        this.renderConsultations();
        this.renderActivities();
        this.startAutoRefresh();
    }

    loadData() {
        // Load users from localStorage
        this.users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        
        // Load consultations from localStorage
        this.consultations = JSON.parse(localStorage.getItem('consultations') || '[]');
        
        // Load activities from localStorage
        this.activities = JSON.parse(localStorage.getItem('adminActivities') || '[]');
        
        // Add some sample data if empty
        if (this.users.length === 0) {
            this.addSampleData();
        }
    }

    addSampleData() {
        const sampleUsers = [
            {
                name: 'أحمد محمد',
                email: 'ahmed@example.com',
                phone: '+966501234567',
                registrationTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
            },
            {
                name: 'فاطمة علي',
                email: 'fatima@example.com',
                phone: '+966507654321',
                registrationTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                lastLogin: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                name: 'محمد السعيد',
                email: 'mohammed@example.com',
                phone: '+966509876543',
                registrationTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                lastLogin: new Date(Date.now() - 30 * 60 * 1000).toISOString()
            }
        ];

        const sampleConsultations = [
            {
                name: 'سارة أحمد',
                email: 'sara@example.com',
                phone: '+966501111111',
                service: 'import',
                message: 'أريد استيراد منتجات إلكترونية من الصين، ما هي الخطوات المطلوبة؟',
                submissionTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                status: 'pending'
            },
            {
                name: 'خالد محمد',
                email: 'khalid@example.com',
                phone: '+966502222222',
                service: 'inspection',
                message: 'أحتاج خدمة فحص للمنتجات قبل الشحن',
                submissionTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                status: 'processed'
            }
        ];

        this.users = sampleUsers;
        this.consultations = sampleConsultations;
        
        localStorage.setItem('registeredUsers', JSON.stringify(this.users));
        localStorage.setItem('consultations', JSON.stringify(this.consultations));
        
        // Add sample activities
        this.addActivity('register', 'تم تسجيل مستخدم جديد: أحمد محمد');
        this.addActivity('consultation', 'طلب استشارة جديد من: سارة أحمد');
        this.addActivity('login', 'تسجيل دخول: فاطمة علي');
    }

    bindEvents() {
        // Logout button
        document.getElementById('logout-btn').addEventListener('click', () => {
            this.logout();
        });

        // Refresh buttons
        document.getElementById('refresh-users').addEventListener('click', () => {
            this.refreshUsers();
        });

        document.getElementById('refresh-consultations').addEventListener('click', () => {
            this.refreshConsultations();
        });

        // Export buttons
        document.getElementById('export-users').addEventListener('click', () => {
            this.exportUsers();
        });

        document.getElementById('export-consultations').addEventListener('click', () => {
            this.exportConsultations();
        });

        // Clear activity log
        document.getElementById('clear-activity').addEventListener('click', () => {
            this.clearActivityLog();
        });

        // Modal events
        document.querySelector('.close-btn').addEventListener('click', () => {
            this.hideModal();
        });

        document.getElementById('close-modal').addEventListener('click', () => {
            this.hideModal();
        });

        document.getElementById('mark-processed').addEventListener('click', () => {
            this.markConsultationProcessed();
        });

        // Close modal on outside click
        document.getElementById('consultation-modal').addEventListener('click', (e) => {
            if (e.target.id === 'consultation-modal') {
                this.hideModal();
            }
        });
    }

    updateStats() {
        const totalUsers = this.users.length;
        const totalConsultations = this.consultations.length;
        const totalLogins = this.users.filter(user => user.lastLogin).length;
        const activeUsers = this.users.filter(user => {
            if (!user.lastLogin) return false;
            const lastLogin = new Date(user.lastLogin);
            const now = new Date();
            const diffHours = (now - lastLogin) / (1000 * 60 * 60);
            return diffHours < 24; // Active in last 24 hours
        }).length;

        document.getElementById('total-users').textContent = totalUsers;
        document.getElementById('total-consultations').textContent = totalConsultations;
        document.getElementById('total-logins').textContent = totalLogins;
        document.getElementById('active-users').textContent = activeUsers;

        // Animate numbers
        this.animateNumbers();
    }

    animateNumbers() {
        const numbers = document.querySelectorAll('.stat-content h3');
        numbers.forEach(number => {
            const target = parseInt(number.textContent);
            let current = 0;
            const increment = target / 20;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                number.textContent = Math.floor(current);
            }, 50);
        });
    }

    renderUsers() {
        const tbody = document.getElementById('users-tbody');
        tbody.innerHTML = '';

        if (this.users.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="empty-state">
                        <i class="fas fa-users"></i>
                        <h3>لا توجد مستخدمين</h3>
                        <p>لم يتم تسجيل أي مستخدمين بعد</p>
                    </td>
                </tr>
            `;
            return;
        }

        this.users.forEach((user, index) => {
            const registrationDate = new Date(user.registrationTime).toLocaleDateString('ar-SA');
            const lastLoginDate = user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('ar-SA') : 'لم يسجل دخول';
            const isActive = user.lastLogin && (new Date() - new Date(user.lastLogin)) < (24 * 60 * 60 * 1000);

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.name || 'غير محدد'}</td>
                <td>${user.email}</td>
                <td>${user.phone || 'غير محدد'}</td>
                <td>${registrationDate}</td>
                <td>${lastLoginDate}</td>
                <td>
                    <span class="status-badge ${isActive ? 'active' : 'inactive'}">
                        <i class="fas ${isActive ? 'fa-circle' : 'fa-circle'}"></i>
                        ${isActive ? 'نشط' : 'غير نشط'}
                    </span>
                </td>
                <td>
                    <button class="action-btn edit" onclick="adminDashboard.editUser(${index})">
                        <i class="fas fa-edit"></i>
                        تعديل
                    </button>
                    <button class="action-btn delete" onclick="adminDashboard.deleteUser(${index})">
                        <i class="fas fa-trash"></i>
                        حذف
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    renderConsultations() {
        const tbody = document.getElementById('consultations-tbody');
        tbody.innerHTML = '';

        if (this.consultations.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="empty-state">
                        <i class="fas fa-comments"></i>
                        <h3>لا توجد طلبات استشارة</h3>
                        <p>لم يتم تقديم أي طلبات استشارة بعد</p>
                    </td>
                </tr>
            `;
            return;
        }

        this.consultations.forEach((consultation, index) => {
            const submissionDate = new Date(consultation.submissionTime).toLocaleDateString('ar-SA');
            const serviceNames = {
                'import': 'الاستيراد',
                'inspection': 'الفحص',
                'representation': 'التمثيل',
                'compliance': 'الامتثال',
                'documentation': 'التوثيق',
                'shipping': 'الشحن',
                'pricing': 'خطة تسعيرية',
                'marketing': 'خطة تسويقية',
                'feasibility': 'دراسة جدوى'
            };

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${consultation.name}</td>
                <td>${consultation.email}</td>
                <td>${consultation.phone}</td>
                <td>${serviceNames[consultation.service] || consultation.service}</td>
                <td>${submissionDate}</td>
                <td>
                    <span class="status-badge ${consultation.status || 'pending'}">
                        <i class="fas ${consultation.status === 'processed' ? 'fa-check-circle' : 'fa-clock'}"></i>
                        ${consultation.status === 'processed' ? 'تم المعالجة' : 'في الانتظار'}
                    </span>
                </td>
                <td>
                    <button class="action-btn view" onclick="adminDashboard.viewConsultation(${index})">
                        <i class="fas fa-eye"></i>
                        عرض
                    </button>
                    <button class="action-btn delete" onclick="adminDashboard.deleteConsultation(${index})">
                        <i class="fas fa-trash"></i>
                        حذف
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    renderActivities() {
        const activityLog = document.getElementById('activity-log');
        activityLog.innerHTML = '';

        if (this.activities.length === 0) {
            activityLog.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-history"></i>
                    <h3>لا توجد نشاطات</h3>
                    <p>لم يتم تسجيل أي نشاطات بعد</p>
                </div>
            `;
            return;
        }

        this.activities.slice(-10).reverse().forEach(activity => {
            const activityTime = new Date(activity.timestamp).toLocaleString('ar-SA');
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            activityItem.innerHTML = `
                <div class="activity-icon ${activity.type}">
                    <i class="fas ${this.getActivityIcon(activity.type)}"></i>
                </div>
                <div class="activity-content">
                    <h4>${activity.message}</h4>
                    <p>${activity.details || ''}</p>
                </div>
                <div class="activity-time">${activityTime}</div>
            `;
            activityLog.appendChild(activityItem);
        });
    }

    getActivityIcon(type) {
        const icons = {
            'login': 'fa-sign-in-alt',
            'register': 'fa-user-plus',
            'consultation': 'fa-comments',
            'admin': 'fa-cog'
        };
        return icons[type] || 'fa-info-circle';
    }

    viewConsultation(index) {
        this.currentConsultation = index;
        const consultation = this.consultations[index];
        
        const serviceNames = {
            'import': 'الاستيراد',
            'inspection': 'الفحص',
            'representation': 'التمثيل',
            'compliance': 'الامتثال',
            'documentation': 'التوثيق',
            'shipping': 'الشحن',
            'pricing': 'خطة تسعيرية',
            'marketing': 'خطة تسويقية',
            'feasibility': 'دراسة جدوى'
        };

        const detailsContainer = document.getElementById('consultation-details');
        detailsContainer.innerHTML = `
            <div class="detail-item">
                <div class="detail-label">الاسم:</div>
                <div class="detail-value">${consultation.name}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">البريد الإلكتروني:</div>
                <div class="detail-value">${consultation.email}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">رقم الهاتف:</div>
                <div class="detail-value">${consultation.phone}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">نوع الخدمة:</div>
                <div class="detail-value">${serviceNames[consultation.service] || consultation.service}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">تاريخ الطلب:</div>
                <div class="detail-value">${new Date(consultation.submissionTime).toLocaleString('ar-SA')}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">الحالة:</div>
                <div class="detail-value">
                    <span class="status-badge ${consultation.status || 'pending'}">
                        ${consultation.status === 'processed' ? 'تم المعالجة' : 'في الانتظار'}
                    </span>
                </div>
            </div>
            <div class="detail-item">
                <div class="detail-label">تفاصيل الاستشارة:</div>
                <div class="detail-value">${consultation.message}</div>
            </div>
        `;

        this.showModal();
    }

    markConsultationProcessed() {
        if (this.currentConsultation !== null) {
            this.consultations[this.currentConsultation].status = 'processed';
            localStorage.setItem('consultations', JSON.stringify(this.consultations));
            this.renderConsultations();
            this.addActivity('admin', `تم معالجة طلب استشارة: ${this.consultations[this.currentConsultation].name}`);
            this.hideModal();
            this.showNotification('تم تحديث حالة الطلب إلى "تم المعالجة"', 'success');
        }
    }

    editUser(index) {
        const user = this.users[index];
        const newName = prompt('تعديل الاسم:', user.name || '');
        const newPhone = prompt('تعديل رقم الهاتف:', user.phone || '');
        
        if (newName !== null) {
            this.users[index].name = newName;
        }
        if (newPhone !== null) {
            this.users[index].phone = newPhone;
        }
        
        localStorage.setItem('registeredUsers', JSON.stringify(this.users));
        this.renderUsers();
        this.addActivity('admin', `تم تعديل بيانات المستخدم: ${user.email}`);
        this.showNotification('تم تحديث بيانات المستخدم بنجاح', 'success');
    }

    deleteUser(index) {
        const user = this.users[index];
        if (confirm(`هل أنت متأكد من حذف المستخدم: ${user.email}؟`)) {
            this.users.splice(index, 1);
            localStorage.setItem('registeredUsers', JSON.stringify(this.users));
            this.renderUsers();
            this.updateStats();
            this.addActivity('admin', `تم حذف المستخدم: ${user.email}`);
            this.showNotification('تم حذف المستخدم بنجاح', 'success');
        }
    }

    deleteConsultation(index) {
        const consultation = this.consultations[index];
        if (confirm(`هل أنت متأكد من حذف طلب الاستشارة من: ${consultation.name}؟`)) {
            this.consultations.splice(index, 1);
            localStorage.setItem('consultations', JSON.stringify(this.consultations));
            this.renderConsultations();
            this.updateStats();
            this.addActivity('admin', `تم حذف طلب استشارة: ${consultation.name}`);
            this.showNotification('تم حذف طلب الاستشارة بنجاح', 'success');
        }
    }

    refreshUsers() {
        this.loadData();
        this.renderUsers();
        this.updateStats();
        this.showNotification('تم تحديث قائمة المستخدمين', 'success');
    }

    refreshConsultations() {
        this.loadData();
        this.renderConsultations();
        this.updateStats();
        this.showNotification('تم تحديث قائمة طلبات الاستشارة', 'success');
    }

    exportUsers() {
        const csvContent = this.generateCSV(this.users, [
            { key: 'name', label: 'الاسم' },
            { key: 'email', label: 'البريد الإلكتروني' },
            { key: 'phone', label: 'رقم الهاتف' },
            { key: 'registrationTime', label: 'تاريخ التسجيل' },
            { key: 'lastLogin', label: 'آخر دخول' }
        ]);
        this.downloadCSV(csvContent, 'users.csv');
        this.showNotification('تم تصدير قائمة المستخدمين', 'success');
    }

    exportConsultations() {
        const csvContent = this.generateCSV(this.consultations, [
            { key: 'name', label: 'الاسم' },
            { key: 'email', label: 'البريد الإلكتروني' },
            { key: 'phone', label: 'رقم الهاتف' },
            { key: 'service', label: 'نوع الخدمة' },
            { key: 'submissionTime', label: 'تاريخ الطلب' },
            { key: 'status', label: 'الحالة' },
            { key: 'message', label: 'الرسالة' }
        ]);
        this.downloadCSV(csvContent, 'consultations.csv');
        this.showNotification('تم تصدير قائمة طلبات الاستشارة', 'success');
    }

    generateCSV(data, columns) {
        const headers = columns.map(col => col.label).join(',');
        const rows = data.map(item => 
            columns.map(col => {
                let value = item[col.key] || '';
                if (typeof value === 'string' && value.includes(',')) {
                    value = `"${value}"`;
                }
                return value;
            }).join(',')
        );
        return [headers, ...rows].join('\n');
    }

    downloadCSV(content, filename) {
        const blob = new Blob(['\ufeff' + content], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    clearActivityLog() {
        if (confirm('هل أنت متأكد من مسح سجل النشاطات؟')) {
            this.activities = [];
            localStorage.setItem('adminActivities', JSON.stringify(this.activities));
            this.renderActivities();
            this.showNotification('تم مسح سجل النشاطات', 'success');
        }
    }

    addActivity(type, message, details = '') {
        const activity = {
            type: type,
            message: message,
            details: details,
            timestamp: new Date().toISOString()
        };
        this.activities.push(activity);
        localStorage.setItem('adminActivities', JSON.stringify(this.activities));
        this.renderActivities();
    }

    showModal() {
        document.getElementById('consultation-modal').classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    hideModal() {
        document.getElementById('consultation-modal').classList.remove('show');
        document.body.style.overflow = '';
        this.currentConsultation = null;
    }

    logout() {
        if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
            window.location.href = 'index.html';
        }
    }

    startAutoRefresh() {
        // Auto refresh every 30 seconds
        setInterval(() => {
            this.loadData();
            this.updateStats();
        }, 30000);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#3b82f6'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideInRight 0.3s ease;
            max-width: 400px;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize admin dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.adminDashboard = new AdminDashboard();
    
    // Add custom styles for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});