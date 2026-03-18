"use client";

import { ReactNode, useState, useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber"
import { MeshReflectorMaterial, RoundedBox, Html } from "@react-three/drei"
import { Group, Mesh, Vector3, Color } from "three"
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

interface Card3DProps {
    children?: ReactNode
    className?: string
    maxRotation?: number
    scale?: number
    position?: [number, number, number]
    color?: string
    opacity?: number
    reflective?: boolean
    title?: string
    content?: ReactNode
    rotationSmoothness?: number
    hoverScale?: number
    hoverLift?: number
    hoverColor?: string
    hoverLightIntensity?: number
    dynamicLight?: boolean
}

const CardContent = ({
    content,
    cardRotation,
    mousePosition,
    viewport,
}: {
    title?: string
    content?: ReactNode
    cardRotation?: THREE.Euler
    mousePosition?: THREE.Vector2
    viewport?: { width: number, height: number }
}) => {
    const contentRef = useRef<THREE.Group>(null);
    const parallaxAmount = 0.1;

    useFrame(() => {
        if (contentRef.current && cardRotation && mousePosition && viewport) {
            const parallaxX = -cardRotation.y * parallaxAmount * 10;
            const parallaxY = cardRotation.x * parallaxAmount * 10;

            contentRef.current.position.x = parallaxX;
            contentRef.current.position.y = parallaxY;
        }
    });

    return (
        <group ref={contentRef} position={[0, 0, 0.7]}>
            <Html transform pointerEvents="none">
                <div className="select-none">
                    {content}
                </div>
            </Html>
        </group>
    );
}

const Scene = ({
    children,
    maxRotation = 0.05,
    scale = 1.2,
    position = [0, 0, 0],
    color = "#111",
    opacity = 0.9,
    reflective = true,
    title,
    content,
    rotationSmoothness = 0.1,
    hoverScale = 1.03,
    hoverLift = 0.3,
    hoverColor = "#333",
    hoverLightIntensity = 5,
    dynamicLight = true,
}: Omit<Card3DProps, "className">) => {
    const group = useRef<Group>(null);
    const cardMesh = useRef<Mesh>(null);
    const dynamicLightRef = useRef<THREE.PointLight>(null);

    const [hover, setHover] = useState(false);
    const { mouse, viewport } = useThree();

    const targetRotation = useRef(new Vector3(0, 0, 0));
    const targetScale = useRef(scale);
    const targetZ = useRef(position ? position[2] : 0);
    const targetColor = useRef(new Color(color));

    useEffect(() => {
        targetScale.current = scale;
        targetZ.current = position ? position[2] : 0;
        targetColor.current.set(color);
    }, [scale, position, color]);


    useEffect(() => {
        if (hover) {
            targetScale.current = scale * (hoverScale || 1.03);
            targetZ.current = (position ? position[2] : 0) + (hoverLift || 0.3);
            targetColor.current.set(hoverColor || color);
        } else {
            targetScale.current = scale;
            targetZ.current = position ? position[2] : 0;
            targetColor.current.set(color);
        }
    }, [hover, scale, position, hoverScale, hoverLift, color, hoverColor]);


    useFrame(() => {
        if (!group.current || !cardMesh.current) return;

        const rotationTargetX = mouse.y * -maxRotation;
        const rotationTargetY = mouse.x * maxRotation;

        group.current.rotation.x = THREE.MathUtils.lerp(
            group.current.rotation.x,
            hover ? rotationTargetX : 0,
            rotationSmoothness
        );
        group.current.rotation.y = THREE.MathUtils.lerp(
            group.current.rotation.y,
            hover ? rotationTargetY : 0,
            rotationSmoothness
        );

        group.current.scale.x = group.current.scale.y = group.current.scale.z = THREE.MathUtils.lerp(
            group.current.scale.x,
            targetScale.current,
            rotationSmoothness
        );

        group.current.position.z = THREE.MathUtils.lerp(
            group.current.position.z,
            targetZ.current,
            rotationSmoothness
        );

        if (cardMesh.current.material) {
            const material = cardMesh.current.material as THREE.MeshStandardMaterial;
            if (material.color) {
                material.color.lerp(targetColor.current, rotationSmoothness * 0.5);
            }
        }

        if (dynamicLightRef.current && dynamicLight) {
            const lightOffset = new THREE.Vector3(
                group.current.rotation.y * 5,
                -group.current.rotation.x * 5 + 3,
                2
            );

            lightOffset.applyEuler(group.current.rotation);

            dynamicLightRef.current.position.copy(lightOffset);

            dynamicLightRef.current.intensity = THREE.MathUtils.lerp(
                dynamicLightRef.current.intensity,
                hover ? (hoverLightIntensity || 5) : 0,
                rotationSmoothness
            );
        }

    });


    return (
        <group
            ref={group}
            scale={5}
            position={position}
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
        >
            <RoundedBox ref={cardMesh} args={[12, 8.4, 0.4]} radius={0.4} smoothness={10} castShadow receiveShadow>
                {reflective ? (
                    <MeshReflectorMaterial
                        mirror={0}
                        blur={[0, 0]}
                        mixBlur={0}
                        mixStrength={0}
                        mixContrast={1}
                        resolution={256}
                        depthScale={0}
                        minDepthThreshold={0}
                        maxDepthThreshold={0}
                        depthToBlurRatioBias={0}
                        distortion={0}
                        color={color}
                        roughness={0.2}
                        metalness={0.8}
                        opacity={opacity}
                        transparent={opacity ? opacity < 1 : false}
                    />
                ) : (
                    <meshStandardMaterial
                        color={color}
                        roughness={0.3}
                        metalness={0.7}
                        opacity={opacity}
                        transparent={opacity ? opacity < 1 : false}
                    />
                )}
            </RoundedBox>

            <CardContent
                title={title}
                content={content}
                cardRotation={group.current ? group.current.rotation : undefined}
                mousePosition={mouse}
                viewport={viewport}
            />

            {dynamicLight && (
                <pointLight
                    ref={dynamicLightRef}
                    position={[0, 0, 0]}
                    intensity={0}
                    distance={15}
                    decay={2}
                    color="#ffffff"
                    castShadow
                />
            )}


            <group position={[0, 0, 0.16]}>
                {children}
            </group>
        </group>
    );
}


export const Card3D = ({
    children,
    className,
    maxRotation = 0.05,
    scale = 0.8,
    position = [0, 0, 0],
    color = "#111",
    opacity = 0.9,
    reflective = true,
    title,
    content,
    rotationSmoothness = 0.1,
    hoverScale = 1.02,
    hoverLift = 0.2,
    hoverColor = "#222",
    hoverLightIntensity = 8,
    dynamicLight = true,
}: Card3DProps) => {
    return (
        <div className={cn("h-[400px] w-full relative", className)}>
            <Canvas
                shadows
                dpr={[1, 2]}
                camera={{ position: [0, 0, 23], fov: 20 }}
            >
                <ambientLight intensity={0.5} />
                <PointLights />
                <Scene
                    maxRotation={maxRotation}
                    scale={scale}
                    position={position}
                    color={color}
                    opacity={opacity}
                    reflective={reflective}
                    title={title}
                    content={content}
                    rotationSmoothness={rotationSmoothness}
                    hoverScale={hoverScale}
                    hoverLift={hoverLift}
                    hoverColor={hoverColor}
                    hoverLightIntensity={hoverLightIntensity}
                    dynamicLight={dynamicLight}
                >
                    {children}
                </Scene>
            </Canvas>
        </div>
    )
}

function PointLights() {
    return (
        <>
            <directionalLight
                position={[5, 10, 25]}
                intensity={1}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
            />
            <directionalLight
                position={[-5, -10, -10]}
                intensity={0.3}
            />
            <directionalLight
                position={[0, -10, 5]}
                color="#ffffff"
                intensity={0.2}
            />
            <directionalLight
                position={[10, 0, 5]}
                intensity={0.4}
                color="#ae9164"
            />
        </>
    );
}
