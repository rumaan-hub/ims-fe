import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const Faqs = () => {
  return (
    <section id="faq" className='xl:px-24 lg:px-16 md:px-6 px-4 py-12 bg-[#33C92D]/20'>
      <div className='mx-auto'>
        <p className='text-center lg:text-4xl md:text-3xl text-2xl font-semibold'>Frequently Asked Questions</p>
        <div className='bg-white mt-10 py-2 rounded-lg'>
          <Accordion
            type="single"
            collapsible
            className="w-full"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>What is Dentistry99 IMS?</AccordionTrigger>
              <AccordionContent className="text-[11px] md:text-[13px] font-[300]">
                Dentistry99 IMS is a comprehensive inventory management system built specifically for dental practices. It helps you track supplies, manage staff, and streamline your operations.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How do I get started with Dentistry99?</AccordionTrigger>
              <AccordionContent className="text-[11px] md:text-[13px] font-[300]">
                Simply click Book a Demo and our team will walk you through the setup process. We will have your account ready within 24 hours.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is there a free trial available?</AccordionTrigger>
              <AccordionContent className="text-[11px] md:text-[13px] font-[300]">
                Yes! We offer a 30-day free trial with full access to all features. No credit card required to get started.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Can I manage multiple office locations?</AccordionTrigger>
              <AccordionContent className="text-[11px] md:text-[13px] font-[300]">
                Absolutely! Dentistry99 supports multiple office locations under one account. You can manage inventory and staff across all your locations from a single dashboard.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Is my data secure with Dentistry99?</AccordionTrigger>
              <AccordionContent className="text-[11px] md:text-[13px] font-[300]">
                Yes. We use industry-standard encryption and security protocols to keep your data safe. Your practice data is never shared with third parties.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>Can I cancel my subscription anytime?</AccordionTrigger>
              <AccordionContent className="text-[11px] md:text-[13px] font-[300]">
                Yes, you can cancel your subscription at any time with no hidden fees or penalties. We believe in complete transparency.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
              <AccordionContent className="text-[11px] md:text-[13px] font-[300]">
                We accept all major credit cards including Visa, Mastercard, and American Express. All payments are processed securely.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-8">
              <AccordionTrigger>Do you offer training for new users?</AccordionTrigger>
              <AccordionContent className="text-[11px] md:text-[13px] font-[300]">
                Yes! We provide comprehensive onboarding training for all new users including video tutorials, documentation, and live support.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-9">
              <AccordionTrigger>What makes Dentistry99 different from other inventory systems?</AccordionTrigger>
              <AccordionContent className="text-[11px] md:text-[13px] font-[300]">
                Dentistry99 is built exclusively for dental practices. Unlike generic inventory systems, we understand the unique needs of dental offices and provide features tailored specifically for your practice.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Faqs;
