"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
    Search,
    BookOpen,
    Brain,
    Heart,
    Sparkles,
    Moon,
    Users,
    Lightbulb,
    ExternalLink,
    ChevronDown,
    ChevronUp,
    Play,
    Smartphone,
    GraduationCap,
    Leaf,
    Timer,
    PenLine,
    Smile,
    Wind,
    Dumbbell,
    Download,
    FileText,
    Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Categories ───
const CATEGORIES = ["All", "Self-Help", "Academic Stress", "Mindfulness", "Understanding Mental Health"] as const;
type Category = (typeof CATEGORIES)[number];

// ─── Featured Articles ───
const ARTICLES = [
    {
        title: "Understanding Anxiety & Depression",
        description:
            "Learn to recognise the signs of anxiety and depression, understand how they affect students, and discover evidence-based strategies to manage them effectively.",
        icon: Brain,
        category: "Understanding Mental Health" as Category,
        readTime: "7 min read",
        color: "from-purple-500/20 to-indigo-600/20",
        borderColor: "border-purple-400/20",
        content: [
            "Anxiety and depression are among the most common mental health challenges faced by university students worldwide. In Ghana, studies suggest up to 40% of tertiary students experience significant anxiety symptoms during their academic journey.",
            "Common signs include persistent worry, difficulty concentrating, changes in sleep patterns, loss of interest in activities you once enjoyed, and feelings of hopelessness. These symptoms can significantly impact academic performance and social relationships.",
            "Evidence-based strategies include Cognitive Behavioural Therapy (CBT) techniques, regular physical activity, maintaining social connections, practicing mindfulness, and seeking professional help when symptoms persist for more than two weeks.",
        ],
    },
    {
        title: "Managing Exam Stress",
        description:
            "Practical strategies to handle the pressure of exams, assignments, and academic expectations without burning out.",
        icon: GraduationCap,
        category: "Academic Stress" as Category,
        readTime: "5 min read",
        color: "from-amber-500/20 to-orange-600/20",
        borderColor: "border-amber-400/20",
        content: [
            "Exam stress is a universal experience for students, but when left unmanaged it can lead to anxiety, sleep disruption, and poor performance — the opposite of what you're working toward.",
            "Start by breaking your revision into smaller, manageable chunks. Use the Pomodoro Technique (25 minutes focused study, 5-minute breaks). Create a realistic study timetable that includes rest days.",
            "On exam day, arrive early, practice deep breathing, and read all questions before starting. Remember: one exam does not define your worth or your future.",
        ],
    },
    {
        title: "Building Healthy Sleep Habits",
        description:
            "Sleep is the foundation of mental health. Learn how to improve your sleep quality even with a busy student schedule.",
        icon: Moon,
        category: "Self-Help" as Category,
        readTime: "4 min read",
        color: "from-blue-500/20 to-cyan-600/20",
        borderColor: "border-blue-400/20",
        content: [
            "Research shows that university students who sleep fewer than 6 hours a night are significantly more likely to experience depression and anxiety. Quality sleep is not a luxury — it's essential.",
            "Create a consistent sleep schedule, even on weekends. Avoid screens 30 minutes before bed. Keep your room cool and dark. Limit caffeine after 2 PM.",
            "If racing thoughts keep you awake, try the 4-7-8 breathing technique: inhale for 4 seconds, hold for 7, exhale for 8. Write down worries before bed to 'park' them for tomorrow.",
        ],
    },
    {
        title: "The Power of Social Connection",
        description:
            "Human connection is a powerful buffer against stress. Learn why isolation worsens mental health and how to build your support network.",
        icon: Users,
        category: "Understanding Mental Health" as Category,
        readTime: "5 min read",
        color: "from-teal-500/20 to-emerald-600/20",
        borderColor: "border-teal-400/20",
        content: [
            "Loneliness and social isolation are significant risk factors for depression, particularly among students who are away from home for the first time. A strong social network acts as a protective buffer.",
            "You don't need a large friend group — even one or two trusted connections can make a significant difference. Join a study group, a campus club, or a religious/community group.",
            "If you find it hard to reach out, start small. A simple greeting to a course mate, sitting with someone at the dining hall, or sending a message to a friend from home can be the first step.",
        ],
    },
    {
        title: "Mindfulness for Beginners",
        description:
            "A simple, practical introduction to mindfulness meditation — no experience needed. Just 5 minutes a day can reduce stress.",
        icon: Leaf,
        category: "Mindfulness" as Category,
        readTime: "6 min read",
        color: "from-green-500/20 to-lime-600/20",
        borderColor: "border-green-400/20",
        content: [
            "Mindfulness is the practice of paying attention to the present moment without judgement. Research consistently shows it reduces stress, anxiety, and depressive symptoms.",
            "Start with just 5 minutes daily: sit comfortably, close your eyes, and focus on your breath. When your mind wanders (it will!), gently bring your attention back. That 'bringing back' is the exercise.",
            "You can practice mindfulness anywhere — while eating (notice textures and flavours), walking to class (feel your feet on the ground), or even during lectures (fully focus on the speaker).",
        ],
    },
    {
        title: "Understanding Your Emotions",
        description:
            "Emotional literacy is a skill. Learn to name, understand, and work with your feelings rather than being overwhelmed by them.",
        icon: Heart,
        category: "Self-Help" as Category,
        readTime: "5 min read",
        color: "from-rose-500/20 to-pink-600/20",
        borderColor: "border-rose-400/20",
        content: [
            "Many of us were never taught how to identify and process our emotions. We might say 'I feel bad' without knowing whether that's sadness, frustration, disappointment, or loneliness.",
            "Try the 'Name it to Tame it' technique: when you notice a strong feeling, pause and try to label it specifically. Research shows this simple act activates the prefrontal cortex and reduces emotional intensity.",
            "All emotions are valid and carry information. Anger might signal a boundary has been crossed. Anxiety might signal something matters to you. Sadness might signal a loss that needs to be grieved.",
        ],
    },
];

