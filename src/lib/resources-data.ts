export const CATEGORIES = ["All", "Self-Help", "Academic Stress", "Mindfulness", "Understanding Mental Health"] as const;

export const ARTICLES = [
    {
        title: "Understanding Anxiety & Depression",
        description: "Learn to recognise the signs and discover evidence-based strategies to manage them effectively.",
        icon: "Brain",
        category: "Understanding Mental Health",
        readTime: "7 min read",
        content: [
            "Anxiety and depression are common challenges. In Ghana, studies suggest up to 40% of tertiary students experience significant symptoms.",
            "Common signs include persistent worry, difficulty concentrating, and loss of interest in activities.",
            "Strategies include CBT techniques, physical activity, and seeking professional help early."
        ],
    },
    {
        title: "The Burnout Cycle",
        description: "How to recognize academic exhaustion before it leads to a total collapse.",
        icon: "Zap",
        category: "Academic Stress",
        readTime: "6 min read",
        content: [
            "Burnout isn't just being tired; it's emotional, mental, and physical exhaustion caused by prolonged stress.",
            "Watch for detachment, cynical feelings toward your studies, and a sense of reduced accomplishment.",
            "Counteract burnout by setting strict boundaries between 'study time' and 'living time'."
        ],
    },
    {
        title: "Managing Exam Stress",
        description: "Practical strategies to handle pressure without burning out.",
        icon: "GraduationCap",
        category: "Academic Stress",
        readTime: "5 min read",
        content: [
            "Exam stress is universal, but manageable with chunking and the Pomodoro technique.",
            "Avoid 'all-nighters' which significantly impair cognitive function and memory recall.",
            "Remember that your worth is not tied to a single grade or assessment."
        ],
    },
    {
        title: "Navigating Imposter Syndrome",
        description: "Feeling like a 'fraud' is common among high achievers. Here is how to handle it.",
        icon: "Lightbulb",
        category: "Understanding Mental Health",
        readTime: "5 min read",
        content: [
            "Imposter syndrome involves doubting your abilities and feeling like you don't belong in your university program.",
            "Talk about it. You'll find that many of your most 'successful' peers feel exactly the same way.",
            "Focus on the evidence of your achievements, not the subjective feeling of inadequacy."
        ],
    },
    {
        title: "Building Healthy Sleep Habits",
        description: "Sleep is the foundation of mental health. Learn to improve it even with a busy schedule.",
        icon: "Moon",
        category: "Self-Help",
        readTime: "4 min read",
        content: [
            "Quality sleep is essential for memory consolidation and emotional regulation.",
            "Establish a consistent 'wind-down' routine 30 minutes before sleep without screens.",
            "Limit caffeine intake in the afternoon to avoid disrupting your natural sleep cycle."
        ],
    },
    {
        title: "The Power of Social Connection",
        description: "Human connection is a buffer against stress. Build your support network.",
        icon: "Users",
        category: "Understanding Mental Health",
        readTime: "5 min read",
        content: [
            "Loneliness is a significant risk factor for depression among students away from home.",
            "Even one or two trusted connections can make a major difference in your resilience.",
            "Join campus groups or study circles to build organic social bridges."
        ],
    },
    {
        title: "Mindfulness for Beginners",
        description: "A simple introduction to meditation—no experience needed.",
        icon: "Leaf",
        category: "Mindfulness",
        readTime: "6 min read",
        content: [
            "Mindfulness is paying attention to the present moment without judgement.",
            "Just 5-10 minutes a day can lower cortisol levels and improve focus.",
            "Try 'meditative walking' to class by focusing on the sensation of your feet hitting the ground."
        ],
    },
    {
        title: "Movement as Medicine",
        description: "How physical activity stabilizes mood and reduces biological stress.",
        icon: "Dumbbell",
        category: "Self-Help",
        readTime: "5 min read",
        content: [
            "Exercise releases endorphins and BDNF, which act as natural antidepressants.",
            "You don't need a gym—a 20-minute brisk walk across campus is highly effective.",
            "Consistency is more important than intensity when it comes to mental health."
        ],
    },
    {
        title: "Understanding Your Emotions",
        description: "Learn to name, understand, and work with your feelings.",
        icon: "Heart",
        category: "Self-Help",
        readTime: "5 min read",
        content: [
            "Emotional literacy involves identifying specific feelings (e.g., 'disappointed' vs just 'bad').",
            "'Name it to tame it': labeling an emotion reduces the activity in your brain's fear center.",
            "All emotions carry information. Listen to what they are trying to tell you about your needs."
        ],
    },
];

