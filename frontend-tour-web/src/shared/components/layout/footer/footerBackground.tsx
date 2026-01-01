"use client";

import { memo } from "react";

export const FooterBackground = memo(() => {
    return (
        <div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            style={{ contain: 'strict' }}
            aria-hidden="true"
        >
            <div
                className="absolute inset-0 transform-gpu"
                style={{
                    backgroundImage: `
                        radial-gradient(at 20% 80%, rgba(196, 106, 74, 0.08) 0px, transparent 50%),
                        radial-gradient(at 80% 20%, rgba(107, 112, 92, 0.05) 0px, transparent 50%)
                    `
                }}
            />
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-terracotta to-transparent opacity-50" />
            <div className="absolute top-20 left-10 w-20 h-20 bg-terracotta/5 rounded-full blur-3xl transform-gpu will-change-[filter]" />
            <div className="absolute bottom-20 right-10 w-32 h-32 bg-olive/5 rounded-full blur-3xl transform-gpu will-change-[filter]" />
        </div>
    );
});

FooterBackground.displayName = "FooterBackground";