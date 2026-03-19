"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface SensorContextType {
    locationData: {
        latitude: number | null;
        longitude: number | null;
        area: string;
        isSupported: boolean;
        error: string | null;
    };
    motionData: {
        isMoving: boolean;
        speed: "stationary" | "walking" | "running" | "none";
        isSupported: boolean;
    };
    environment: {
        theme: string;
        isDark: boolean;
    };
}

const SensorContext = createContext<SensorContextType | undefined>(undefined);

// Mock University Campus Coordinates (Example)
const CAMPUS_AREAS = [
    { name: "Academic Center", lat: 5.6037, lng: -0.1870, radius: 0.002 }, // Example Ghana Lat/Lng
    { name: "Quiet Zone (Library)", lat: 5.6050, lng: -0.1880, radius: 0.001 },
    { name: "Student Union", lat: 5.6020, lng: -0.1860, radius: 0.0015 },
    { name: "Wellness Dorms", lat: 5.6010, lng: -0.1850, radius: 0.0025 }
];

export const SensorProvider = ({ children }: { children: React.ReactNode }) => {
    const [locationData, setLocationData] = useState<SensorContextType["locationData"]>({
        latitude: null,
        longitude: null,
        area: "Unknown Area",
        isSupported: false,
        error: null
    });

    const [motionData, setMotionData] = useState<SensorContextType["motionData"]>({
        isMoving: false,
        speed: "none",
        isSupported: false
    });

    useEffect(() => {
        // 1. Geolocation Sensor
        if ("geolocation" in navigator) {
            const watchId = navigator.geolocation.watchPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    
                    // Identify Area
                    let detectedArea = "Off-Campus";
                    for (const area of CAMPUS_AREAS) {
                        const dist = Math.sqrt(
                            Math.pow(latitude - area.lat, 2) + 
                            Math.pow(longitude - area.lng, 2)
                        );
                        if (dist < area.radius) {
                            detectedArea = area.name;
                            break;
                        }
                    }

                    setLocationData({
                        latitude,
                        longitude,
                        area: detectedArea,
                        isSupported: true,
                        error: null
                    });
                },
                (err) => {
                    setLocationData(prev => ({ ...prev, error: err.message, isSupported: true }));
                },
                { enableHighAccuracy: true }
            );

            return () => navigator.geolocation.clearWatch(watchId);
        }
    }, []);

    useEffect(() => {
        // 2. Motion Sensor (Device Orientation/Motion)
        if (typeof window !== "undefined" && "DeviceMotionEvent" in window) {
            setMotionData(prev => ({ ...prev, isSupported: true }));
            
            const handleMotion = (event: DeviceMotionEvent) => {
                const accel = event.accelerationIncludingGravity;
                if (!accel) return;

                const totalMotion = Math.abs(accel.x || 0) + Math.abs(accel.y || 0) + Math.abs(accel.z || 0);
                
                let speed: SensorContextType["motionData"]["speed"] = "stationary";
                if (totalMotion > 15) speed = "running";
                else if (totalMotion > 11) speed = "walking";

                setMotionData({
                    isMoving: totalMotion > 10.5, // Slight threshold above gravity (approx 9.8)
                    speed,
                    isSupported: true
                });
            };

            window.addEventListener("devicemotion", handleMotion);
            return () => window.removeEventListener("devicemotion", handleMotion);
        }
    }, []);

    return (
        <SensorContext.Provider value={{
            locationData,
            motionData,
            environment: {
                theme: "dark", // Simplified for now
                isDark: true
            }
        }}>
            {children}
        </SensorContext.Provider>
    );
};

export const useSensors = () => {
    const context = useContext(SensorContext);
    if (context === undefined) {
        throw new Error("useSensors must be used within a SensorProvider");
    }
    return context;
};
