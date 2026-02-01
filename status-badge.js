// Project Status Badge Controller
// Manages status badge visibility and animation based on project state

class ProjectStatusBadge {
  constructor() {
    this.badge = document.getElementById('status-badge');
    this.icon = this.badge.querySelector('.status-icon');
    this.text = this.badge.querySelector('.status-text');
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
    // Check for existing state in localStorage
    const savedState = localStorage.getItem('project-status');
    if (savedState && savedState !== 'idle') {
      this.setState(savedState);
    }
    
    // Show badge initially
    this.badge.style.display = 'inline-flex';
  }
  
  setState(state) {
    if (this.states[state]) {
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
  }
  
  updateAnimation(state) {
    // Remove existing animation classes
    this.badge.classList.remove('pulse', 'static');
    this.icon.classList.remove('fa-spin');
    
    if (this.states[state].animation === 'pulse') {
      this.badge.classList.add('pulse');
      this.badge.style.animation = 'pulse 2s ease-in-out infinite';
      
      if (this.updateInterval) {
        clearInterval(this.updateInterval);
      }
      
      // Set interval for pulse effect
      let pulses = 0;
      this.updateInterval = setInterval(() => {
        pulses++;
        if (pulses > 6) {
          this.badge.style.animation = 'none';
        }
      }, 1000);
    }
  }
  
  setProcessing(message = {
    this.setState('processing');
    this.text.textContent = message || 'Processing...';
  }
  
  setUpdating() {
    this.setState('updating');
    this.text.textContent = 'Updating...';
  }
  
  setIdle() {
    this.setState('idle');
    this.text.textContent = 'Idle';
  }
  
  // Auto-hide when not needed
  hide() {
    this.badge.style.display = 'none';
  }
  
  show() {
    this.badge.style.display = 'inline-flex';
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading' || document.readyState === 'interactive') {
  window.projectStatusBadge = new ProjectStatusBadge();
}

// Export for external control
window.projectBadge = {
  setProcessing: () => window.projectStatusBadge?.setProcessing(),
  setUpdating: () => window.projectStatusBadge?.setUpdating(),
  setIdle: () => window.projectStatusBadge?.setIdle(),
  hide: () => window.projectStatusBadge?.hide(),
  show: () => window.projectStatusBadge?.show()
};
