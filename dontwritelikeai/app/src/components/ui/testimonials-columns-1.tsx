"use client";
import React from "react";
import { motion } from "motion/react";

interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-4 pb-4"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div
                  className="p-6 border border-[var(--ghost)]/60 bg-[var(--ink-light)] max-w-xs w-full relative group hover:border-[var(--accent)]/30 transition-colors duration-300"
                  key={i}
                >
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--accent)]/40" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[var(--accent)]/40" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[var(--accent)]/40" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--accent)]/40" />

                  <div className="text-sm text-[var(--paper-dark)] leading-relaxed">
                    {text}
                  </div>
                  <div className="flex items-center gap-3 mt-5 pt-4 border-t border-[var(--ghost)]/30">
                    <img
                      width={36}
                      height={36}
                      src={image}
                      alt={name}
                      className="h-9 w-9 rounded-none object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                    <div className="flex flex-col">
                      <div className="font-semibold text-[var(--paper)] text-xs tracking-wide">
                        {name}
                      </div>
                      <div className="font-mono text-[var(--muted)] text-[0.65rem] tracking-wider uppercase">
                        {role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

const testimonials: Testimonial[] = [
  {
    text: "My professor flagged my paper for sounding like ChatGPT. Ran it through here, resubmitted, and got an A. Same ideas, just written like a real person.",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    name: "Maya Chen",
    role: "Graduate Student",
  },
  {
    text: "We use AI for first drafts of client emails, but they always sounded off. This tool fixed the tone without losing the message. Clients stopped asking if we were using bots.",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    name: "James Okafor",
    role: "Account Manager",
  },
  {
    text: "I write blog posts for three different clients. AI helps me keep up with volume but the output always reads the same. This actually makes each piece sound different.",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    name: "Rachel Torres",
    role: "Freelance Writer",
  },
  {
    text: "Got tired of my LinkedIn posts sounding like every other AI-generated thought leadership post. Now they sound like me again, just faster to write.",
    image: "https://randomuser.me/api/portraits/men/35.jpg",
    name: "Daniel Kim",
    role: "Startup Founder",
  },
  {
    text: "The before and after difference is wild. It caught stuff I didn't even notice was robotic — the em dashes, the triple lists, the 'it is important to note' filler.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Priya Sharma",
    role: "Content Strategist",
  },
  {
    text: "Our marketing team was split on using AI for copy. This tool was the compromise — we draft with AI, then humanize it here. Everyone's happy.",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    name: "Marcus Webb",
    role: "Marketing Director",
  },
  {
    text: "I used to spend 30 minutes editing out the AI voice from every draft. Now it takes one click. Honestly saved my workflow.",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
    name: "Leah Andersen",
    role: "Technical Writer",
  },
  {
    text: "Applied to 40 jobs with AI cover letters. Zero callbacks. Rewrote them through this tool and started getting interviews within a week.",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    name: "Andre Baptiste",
    role: "Job Seeker",
  },
  {
    text: "As an ESL teacher, I can spot AI writing from students instantly. I recommended this to students who use AI as a starting point — it teaches them what natural English actually sounds like.",
    image: "https://randomuser.me/api/portraits/women/71.jpg",
    name: "Sofia Petrov",
    role: "ESL Instructor",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export const Testimonials = () => {
  return (
    <section className="relative py-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-12"
        >
          <div className="flex justify-center">
            <div className="border border-[var(--ghost)] py-1 px-4 font-mono text-[0.65rem] text-[var(--accent)] uppercase tracking-[0.2em]">
              // testimonials
            </div>
          </div>

          <h2
            className="text-3xl md:text-4xl xl:text-5xl font-bold tracking-tighter mt-6 text-[var(--paper)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            People stopped getting flagged
          </h2>
          <p className="text-center mt-4 text-[var(--muted)] text-sm">
            Real users. Real results. No more robot voice.
          </p>
        </motion.div>

        <div className="flex justify-center gap-4 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
};
