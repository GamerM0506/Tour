"use client";

import { HeroSection } from "./HeroSection";
import { FeaturedTours } from "./FeaturedTours";
import { WhyChooseUs } from "./WhyChooseUs";
import { Testimonials } from "./Testimonials";
import { CTASection } from "./CTASection";

export const HomePage = () => {
    return (
        <main className="overflow-hidden">
            <HeroSection />
            <FeaturedTours />
            <WhyChooseUs />
            <Testimonials />
            <CTASection />
        </main>
    );
};