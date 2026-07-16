let timerId = null;
let duration = 60000; // default 60 seconds in ms
let timeLeft = 60000;
let isRunning = false;
let scrollIntervalId = null;

export const timer = {
  init({
    timerDisplay,
    progressBar,
    teleprompter,
    playButton,
    resetButton,
    scriptTextarea,
    pacingIndicator,
    onTick,
    onComplete
  }) {
    this.elements = {
      timerDisplay,
      progressBar,
      teleprompter,
      playButton,
      resetButton,
      scriptTextarea,
      pacingIndicator
    };
    this.onTick = onTick;
    this.onComplete = onComplete;

    this.reset();
    this.analyzePace();

    if (this.elements.scriptTextarea) {
      this.elements.scriptTextarea.removeEventListener('input', this.handleInput);
      this.handleInput = () => {
        this.analyzePace();
        this.updateTeleprompterText();
      };
      this.elements.scriptTextarea.addEventListener('input', this.handleInput);
    }
  },

  // Update secondary displays (e.g. fullscreen presentation mode synced nodes)
  syncExtraElements(extraDisplay, extraTeleprompter, extraPlayButton) {
    this.extraDisplay = extraDisplay;
    this.extraTeleprompter = extraTeleprompter;
    this.extraPlayButton = extraPlayButton;
    this.updateDisplay();
    this.updateTeleprompterText();
  },

  setDuration(seconds) {
    duration = seconds * 1000;
    if (!isRunning) {
      timeLeft = duration;
      this.updateDisplay();
    }
  },

  start() {
    if (isRunning) return;
    isRunning = true;
    
    const label = '⏸️ Pause';
    this.elements.playButton.innerHTML = label;
    this.elements.playButton.classList.add('active');
    if (this.extraPlayButton) {
      this.extraPlayButton.innerHTML = label;
      this.extraPlayButton.classList.add('active');
    }

    const startTime = Date.now();
    const initialTimeLeft = timeLeft;

    timerId = setInterval(() => {
      const elapsed = Date.now() - startTime;
      timeLeft = Math.max(0, initialTimeLeft - elapsed);

      this.updateDisplay();

      if (this.onTick) this.onTick(timeLeft);

      if (timeLeft <= 0) {
        this.pause();
        this.elements.timerDisplay.classList.add('time-up');
        if (this.extraDisplay) this.extraDisplay.classList.add('time-up');
        if (this.onComplete) this.onComplete();
      }
    }, 50);

    this.startScrolling();
  },

  pause() {
    if (!isRunning) return;
    isRunning = false;
    
    const label = '▶️ Start Pitch';
    this.elements.playButton.innerHTML = label;
    this.elements.playButton.classList.remove('active');
    if (this.extraPlayButton) {
      this.extraPlayButton.innerHTML = label;
      this.extraPlayButton.classList.remove('active');
    }
    
    clearInterval(timerId);
    clearInterval(scrollIntervalId);
  },

  toggle() {
    if (isRunning) {
      this.pause();
    } else {
      this.start();
    }
  },

  reset() {
    this.pause();
    timeLeft = duration;
    this.elements.timerDisplay.classList.remove('time-up');
    if (this.extraDisplay) this.extraDisplay.classList.remove('time-up');
    
    this.updateDisplay();
    
    if (this.elements.teleprompter) this.elements.teleprompter.scrollTop = 0;
    if (this.extraTeleprompter) this.extraTeleprompter.scrollTop = 0;
    
    this.updateTeleprompterText();
  },

  updateDisplay() {
    const seconds = Math.ceil(timeLeft / 1000);
    const formattedSeconds = String(seconds).padStart(2, '0');
    const displayStr = `00:${formattedSeconds}`;
    
    if (this.elements.timerDisplay) {
      this.elements.timerDisplay.innerHTML = displayStr;
    }
    if (this.extraDisplay) {
      this.extraDisplay.innerHTML = displayStr;
    }

    if (this.elements.progressBar) {
      const percentage = ((duration - timeLeft) / duration) * 100;
      this.elements.progressBar.style.width = `${percentage}%`;
    }
  },

  updateTeleprompterText() {
    const text = this.elements.scriptTextarea ? this.elements.scriptTextarea.value.trim() : '';
    const paragraphsHtml = text
      ? text.split('\n').filter(p => p.trim() !== '').map(p => `<p class="teleprompter-paragraph">${p}</p>`).join('')
      : '<p class="teleprompter-placeholder">Your script will scroll here. Write or auto-generate a script in the editor below!</p>';

    if (this.elements.teleprompter) {
      this.elements.teleprompter.innerHTML = paragraphsHtml;
    }
    if (this.extraTeleprompter) {
      this.extraTeleprompter.innerHTML = paragraphsHtml;
    }
  },

  startScrolling() {
    this.scrollContainer(this.elements.teleprompter);
    if (this.extraTeleprompter) {
      this.scrollContainer(this.extraTeleprompter);
    }
  },

  scrollContainer(container) {
    if (!container) return;
    const maxScroll = container.scrollHeight - container.clientHeight;
    if (maxScroll <= 0) return;

    const scrollStart = container.scrollTop;
    const scrollDistance = maxScroll - scrollStart;
    const startTime = Date.now();
    const scrollDuration = timeLeft;

    scrollIntervalId = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / scrollDuration);
      container.scrollTop = scrollStart + scrollDistance * progress;

      if (progress >= 1) {
        clearInterval(scrollIntervalId);
      }
    }, 50);
  },

  analyzePace() {
    if (!this.elements.scriptTextarea || !this.elements.pacingIndicator) return;
    
    const text = this.elements.scriptTextarea.value.trim();
    if (!text) {
      this.elements.pacingIndicator.className = 'pace-badge info';
      this.elements.pacingIndicator.innerHTML = 'Write a script to analyze';
      return;
    }

    const words = text.split(/\s+/).filter(w => w.length > 0).length;
    
    // Target duration in seconds
    const targetSecs = duration / 1000;
    
    // Words per minute target: comfortable speaking speed is 130 WPM
    // Words limit for target seconds = (130 / 60) * targetSecs
    const targetWordLimit = Math.round((130 / 60) * targetSecs);
    const maxWordLimit = Math.round((160 / 60) * targetSecs);
    const minWordLimit = Math.round((100 / 60) * targetSecs);

    let statusClass = 'success';
    let message = '';

    if (words < minWordLimit) {
      statusClass = 'warning';
      message = `⚠️ Short script (${words} words). Paced for ~${Math.round(words / (130/60))} seconds. Add more details!`;
    } else if (words > maxWordLimit) {
      statusClass = 'danger';
      message = `🚨 Long script (${words} words). You may run out of time! Try shortening it to ~${targetWordLimit} words.`;
    } else {
      statusClass = 'success';
      message = `✅ Optimal length (${words} words). Comfortable pacing for your ${targetSecs}-second pitch.`;
    }

    this.elements.pacingIndicator.className = `pace-badge ${statusClass}`;
    this.elements.pacingIndicator.innerHTML = message;
  }
};
