import A17Section from "@/src/components/sections/a17";
import CameraSection from "@/src/components/sections/camera";
import CoreSection from "@/src/components/sections/core";
import ExploreSection from "@/src/components/sections/explore";
import IPhoneModel from "@/src/components/sections/iphoneModel";
import MainIntro from "@/src/components/sections/main-intro";
import ParticlesSection from "@/src/components/sections/particles";

export const metadata = {
  title: "iPhone 15 Pro 및 iPhone 15 Pro Max - Apple (KR)",
  description: "This is Description",
};
export default function Home() {
  return (
    <div className="bg-transparent">
      <MainIntro />
      <CoreSection />
      <IPhoneModel />
      <ExploreSection />
      <A17Section />
      <CameraSection />
    </div>
  );
}
