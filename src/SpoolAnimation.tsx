import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";

// Spool brand colors
const SPOOL_COLORS = {
  lightTints: ["#E6FFFA", "#B2F5EA", "#81E6D9"],
  brand: "#319795",
  darkShades: ["#2C7A7B", "#285E61"],
} as const;

export const spoolAnimationSchema = z.object({
  threadColor: zColor(),
  spoolColor: zColor(),
});

export const SpoolAnimation: React.FC<z.infer<typeof spoolAnimationSchema>> = ({
  threadColor = SPOOL_COLORS.brand,
  spoolColor = SPOOL_COLORS.darkShades[0],
}) => {
  const frame = useCurrentFrame();

  // Generate thread path with smooth transitions
  const getThreadPath = () => {
    const baseX = 300;
    const baseY = 400;
    const spoolCenterX = 600;
    const spoolCenterY = 550;
    
    let path = `M ${baseX} ${baseY}`;
    
    // Phase 1: Straight line growing to the right (frames 0-50)
    if (frame <= 50) {
      const currentLength = interpolate(frame, [0, 50], [0, 400]);
      path += ` L ${baseX + currentLength} ${baseY}`;
    }
    
    // Phase 2: Add loops and squiggles (frames 50-120)
    else if (frame <= 120) {
      const loopAnimationProgress = interpolate(frame, [50, 120], [0, 1]);
      
      // Base line
      path += ` L ${baseX + 400} ${baseY}`;
      
      if (loopAnimationProgress > 0.1) {
        // First loop - animated appearance
        const loop1Progress = interpolate(loopAnimationProgress, [0.1, 0.4], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        
        if (loop1Progress > 0) {
          const loop1EndX = interpolate(loop1Progress, [0, 1], [400, 500]);
          const loop1ControlY = interpolate(loop1Progress, [0, 1], [0, -40]);
          
          path += ` C ${baseX + 450} ${baseY + loop1ControlY} ${baseX + loop1EndX} ${baseY + loop1ControlY} ${baseX + loop1EndX} ${baseY}`;
          
          if (loop1Progress > 0.5) {
            const loop1ReturnX = interpolate(loop1Progress, [0.5, 1], [500, 600]);
            const loop1ReturnY = interpolate(loop1Progress, [0.5, 1], [0, 40]);
            path += ` C ${baseX + loop1EndX} ${baseY + loop1ReturnY} ${baseX + 550} ${baseY + loop1ReturnY} ${baseX + loop1ReturnX} ${baseY}`;
          }
        }
      }
      
      if (loopAnimationProgress > 0.4) {
        // Squiggle - animated appearance
        const squiggleProgress = interpolate(loopAnimationProgress, [0.4, 0.7], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        
        if (squiggleProgress > 0) {
          const squiggleEndX = interpolate(squiggleProgress, [0, 1], [600, 750]);
          const squiggleWave = Math.sin(squiggleProgress * Math.PI * 2) * 15;
          
          path += ` C ${baseX + 650} ${baseY - squiggleWave} ${baseX + 700} ${baseY + squiggleWave} ${baseX + squiggleEndX} ${baseY}`;
        }
      }
      
      if (loopAnimationProgress > 0.7) {
        // Second loop - animated appearance
        const loop2Progress = interpolate(loopAnimationProgress, [0.7, 1], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        
        if (loop2Progress > 0) {
          const loop2EndX = interpolate(loop2Progress, [0, 1], [750, 850]);
          const loop2ControlY = interpolate(loop2Progress, [0, 1], [0, -30]);
          
          path += ` C ${baseX + 800} ${baseY + loop2ControlY} ${baseX + loop2EndX} ${baseY + loop2ControlY} ${baseX + loop2EndX} ${baseY}`;
          
          if (loop2Progress > 0.5) {
            const loop2ReturnX = interpolate(loop2Progress, [0.5, 1], [850, 950]);
            const loop2ReturnY = interpolate(loop2Progress, [0.5, 1], [0, 30]);
            path += ` C ${baseX + loop2EndX} ${baseY + loop2ReturnY} ${baseX + 900} ${baseY + loop2ReturnY} ${baseX + loop2ReturnX} ${baseY}`;
          }
        }
      }
    }
    
    // Phase 3: Spiral down to spool (frames 120-210)
    else {
      const spiralAnimationProgress = interpolate(frame, [120, 210], [0, 1]);
      
      // Draw the complete loops and squiggles
      path += ` L ${baseX + 400} ${baseY}`;
      path += ` C ${baseX + 450} ${baseY - 40} ${baseX + 500} ${baseY - 40} ${baseX + 500} ${baseY}`;
      path += ` C ${baseX + 500} ${baseY + 40} ${baseX + 550} ${baseY + 40} ${baseX + 600} ${baseY}`;
      path += ` C ${baseX + 650} ${baseY - 15} ${baseX + 700} ${baseY + 15} ${baseX + 750} ${baseY}`;
      path += ` C ${baseX + 800} ${baseY - 30} ${baseX + 850} ${baseY - 30} ${baseX + 850} ${baseY}`;
      path += ` C ${baseX + 850} ${baseY + 30} ${baseX + 900} ${baseY + 30} ${baseX + 950} ${baseY}`;
      
      // Spiral transition to spool
      if (spiralAnimationProgress > 0) {
        const spiralTurns = 3;
        const spiralSteps = 30;
        
        for (let i = 0; i < spiralSteps; i++) {
          const stepProgress = i / spiralSteps;
          const animatedStepProgress = interpolate(spiralAnimationProgress, [0, 1], [0, stepProgress], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          
          if (animatedStepProgress > 0) {
            const angle = animatedStepProgress * Math.PI * 2 * spiralTurns;
            const radius = interpolate(animatedStepProgress, [0, 1], [100, 20]);
            const x = interpolate(animatedStepProgress, [0, 1], [950, spoolCenterX]) + Math.cos(angle) * radius;
            const y = interpolate(animatedStepProgress, [0, 1], [400, spoolCenterY]) + Math.sin(angle) * radius * 0.3;
            
            path += ` L ${x} ${y}`;
          }
        }
      }
    }
    
    return path;
  };

  // Spool base visibility - appears earlier and more gradually
  const spoolOpacity = interpolate(
    frame,
    [100, 130],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Thread wrapping animation
  const threadWrapProgress = interpolate(
    frame,
    [180, 210],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Add a subtle glow effect to the thread
  const threadGlow = interpolate(
    frame,
    [0, 30],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: SPOOL_COLORS.lightTints[0],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        {/* Definitions for glow effect */}
        <defs>
          <filter id="threadGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <linearGradient id="spoolGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={spoolColor} />
            <stop offset="100%" stopColor={SPOOL_COLORS.darkShades[1]} />
          </linearGradient>
        </defs>
        
        {/* Spool base - appears first */}
        <g opacity={spoolOpacity}>
          {/* Spool cylinder with gradient */}
          <ellipse
            cx="600"
            cy="520"
            rx="80"
            ry="15"
            fill="url(#spoolGradient)"
          />
          <rect
            x="520"
            y="520"
            width="160"
            height="60"
            fill="url(#spoolGradient)"
          />
          <ellipse
            cx="600"
            cy="580"
            rx="80"
            ry="15"
            fill={SPOOL_COLORS.darkShades[1]}
          />
          
          {/* Spool end caps */}
          <ellipse
            cx="600"
            cy="510"
            rx="100"
            ry="20"
            fill={spoolColor}
            stroke={SPOOL_COLORS.darkShades[1]}
            strokeWidth="2"
          />
          <ellipse
            cx="600"
            cy="590"
            rx="100"
            ry="20"
            fill={SPOOL_COLORS.darkShades[1]}
            stroke={SPOOL_COLORS.darkShades[1]}
            strokeWidth="2"
          />
          
          {/* Inner spool holes */}
          <ellipse
            cx="600"
            cy="510"
            rx="15"
            ry="8"
            fill={SPOOL_COLORS.lightTints[0]}
          />
          <ellipse
            cx="600"
            cy="590"
            rx="15"
            ry="8"
            fill={SPOOL_COLORS.lightTints[0]}
          />
        </g>
        
        {/* Thread path with glow */}
        <path
          d={getThreadPath()}
          stroke={threadColor}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={threadGlow > 0.5 ? "url(#threadGlow)" : "none"}
          opacity={0.9}
        />
        
        {/* Thread wrapped around spool - animated appearance */}
        {threadWrapProgress > 0 && (
          <g opacity={spoolOpacity}>
            {Array.from({ length: 12 }, (_, i) => {
              const wrapOpacity = interpolate(
                threadWrapProgress,
                [i / 12, (i + 1) / 12],
                [0, 0.7],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }
              );
              
              return (
                <ellipse
                  key={i}
                  cx="600"
                  cy={520 + i * 5}
                  rx="78"
                  ry="10"
                  fill="none"
                  stroke={threadColor}
                  strokeWidth="2"
                  opacity={wrapOpacity}
                />
              );
            })}
          </g>
        )}
        
        {/* Final thread end point */}
        {frame > 200 && (
          <circle
            cx="600"
            cy="550"
            r="4"
            fill={threadColor}
            opacity={0.8}
          />
        )}
      </svg>
    </AbsoluteFill>
  );
}; 