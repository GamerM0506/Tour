"use client";

import { memo } from "react";

export const Divider = memo(() => {
    return (
        <div
            style={{ contain: 'paint' }}
            className="relative h-px w-full my-10 bg-linear-to-r from-transparent via-sand/10 to-transparent transform-gpu"
            aria-hidden="true"
        />
    );
});

Divider.displayName = "Divider";