// src/components/background-gradient-animation.tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BackgroundGradientAnimationProps {
  children?: React.ReactNode;
  className?: string;
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerEvents?: string;
  size?: string;
  blendingValue?: string;
  interactive?: boolean;
}

export const BackgroundGradientAnimation: React.FC<
  BackgroundGradientAnimationProps
> = ({
  children,
  className,
  gradientBackgroundStart = "rgb(108, 0, 162)", // Default start color
  gradientBackgroundEnd = "rgb(0, 17, 82)",     // Default end color
  firstColor = "18, 113, 255",
  secondColor = "221, 74, 255",
  thirdColor = "100, 220, 255",
  fourthColor = "200, 50, 50",
  fifthColor = "180, 180, 50",
  pointerEvents = "none",
  size = "80%",
  blendingValue = "hard-light",
  interactive = false, // Keep interactive off as per previous design
}) => {
  // Removed interactive logic (useEffect, mousemove) as it wasn't requested

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(45deg, var(--gradient-background-start, ${gradientBackgroundStart}), var(--gradient-background-end, ${gradientBackgroundEnd}))`,
        }}
      >
        <svg className="hidden">
          <defs>
            <filter id="blurMe">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        <div className="gradients-container absolute inset-0 [filter:url(#blurMe)_blur(40px)]">
          {/* Use CSS variables defined in globals.css for animation */}
          <div
            className={cn(
              `absolute [background:radial-gradient(circle_at_center,_var(--first-color)_0,_rgba(var(--first-color),_0)_50%)_no-repeat]`,
              `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
              `[transform-origin:center_center]`,
              `animate-first`, // Use animation name from globals.css
              `opacity-100`
            )}
            style={
                {
                    '--first-color': `rgba(${firstColor}, 1)`, // Pass color via CSS variable
                    '--blending-value': blendingValue,
                    '--size': size,
                 } as React.CSSProperties
            }
          ></div>
          <div
            className={cn(
              `absolute [background:radial-gradient(circle_at_center,_var(--second-color)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]`,
              `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
              `[transform-origin:calc(50%-400px)]`,
              `animate-second`, // Use animation name from globals.css
              `opacity-100`
            )}
             style={
                {
                    '--second-color': `rgba(${secondColor}, 1)`, // Pass color via CSS variable
                    '--blending-value': blendingValue,
                    '--size': size,
                 } as React.CSSProperties
            }
          ></div>
          <div
            className={cn(
              `absolute [background:radial-gradient(circle_at_center,_var(--third-color)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]`,
              `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
              `[transform-origin:calc(50%+400px)]`,
              `animate-third`, // Use animation name from globals.css
              `opacity-100`
            )}
             style={
                {
                    '--third-color': `rgba(${thirdColor}, 1)`, // Pass color via CSS variable
                    '--blending-value': blendingValue,
                    '--size': size,
                 } as React.CSSProperties
            }
          ></div>
          <div
            className={cn(
              `absolute [background:radial-gradient(circle_at_center,_var(--fourth-color)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]`,
              `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
              `[transform-origin:calc(50%-200px)]`,
              `animate-fourth`, // Use animation name from globals.css
              `opacity-70`
            )}
             style={
                {
                    '--fourth-color': `rgba(${fourthColor}, 1)`, // Pass color via CSS variable
                     '--blending-value': blendingValue,
                     '--size': size,
                 } as React.CSSProperties
            }
          ></div>
          <div
            className={cn(
              `absolute [background:radial-gradient(circle_at_center,_var(--fifth-color)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]`,
              `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
              `[transform-origin:calc(50%-800px)_calc(50%+800px)]`,
              `animate-fifth`, // Use animation name from globals.css
              `opacity-100`
            )}
             style={
                {
                    '--fifth-color': `rgba(${fifthColor}, 1)`, // Pass color via CSS variable
                     '--blending-value': blendingValue,
                    '--size': size,
                 } as React.CSSProperties
            }
          ></div>
        </div>
      </div>
      {/* Render children on top */}
      <div className={cn("relative z-10", pointerEvents)}>{children}</div>
    </div>
  );
};
