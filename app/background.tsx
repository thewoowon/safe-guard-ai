"use client";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const Background = () => {
  return (
    <AuroraBackground
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    />
  );
};

export default Background;

const drift1 = keyframes`
  0%   { transform: translate(-8%, -6%) scale(1); }
  50%  { transform: translate(6%, 4%) scale(1.12); }
  100% { transform: translate(-8%, -6%) scale(1); }
`;

const drift2 = keyframes`
  0%   { transform: translate(6%, -4%) scale(1.05) rotate(0deg); }
  50%  { transform: translate(-6%, 6%) scale(1.18) rotate(10deg); }
  100% { transform: translate(6%, -4%) scale(1.05) rotate(0deg); }
`;

export const AuroraBackground = styled.div`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: #0b1023; /* 베이스 톤 (어두울수록 오로라가 살아나요) */
  min-height: 100vh;

  /* 움직이는 오로라 레이어 1 */
  &::before {
    content: "";
    position: absolute;
    inset: -25%;
    background:
      radial-gradient(
        55% 60% at 20% 25%,
        rgba(99, 102, 241, 0.55),
        rgba(99, 102, 241, 0) 60%
      ),
      radial-gradient(
        45% 55% at 80% 35%,
        rgba(56, 189, 248, 0.55),
        rgba(56, 189, 248, 0) 60%
      ),
      radial-gradient(
        60% 65% at 40% 80%,
        rgba(16, 185, 129, 0.55),
        rgba(16, 185, 129, 0) 60%
      );
    filter: blur(48px);
    transform: translateZ(0); /* GPU 힌트 */
    animation: ${drift1} 28s ease-in-out infinite alternate;
    pointer-events: none;
    will-change: transform;
    mix-blend-mode: screen;
  }

  /* 움직이는 오로라 레이어 2 (겹쳐서 깊이감) */
  &::after {
    content: "";
    position: absolute;
    inset: -30%;
    background:
      radial-gradient(
        50% 55% at 30% 30%,
        rgba(168, 85, 247, 0.45),
        rgba(168, 85, 247, 0) 60%
      ),
      radial-gradient(
        55% 60% at 70% 70%,
        rgba(34, 211, 238, 0.45),
        rgba(34, 211, 238, 0) 60%
      );
    filter: blur(64px);
    transform: translateZ(0);
    animation: ${drift2} 32s ease-in-out infinite alternate;
    pointer-events: none;
    will-change: transform;
    mix-blend-mode: screen;
  }

  @media (prefers-reduced-motion: reduce) {
    &::before,
    &::after {
      animation: none;
    }
  }
`;
