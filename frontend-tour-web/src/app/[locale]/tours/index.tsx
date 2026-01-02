export { TourListPage } from "./TourListPage";
export { TourCard } from "./TourCard";
export { TourGrid } from "./TourGrid";
export { TourFilters } from "./TourFilters";
export { Pagination } from "./Pagination";
export { TourHero } from "./TourHero";
import dynamic from 'next/dynamic';
import { LoadingSkeleton } from "./LoadingSkeleton";

const TourListPage = dynamic(() => import("./index").then(mod => mod.TourListPage), {
    ssr: true,
    loading: () => <LoadingSkeleton />
});