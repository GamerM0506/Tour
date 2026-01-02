import dynamic from 'next/dynamic';
import { LoadingSkeleton } from './LoadingSkeleton';

const TourListPage = dynamic(
  () => import("./index").then(mod => mod.TourListPage),
  {
    ssr: true,
    loading: () => <LoadingSkeleton /> 
  }
);

export const metadata = {
  title: "Our Luxury Tours | Random Tailored Tours",
  description: "Explore our hand-picked luxury tours across Vietnam, from Halong Bay to Sapa.",
};

export default function Page() {
  return <TourListPage />;
}