export const SELF_HELP_TOOLS = [
    {
        title: "Progressive Muscle Relaxation",
        icon: "Dumbbell",
        description: "Release physical tension caused by stress.",
        steps: ["Find a quiet place.", "Tense your feet for 5s, then release.", "Move up to calves, thighs, and torso.", "End with shoulders and face."]
    },
    {
        title: "Box Breathing for Calm",
        icon: "Wind",
        description: "Regain calm under pressure in 4 minutes.",
        steps: ["Inhale for 4s.", "Hold for 4s.", "Exhale for 4s.", "Hold for 4s.", "Repeat 4 times."]
    },
    {
        title: "The Worry Tree",
        icon: "Repeat",
        description: "Decide what to act on and what to let go.",
        steps: ["Write down the worry.", "Is it a problem I can solve now?", "If YES, make an action plan.", "If NO, practice 'letting go' and refocus."]
    },
    {
        title: "Pomodoro Study Technique",
        icon: "Timer",
        description: "Fight procrastination and prevent burnout.",
        steps: ["Focus for 25 mins.", "5-minute break.", "Repeat 4 times.", "Take a 30-minute break."]
    },
    {
        title: "Journaling for Clarity",
        icon: "PenLine",
        description: "Untangle thoughts and manage complex feelings.",
        steps: ["Write for 10 minutes.", "Don't judge your grammar.", "Focus on what you're feeling.", "End with 1 thing you're proud of."]
    },
    {
        title: "Digital Detox (5-Min)",
        icon: "Smartphone",
        description: "Reset your attention span instantly.",
        steps: ["Turn phone off.", "Place it in another room.", "Sit in silence for 5 mins.", "Notice the 'itch' to check it and let it pass."]
    },
    {
        title: "Daily Gratitude Practice",
        icon: "Smile",
        description: "Rewire your brain for positivity.",
        steps: ["List 3 specific good things.", "Describe WHY they happened.", "Do this every evening.", "Watch your perspective shift."]
    },
];

export const RECOMMENDED_APPS = [
    { name: "Headspace", tag: "Meditation", icon: "Sparkles", desc: "Guided mindfulness for students.", url: "https://www.headspace.com" },
    { name: "7 Cups", tag: "Support", icon: "MessageSquare", desc: "24/7 chat with trained listeners.", url: "https://www.7cups.com" },
    { name: "Calm", tag: "Sleep", icon: "Moon", desc: "Sleep stories and relaxation music.", url: "https://www.calm.com" },
    { name: "Wysa", tag: "Coping", icon: "MessageSquare", desc: "Emotional support and wellness tools.", url: "https://www.wysa.io" },
    { name: "Daylio", tag: "Mood", icon: "Smile", desc: "Track your mood without writing a word.", url: "https://daylio.net" },
    { name: "MindShift CBT", tag: "Anxiety", icon: "Lightbulb", desc: "Tools for panic and worry.", url: "https://www.anxietycanada.com/resources/mindshift-cbt/" },
    { name: "Happify", tag: "Happiness", icon: "Target", desc: "Science-based games for stress.", url: "https://www.happify.com" },
    { name: "Sanvello", tag: "Wellness", icon: "Leaf", desc: "CBT and mood tracking suite.", url: "https://www.sanvello.com" },
    { name: "Bearable", tag: "Tracking", icon: "Stethoscope", desc: "Find correlations in your symptoms.", url: "https://bearable.app" }
];

export const VIDEO_RESOURCES = [
    { title: "Make Stress Your Friend", speaker: "Kelly McGonigal", id: "RcGyVTAoXEU" },
    { title: "The Happy Secret to Work", speaker: "Shawn Achor", id: "fLJsdqxnZb0" },
    { title: "Vulnerability Power", speaker: "Brené Brown", id: "iCvmsMzlF7o" },
    { title: "10 Mindful Minutes", speaker: "Andy Puddicombe", id: "qzR62JJCMBQ" },
    { title: "Emotional First Aid", speaker: "Guy Winch", id: "F2hc2FLOdhI" },
    { title: "The JOURNEY of RESILIENCE", speaker: "Simon Sinek", id: "rkZl2gsLUp4" }
];

export const FREE_BOOKS = [
    { title: "Mind Over Mood", author: "Greenberger & Padesky", takeaways: ["Thoughts determine feelings.", "Use Thought Records."] },
    { title: "Feeling Good", author: "David Burns", takeaways: ["Defeat negative thinking.", "10 Cognitive Distortions."] },
    { title: "WHO Stress Guide", author: "World Health Org", takeaways: ["Grounding techniques.", "Unhooking from thoughts."] },
    { title: "Anxiety & Phobia", author: "Edmund Bourne", takeaways: ["Muscle relaxation.", "Gradual exposure."] },
    { title: "Atomic Habits", author: "James Clear", takeaways: ["1% better daily.", "Identity-based habits."] },
    { title: "Living Life to the Full", author: "Chris Williams", takeaways: ["Vicious cycle model.", "Break bad habits."] },
    { title: "Student Wellness", author: "Mental Health Fnd", takeaways: ["Social media impact.", "Daily routines."] },
    { title: "How to Do the Work", author: "Nicole LePera", takeaways: ["Identify your patterns.", "Reparent your inner self."] },
    { title: "Problem Management", author: "WHO Guide", takeaways: ["Action planning.", "Social support."] },
    { title: "SAM Resource", author: "UWE Bristol", takeaways: ["Anxiety self-monitoring.", "Self-help exercises."] }
];
