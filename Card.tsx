import React from "react";
import { theme } from "../theme";

export const Card: React.FC<{ width?: number; height?: number; border?: string; glow?: boolean; muted?: boolean; style?: React.CSSProperties; children: React.ReactNode }> = ({ width, height, border, glow = false, muted = false, style, children }) => (
  <div style={{ width, height, boxSizing: "border-box", borderRadius: 44, background: muted ? "rgba(236,228,214,0.75)" : theme.colors.card, border: `3px solid ${border ?? theme.colors.line}`, boxShadow: glow ? `0 0 70px ${theme.colors.glow}, 0 40px 80px -24px ${theme.colors.shadow}` : `0 36px 70px -26px ${theme.colors.shadow}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", ...style }}>{children}</div>
);
