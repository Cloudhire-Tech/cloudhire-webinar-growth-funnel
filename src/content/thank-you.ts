export const thankYouContent = {
  paymentSuccessfulLabel: "✅ Payment Successful",
  headline: "You're Registered!",
  description: "Thank you for registering for the CloudHire Webinar.",
  paymentIncompleteHeadline: "Payment required",
  paymentIncompleteDescription:
    "Your seat is reserved only after payment of ₹9 succeeds. Complete payment to get your webinar join link and confirmation email.",
  nextStepsTitle: "What happens next",
  nextSteps: [
    "Watch your email for confirmation.",
    "We'll send reminders before the webinar.",
    "Join the webinar on time.",
  ] as const,
  detailsTitle: "Webinar Details",
  telegram: {
    title: "Get reminders so you don't miss it",
    description:
      "Join the Telegram group — we drop the join link and a nudge 10 minutes before we go live.",
    buttonLabel: "Join Telegram for reminders",
    mobileButtonLabel: "Join Telegram Community",
    supportingNote:
      "You'll also get email + WhatsApp reminders before we go live — no way to forget.",
    url: "https://web.telegram.org/a/#-1003786932851",
  },
} as const;
