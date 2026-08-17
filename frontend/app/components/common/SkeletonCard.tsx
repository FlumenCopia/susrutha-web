"use client";

import React from "react";

export function SkeletonCard() {
  return (
    <div
      style={{
        borderRadius: "16px",
        background: "rgba(255, 255, 255, 0.7)",
        border: "1px solid rgba(0, 0, 0, 0.08)",
        padding: "16px",
        height: "340px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "180px",
          borderRadius: "12px",
          backgroundColor: "#e2e8f0",
          animation: "skeletonPulse 1.5s infinite ease-in-out",
        }}
      />
      <div
        style={{
          width: "40%",
          height: "14px",
          borderRadius: "4px",
          backgroundColor: "#cbd5e1",
          animation: "skeletonPulse 1.5s infinite ease-in-out",
        }}
      />
      <div
        style={{
          width: "80%",
          height: "20px",
          borderRadius: "4px",
          backgroundColor: "#e2e8f0",
          animation: "skeletonPulse 1.5s infinite ease-in-out",
        }}
      />
      <div
        style={{
          width: "100%",
          height: "14px",
          borderRadius: "4px",
          backgroundColor: "#f1f5f9",
          animation: "skeletonPulse 1.5s infinite ease-in-out",
        }}
      />
      <style jsx>{`
        @keyframes skeletonPulse {
          0% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}