// ─── Self-Help Toolkit ───
const SELF_HELP_TOOLS = [
    {
        title: "Progressive Muscle Relaxation",
        icon: Dumbbell,
        description: "A step-by-step body relaxation technique to release physical tension caused by stress.",
        steps: [
            "Find a quiet, comfortable place. Sit or lie down.",
            "Start with your feet — tense the muscles tightly for 5 seconds.",
            "Release and notice the contrast between tension and relaxation for 15 seconds.",
            "Move upward: calves → thighs → abdomen → chest → hands → arms → shoulders → face.",
            "Breathe slowly and deeply throughout. After completing all muscle groups, rest for a few minutes.",
        ],
    },
    {
        title: "Journaling Prompts for Mental Clarity",
        icon: PenLine,
        description: "Writing helps untangle thoughts. Use these prompts when your mind feels cluttered.",
        steps: [
            "What are three things I'm grateful for today? (even small things)",
            "What emotion am I feeling right now, and where do I feel it in my body?",
            "What is one thing I accomplished this week that I'm proud of?",
            "If I could tell my younger self one thing, what would it be?",
            "What is one boundary I need to set this week, and with whom?",
        ],
    },
    {
        title: "The Pomodoro Study Technique",
        icon: Timer,
        description: "A time management method that fights procrastination and prevents burnout.",
        steps: [
            "Choose one task to focus on (e.g., one chapter, one assignment section).",
            "Set a timer for 25 minutes. Work with full focus — no phone, no distractions.",
            "When the timer rings, take a 5-minute break. Stand up, stretch, drink water.",
            "After 4 Pomodoros (2 hours), take a longer break of 15–30 minutes.",
            "Track your Pomodoros to see how much focused work you actually complete each day.",
        ],
    },
    {
        title: "Daily Gratitude Practice",
        icon: Smile,
        description: "Gratitude rewires the brain for positivity. A 2-minute daily habit that shifts your perspective.",
        steps: [
            "Each evening, write down 3 things you're grateful for. Be specific — not just 'my friends' but 'Kofi checking on me after my tough exam'.",
            "Include at least one thing about yourself you appreciate (e.g., 'I showed up to lecture even though I was tired').",
            "Once a week, express gratitude to someone — a text, a call, or in person. This strengthens relationships and well-being.",
            "On hard days, look back at past entries for a reminder that good things exist alongside the difficult ones.",
        ],
    },
    {
        title: "Box Breathing for Calm",
        icon: Wind,
        description: "A simple breathing technique used by athletes and military to regain calm under pressure.",
        steps: [
            "Sit upright and exhale all the air from your lungs.",
            "Breathe IN slowly through your nose for 4 seconds.",
            "HOLD your breath for 4 seconds.",
            "Breathe OUT slowly through your mouth for 4 seconds.",
            "HOLD your breath (empty lungs) for 4 seconds.",
            "Repeat for 4 cycles. You should feel noticeably calmer.",
        ],
    },
];

