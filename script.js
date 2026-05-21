const StorageMgr = {
    data: {
        completedTopics: [],
        correctExercises: 0,
        timeStudied: 0, // in minutes
        streakDays: 0,
        lastLogin: null,
        apiKey: "",
        apiProvider: "openai"
    },

    init() {
        const stored = localStorage.getItem('MathMasterData');
        if (stored) {
            this.data = { ...this.data, ...JSON.parse(stored) };
        }
        this.checkStreak();
        this.startTimer();
    },

    save() {
        localStorage.setItem('MathMasterData', JSON.stringify(this.data));
        this.updateUI();
    },

    checkStreak() {
        const today = new Date().toDateString();
        if (this.data.lastLogin !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            if (this.data.lastLogin === yesterday.toDateString()) {
                this.data.streakDays++;
            } else if (this.data.lastLogin !== null) {
                this.data.streakDays = 1; 
            } else {
                this.data.streakDays = 1;
            }
            this.data.lastLogin = today;
            this.save();
        }
    },

    startTimer() {
        setInterval(() => {
            this.data.timeStudied++;
            this.save();
        }, 60000); // Add 1 minute
    },

    markTopicCompleted(topicId) {
        if (!this.data.completedTopics.includes(topicId)) {
            this.data.completedTopics.push(topicId);
            this.save();
        }
    },

    addCorrectExercise() {
        this.data.correctExercises++;
        this.save();
    },

    updateUI() {
        document.getElementById('time-studied').innerText = this.data.timeStudied;
        document.getElementById('streak-days').innerText = this.data.streakDays;
        // Assume 9 topics total
        const progress = Math.round((this.data.completedTopics.length / 9) * 100) || 0;
        document.getElementById('global-progress').innerText = progress;
        document.getElementById('progress-fill').style.width = progress + '%';
    }
};
