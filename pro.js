 <script>
                            // Floating circles animation for hero section
                            document.addEventListener('DOMContentLoaded', function() {
                                const floatingCircles = document.getElementById('floatingCircles');
                                for (let i = 0; i < 15; i++) {
                                    const circle = document.createElement('div');
                                    circle.classList.add('circle');
                                    circle.style.left = `${Math.random() * 100}%`;
                                    circle.style.top = `${Math.random() * 100}%`;
                                    circle.style.width = `${Math.random() * 100 + 50}px`;
                                    circle.style.height = circle.style.width;
                                    circle.style.backgroundColor = i % 2 === 0 ? '#7bb5b3' : '#b6d7a8';
                                    floatingCircles.appendChild(circle);
                                    
                                    // Random animation
                                    circle.style.animation = `float ${Math.random() * 10 + 10}s infinite linear`;
                                    circle.style.animationDelay = `${Math.random() * 5}s`;
                                }
                                
                                // Tab functionality
                                const tabButtons = document.querySelectorAll('.tab-button');
                                tabButtons.forEach(button => {
                                    button.addEventListener('click', () => {
                                        // Remove active class from all buttons
                                        tabButtons.forEach(btn => btn.classList.remove('active'));
                                        button.classList.add('active');
                                        
                                        // Hide all tab contents
                                        const tabContents = document.querySelectorAll('.tab-content');
                                        tabContents.forEach(tab => tab.classList.remove('active'));
                                        
                                        // Show the selected tab content
                                        const tabId = button.getAttribute('data-tab');
                                        document.getElementById(tabId).classList.add('active');
                                    });
                                });
                                
                                // Chat functionality
                                const chatMessages = document.getElementById('chatMessages');
                                const messageInput = document.getElementById('messageInput');
                                const sendButton = document.getElementById('sendButton');
                                
                                function addMessage(content, isUser = false) {
                                    const messageDiv = document.createElement('div');
                                    messageDiv.classList.add('message');
                                    messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
                                    
                                    const messageContent = document.createElement('div');
                                    messageContent.classList.add('message-content');
                                    messageContent.textContent = content;
                                    
                                    messageDiv.appendChild(messageContent);
                                    chatMessages.appendChild(messageDiv);
                                    chatMessages.scrollTop = chatMessages.scrollHeight;
                                }
                                
                                function botResponse(userMessage) {
                                    // Simple responses based on keywords
                                    const lowerMessage = userMessage.toLowerCase();
                                    
                                    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
                                        return "Hello! How are you feeling today?";
                                    }
                                    else if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('unhappy')) {
                                        return "I'm sorry to hear you're feeling down. Remember that it's okay to feel this way sometimes. Would you like to try a breathing exercise or talk more about what's bothering you?";
                                    }
                                    else if (lowerMessage.includes('anxious') || lowerMessage.includes('nervous') || lowerMessage.includes('worry')) {
                                        return "Anxiety can be really challenging. Have you tried our breathing exercise? It might help calm your mind a bit.";
                                    }
                                    else if (lowerMessage.includes('happy') || lowerMessage.includes('good') || lowerMessage.includes('great')) {
                                        return "I'm glad to hear you're doing well! What's something positive that happened recently?";
                                    }
                                    else if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelm')) {
                                        return "It sounds like you're dealing with a lot right now. The Pomodoro timer might help you break tasks into manageable chunks, or maybe you'd like to try the bubble pop game for a quick stress release?";
                                    }
                                    else if (lowerMessage.includes('thank')) {
                                        return "You're welcome! I'm here anytime you need to talk or want to try an activity.";
                                    }
                                    else {
                                        return "Thank you for sharing that with me. How else can I support you today? Would you like to try one of our mindfulness activities?";
                                    }
                                }
                                
                                sendButton.addEventListener('click', () => {
                                    const message = messageInput.value.trim();
                                    if (message) {
                                        addMessage(message, true);
                                        messageInput.value = '';
                                        
                                        // Simulate typing delay
                                        setTimeout(() => {
                                            const response = botResponse(message);
                                            addMessage(response);
                                        }, 1000);
                                    }
                                });
                                
                                messageInput.addEventListener('keypress', (e) => {
                                    if (e.key === 'Enter') {
                                        sendButton.click();
                                    }
                                });
                                
                                // Breathing exercise
                                const breathCircle = document.getElementById('breathCircle');
                                const breathText = document.getElementById('breathText');
                                const startBreathingBtn = document.getElementById('startBreathing');
                                let isBreathing = false;
                                
                                startBreathingBtn.addEventListener('click', () => {
                                    if (!isBreathing) {
                                        isBreathing = true;
                                        startBreathingBtn.textContent = 'Stop Exercise';
                                        breathingExercise();
                                    } else {
                                        isBreathing = false;
                                        startBreathingBtn.textContent = 'Start Exercise';
                                        breathCircle.style.animation = 'none';
                                        breathText.textContent = 'Breathe In';
                                    }
                                });
                                
                                function breathingExercise() {
                                    if (!isBreathing) return;
                                    
                                    // Breathe in phase
                                    breathText.textContent = 'Breathe In';
                                    breathCircle.style.animation = 'breatheIn 4s forwards';
                                    
                                    setTimeout(() => {
                                        if (!isBreathing) return;
                                        // Hold phase
                                        breathText.textContent = 'Hold';
                                        
                                        setTimeout(() => {
                                            if (!isBreathing) return;
                                            // Breathe out phase
                                            breathText.textContent = 'Breathe Out';
                                            breathCircle.style.animation = 'breatheOut 4s forwards';
                                            
                                            setTimeout(() => {
                                                if (!isBreathing) return;
                                                breathingExercise();
                                            }, 4000);
                                        }, 2000);
                                    }, 4000);
                                }
                                
                                // Canvas drawing
                                const canvas = document.getElementById('canvas');
                                const ctx = canvas.getContext('2d');
                                const colorDots = document.querySelectorAll('.color-dot');
                                const clearCanvasBtn = document.getElementById('clearCanvas');
                                let isDrawing = false;
                                let currentColor = '#7bb5b3';
                                
                                // Set canvas to white background
                                ctx.fillStyle = 'white';
                                ctx.fillRect(0, 0, canvas.width, canvas.height);
                                
                                // Color selection
                                colorDots.forEach(dot => {
                                    dot.addEventListener('click', () => {
                                        currentColor = dot.getAttribute('data-color');
                                        // Reset all dots
                                        colorDots.forEach(d => d.style.border = 'none');
                                        // Highlight selected dot
                                        dot.style.border = '2px solid #545454';
                                    });
                                });
                                
                                // Set first color as selected
                                colorDots[0].style.border = '2px solid #545454';
                                
                                // Drawing functionality
                                canvas.addEventListener('mousedown', startDrawing);
                                canvas.addEventListener('mousemove', draw);
                                canvas.addEventListener('mouseup', stopDrawing);
                                canvas.addEventListener('mouseout', stopDrawing);
                                
                                // Touch support
                                canvas.addEventListener('touchstart', (e) => {
                                    e.preventDefault();
                                    const touch = e.touches[0];
                                    const mouseEvent = new MouseEvent('mousedown', {
                                        clientX: touch.clientX,
                                        clientY: touch.clientY
                                    });
                                    canvas.dispatchEvent(mouseEvent);
                                });
                                
                                canvas.addEventListener('touchmove', (e) => {
                                    e.preventDefault();
                                    const touch = e.touches[0];
                                    const mouseEvent = new MouseEvent('mousemove', {
                                        clientX: touch.clientX,
                                        clientY: touch.clientY
                                    });
                                    canvas.dispatchEvent(mouseEvent);
                                });
                                
                                canvas.addEventListener('touchend', () => {
                                    const mouseEvent = new MouseEvent('mouseup');
                                    canvas.dispatchEvent(mouseEvent);
                                });
                                
                                function startDrawing(e) {
                                    isDrawing = true;
                                    draw(e);
                                }
                                
                                function draw(e) {
                                    if (!isDrawing) return;
                                    
                                    const rect = canvas.getBoundingClientRect();
                                    const x = e.clientX - rect.left;
                                    const y = e.clientY - rect.top;
                                    
                                    ctx.lineWidth = 5;
                                    ctx.lineCap = 'round';
                                    ctx.strokeStyle = currentColor;
                                    
                                    ctx.lineTo(x, y);
                                    ctx.stroke();
                                    ctx.beginPath();
                                    ctx.moveTo(x, y);
                                }
                                
                                function stopDrawing() {
                                    isDrawing = false;
                                    ctx.beginPath();
                                }
                                
                                clearCanvasBtn.addEventListener('click', () => {
                                    ctx.fillStyle = 'white';
                                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                                });
                                
                                // Memory Game
                                const memoryGame = document.getElementById('memoryGame');
                                const restartMemoryBtn = document.getElementById('restartMemory');
                                let hasFlippedCard = false;
                                let lockBoard = false;
                                let firstCard, secondCard;
                                let memoryEmojis = ['🌞', '🌈', '🌷', '🦋', '🌊', '🏔️', '🌙', '🐠'];
                                memoryEmojis = [...memoryEmojis, ...memoryEmojis]; // Duplicate for pairs
                                
                                function shuffleMemory() {
                                    return memoryEmojis.sort(() => Math.random() - 0.5);
                                }
                                
                                function createMemoryBoard() {
                                    memoryGame.innerHTML = '';
                                    const shuffledEmojis = shuffleMemory();
                                    
                                    shuffledEmojis.forEach((emoji, index) => {
                                        const card = document.createElement('div');
                                        card.classList.add('memory-card');
                                        card.dataset.value = emoji;
                                        card.dataset.index = index;
                                        card.textContent = '?';
                                        card.addEventListener('click', flipCard);
                                        memoryGame.appendChild(card);
                                    });
                                }
                                
                                function flipCard() {
                                    if (lockBoard) return;
                                    if (this === firstCard) return;
                                    
                                    this.classList.add('flipped');
                                    this.textContent = this.dataset.value;
                                    
                                    if (!hasFlippedCard) {
                                        // First click
                                        hasFlippedCard = true;
                                        firstCard = this;
                                        return;
                                    }
                                    
                                    // Second click
                                    secondCard = this;
                                    checkForMatch();
                                }
                                
                                function checkForMatch() {
                                    let isMatch = firstCard.dataset.value === secondCard.dataset.value;
                                    
                                    if (isMatch) {
                                        disableCards();
                                        firstCard.classList.add('matched');
                                        secondCard.classList.add('matched');
                                        
                                        // Check if game is complete
                                        const allMatched = document.querySelectorAll('.matched').length === memoryEmojis.length;
                                        if (allMatched) {
                                            setTimeout(() => {
                                                showNotification('Congratulations! You completed the memory game.', false);
                                            }, 500);
                                        }
                                    } else {
                                        unflipCards();
                                    }
                                }
                                
                                function disableCards() {
                                    firstCard.removeEventListener('click', flipCard);
                                    secondCard.removeEventListener('click', flipCard);
                                    
                                    resetBoard();
                                }
                                
                                function unflipCards() {
                                    lockBoard = true;
                                    
                                    setTimeout(() => {
                                        firstCard.classList.remove('flipped');
                                        secondCard.classList.remove('flipped');
                                        firstCard.textContent = '?';
                                        secondCard.textContent = '?';
                                        
                                        resetBoard();
                                    }, 1000);
                                }
                                
                                function resetBoard() {
                                    [hasFlippedCard, lockBoard] = [false, false];
                                    [firstCard, secondCard] = [null, null];
                                }
                                
                                restartMemoryBtn.addEventListener('click', createMemoryBoard);
                                
                                // Initialize memory game
                                createMemoryBoard();
                                
                                // Bubble Pop Game
                                const bubbleContainer = document.getElementById('bubbleContainer');
                                const bubbleScoreDisplay = document.getElementById('bubbleScore');
                                const bubbleTimerDisplay = document.getElementById('bubbleTimer');
                                const startBubblesBtn = document.getElementById('startBubbles');
                                let bubbleScore = 0;
                                let bubbleTimer = 60;
                                let bubbleGameActive = false;
                                let bubbleInterval;
                                let positiveThoughts = [
                                    "You're doing great!",
                                    "I believe in you!",
                                    "Stay strong!",
                                    "You matter!",
                                    "Keep going!",
                                    "You've got this!",
                                    "You are enough!",
                                    "You're not alone!",
                                    "Take a breath!",
                                    "You are worthy!"
                                ];
                                
                                function createBubble() {
                                    if (!bubbleGameActive) return;
                                    
                                    const bubble = document.createElement('div');
                                    bubble.classList.add('bubble');
                                    
                                    const size = Math.random() * 60 + 40;
                                    bubble.style.width = `${size}px`;
                                    bubble.style.height = `${size}px`;
                                    
                                    // Color variations of blues and greens
                                    const colors = ['#7bb5b3', '#b6d7a8', '#9fc5e8', '#78c5d6'];
                                    bubble.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                                    
                                    // Position randomly along the bottom
                                    bubble.style.left = `${Math.random() * 90}%`;
                                    
                                    // Add positive thought
                                    bubble.textContent = positiveThoughts[Math.floor(Math.random() * positiveThoughts.length)];
                                    
                                    // Random animation duration between 6-10 seconds
                                    const duration = Math.random() * 4 + 6;
                                    bubble.style.animation = `float ${duration}s linear`;
                                    
                                    bubbleContainer.appendChild(bubble);
                                    
                                    // Pop event
                                    bubble.addEventListener('click', () => {
                                        bubble.style.animation = 'pop 0.3s forwards';
                                        bubbleScore++;
                                        bubbleScoreDisplay.textContent = bubbleScore;
                                        
                                        setTimeout(() => {
                                            bubble.remove();
                                        }, 300);
                                    });
                                    
                                    // Remove bubble when animation ends
                                    bubble.addEventListener('animationend', () => {
                                        bubble.remove();
                                    });
                                }
                                
                                function startBubbleGame() {
                                    bubbleGameActive = true;
                                    bubbleScore = 0;
                                    bubbleTimer = 60;
                                    bubbleScoreDisplay.textContent = bubbleScore;
                                    bubbleTimerDisplay.textContent = bubbleTimer;
                                    
                                    startBubblesBtn.textContent = 'Game In Progress';
                                    startBubblesBtn.disabled = true;
                                    
                                    // Create bubbles at random
                                    const bubbleCreator = setInterval(() => {
                                        if (!bubbleGameActive) {
                                            clearInterval(bubbleCreator);
                                            return;
                                        }
                                        
                                        createBubble();
                                    }, 800);
                                    
                                    // Timer countdown
                                    bubbleInterval = setInterval(() => {
                                        bubbleTimer--;
                                        bubbleTimerDisplay.textContent = bubbleTimer;
                                        
                                        if (bubbleTimer <= 0) {
                                            endBubbleGame();
                                        }
                                    }, 1000);
                                }
                                
                                function endBubbleGame() {
                                    bubbleGameActive = false;
                                    clearInterval(bubbleInterval);
                                    
                                    // Clear all bubbles
                                    while (bubbleContainer.firstChild) {
                                        bubbleContainer.removeChild(bubbleContainer.firstChild);
                                    }
                                    
                                    startBubblesBtn.textContent = 'Start Game';
                                    startBubblesBtn.disabled = false;
                                    
                                    showNotification(`Game over! Your score: ${bubbleScore}`, false);
                                }
                                
                                startBubblesBtn.addEventListener('click', startBubbleGame);
                                
                                // Pomodoro Timer
                                const timerDisplay = document.querySelector('.timer-display');
                                const startPomodoroBtn = document.getElementById('startPomodoroBtn');
                                const resetPomodoroBtn = document.getElementById('resetPomodoroBtn');
                                const modeButtons = document.querySelectorAll('.mode-button');
                                const sessionCounter = document.getElementById('sessionCounter');
                                const timerProgress = document.querySelector('.timer-progress circle');
                                
                                let timerTime = 25 * 60; // 25 minutes in seconds
                                let timerMode = 'pomodoro';
                                let timerInterval;
                                let timerRunning = false;
                                let sessionsCompleted = 0;
                                
                                // Time for each mode in seconds
                                const modeTimes = {
                                    pomodoro: 25 * 60,
                                    shortBreak: 5 * 60,
                                    longBreak: 15 * 60
                                };
                                
                                function updateTimerDisplay() {
                                    const minutes = Math.floor(timerTime / 60).toString().padStart(2, '0');
                                    const seconds = (timerTime % 60).toString().padStart(2, '0');
                                    timerDisplay.textContent = `${minutes}:${seconds}`;
                                    
                                    // Update progress circle
                                    const currentModeMaxTime = modeTimes[timerMode];
                                    const progress = (currentModeMaxTime - timerTime) / currentModeMaxTime;
                                    const dashOffset = 754 * (1 - progress);
                                    timerProgress.style.strokeDashoffset = dashOffset;
                                }
                                
                                function startTimer() {
                                    if (timerRunning) {
                                        // Pause the timer
                                        clearInterval(timerInterval);
                                        timerRunning = false;
                                        startPomodoroBtn.textContent = 'Resume';
                                    } else {
                                        // Start or resume the timer
                                        timerRunning = true;
                                        startPomodoroBtn.textContent = 'Pause';
                                        
                                        timerInterval = setInterval(() => {
                                            timerTime--;
                                            updateTimerDisplay();
                                            
                                            if (timerTime <= 0) {
                                                clearInterval(timerInterval);
                                                timerRunning = false;
                                                startPomodoroBtn.textContent = 'Start';
                                                
                                                // Play notification sound and show message
                                                const message = timerMode === 'pomodoro' 
                                                    ? 'Great job! Take a break.' 
                                                    : 'Break time over. Time to focus!';
                                                
                                                showNotification(message, false);
                                                
                                                // If pomodoro session completed, increase counter
                                                if (timerMode === 'pomodoro') {
                                                    sessionsCompleted++;
                                                    sessionCounter.textContent = sessionsCompleted;
                                                    
                                                    // After 4 pomodoros, suggest a long break
                                                    if (sessionsCompleted % 4 === 0) {
                                                        setTimerMode('longBreak');
                                                    } else {
                                                        setTimerMode('shortBreak');
                                                    }
                                                } else {
                                                    // After break, switch to pomodoro
                                                    setTimerMode('pomodoro');
                                                }
                                            }
                                        }, 1000);
                                    }
                                }
                                
                                function resetTimer() {
                                    clearInterval(timerInterval);
                                    timerRunning = false;
                                    timerTime = modeTimes[timerMode];
                                    startPomodoroBtn.textContent = 'Start';
                                    updateTimerDisplay();
                                }
                                
                                function setTimerMode(mode) {
                                    timerMode = mode;
                                    timerTime = modeTimes[mode];
                                    
                                    // Update active mode button
                                    modeButtons.forEach(btn => {
                                        if (btn.getAttribute('data-mode') === mode) {
                                            btn.classList.add('active');
                                        } else {
                                            btn.classList.remove('active');
                                        }
                                    });
                                    
                                    // Reset timer
                                    clearInterval(timerInterval);
                                    timerRunning = false;
                                    startPomodoroBtn.textContent = 'Start';
                                    updateTimerDisplay();
                                }
                                
                                // Mode button event listeners
                                modeButtons.forEach(btn => {
                                    btn.addEventListener('click', () => {
                                        setTimerMode(btn.getAttribute('data-mode'));
                                    });
                                });
                                
                                startPomodoroBtn.addEventListener('click', startTimer);
                                resetPomodoroBtn.addEventListener('click', resetTimer);
                                
                                // Initialize timer display
                                updateTimerDisplay();
                                
                                // Quotes rotation
                                const quotes = [
                                    {quote: "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.", author: "Unknown"},
                                    {quote: "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed, frustrated, scared and anxious. Having feelings doesn't make you a negative person. It makes you human.", author: "Lori Deschene"},
                                    {quote: "Self-care is how you take your power back.", author: "Lalah Delia"},
                                    {quote: "Mental health problems don't define who you are. They are something you experience. You walk in the rain and you feel the rain, but you are not the rain.", author: "Matt Haig"},
                                    {quote: "Promise me you'll always remember: You're braver than you believe, stronger than you seem, and smarter than you think.", author: "A.A. Milne"},
                                    {quote: "It's not selfish to love yourself, take care of yourself, and make your happiness a priority. It's necessary.", author: "Mandy Hale"}
                                ];
                                
                                const quoteElement = document.getElementById('quote');
                                const authorElement = document.getElementById('author');
                                
                                function rotateQuotes() {
                                    const randomIndex = Math.floor(Math.random() * quotes.length);
                                    const newQuote = quotes[randomIndex];
                                    
                                    quoteElement.textContent = `"${newQuote.quote}"`;
                                    authorElement.textContent = `- ${newQuote.author}`;
                                }
                                
                                // Change quote every 30 seconds
                                setInterval(rotateQuotes, 30000);
                                
                                // Mood Tracker
                                const moodOptions = document.querySelectorAll('.mood-option');
                                const moodNotes = document.getElementById('moodNotes');
                                const saveMoodBtn = document.getElementById('saveMood');
                                const moodHistory = document.getElementById('moodHistory');
                                
                                let moods = JSON.parse(localStorage.getItem('moods')) || [];
                                let selectedMood = null;
                                
                                function renderMoodHistory() {
                                    moodHistory.innerHTML = '';
                                    
                                    // Create heading if there are entries
                                    if (moods.length > 0) {
                                        const heading = document.createElement('h4');
                                        heading.textContent = 'Recent Mood Entries';
                                        moodHistory.appendChild(heading);
                                    }
                                    
                                    // Show latest entries first (max 5)
                                    const recentMoods = [...moods].reverse().slice(0, 5);
                                    
                                    recentMoods.forEach(entry => {
                                        const moodEntry = document.createElement('div');
                                        moodEntry.classList.add('mood-entry');
                                        
                                        const emoji = getMoodEmoji(entry.value);
                                        
                                        moodEntry.innerHTML = `
                                            <div>
                                                <span>${emoji}</span>
                                                <span>${entry.notes}</span>
                                            </div>
                                            <div class="mood-date">${formatDate(entry.date)}</div>
                                        `;
                                        
                                        moodHistory.appendChild(moodEntry);
                                    });
                                }
                                
                                function getMoodEmoji(value) {
                                    const emojis = {
                                        1: '😢',
                                        2: '😔',
                                        3: '😐',
                                        4: '🙂',
                                        5: '😄'
                                    };
                                    return emojis[value] || '😐';
                                }
                                
                                function formatDate(dateString) {
                                    const date = new Date(dateString);
                                    return date.toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'short', 
                                        day: 'numeric'
                                    });
                                }
                                
                                moodOptions.forEach(option => {
                                    option.addEventListener('click', () => {
                                        // Remove selected class from all options
                                        moodOptions.forEach(opt => opt.classList.remove('selected'));
                                        
                                        // Add selected class to clicked option
                                        option.classList.add('selected');
                                        selectedMood = option.getAttribute('data-mood');
                                    });
                                });
                                
                                saveMoodBtn.addEventListener('click', () => {
                                    if (!selectedMood) {
                                        showNotification('Please select a mood first', true);
                                        return;
                                    }
                                    
                                    const newMood = {
                                        date: new Date().toISOString(),
                                        value: parseInt(selectedMood),
                                        notes: moodNotes.value.trim()
                                    };
                                    
                                    // Add to moods array
                                    moods.push(newMood);
                                    
                                    // Save to localStorage
                                    localStorage.setItem('moods', JSON.stringify(moods));
                                    
                                    // Reset form
                                    moodOptions.forEach(opt => opt.classList.remove('selected'));
                                    moodNotes.value = '';
                                    selectedMood = null;
                                    
                                    // Update display
                                    renderMoodHistory();
                                    updateMoodStats();
                                    
                                    showNotification('Mood saved successfully', false);
                                });
                                
                                function updateMoodStats() {
                                    const statsContainer = document.getElementById('moodStats');
                                    if (!statsContainer || moods.length === 0) return;
                                    
                                    // Calculate average mood
                                    const sum = moods.reduce((total, mood) => total + mood.value, 0);
                                    const avg = sum / moods.length;
                                    
                                    // Find most common mood
                                    const moodCounts = {};
                                    moods.forEach(mood => {
                                        moodCounts[mood.value] = (moodCounts[mood.value] || 0) + 1;
                                    });
                                    
                                    let mostCommon = 3; // Default to neutral
                                    let highestCount = 0;
                                    
                                    Object.keys(moodCounts).forEach(value => {
                                        if (moodCounts[value] > highestCount) {
                                            mostCommon = parseInt(value);
                                            highestCount = moodCounts[value];
                                        }
                                    });
                                    
                                    // Create stats elements
                                    statsContainer.innerHTML = `
                                        <div class="stat">
                                            <span class="stat-label">Average Mood:</span>
                                            <span class="stat-value">${getMoodEmoji(Math.round(avg))}</span>
                                        </div>
                                        <div class="stat">
                                            <span class="stat-label">Most Common:</span>
                                            <span class="stat-value">${getMoodEmoji(mostCommon)}</span>
                                        </div>
                                        <div class="stat">
                                            <span class="stat-label">Total Entries:</span>
                                            <span class="stat-value">${moods.length}</span>
                                        </div>
                                    `;
                                }
                                
                                // Clear all mood data
                                const clearMoodsBtn = document.getElementById('clearMoods');
                                if (clearMoodsBtn) {
                                    clearMoodsBtn.addEventListener('click', () => {
                                        if (confirm('Are you sure you want to delete all mood data? This cannot be undone.')) {
                                            moods = [];
                                            localStorage.removeItem('moods');
                                            renderMoodHistory();
                                            updateMoodStats();
                                            showNotification('All mood data cleared', false);
                                        }
                                    });
                                }
                                
                                // Initialize mood tracker
                                renderMoodHistory();
                                updateMoodStats();
                                
                                // Journal functionality
                                const journalText = document.getElementById('journalText');
                                const saveJournalBtn = document.getElementById('saveJournal');
                                const journalEntries = document.getElementById('journalEntries');
                                
                                // Load existing entries
                                let journals = JSON.parse(localStorage.getItem('journals')) || [];
                                
                                function saveJournal() {
                                    const content = journalText.value.trim();
                                    if (!content) {
                                        showNotification('Please write something first', true);
                                        return;
                                    }
                                    
                                    const newEntry = {
                                        date: new Date().toISOString(),
                                        content: content
                                    };
                                    
                                    journals.push(newEntry);
                                    localStorage.setItem('journals', JSON.stringify(journals));
                                    
                                    journalText.value = '';
                                    renderJournalEntries();
                                    showNotification('Journal entry saved', false);
                                }
                                
                                function renderJournalEntries() {
                                    if (!journalEntries) return;
                                    
                                    journalEntries.innerHTML = '';
                                    
                                    if (journals.length === 0) {
                                        journalEntries.innerHTML = '<p class="empty-state">No journal entries yet. Start writing today!</p>';
                                        return;
                                    }
                                    
                                    // Show most recent entries first
                                    const recentJournals = [...journals].reverse().slice(0, 3);
                                    
                                    recentJournals.forEach(entry => {
                                        const journalEl = document.createElement('div');
                                        journalEl.classList.add('journal-entry');
                                        
                                        journalEl.innerHTML = `
                                            <div class="journal-date">${formatDate(entry.date)}</div>
                                            <div class="journal-content">${entry.content}</div>
                                        `;
                                        
                                        journalEntries.appendChild(journalEl);
                                    });
                                    
                                    // Add "View All" button if there are more entries
                                    if (journals.length > 3) {
                                        const viewAllBtn = document.createElement('button');
                                        viewAllBtn.classList.add('view-all-btn');
                                        viewAllBtn.textContent = 'View All Entries';
                                        viewAllBtn.addEventListener('click', showAllJournals);
                                        journalEntries.appendChild(viewAllBtn);
                                    }
                                }
                                
                                function showAllJournals() {
                                    const modal = document.createElement('div');
                                    modal.classList.add('modal');
                                    
                                    const modalContent = document.createElement('div');
                                    modalContent.classList.add('modal-content');
                                    
                                    const closeBtn = document.createElement('span');
                                    closeBtn.classList.add('close-btn');
                                    closeBtn.innerHTML = '&times;';
                                    closeBtn.addEventListener('click', () => {
                                        document.body.removeChild(modal);
                                    });
                                    
                                    const heading = document.createElement('h3');
                                    heading.textContent = 'All Journal Entries';
                                    
                                    const entriesList = document.createElement('div');
                                    entriesList.classList.add('all-entries');
                                    
                                    // Add all entries, newest first
                                    [...journals].reverse().forEach(entry => {
                                        const entryEl = document.createElement('div');
                                        entryEl.classList.add('journal-entry');
                                        
                                        entryEl.innerHTML = `
                                            <div class="journal-date">${formatDate(entry.date)}</div>
                                            <div class="journal-content">${entry.content}</div>
                                        `;
                                        
                                        entriesList.appendChild(entryEl);
                                    });
                                    
                                    modalContent.appendChild(closeBtn);
                                    modalContent.appendChild(heading);
                                    modalContent.appendChild(entriesList);
                                    modal.appendChild(modalContent);
                                    
                                    document.body.appendChild(modal);
                                    
                                    // Close modal when clicking outside of content
                                    modal.addEventListener('click', (e) => {
                                        if (e.target === modal) {
                                            document.body.removeChild(modal);
                                        }
                                    });
                                }
                                
                                // Clear all journal entries
                                const clearJournalsBtn = document.getElementById('clearJournals');
                                if (clearJournalsBtn) {
                                    clearJournalsBtn.addEventListener('click', () => {
                                        if (confirm('Are you sure you want to delete all journal entries? This cannot be undone.')) {
                                            journals = [];
                                            localStorage.removeItem('journals');
                                            renderJournalEntries();
                                            showNotification('All journal entries cleared', false);
                                        }
                                    });
                                }
                                
                                if (saveJournalBtn) {
                                    saveJournalBtn.addEventListener('click', saveJournal);
                                }
                                
                                // Initialize journal
                                renderJournalEntries();
                                
                                // Notification function
                                function showNotification(message, isError = false) {
                                    const notification = document.createElement('div');
                                    notification.classList.add('notification');
                                    if (isError) {
                                        notification.classList.add('error');
                                    }
                                    
                                    notification.textContent = message;
                                    document.body.appendChild(notification);
                                    
                                    // Fade in
                                    setTimeout(() => {
                                        notification.classList.add('show');
                                    }, 10);
                                    
                                    // Fade out after 3 seconds
                                    setTimeout(() => {
                                        notification.classList.remove('show');
                                        setTimeout(() => {
                                            document.body.removeChild(notification);
                                        }, 300);
                                    }, 3000);
                                }
                                
                                // Initialize tabs (select first tab)
                                document.querySelector('.tab-button').click();
                                
                                
                                // Initial quote
                                rotateQuotes();
                                
                                });
                                </script>