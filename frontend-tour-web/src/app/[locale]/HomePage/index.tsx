"use client";

import dynamic from "next/dynamic";
import { Suspense, memo } from "react";
import { HeroSection } from "./HeroSection";

const FeaturedTours = dynamic(() => import("./FeaturedTours").then(mod => mod.FeaturedTours), {
    ssr: true,
});
const WhyChooseUs = dynamic(() => import("./WhyChooseUs").then(mod => mod.WhyChooseUs), {
    ssr: true,
});
const Testimonials = dynamic(() => import("./Testimonials").then(mod => mod.Testimonials), {
    ssr: true,
});
const CTASection = dynamic(() => import("./CTASection").then(mod => mod.CTASection), {
    ssr: true,
});

const SectionPlaceholder = () => <div className="min-h-100 w-full bg-sand-light/50 animate-pulse" />;

export const HomePage = memo(() => {
    return (
        <main 
            className="overflow-hidden transform-gpu"
            style={{ contain: 'content' }}
        >
            <HeroSection />

            <Suspense fallback={<SectionPlaceholder />}>
                <FeaturedTours />
            </Suspense>

            <Suspense fallback={<SectionPlaceholder />}>
                <WhyChooseUs />
            </Suspense>

            <Suspense fallback={<SectionPlaceholder />}>
                <Testimonials />
            </Suspense>

            <Suspense fallback={<SectionPlaceholder />}>
                <CTASection />
            </Suspense>
        </main>
    );
});

HomePage.displayName = "HomePage";