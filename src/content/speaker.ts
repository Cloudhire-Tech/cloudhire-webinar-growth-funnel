export type SpeakerHost = {
  name: string;
  avatar: string;
  imageSrc?: string;
};

export const speakerContent = {
  eyebrow: "YOUR HOSTS",
  heading: "Learn from the CloudHire experts",
  role: "CloudHire Consultant",
  bio: "CloudHire consultants who understand the ATS, recruiter expectations, and today's hiring process inside out. They'll show you practical strategies to automate your job search, improve interview opportunities, and save hours every week.",
  hosts: [
    {
      name: "Prasiddhi Das",
      avatar: "PD",
    },
    {
      name: "Ayesha Mahera",
      avatar: "AM",
    },
  ] as SpeakerHost[],
};
