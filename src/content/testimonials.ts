export const testimonialsContent = {
  eyebrow: "SUCCESS STORIES",
  heading: "They stopped applying by hand",
  videos: [
    {
      id: "rizwan",
      name: "Rizwan",
      vimeoId: "1163273338",
      title: "Rizwan_placement",
      orientation: "landscape",
    },
    {
      id: "deepesh",
      name: "Deepesh",
      vimeoId: "1163277691",
      title: "Deepesh",
      orientation: "landscape",
    },
    {
      id: "earl",
      name: "Earl",
      vimeoId: "1163278038",
      title: "earl-",
      orientation: "portrait",
    },
    {
      id: "jaydeep",
      name: "Jaydeep",
      vimeoId: "1163279249",
      title: "testimonial-2july-1",
      orientation: "portrait",
    },
  ] as const,
  screenshots: [
    {
      id: "karthik-trustpilot-review",
      src: "/testimonials/karthik-trustpilot-review.png",
      alt: 'Trustpilot review from Karthik Mudgal: "Got a job because of them."',
      width: 720,
      height: 321,
    },
    {
      id: "barsha-trustpilot-review",
      src: "/testimonials/barsha-trustpilot-review.png",
      alt: 'Trustpilot review from Barsha Chatterjee: "Very Professional team"',
      width: 720,
      height: 381,
    },
    {
      id: "graphic-designer-offer",
      src: "/testimonials/graphic-designer-offer.png",
      alt: "Email confirming a Graphic Designer candidate accepted the job offer and employment contract is being prepared",
      width: 1024,
      height: 229,
    },
    {
      id: "onboarding-schedule",
      src: "/testimonials/onboarding-schedule.png",
      alt: "Onboarding email with start date and first-week schedule for a newly placed candidate",
      width: 1024,
      height: 547,
    },
    {
      id: "full-stack-offer-letter",
      src: "/testimonials/full-stack-offer-letter.png",
      alt: "Offer letter email for a Full Stack Developer role at CloudHire",
      width: 1024,
      height: 402,
    },
    {
      id: "stocking-reconciliation-offer",
      src: "/testimonials/stocking-reconciliation-offer.png",
      alt: "Email thread confirming a Stocking Reconciliation Specialist accepted the offer",
      width: 1024,
      height: 347,
    },
  ] as const,
} as const;

export type TestimonialVideo =
  (typeof testimonialsContent.videos)[number];

export type TestimonialScreenshot =
  (typeof testimonialsContent.screenshots)[number];
