'use client';

// Libraries
// import { useState } from "react";
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';
import { User } from '@clerk/nextjs/server';
import // ChevronDown,

// ChevronUp,
/* Users,
    Clock,
    Star,
    ArrowRight, */
'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Styled
import { HeroSection } from './styled';

// Hooks
import { use3DEffect } from '@/hooks';

// Components
import { Button } from '@/components/ui';
import { Header } from '../Header';

// Utils
import { mapClerkUserToCreateUserDto } from '@/utils';

// Services
import { userService } from '@/services';

// Constants
import { SHADOW } from '@/constants';

// Hooks
import { useUserConfig } from '@/hooks/useUserConfig';

export const Home = () => {
  const { isSignedIn, isLoaded, user } = useUser();
  const t = useTranslations();
  const { removeUserConfig } = useUserConfig();

  const {
    ref: containerRef,
    style: containerStyle,
    handleMouseMove,
    handleMouseLeave,
  } = use3DEffect();

  // const toggleFaq = (index: number) => {
  //   setOpenFaq(openFaq === index ? null : index);
  // };

  useEffect(() => {
    if (isSignedIn && !!user && isLoaded) {
      const userData = mapClerkUserToCreateUserDto(user as unknown as User);

      userService.createUser(userData);
    }

    if (isLoaded && !isSignedIn) {
      removeUserConfig();
    }
  }, [isSignedIn, user, isLoaded, removeUserConfig]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection className="glass-section py-20">
        <div className="container mx-auto flex flex-col items-center px-4 xl:flex-row xl:gap-16">
          <div className="mb-10 text-center xl:mb-0 xl:w-1/2 xl:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4,
              }}
              className="mb-6 text-4xl font-bold text-default md:text-5xl"
            >
              {t('home.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-8 text-xl text-default"
            >
              {t('home.description')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link href="/dashboard">
                <Button size="large" type="primary">
                  {t('common.getStarted')}
                </Button>
              </Link>
            </motion.div>
          </div>
          <div className="md:w-1/2">
            <motion.div
              ref={containerRef}
              initial={{ opacity: 0, scale: 1.2, rotate: 10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="h-[500px]"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                ...containerStyle,
                transformPerspective: 1000,
                filter: `drop-shadow(${SHADOW.TERTIARY})`,
              }}
            >
              <Image
                fill
                src="/svgs/undraw_pizza_sharing.svg"
                alt="HRM App Mockup"
                className="object-contain object-center"
              />
            </motion.div>
          </div>
        </div>
      </HeroSection>

      {/* {isOpenLoginModal && <SignIn />}
      {isOpenSignUpModal && <SignUp />} */}
      {/* Features Section */}
      {/* <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard
              icon={<Users className="w-12 h-12" />}
              title="Employee Management"
              description="Easily manage employee data, onboarding, and offboarding processes."
            />
            <FeatureCard
              icon={<Clock className="w-12 h-12" />}
              title="Time Tracking & Attendance"
              description="Track employee hours and manage attendance with ease."
            />
            <FeatureCard
              icon={<Star className="w-12 h-12" />}
              title="Performance Reviews"
              description="Streamline performance evaluations and feedback processes."
            />
          </div>
        </div>
      </section> */}

      {/* How it Works */}
      {/* <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How it Works</h2>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <StepCard
              idx={0}
              number={1}
              title="Onboarding"
              description="Set up your account and add employees"
            />
            <ArrowRight className="w-8 h-8 my-4 md:my-0" />
            <StepCard
              idx={1}
              number={2}
              title="Managing"
              description="Track time, attendance, and performance"
            />
            <ArrowRight className="w-8 h-8 my-4 md:my-0" />
            <StepCard
              idx={2}
              number={3}
              title="Reporting"
              description="Generate insightful HR reports"
            />
          </div>
        </div>
      </section> */}

      {/* Testimonials */}
      {/* <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              name="John Doe"
              role="HR Manager"
              company="Tech Co."
              testimonial="This HRM app has revolutionized our HR processes. It's intuitive and saves us hours every week."
            />
            <TestimonialCard
              name="Jane Smith"
              role="CEO"
              company="StartUp Inc."
              testimonial="As a growing startup, this app has been crucial in managing our expanding team efficiently."
            />
            <TestimonialCard
              name="Mike Johnson"
              role="Operations Director"
              company="Global Corp"
              testimonial="The reporting features are outstanding. We now have insights we never had before."
            />
          </div>
        </div>
      </section> */}

      {/* Pricing Section */}
      {/* <section id="pricing" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Pricing Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard
              idx={0}
              plan="Basic"
              price="$29"
              features={[
                "Up to 25 employees",
                "Basic reporting",
                "Email support",
              ]}
            />
            <PricingCard
              idx={1}
              plan="Pro"
              price="$79"
              features={[
                "Up to 100 employees",
                "Advanced reporting",
                "Priority support",
              ]}
            />
            <PricingCard
              idx={2}
              plan="Enterprise"
              price="Custom"
              features={[
                "Unlimited employees",
                "Custom features",
                "24/7 dedicated support",
              ]}
            />
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      {/* <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <FaqItem
              question="How secure is my data?"
              answer="We use industry-standard encryption and security measures to protect your data. Our servers are regularly audited and we comply with all relevant data protection regulations."
              isOpen={openFaq === 0}
              onClick={() => toggleFaq(0)}
            />
            <FaqItem
              question="Can I integrate with other tools?"
              answer="Yes, our HRM app offers integrations with popular tools such as Slack, Google Workspace, and Microsoft 365. We also provide APIs for custom integrations."
              isOpen={openFaq === 1}
              onClick={() => toggleFaq(1)}
            />
            <FaqItem
              question="Is there a free trial available?"
              answer="We offer a 14-day free trial for all our plans. No credit card is required to start your trial."
              isOpen={openFaq === 2}
              onClick={() => toggleFaq(2)}
            />
          </div>
        </div>
      </section> */}

      {/* Footer */}
      {/* <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-4">HRM App</h3>
              <p>
                Simplifying human resource management for businesses of all
                sizes.
              </p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p>Email: info@hrmapp.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
            <div className="w-full md:w-1/3">
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-400">
                  Facebook
                </a>
                <a href="#" className="hover:text-gray-400">
                  Twitter
                </a>
                <a href="#" className="hover:text-gray-400">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2023 HRM App. All rights reserved.</p>
            <div className="mt-2">
              <a href="#" className="hover:text-gray-400 mr-4">
                Terms of Service
              </a>
              <a href="#" className="hover:text-gray-400">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

// function FeatureCard({ icon, title, description }) {
//   return (
//     <div className="bg-gray-100 p-6 rounded-2xl shadow-soft">
//       <div className="bg-white p-4 rounded-full inline-block mb-4 shadow-soft">
//         {icon}
//       </div>
//       <h3 className="text-xl font-semibold mb-2">{title}</h3>
//       <p>{description}</p>
//     </div>
//   );
// }

// function StepCard({ idx, number, title, description }) {
//   const { ref, animationProps } = useScrollInView({
//     initial: { opacity: 0 },
//     animate: { opacity: 1 },
//     transition: { duration: 0.5, ease: "easeOut", delay: idx * 0.2 },
//     threshold: 1,
//     once: false,
//   });

//   return (
//     <motion.div
//       ref={ref}
//       {...animationProps}
//       className="bg-white p-6 rounded-2xl shadow-soft text-center w-full md:w-64"
//     >
//       <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft">
//         <span className="text-xl font-bold">{number}</span>
//       </div>
//       <h3 className="text-xl font-semibold mb-2">{title}</h3>
//       <p>{description}</p>
//     </motion.div>
//   );
// }

// function TestimonialCard({ name, role, company, testimonial }) {
//   return (
//     <div className="bg-gray-100 p-6 rounded-2xl shadow-soft">
//       <p className="mb-4">{testimonial}</p>
//       <div className="flex items-center">
//         <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 shadow-soft"></div>
//         <div>
//           <h4 className="font-semibold">{name}</h4>
//           <p className="text-sm">
//             {role}, {company}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// function PricingCard({ idx, plan, price, features }) {
//   const { ref, animationProps } = useScrollInView({
//     initial: { opacity: 0, y: 50 },
//     animate: { opacity: 1, y: 0 },
//     transition: { duration: 0.5, ease: "easeOut", delay: idx * 0.5 },
//     threshold: 0.5,
//     once: false,
//   });

//   return (
//     <motion.div
//       ref={ref}
//       {...animationProps}
//       className="bg-white p-8 rounded-2xl shadow-soft text-center"
//     >
//       <h3 className="text-2xl font-bold mb-4">{plan}</h3>
//       <p className="text-4xl font-bold mb-6">
//         {price}
//         <span className="text-xl font-normal">/month</span>
//       </p>
//       <ul className="mb-8 space-y-2">
//         {features.map((feature, index) => (
//           <li key={index}>{feature}</li>
//         ))}
//       </ul>
//       {/* <button className="bg-gray-100 text-gray-800 font-semibold py-2 px-6 rounded-lg shadow-soft hover:shadow-soft-hover transition duration-300">
//         Select Plan
//       </button> */}

//       <Button type="primary" size="large">
//         Select Plan
//       </Button>
//     </motion.div>
//   );
// }

// function FaqItem({ question, answer, isOpen, onClick }) {
//   return (
//     <div className="bg-gray-100 rounded-2xl shadow-soft overflow-hidden">
//       <button
//         className="w-full p-4 text-left font-semibold flex justify-between items-center"
//         onClick={onClick}
//       >
//         {question}
//         {isOpen ? (
//           <ChevronUp className="w-5 h-5" />
//         ) : (
//           <ChevronDown className="w-5 h-5" />
//         )}
//       </button>
//       {isOpen && (
//         <div className="p-4 bg-white">
//           <p>{answer}</p>
//         </div>
//       )}
//     </div>
//   );
// }