// ─── Recommended Apps & Websites ───
const RECOMMENDED_APPS = [
    {
        name: "Headspace",
        description: "Guided meditation and mindfulness exercises. Free basics plan available for students.",
        url: "https://www.headspace.com/",
        icon: Sparkles,
        tag: "Meditation",
        features: [
            "Hundreds of guided meditations for focus, sleep, stress, and anxiety",
            "Bite-sized sessions from 3 to 20 minutes — perfect between lectures",
            "Sleep sounds and sleepcasts to help you fall asleep faster",
            "Focus music designed to boost concentration during study sessions",
            "SOS exercises for moments of panic, anxiety, or overwhelm",
        ],
        freeInfo: "Free 'Basics' course (10 sessions) available to everyone. Many universities offer free Headspace Plus — check if yours does.",
        howToStart: [
            "Download Headspace from App Store or Google Play",
            "Create an account — check if your university email qualifies for free access",
            "Start with the free 'Basics' course (10 days, 3–10 minutes each)",
            "Try 'SOS' sessions anytime you feel overwhelmed or panicked",
        ],
    },
    {
        name: "7 Cups",
        description: "Free online chat with trained listeners for emotional support. Available 24/7 worldwide.",
        url: "https://www.7cups.com/",
        icon: Heart,
        tag: "Chat Support",
        features: [
            "Free 1-on-1 chat with trained active listeners — completely anonymous",
            "Available 24/7 in over 140 languages worldwide",
            "Community forums where you can share experiences and get peer support",
            "Self-help guides covering anxiety, depression, relationships, and more",
            "Growth paths — structured self-improvement exercises you can do at your own pace",
        ],
        freeInfo: "The core service (listener chat, community forums, self-help guides) is completely free. Premium therapy is paid but optional.",
        howToStart: [
            "Visit 7cups.com or download the app",
            "Choose to chat as a 'Guest' (anonymous) or create a free account",
            "Select a topic you want to talk about (stress, relationships, etc.)",
            "You'll be matched with a trained listener within minutes",
        ],
    },
    {
        name: "Calm",
        description: "Sleep stories, breathing exercises, and relaxation music. Great for improving sleep quality.",
        url: "https://www.calm.com/",
        icon: Moon,
        tag: "Sleep & Relaxation",
        features: [
            "Sleep Stories — bedtime stories narrated by celebrities to help you drift off",
            "Daily Calm — a new 10-minute guided meditation every day",
            "Breathing exercises with visual guides for quick stress relief",
            "Nature sounds and ambient music for study and relaxation",
            "Body scan meditations for releasing physical tension",
        ],
        freeInfo: "A selection of meditations, sleep stories, and breathing exercises are free forever. Premium unlocks the full library.",
        howToStart: [
            "Download Calm from App Store or Google Play",
            "Explore the free content — try 'Breathe' for instant stress relief",
            "Listen to a free Sleep Story tonight before bed",
            "Try the '7 Days of Calm' free introductory programme",
        ],
    },
    {
        name: "Woebot",
        description: "An AI-powered chatbot that uses CBT techniques to help you manage your mood.",
        url: "https://woebothealth.com/",
        icon: Brain,
        tag: "AI Therapy",
        features: [
            "Daily check-ins powered by AI to track your mood patterns over time",
            "Uses CBT (Cognitive Behavioural Therapy) techniques in conversational format",
            "Teaches you to identify and challenge negative thought patterns",
            "Interactive lessons on gratitude, mindfulness, and cognitive reframing",
            "Completely private — no human reads your conversations",
        ],
        freeInfo: "Woebot is free to use. It is a clinically researched tool developed by Stanford psychologists.",
        howToStart: [
            "Download Woebot from App Store or Google Play",
            "Complete the short onboarding questionnaire",
            "Chat with Woebot daily — it takes only 5–10 minutes",
            "Over time, review your mood insights and thought patterns in the app",
        ],
    },
    {
        name: "MindShift CBT",
        description: "Designed for young adults. Tools for dealing with anxiety, worry, panic, and stress.",
        url: "https://www.anxietycanada.com/resources/mindshift-cbt/",
        icon: Lightbulb,
        tag: "Anxiety Tools",
        features: [
            "Built specifically for teens and young adults dealing with anxiety",
            "Thought journal to identify and challenge anxious thinking patterns",
            "Coping cards you can customise with your own strategies",
            "Guided relaxation exercises (breathing, muscle relaxation, visualisation)",
            "Belief experiments to test whether your anxious predictions come true",
        ],
        freeInfo: "Completely free. Developed by Anxiety Canada, a leading non-profit organisation.",
        howToStart: [
            "Download MindShift CBT from App Store or Google Play",
            "Set up your profile and identify your main anxiety areas",
            "Start with the 'Chill Out' tools for immediate relief",
            "Use the Thought Journal daily to track and challenge anxious thoughts",
        ],
    },
    {
        name: "Sanvello",
        description: "Clinically validated tools for stress, anxiety, and depression. Mood tracking and coping tools.",
        url: "https://www.sanvello.com/",
        icon: Leaf,
        tag: "Mood Tools",
        features: [
            "Daily mood tracking with insights into your emotional patterns",
            "CBT-based coping tools — thought challenging, guided journaling, goal setting",
            "Guided meditations and audio lessons on managing anxiety and depression",
            "Community support with peer groups moderated by professionals",
            "Progress tracking to see how your mental health improves over time",
        ],
        freeInfo: "Free tier includes mood tracking, coping tools, and community access. Premium adds therapy sessions and coaching.",
        howToStart: [
            "Download Sanvello from App Store or Google Play",
            "Complete the initial mood assessment to personalise your experience",
            "Track your mood daily — it takes less than 30 seconds",
            "Explore the 'Coping' section for CBT exercises tailored to your needs",
        ],
    },
];

// ─── Video Resources ───
const VIDEO_RESOURCES = [
    {
        title: "How to Make Stress Your Friend",
        speaker: "Kelly McGonigal · TED",
        videoId: "RcGyVTAoXEU",
        duration: "14 min",
        description: "A paradigm-shifting talk on how changing your attitude toward stress can make you healthier and happier.",
    },
    {
        title: "The Happy Secret to Better Work",
        speaker: "Shawn Achor · TED",
        videoId: "fLJsdqxnZb0",
        duration: "12 min",
        description: "Why happiness fuels success, not the other way around — and how to reprogram your brain.",
    },
    {
        title: "All It Takes Is 10 Mindful Minutes",
        speaker: "Andy Puddicombe · TED",
        videoId: "qzR62JJCMBQ",
        duration: "10 min",
        description: "The founder of Headspace makes the case for taking just 10 minutes per day to be present.",
    },
    {
        title: "Why We All Need to Practice Emotional First Aid",
        speaker: "Guy Winch · TED",
        videoId: "F2hc2FLOdhI",
        duration: "17 min",
        description: "We sustain emotional injuries as often as physical ones — yet we don't treat them. Guy Winch explains why we should.",
    },
];

