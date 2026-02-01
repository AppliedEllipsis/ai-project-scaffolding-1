// Project Status Badge Controller
// Manages status badge visibility and animation based on project state

class ProjectStatusBadge {
  constructor() {
    this.badge = document.getElementById('status-badge');
    this.icon = this.badge ? this.badge.querySelector('.status-icon') : null;
    this.text = this.badge ? this.badge.querySelector('.status-text') : null;
    this.currentState = 'idle';
    this.updateInterval = null;
    
    // Define states
    this.states = {
      idle: { icon: '🔄', text: 'Idle', animation: false },
      updating: { icon: '⏳', text: 'Updating...', animation: 'pulse' },
      processing: { icon: '⚙', text: 'Processing', animation: 'pulse' }
    };
    
    this.init();
  }
  
  init() {
    if (!this.badge) return;
    
    // Check for existing state in localStorage
    const savedState = localStorage.getItem('project-status');
    if (savedState && savedState !== 'idle') {
      this.setState(savedState);
    }
    
    // Show badge initially
    this.badge.style.display = 'inline-flex';
  }
  
  setState(state) {
    if (!this.badge || !this.states[state]) {
      return;
    }
    
    this.currentState = state;
    
    // Update icon and text
    this.icon.textContent = this.states[state].icon;
    this.text.textContent = this.states[state].text;
    
    // Update animation
    this.updateAnimation(state);
    
    // Save to localStorage
    localStorage.setItem('project-status', state);
    
    // Clear any existing timeouts
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }
  
  updateAnimation(state) {
    if (!this.badge) return;
    
    // Remove existing animation classes
    this.badge.classList.remove('pulse', 'static');
    
    if (this.states[state].animation === 'pulse') {
      this.badge.classList.add('pulse');
      this.badge.style.animation = 'pulse 2s ease-in-out infinite';
      
      // Set interval for pulse effect
      let pulses = 0;
      this.updateInterval = setInterval(() => {
        pulses++;
        if (pulses > 6) {
          this.badge.style.animation = 'none';
          clearInterval(this.updateInterval);
          this.updateInterval = null;
        }
      }, 1000);
    } else {
      this.badge.style.animation = 'none';
    }
  }
  
  setProcessing(message = 'Processing...') {
    this.setState('processing');
    if (this.text) {
      this.text.textContent = message;
    }
  }
  
  setUpdating() {
    this.setState('updating');
    if (this.text) {
      this.text.textContent = 'Updating...';
    }
  }
  
  setIdle() {
    this.setState('idle');
    if (this.text) {
      this.text.textContent = 'Idle';
    }
  }
  
  // Auto-hide when not needed
  hide() {
    if (this.badge) {
      this.badge.style.display = 'none';
    }
  }
  
  show() {
    if (this.badge) {
      this.badge.style.display = 'inline-flex';
    }
  }
}

// Initialize when DOM is ready
const initBadge = () => {
  if (!window.projectStatusBadge) {
    window.projectStatusBadge = new ProjectStatusBadge();
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBadge);
} else {
  initBadge();
}

// Export for external control
window.projectBadge = {
  setProcessing: (message) => window.projectStatusBadge?.setProcessing(message),
  setUpdating: () => window.projectStatusBadge?.setUpdating(),
  setIdle: () => window.projectStatusBadge?.setIdle(),
  hide: () => window.projectStatusBadge?.hide(),
  show: () => window.projectStatusBadge?.show()
};
