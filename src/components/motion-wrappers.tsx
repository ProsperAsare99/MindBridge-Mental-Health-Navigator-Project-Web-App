"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import React from "react";

export const MotionDiv = (props: HTMLMotionProps<"div">) => <motion.div {...props} />;
export const MotionMain = (props: HTMLMotionProps<"main">) => <motion.main {...props} />;
export const MotionSection = (props: HTMLMotionProps<"section">) => <motion.section {...props} />;
export const MotionH1 = (props: HTMLMotionProps<"h1">) => <motion.h1 {...props} />;
export const MotionP = (props: HTMLMotionProps<"p">) => <motion.p {...props} />;
export const MotionSpan = (props: HTMLMotionProps<"span">) => <motion.span {...props} />;