// ─── Free Books & Guides ───
const FREE_BOOKS = [
    {
        title: "Mind Over Mood",
        author: "Dennis Greenberger & Christine Padesky",
        description:
            "A practical CBT workbook that teaches you to identify and change the thought patterns behind emotional distress. Widely used in therapy worldwide.",
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5537568/",
        category: "CBT & Self-Help",
        color: "from-purple-500/20 to-violet-600/20",
        borderColor: "border-purple-400/20",
        keyTakeaways: [
            "Your thoughts, not situations, determine how you feel — changing thoughts changes emotions",
            "Use 'Thought Records' to identify automatic negative thoughts and test their accuracy",
            "Depression often involves all-or-nothing thinking — learn to find the middle ground",
            "Behavioural experiments help you test beliefs rather than just accepting them",
            "Small, consistent practice of CBT skills leads to lasting emotional change",
        ],
        topicsCovered: ["Cognitive Behavioural Therapy basics", "Thought records & mood tracking", "Challenging negative thinking", "Managing depression & anxiety", "Building new core beliefs"],
    },
    {
        title: "The Feeling Good Handbook",
        author: "David D. Burns",
        description:
            "The classic guide to Cognitive Behavioural Therapy. Learn to defeat depression, overcome anxiety, and enjoy greater intimacy.",
        url: "https://archive.org/details/feelinggoodhandbook",
        category: "Depression & CBT",
        color: "from-blue-500/20 to-cyan-600/20",
        borderColor: "border-blue-400/20",
        keyTakeaways: [
            "There are 10 common cognitive distortions (e.g., all-or-nothing thinking, mind reading, catastrophising)",
            "Depression is often fueled by distorted thinking — not by reality itself",
            "The 'Triple Column Technique' helps replace negative thoughts with rational responses",
            "Procrastination can be overcome by breaking tasks into tiny steps and tracking pleasure/mastery",
            "Communication skills (empathy, assertiveness) are essential for healthy relationships",
        ],
        topicsCovered: ["10 cognitive distortions", "Defeating depression without drugs", "Overcoming anxiety & phobias", "Communication & relationships", "Procrastination & motivation"],
    },
    {
        title: "Stress Management — WHO Guide",
        author: "World Health Organization",
        description:
            "WHO's illustrated guide 'Doing What Matters in Times of Stress' — a free, evidence-based self-help book for managing stress.",
        url: "https://www.who.int/publications/i/item/9789240003927",
        category: "Stress Management",
        color: "from-teal-500/20 to-emerald-600/20",
        borderColor: "border-teal-400/20",
        keyTakeaways: [
            "Grounding techniques (5-4-3-2-1 senses exercise) bring you back to the present moment instantly",
            "Unhooking from difficult thoughts: you are not your thoughts — let them come and go",
            "Acting on your values even during stressful times gives life meaning and direction",
            "Being kind to yourself is not weakness — it builds resilience and emotional recovery",
            "Small daily practices (breathing, movement, connection) compound into major stress reduction",
        ],
        topicsCovered: ["Grounding techniques", "Managing difficult emotions", "Values-based action", "Self-compassion practices", "Building social support"],
    },
    {
        title: "The Anxiety & Phobia Workbook",
        author: "Edmund J. Bourne",
        description:
            "A comprehensive resource covering relaxation, physical exercise, thought-stopping, and lifestyle changes to manage anxiety disorders.",
        url: "https://archive.org/details/anxietyphobiawor0000bour",
        category: "Anxiety",
        color: "from-amber-500/20 to-orange-600/20",
        borderColor: "border-amber-400/20",
        keyTakeaways: [
            "Anxiety disorders are highly treatable — most people improve significantly with the right techniques",
            "Progressive muscle relaxation (tensing & releasing muscles) reduces physical symptoms of anxiety",
            "Gradual exposure to fears (starting small) is the most effective way to overcome phobias",
            "Caffeine, sugar, and lack of exercise significantly worsen anxiety symptoms",
            "Positive self-talk and affirmations can rewire anxious automatic thoughts over time",
        ],
        topicsCovered: ["Types of anxiety disorders", "Relaxation & breathing techniques", "Exposure therapy principles", "Nutrition & lifestyle changes", "Assertiveness & self-esteem"],
    },
    {
        title: "Living Life to the Full",
        author: "Dr Chris Williams",
        description:
            "A free online CBT-based life skills course and guidebook. Helps with low mood, stress, worry, and building confidence.",
        url: "https://llttf.com/",
        category: "Life Skills & CBT",
        color: "from-green-500/20 to-lime-600/20",
        borderColor: "border-green-400/20",
        keyTakeaways: [
            "The 'vicious cycle' model: thoughts → feelings → behaviours are all connected — change one to change all",
            "Worry time technique: schedule 15 minutes daily for worrying, then postpone worries outside that time",
            "Activity scheduling fights low mood — doing things even when unmotivated breaks the depression cycle",
            "Problem-solving in 5 steps: identify → brainstorm → choose → do → review",
            "Building confidence starts with noticing what you ALREADY do well, not focusing on failures",
        ],
        topicsCovered: ["Understanding the vicious cycle", "Tackling worry & rumination", "Building motivation", "Problem-solving skills", "Improving confidence & assertiveness"],
    },
    {
        title: "Problem Management Plus (PM+)",
        author: "World Health Organization",
        description:
            "WHO's free manual for individual psychological help for adults impaired by distress. Includes managing stress, problems, and building social support.",
        url: "https://www.who.int/publications/i/item/WHO-MSD-MER-16.2",
        category: "Guided Self-Help",
        color: "from-indigo-500/20 to-blue-600/20",
        borderColor: "border-indigo-400/20",
        keyTakeaways: [
            "Managing problems effectively: list → prioritise → break into steps → take action → review",
            "Behavioural activation: scheduling pleasant activities fights the withdrawal that worsens distress",
            "Slow breathing (inhale 4s, exhale 6s) activates the parasympathetic nervous system within minutes",
            "Strengthening social support is a core strategy — identify who can help and how",
            "Even 5 sessions of structured self-help can produce meaningful improvement in mental health",
        ],
        topicsCovered: ["Stress management strategies", "Structured problem solving", "Behavioural activation", "Strengthening social support", "Slow breathing techniques"],
    },
    {
        title: "Student Mental Health — Free Guide",
        author: "Mental Health Foundation",
        description:
            "A concise guide addressing common mental health challenges faced by students, with practical tips for coping and seeking support.",
        url: "https://www.mentalhealth.org.uk/explore-mental-health/publications/how-to-student-guide",
        category: "Student Wellness",
        color: "from-rose-500/20 to-pink-600/20",
        borderColor: "border-rose-400/20",
        keyTakeaways: [
            "1 in 4 students experience mental health difficulties — you are not alone in this",
            "Establishing a routine with consistent sleep, meals, and study times protects mental health",
            "Knowing where to get help BEFORE you need it (counselling services, helplines) is crucial",
            "Social media comparison is a significant driver of anxiety and low self-esteem in students",
            "Talking about mental health openly reduces stigma and makes it easier for everyone to seek help",
        ],
        topicsCovered: ["Common student mental health issues", "When & where to seek help", "Building daily routines", "Managing social media impact", "Reducing mental health stigma"],
    },
    {
        title: "Self-Help for Anxiety Management (SAM)",
        author: "University of the West of England",
        description:
            "An open-access resource developed by university researchers to help young adults understand and manage anxiety through practical exercises.",
        url: "https://sam-app.org.uk/",
        category: "Anxiety & Self-Help",
        color: "from-sky-500/20 to-blue-600/20",
        borderColor: "border-sky-400/20",
        keyTakeaways: [
            "Anxiety is a normal human response — it becomes a problem only when it's disproportionate or persistent",
            "Physical symptoms of anxiety (racing heart, sweating) are caused by adrenaline — they are not dangerous",
            "Avoidance maintains anxiety long-term — facing fears gradually (with support) is the path to freedom",
            "Self-monitoring your anxiety levels helps you identify triggers and patterns",
            "Relaxation techniques combined with cognitive strategies are more effective than either alone",
        ],
        topicsCovered: ["Understanding anxiety physiology", "Self-monitoring techniques", "Relaxation exercises", "Cognitive strategies", "Building an anxiety toolkit"],
    },
];

