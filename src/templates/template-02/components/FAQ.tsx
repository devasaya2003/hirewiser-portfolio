import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ExpandableList from "@/components/ui/ExpandableList";
import { faqItems } from "@/constants";

export default function FAQ() {
  return (
    <AnimatedSection className="mt-20 sm:mt-24 lg:mt-32">
      <div className="text-center mb-12 sm:mb-16">
        <Image
          src="/images/img_6625065aaabd00c_white_a700_60x52.svg"
          alt="FAQ Icon"
          width={52}
          height={60}
          className="w-12 sm:w-13 h-12 sm:h-15 mx-auto mb-4"
        />
        <p className=" font-medium text-base text-foreground/40 uppercase tracking-wider mb-2">
          F.A.Q. SECTION
        </p>
        <h2 className=" font-medium text-4xl sm:text-5xl lg:text-[52px] text-foreground leading-tight">
          Frequently asked questions
        </h2>
      </div>
      <ExpandableList
        items={faqItems}
        allowMultiple={false}
        className="max-w-4xl mx-auto"
      />
    </AnimatedSection>
  );
}
