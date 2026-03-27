"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
    CloudRain, Frown, Meh, Smile, Sun, 
    ChevronRight, ChevronLeft, Camera, Mic, 
    MapPin, Cloud, ArrowRight, CheckCircle2, X,
    Flame, Clock, Moon, Star, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmotionWheel } from "./EmotionWheel";
import { SymptomTracker } from "./SymptomTracker";
import { AdvancedMoodTracker } from "./AdvancedMoodTracker";
import { api } from "@/lib/api";
import Link from "next/link";

const MOODS = [
    { value: 1, icon: CloudRain, label: "Awful", color: "text-slate-500", bgColor: "bg-slate-500/10" },
    { value: 2, icon: Frown, label: "Bad", color: "text-red-500", bgColor: "bg-red-500/10" },
    { value: 3, icon: Meh, label: "Okay", color: "text-amber-500", bgColor: "bg-amber-500/10" },
    { value: 4, icon: Smile, label: "Good", color: "text-primary", bgColor: "bg-primary/10" },
    { value: 5, icon: Sun, label: "Great", color: "text-secondary", bgColor: "bg-secondary/10" },
];

export function MoodLogger({ onComplete }: { onComplete: () => void }) {
    const [step, setStep] = useState(1);
    const [mood, setMood] = useState<number | null>(null);
    const [emotion, setEmotion] = useState<string | null>(null);
    const [symptoms, setSymptoms] = useState<string[]>([]);
    const [metrics, setMetrics] = useState({ energy: 3, sleep: 3, social: 3 });
    const [note, setNote] = useState("");
    const [photo, setPhoto] = useState<File | null>(null);
    const [audio, setAudio] = useState<File | null>(null);
    const [weather, setWeather] = useState<any>(null);
    const [location, setLocation] = useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [feedback, setFeedback] = useState<any>(null);
    const [recommendations, setRecommendations] = useState<any[]>([]);

    // Live Media States
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [recognition, setRecognition] = useState<any>(null);
    
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [activityLevel, setActivityLevel] = useState<'LOW' | 'MED' | 'HIGH'>('LOW');
    const [motionData, setMotionData] = useState<number[]>([]);
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (pos) => {
                const { latitude, longitude } = pos.coords;
                setLocation({ lat: latitude, lng: longitude });
                setWeather({ temp: 21, condition: "Partly Cloudy", icon: "Cloud" });
            });
        }

        // Accelerometer Logic
        const handleMotion = (event: DeviceMotionEvent) => {
            const acc = event.accelerationIncludingGravity;
            if (acc) {
                const total = Math.sqrt((acc.x || 0)**2 + (acc.y || 0)**2 + (acc.z || 0)**2);
                setMotionData(prev => [...prev.slice(-10), total]);
            }
        };

        if (typeof DeviceMotionEvent !== 'undefined' && (DeviceMotionEvent as any).requestPermission) {
            // iOS requires permission
        } else {
            window.addEventListener('devicemotion', handleMotion);
        }

        return () => window.removeEventListener('devicemotion', handleMotion);
    }, []);

    useEffect(() => {
        if (motionData.length > 0) {
            const avg = motionData.reduce((a, b) => a + b, 0) / motionData.length;
            if (avg > 15) setActivityLevel('HIGH');
            else if (avg > 11) setActivityLevel('MED');
            else setActivityLevel('LOW');
        }
    }, [motionData]);

    // Audio Logic
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            const chunks: Blob[] = [];
            
            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunks.push(e.data);
            };

            recorder.onstop = () => {
                const audioBlob = new Blob(chunks, { type: 'audio/webm' }); 
                const audioFile = new File([audioBlob], `mood-audio-${Date.now()}.webm`, { type: 'audio/webm' });
                setAudio(audioFile);
                stream.getTracks().forEach(track => track.stop());
            };

            // Speech Recognition Setup
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            if (SpeechRecognition) {
                const reco = new SpeechRecognition();
                reco.continuous = true;
                reco.interimResults = true;
                reco.lang = 'en-US';

                reco.onresult = (event: any) => {
                    for (let i = event.resultIndex; i < event.results.length; i++) {
                        if (event.results[i].isFinal) {
                            setNote(prev => prev + (prev.length > 0 ? ' ' : '') + event.results[i][0].transcript);
                        }
                    }
                };

                reco.onerror = (err: any) => console.error("Speech Recog Error:", err);
                reco.start();
                setRecognition(reco);
            }

            recorder.start();
            setMediaRecorder(recorder);
            setIsRecording(true);
        } catch (err) {
            console.error("Mic access denied:", err);
            alert("Could not access microphone.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorder && isRecording) {
            mediaRecorder.stop();
        }
        if (recognition) {
            recognition.stop();
        }
        setIsRecording(false);
    };

    // Camera Logic
    const openCamera = async () => {
        setIsCameraOpen(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                (videoRef.current as any).srcObject = stream;
            }
        } catch (err) {
            console.error("Camera access denied:", err);
            alert("Could not access camera.");
            setIsCameraOpen(false);
        }
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const canvas = canvasRef.current;
            const video = videoRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(video, 0, 0);
            
            canvas.toBlob((blob) => {
                if (blob) {
                    const photoFile = new File([blob], `mood-photo-${Date.now()}.jpg`, { type: 'image/jpeg' });
                    setPhoto(photoFile);
                    // Stop tracks
                    const stream = video.srcObject as MediaStream;
                    stream.getTracks().forEach(track => track.stop());
                    setIsCameraOpen(false);
                }
            }, 'image/jpeg');
        }
    };

    const closeCamera = () => {
        if (videoRef.current && (videoRef.current as any).srcObject) {
            const stream = (videoRef.current as any).srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
        setIsCameraOpen(false);
    };

    const handleLog = async () => {
        if (mood === null) return;
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('value', mood.toString());
            formData.append('note', note);
            formData.append('energy', metrics.energy.toString());
            formData.append('sleep', metrics.sleep.toString());
            formData.append('social', metrics.social.toString());
            if (emotion) formData.append('emotion', emotion);
            symptoms.forEach(s => formData.append('physicalSymptoms', s));
            if (weather) formData.append('weather', JSON.stringify(weather));
            if (location) formData.append('location', JSON.stringify(location));
            if (photo) formData.append('moodPhoto', photo);
            if (audio) formData.append('moodAudio', audio);
            formData.append('activityLevel', activityLevel);

            const res = await api.post('/moods', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.feedback) setFeedback(res.feedback);
            if (res.recommendations) setRecommendations(res.recommendations);

            if (res.crisisFlag) {
                alert("We noticed some concerning patterns. Please remember that crisis support is available 24/7 in the side menu.");
            }
            setShowSuccess(true);
        } catch (error) {
            console.error("Mood Logging Error:", error);
            alert("Failed to sync your mood.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const nextStep = () => {
        setStep(prev => prev + 1);
    };
    const prevStep = () => {
        setStep(prev => prev - 1);
    };

    return (
        <div className="glass rounded-[2.5rem] p-8 md:p-10 shadow-premium min-h-[650px] flex flex-col justify-between overflow-hidden relative border border-white/10">
            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div 
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-10"
                    >
                        <div className="space-y-2 text-center">
                            <h3 className="text-3xl font-black text-foreground tracking-tight">Core Energy</h3>
                            <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest">How is your spirit pulsating right now?</p>
                        </div>
                        <div className="grid grid-cols-5 gap-4">
                            {MOODS.map((m) => {
                                const Icon = m.icon;
                                const isSelected = mood === m.value;
                                return (
                                    <button
                                        key={m.value}
                                        onClick={() => { setMood(m.value); nextStep(); }}
                                        className={cn(
                                            "group flex flex-col items-center gap-4 p-4 rounded-[2rem] transition-all border-2",
                                            isSelected ? "bg-primary/20 border-primary shadow-xl" : "bg-muted/50 border-transparent hover:border-primary/30"
                                        )}
                                    >
                                        <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-125", isSelected ? m.color : "text-muted-foreground")}>
                                            <Icon size={32} strokeWidth={isSelected ? 2.5 : 2} />
                                        </div>
                                        <span className={cn("text-[8px] font-black uppercase tracking-widest", isSelected ? m.color : "text-muted-foreground")}>{m.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div 
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6 flex flex-col items-center"
                    >
                        <div className="space-y-2 text-center">
                            <h3 className="text-2xl font-black text-foreground uppercase tracking-tighter">Emotion Wheel</h3>
                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em]">Select a specific emotional texture</p>
                        </div>
                        <EmotionWheel onSelect={(e) => { setEmotion(e); nextStep(); }} selectedEmotion={emotion} />
                        <Button variant="ghost" onClick={prevStep} className="text-xs uppercase font-black tracking-widest"><ChevronLeft size={14} className="mr-1" /> Back</Button>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div 
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black text-foreground tracking-tight">Vital Dimensions</h3>
                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em]">Rest, Movement, and Connection</p>
                        </div>
                        
                        <AdvancedMoodTracker 
                            metrics={metrics} 
                            onMetricChange={(f, v) => setMetrics(m => ({ ...m, [f]: v }))} 
                        />
                        
                        <SymptomTracker selected={symptoms} onChange={setSymptoms} />

                        <div className="flex gap-4 pt-4">
                            <Button variant="outline" onClick={prevStep} className="flex-1 rounded-2xl font-black uppercase text-[10px]">Back</Button>
                            <Button onClick={nextStep} className="flex-1 rounded-2xl font-black uppercase text-[10px]">Next <ChevronRight size={14} /></Button>
                        </div>
                    </motion.div>
                )}

                {step === 4 && (
                    <motion.div 
                        key="step4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black text-foreground">Journaling</h3>
                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em]">Capture your voice and surroundings</p>
                        </div>

                        <div className="relative">
                            <textarea
                                placeholder="Pour your heart out here..."
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="w-full bg-muted/30 border border-border/40 rounded-[2rem] p-6 text-sm font-medium focus:ring-4 focus:ring-primary/10 transition-all min-h-[150px] resize-none"
                            />
                            {isRecording && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute bottom-4 right-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20"
                                >
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                                    <span className="text-[8px] font-black uppercase tracking-widest text-primary">Transcribing Audio...</span>
                                </motion.div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Camera Action */}
                            <div className="relative">
                                {isCameraOpen ? (
                                    <div className="flex flex-col gap-2">
                                        <video ref={videoRef} autoPlay className="w-full rounded-2xl bg-black aspect-video object-cover" />
                                        <div className="flex gap-2">
                                            <Button size="sm" onClick={capturePhoto} className="flex-1 text-[8px] font-black uppercase">Snap</Button>
                                            <Button size="sm" variant="ghost" onClick={closeCamera} className="text-[8px] font-black uppercase text-red-500">Close</Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-2 relative">
                                        <button 
                                            onClick={openCamera}
                                            className={cn(
                                                "flex items-center justify-center gap-2 p-4 rounded-2xl border-2 border-dashed border-border/40 hover:border-primary/40 transition-all w-full",
                                                photo ? "border-primary bg-primary/5" : ""
                                            )}
                                        >
                                            <Camera size={18} className={photo ? "text-primary" : "text-muted-foreground"} />
                                            <span className={cn("text-[9px] font-black uppercase", photo ? "text-primary" : "text-muted-foreground")}>
                                                {photo ? "Photo Captured" : "Live Camera"}
                                            </span>
                                        </button>
                                        {photo && (
                                            <button 
                                                onClick={() => setPhoto(null)}
                                                className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 shadow-lg z-10"
                                            >
                                                <X size={12} />
                                            </button>
                                        )}
                                        <label className="flex items-center justify-center gap-2 p-2 rounded-xl bg-muted/30 text-[8px] font-black uppercase cursor-pointer hover:bg-muted/50">
                                            <span>Or Upload File</span>
                                            <input type="file" accept="image/*" className="hidden" onChange={(e) => setPhoto(e.target.files?.[0] || null)} />
                                        </label>
                                    </div>
                                )}
                            </div>

                            {/* Mic Action */}
                            <div className="flex flex-col gap-2 relative">
                                <button 
                                    onClick={isRecording ? stopRecording : startRecording}
                                    className={cn(
                                        "flex items-center justify-center gap-2 p-4 rounded-2xl border-2 border-dashed border-border/40 hover:border-secondary/40 transition-all w-full",
                                        isRecording ? "animate-pulse border-red-500 bg-red-500/5" : (audio ? "border-secondary bg-secondary/5" : "")
                                    )}
                                >
                                    <Mic size={18} className={isRecording ? "text-red-500" : (audio ? "text-secondary" : "text-muted-foreground")} />
                                    <span className={cn("text-[9px] font-black uppercase", isRecording ? "text-red-500" : (audio ? "text-secondary" : "text-muted-foreground") )}>
                                        {isRecording ? "Recording..." : (audio ? "Memo Captured" : "Record Voice")}
                                    </span>
                                </button>
                                {audio && (
                                    <button 
                                        onClick={() => setAudio(null)}
                                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 shadow-lg z-10"
                                    >
                                        <X size={12} />
                                    </button>
                                )}
                                <label className="flex items-center justify-center gap-2 p-2 rounded-xl bg-muted/30 text-[8px] font-black uppercase cursor-pointer hover:bg-muted/50">
                                    <span>Or Upload File</span>
                                    <input type="file" accept="audio/*" className="hidden" onChange={(e) => setAudio(e.target.files?.[0] || null)} />
                                </label>
                            </div>
                        </div>

                        {location && (
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-primary/5 border border-primary/10">
                                <div className="flex items-center gap-2 text-primary">
                                    <MapPin size={14} />
                                    <span className="text-[9px] font-black uppercase italic">Location Syncing...</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Cloud size={14} />
                                    <span className="text-[9px] font-black">{weather?.temp}°C {weather?.condition}</span>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-4 pt-4">
                            <Button variant="outline" onClick={prevStep} className="flex-1 rounded-2xl font-black uppercase text-[10px]">Back</Button>
                            <Button onClick={handleLog} disabled={isSubmitting} className="flex-1 rounded-2xl font-black uppercase text-[10px]">
                                {isSubmitting ? "Syncing..." : "Finalize Log"} <CheckCircle2 size={14} className="ml-2" />
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <canvas ref={canvasRef} className="hidden" />

            <div className="absolute top-0 left-0 w-full h-1 flex gap-1 px-1">
                {[1, 2, 3, 4].map(s => (
                    <div key={s} className={cn("flex-1 h-full rounded-full transition-all duration-500", s <= step ? "bg-primary" : "bg-muted")} />
                ))}
            </div>

            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-[100] flex items-center justify-center p-6 bg-background/95 backdrop-blur-3xl overflow-y-auto"
                    >
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-card glass border border-border p-10 rounded-[3rem] shadow-premium text-center max-w-lg w-full relative space-y-8"
                        >
                            <div className="space-y-6">
                                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                                    <CheckCircle2 size={32} />
                                </div>

                                <div className="space-y-4 text-center">
                                    <h2 className="text-3xl font-black text-foreground tracking-tight">
                                        Mood Sync Complete
                                    </h2>

                                    {/* Bold Streak Counter */}
                                    <motion.div 
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ type: "spring", damping: 15 }}
                                        className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-orange-500/10 to-orange-500/5 rounded-[2.5rem] border border-orange-500/20 shadow-xl shadow-orange-500/5 relative overflow-hidden group"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -translate-x-full group-hover:translate-x-full" />
                                        
                                        <div className="relative">
                                            <Flame size={48} className="text-orange-500 fill-orange-500 animate-pulse" />
                                            <div className="absolute inset-0 bg-orange-500/40 blur-2xl rounded-full scale-150 animate-pulse" />
                                        </div>
                                        
                                        <div className="flex flex-col items-center mt-2 relative z-10">
                                            <span className="text-6xl font-black text-foreground tracking-tighter drop-shadow-sm">
                                                {response?.streak || 1}
                                            </span>
                                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] opacity-80">
                                                Day Streak
                                            </span>
                                        </div>
                                    </motion.div>
                                    {feedback && (
                                        <div className="p-6 rounded-[2rem] bg-muted/30 border border-border space-y-2">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">{feedback.message}</p>
                                            <p className="text-sm text-foreground/80 font-medium italic">"{feedback.description}"</p>
                                        </div>
                                    )}
                                </div>

                                {recommendations.length > 0 && (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 justify-center">
                                            <div className="h-0.5 bg-border flex-1" />
                                            <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground shrink-0">Daily Recommendations</span>
                                            <div className="h-0.5 bg-border flex-1" />
                                        </div>
                                        <div className="grid gap-3">
                                            {recommendations.slice(0, 2).map((rec: any) => (
                                                <Link key={rec.id} href={rec.link || "/dashboard"}>
                                                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/20 border border-border group text-left transition-all hover:bg-muted/40 cursor-pointer">
                                                        <div className="h-10 w-10 rounded-xl bg-background border border-border flex items-center justify-center text-primary shrink-0 transition-transform group-hover:scale-110">
                                                            {rec.icon === 'Users' && <Smile size={20} />}
                                                            {rec.icon === 'Wind' && <Cloud size={20} />}
                                                            {rec.icon === 'PhoneCall' && <CheckCircle2 size={20} />}
                                                            {rec.icon === 'Clock' && <Clock size={20} />}
                                                            {rec.icon === 'Moon' && <Moon size={20} />}
                                                            {rec.icon === 'Star' && <Star size={20} />}
                                                            {rec.icon === 'Zap' && <Zap size={20} />}
                                                        </div>
                                                        <div>
                                                            <h4 className="text-xs font-bold text-foreground">{rec.title}</h4>
                                                            <p className="text-[10px] text-muted-foreground line-clamp-1">{rec.description}</p>
                                                        </div>
                                                        <ArrowRight size={14} className="ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <Button 
                                    onClick={onComplete}
                                    className="w-full h-14 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/20"
                                >
                                    Continue Journey
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Add necessary imports if missing
import { Clock, Moon, Star, Zap } from "lucide-react";