// ─── Quick Tips ───
const QUICK_TIPS = [
    "Drink a full glass of water right now. Dehydration worsens anxiety and fatigue.",
    "Step outside for 5 minutes. Sunlight boosts serotonin and improves mood.",
    "Send a kind message to someone you care about. Connection heals.",
    "Put your phone face-down for the next 30 minutes. Give your mind a break.",
    "Write down one thing you're looking forward to this week. Anticipation lifts mood.",
    "Take 3 slow, deep breaths right now. In through your nose, out through your mouth.",
    "Stretch your neck and shoulders. You're probably holding tension there right now.",
    "Name your current emotion. Just naming it reduces its intensity by up to 50%.",
    "Eat a piece of fruit or a handful of nuts. Blood sugar crashes worsen anxiety.",
    "Forgive yourself for one thing today. You're doing better than you think.",
];

// ─── Animation Variants ───
const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.08 },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function ResourcesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<Category>("All");
    const [expandedArticle, setExpandedArticle] = useState<number | null>(null);
    const [expandedTool, setExpandedTool] = useState<number | null>(null);
    const [tipIndex, setTipIndex] = useState(0);
    const [activeVideo, setActiveVideo] = useState<string | null>(null);
    const [expandedApp, setExpandedApp] = useState<number | null>(null);
    const [expandedBook, setExpandedBook] = useState<number | null>(null);

    const handlePlayVideo = useCallback((videoId: string) => {
        setActiveVideo((prev) => (prev === videoId ? null : videoId));
    }, []);

    // Rotate tips
    useEffect(() => {
        setTipIndex(Math.floor(Math.random() * QUICK_TIPS.length));
        const interval = setInterval(() => {
            setTipIndex((prev) => (prev + 1) % QUICK_TIPS.length);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    // Filter articles
    const filteredArticles = ARTICLES.filter((article) => {
        const matchesCategory = activeCategory === "All" || article.category === activeCategory;
        const matchesSearch =
            searchQuery === "" ||
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen relative font-sans text-white pb-20">
            <div className="relative z-10 space-y-10 p-6 md:p-10 max-w-6xl mx-auto">

                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-4"
                >
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-[2rem] bg-indigo-500/20 border-2 border-indigo-400/30 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                            <BookOpen className="h-8 w-8 text-indigo-300" />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase tracking-widest drop-shadow-2xl">
                                Resources
                            </h1>
                            <p className="text-indigo-300 font-bold text-sm md:text-base uppercase tracking-widest opacity-80 mt-1">
                                Your Wellness Library
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* ── Quick Tip Banner ── */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="rounded-3xl border border-indigo-500/40 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 backdrop-blur-2xl p-8 shadow-2xl relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-3 opacity-20 transition-all duration-700 group-hover:scale-110 group-hover:rotate-12 group-hover:opacity-40">
                        <Lightbulb size={120} className="text-indigo-300" />
                    </div>
                    <div className="relative z-10 space-y-3">
                        <p className="text-sm font-black text-indigo-300 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                            <Sparkles className="h-5 w-5 animate-pulse" />
                            Insight of the day
                        </p>
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={tipIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4 }}
                                className="text-white text-xl md:text-2xl font-black italic max-w-2xl leading-tight"
                            >
                                &ldquo;{QUICK_TIPS[tipIndex]}&rdquo;
                            </motion.p>
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* ── Search & Filter ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="space-y-4"
                >
                    {/* Search bar */}
                    <div className="relative group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-300 transition-colors group-focus-within:text-white" />
                        <input
                            type="text"
                            placeholder="Find articles, tools, or guides..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-2xl border-2 border-white/10 bg-white/5 backdrop-blur-2xl pl-14 pr-6 py-5 text-lg text-white font-medium placeholder:text-indigo-300/50 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500/40 transition-all shadow-xl"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 border-2 ${activeCategory === cat
                                    ? "bg-indigo-600 border-indigo-400 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] scale-105"
                                    : "bg-white/5 text-indigo-200 border-white/10 hover:bg-white/10 hover:border-white/30 hover:text-white"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* ── Featured Articles ── */}
                <section className="space-y-6">
                    <h2 className="text-xl font-black text-white flex items-center gap-3 uppercase tracking-widest">
                        <BookOpen className="h-6 w-6 text-indigo-400" />
                        Featured Guides
                    </h2>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredArticles.map((article, index) => {
                                const Icon = article.icon;
                                const isExpanded = expandedArticle === index;
                                const originalIndex = ARTICLES.indexOf(article);
                                return (
                                    <motion.div
                                        key={article.title}
                                        variants={cardVariants}
                                        layout
                                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
                                        className={`rounded-3xl border-2 ${article.borderColor} bg-gradient-to-br ${article.color} backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-500 cursor-pointer group/card relative ${isExpanded ? "md:col-span-2 lg:col-span-3 border-indigo-500/40" : "hover:-translate-y-2 hover:shadow-indigo-500/10"}`}
                                        onClick={() => setExpandedArticle(isExpanded ? null : originalIndex)}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity" />
                                        <div className="p-8 relative z-10">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex items-start gap-5 flex-1">
                                                    <div className="h-14 w-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 group-hover/card:scale-110 group-hover/card:rotate-6 transition-all shadow-xl">
                                                        <Icon className="h-7 w-7 text-white" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-black text-white text-xl italic group-hover/card:text-indigo-200 transition-colors leading-tight">
                                                            {article.title}
                                                        </h3>
                                                        <div className="flex items-center gap-4 mt-2">
                                                            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300 uppercase tracking-widest">
                                                                <Timer className="h-3.5 w-3.5" /> {article.readTime}
                                                            </div>
                                                            <span className="text-[10px] font-black text-white/50 bg-white/10 px-2.5 py-1 rounded-lg uppercase tracking-widest border border-white/5">{article.category}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {isExpanded ? (
                                                    <ChevronUp className="h-6 w-6 text-indigo-300 flex-shrink-0 mt-1" />
                                                ) : (
                                                    <ChevronDown className="h-6 w-6 text-indigo-300 flex-shrink-0 mt-1" />
                                                )}
                                            </div>
                                            <p className="text-base text-indigo-100/90 mt-5 leading-relaxed font-medium">
                                                {article.description}
                                            </p>

                                            {/* Expanded content */}
                                            <AnimatePresence>
                                                {isExpanded && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.5, ease: "circOut" }}
                                                        className="mt-8 space-y-6 border-t-2 border-white/10 pt-8"
                                                    >
                                                        {article.content.map((paragraph, pIdx) => (
                                                            <p key={pIdx} className="text-lg text-indigo-50/90 leading-relaxed font-medium italic pl-4 border-l-4 border-indigo-500/30">
                                                                &ldquo;{paragraph}&rdquo;
                                                            </p>
                                                        ))}
                                                        <div className="pt-4 flex justify-end">
                                                            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white font-black px-8 py-4 h-auto rounded-xl shadow-lg">
                                                                Mark as Completed
                                                            </Button>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>

                        {filteredArticles.length === 0 && (
                            <div className="col-span-full text-center py-12 text-indigo-300/80">
                                <Search className="h-8 w-8 mx-auto mb-3 opacity-50" />
                                <p className="text-sm">No articles match your search. Try different keywords or clear filters.</p>
                            </div>
                        )}
                    </motion.div>
                </section>

                {/* ── Self-Help Toolkit ── */}
                <section className="space-y-6">
                    <h2 className="text-xl font-black text-white flex items-center gap-3 uppercase tracking-widest">
                        <Sparkles className="h-6 w-6 text-indigo-400" />
                        Self-Help Toolkit
                    </h2>
                    <p className="text-sm text-indigo-200/90 font-medium italic -mt-2">
                        Hands-on techniques for immediate relief. Tap to explore.
                    </p>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-3"
                    >
                        {SELF_HELP_TOOLS.map((tool, index) => {
                            const Icon = tool.icon;
                            const isExpanded = expandedTool === index;
                            return (
                                <motion.div
                                    key={tool.title}
                                    variants={cardVariants}
                                    className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-300 group"
                                >
                                    <button
                                        onClick={() => setExpandedTool(isExpanded ? null : index)}
                                        className={`w-full flex items-center justify-between p-6 text-left transition-all ${isExpanded ? "bg-white/10" : "hover:bg-white/5"}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-2xl bg-indigo-500/20 border-2 border-indigo-400/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                                <Icon className="h-6 w-6 text-indigo-300" />
                                            </div>
                                            <div>
                                                <h3 className="font-black text-white text-lg italic">{tool.title}</h3>
                                                <p className="text-sm text-indigo-200/60 font-medium">{tool.description}</p>
                                            </div>
                                        </div>
                                        {isExpanded ? (
                                            <ChevronUp className="h-6 w-6 text-indigo-300 flex-shrink-0 ml-4" />
                                        ) : (
                                            <ChevronDown className="h-6 w-6 text-indigo-300 flex-shrink-0 ml-4" />
                                        )}
                                    </button>

                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="px-5 pb-5 border-t border-white/5"
                                            >
                                                <ol className="pt-4 space-y-3">
                                                    {tool.steps.map((step, sIdx) => (
                                                        <li key={sIdx} className="flex items-start gap-3 text-sm text-indigo-100 leading-relaxed">
                                                            <span className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-xs font-semibold text-indigo-300">
                                                                {sIdx + 1}
                                                            </span>
                                                            {step}
                                                        </li>
                                                    ))}
                                                </ol>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </section>

                {/* ── Recommended Apps & Websites ── */}
                <section className="space-y-6">
                    <h2 className="text-xl font-black text-white flex items-center gap-3 uppercase tracking-widest">
                        <Smartphone className="h-6 w-6 text-indigo-400" />
                        Curated Tech
                    </h2>
                    <p className="text-sm text-indigo-200/90 font-medium italic -mt-2">
                        Explore tools, features, and getting started guides.
                    </p>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-3"
                    >
                        {RECOMMENDED_APPS.map((app, index) => {
                            const Icon = app.icon;
                            const isExpanded = expandedApp === index;
                            return (
                                <motion.div
                                    key={app.name}
                                    variants={cardVariants}
                                    className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-300 group"
                                >
                                    <button
                                        onClick={() => setExpandedApp(isExpanded ? null : index)}
                                        className={`w-full flex items-center justify-between p-6 text-left transition-all ${isExpanded ? "bg-white/10" : "hover:bg-white/5"}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="h-14 w-14 rounded-2xl bg-indigo-500/20 border-2 border-indigo-400/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                                <Icon className="h-7 w-7 text-indigo-300" />
                                            </div>
                                            <div>
                                                <h3 className="font-black text-white text-xl italic leading-tight">{app.name}</h3>
                                                <div className="flex items-center gap-3 mt-1.5">
                                                    <span className="text-[10px] font-black text-indigo-400 bg-indigo-500/20 px-2.5 py-1 rounded-lg uppercase tracking-widest border border-indigo-500/30">
                                                        {app.tag}
                                                    </span>
                                                    <span className="text-sm text-indigo-200/60 font-medium truncate max-w-[200px]">{app.description}</span>
                                                </div>
                                            </div>
                                        </div>
                                        {isExpanded ? (
                                            <ChevronUp className="h-6 w-6 text-indigo-300 flex-shrink-0 ml-4" />
                                        ) : (
                                            <ChevronDown className="h-6 w-6 text-indigo-300 flex-shrink-0 ml-4" />
                                        )}
                                    </button>

                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="px-5 pb-5 border-t border-white/5"
                                            >
                                                <div className="pt-4 space-y-5">
                                                    {/* Key Features */}
                                                    <div>
                                                        <h4 className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-2">Key Features</h4>
                                                        <ul className="space-y-2">
                                                            {app.features.map((feature, fIdx) => (
                                                                <li key={fIdx} className="flex items-start gap-2 text-sm text-indigo-100 leading-relaxed">
                                                                    <Check className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                                                                    {feature}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    {/* What's Free */}
                                                    <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
                                                        <h4 className="text-xs font-semibold text-green-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                                                            <Sparkles className="h-3 w-3" />
                                                            What&apos;s Free
                                                        </h4>
                                                        <p className="text-sm text-green-100 leading-relaxed">{app.freeInfo}</p>
                                                    </div>

                                                    {/* How to Get Started */}
                                                    <div>
                                                        <h4 className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-2">How to Get Started</h4>
                                                        <ol className="space-y-2">
                                                            {app.howToStart.map((step, sIdx) => (
                                                                <li key={sIdx} className="flex items-start gap-3 text-sm text-indigo-100 leading-relaxed">
                                                                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-xs font-semibold text-indigo-300">
                                                                        {sIdx + 1}
                                                                    </span>
                                                                    {step}
                                                                </li>
                                                            ))}
                                                        </ol>
                                                    </div>

                                                    {/* Visit Website link */}
                                                    <a
                                                        href={app.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 text-sm text-indigo-300 hover:text-indigo-200 transition-colors bg-indigo-500/10 hover:bg-indigo-500/20 px-4 py-2 rounded-xl border border-indigo-500/20"
                                                    >
                                                        Visit {app.name}
                                                        <ExternalLink className="h-3.5 w-3.5" />
                                                    </a>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </section>

                {/* ── Video Resources ── */}
                <section className="space-y-6">
                    <h2 className="text-xl font-black text-white flex items-center gap-3 uppercase tracking-widest">
                        <Play className="h-6 w-6 text-indigo-400" />
                        Watch & Learn
                    </h2>
                    <p className="text-sm text-indigo-200/90 font-medium italic -mt-2">
                        Inspiring talks and sessions, available right here.
                    </p>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid gap-4 md:grid-cols-2"
                    >
                        {VIDEO_RESOURCES.map((video) => {
                            const isPlaying = activeVideo === video.videoId;
                            return (
                                <motion.div
                                    key={video.title}
                                    variants={cardVariants}
                                    className="rounded-[32px] border-2 border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-500 group relative"
                                >
                                    {/* Video Player / Thumbnail */}
                                    <div className="relative w-full aspect-video bg-black/40">
                                        {isPlaying ? (
                                            <iframe
                                                src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0&modestbranding=1`}
                                                title={video.title}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className="absolute inset-0 w-full h-full"
                                            />
                                        ) : (
                                            <button
                                                onClick={() => handlePlayVideo(video.videoId)}
                                                className="absolute inset-0 w-full h-full group cursor-pointer focus:outline-none"
                                                aria-label={`Play ${video.title}`}
                                            >
                                                {/* YouTube Thumbnail */}
                                                <img
                                                    src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                                                    alt={video.title}
                                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
                                                    }}
                                                />
                                                {/* Dark gradient overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                                {/* Play button */}
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="h-16 w-16 rounded-full bg-red-600/90 border-2 border-white/20 flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-red-500 transition-all duration-300">
                                                        <Play className="h-7 w-7 text-white ml-1" fill="white" />
                                                    </div>
                                                </div>
                                                {/* Duration badge */}
                                                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-md">
                                                    {video.duration}
                                                </div>
                                            </button>
                                        )}
                                    </div>

                                    {/* Video Info */}
                                    <div className="p-4">
                                        <h3 className="font-semibold text-white text-sm leading-snug">
                                            {video.title}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1.5">
                                            <span className="text-xs text-indigo-300/90">{video.speaker}</span>
                                            <span className="text-xs text-indigo-300/70">•</span>
                                            <span className="text-xs text-indigo-300/70">{video.duration}</span>
                                        </div>
                                        <p className="text-xs text-indigo-300/90 mt-2 leading-relaxed">
                                            {video.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </section>

                {/* ── Free Books & Guides ── */}
                <section className="space-y-6">
                    <h2 className="text-xl font-black text-white flex items-center gap-3 uppercase tracking-widest">
                        <Download className="h-6 w-6 text-indigo-400" />
                        Guided Reading
                    </h2>
                    <p className="text-sm text-indigo-200/90 font-medium italic -mt-2">
                        Deep dives into evidence-based strategies and workbooks.
                    </p>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-3"
                    >
                        {FREE_BOOKS.map((book, index) => {
                            const isExpanded = expandedBook === index;
                            return (
                                <motion.div
                                    key={book.title}
                                    variants={cardVariants}
                                    className={`rounded-3xl border-2 ${book.borderColor} bg-gradient-to-br ${book.color} backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-500 group relative`}
                                >
                                    <button
                                        onClick={() => setExpandedBook(isExpanded ? null : index)}
                                        className={`w-full flex items-center justify-between p-6 text-left transition-all ${isExpanded ? "bg-white/10" : "hover:bg-white/5"}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="h-14 w-14 rounded-2xl bg-white/10 border-2 border-white/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-xl">
                                                <FileText className="h-7 w-7 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-black text-white text-xl italic leading-tight">{book.title}</h3>
                                                <div className="flex items-center gap-3 mt-1.5">
                                                    <span className="text-sm font-bold text-indigo-200/60 uppercase tracking-widest">{book.author}</span>
                                                    <span className="text-[10px] font-black text-indigo-400 bg-indigo-500/20 px-2.5 py-1 rounded-lg uppercase tracking-widest border border-indigo-500/30">
                                                        {book.category}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        {isExpanded ? (
                                            <ChevronUp className="h-6 w-6 text-indigo-300 flex-shrink-0 ml-4" />
                                        ) : (
                                            <ChevronDown className="h-6 w-6 text-indigo-300 flex-shrink-0 ml-4" />
                                        )}
                                    </button>

                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="px-5 pb-5 border-t border-white/5"
                                            >
                                                <div className="pt-4 space-y-5">
                                                    {/* About */}
                                                    <p className="text-sm text-indigo-100 leading-relaxed">
                                                        {book.description}
                                                    </p>

                                                    {/* Key Takeaways */}
                                                    <div>
                                                        <h4 className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                                            <Lightbulb className="h-3 w-3" />
                                                            Key Takeaways
                                                        </h4>
                                                        <ul className="space-y-2">
                                                            {book.keyTakeaways.map((takeaway, tIdx) => (
                                                                <li key={tIdx} className="flex items-start gap-2 text-sm text-indigo-100 leading-relaxed">
                                                                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-xs font-semibold text-indigo-300 mt-0.5">
                                                                        {tIdx + 1}
                                                                    </span>
                                                                    {takeaway}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    {/* Topics Covered */}
                                                    <div>
                                                        <h4 className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-2">Topics Covered</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {book.topicsCovered.map((topic, topIdx) => (
                                                                <span
                                                                    key={topIdx}
                                                                    className="text-xs text-indigo-200/90 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full"
                                                                >
                                                                    {topic}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Read Full Book link */}
                                                    <a
                                                        href={book.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 text-sm text-indigo-300 hover:text-indigo-200 transition-colors bg-indigo-500/10 hover:bg-indigo-500/20 px-4 py-2 rounded-xl border border-indigo-500/20"
                                                    >
                                                        Read Full Book / Guide
                                                        <ExternalLink className="h-3.5 w-3.5" />
                                                    </a>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </section>

                {/* ── Footer ── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-center py-16 space-y-6"
                >
                    <div className="max-w-3xl mx-auto p-10 rounded-[40px] border-2 border-white/10 bg-white/5 backdrop-blur-3xl shadow-[0_0_50px_rgba(0,0,0,0.3)] relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
                        <p className="text-2xl md:text-3xl font-black text-white italic leading-tight group-hover:scale-105 transition-transform duration-700">
                            &ldquo;The greatest glory in living lies not in never falling, but in rising every time we fall.&rdquo;
                        </p>
                        <p className="text-indigo-300 uppercase tracking-[0.4em] font-black text-sm mt-6">— Nelson Mandela</p>
                    </div>

                    <p className="text-indigo-200/50 font-medium max-w-xl mx-auto leading-relaxed">
                        These resources are for informational purposes. If you are in crisis, please visit our{" "}
                        <a href="/dashboard/crisis" className="text-indigo-400 hover:text-white font-black underline underline-offset-8 decoration-2 transition-all">
                            Crisis Support Centre
                        </a>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
