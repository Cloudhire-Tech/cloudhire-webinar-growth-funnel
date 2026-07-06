export const writtenReviewsContent = {
  title: "What Our Clients Say",
  rating: 4.2,
  reviewCount: 449,
  reviews: [
    {
      id: "written-1",
      quote:
        "Cloudhire helped me alot to get hired. My HR was very professional and she was always there for me to help at every step. She was very responsive. All the queries were timely taken care. They supported me throughout.",
    },
    {
      id: "written-2",
      quote:
        "Great experience with cloudhire as I was facing some delay issue but now I got very great job in UK thanks cloudhire.",
    },
    {
      id: "written-3",
      quote:
        "The virtual interview was quite impressive — smooth, apt, and the questions were totally relevant to my experience and work profile.",
    },
    {
      id: "written-4",
      quote:
        "It really felt like I was giving a real life interview and the questions were very on point as well. I definitely learned a lot.",
    },
    {
      id: "written-5",
      quote:
        "Quite interactive and felt like interviewing with a real person.",
    },
    {
      id: "written-6",
      quote:
        "The guidance and counselling were very supportive. I felt confident throughout the process.",
    },
  ] as const,
} as const;

export type WrittenReview = (typeof writtenReviewsContent.reviews)[number];
