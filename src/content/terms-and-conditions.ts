export type TermsSection = {
  title: string;
  paragraphs?: readonly string[];
  subsections?: readonly {
    title: string;
    paragraphs: readonly string[];
  }[];
};

export const termsAndConditionsContent = {
  brandTitle: "CloudHire Candidate Platform",
  title: "Terms of Use",
  effectiveDate: "Effective Date: 24 March 2026",
  sections: [
    {
      title: "1. Acceptance of Terms",
      paragraphs: [
        'By accessing, downloading, installing, or using the CloudHire Candidate Platform ("Platform"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Use ("Terms"). If you do not agree to any provision of these Terms, you must immediately cease all use of the Platform and delete your account.',
        "Your continued use of the Platform following the posting of revised Terms constitutes your acceptance of those changes. CloudHire will make reasonable efforts to notify registered users of material changes via email or in-app notification.",
      ],
    },
    {
      title: "2. Nature of the Platform – AI Software, Not a Service",
      paragraphs: [
        'CloudHire is an AI-powered software-as-a-service ("SaaS") automation platform. You expressly acknowledge and agree that:',
        "CloudHire is 100% software. There is no human account manager, career coach, career counselor, placement agent, or dedicated support representative assigned to your account.",
        "CloudHire does not provide career coaching, job-placement services, interview preparation, employment counseling, or any form of personalized human guidance.",
        "All resume generation, job matching, application submission, and skill assessment functions are performed by automated AI systems.",
        'Any references to "support" in the Platform refer exclusively to technical support for software functionality (e.g., login issues, bug reports) and do not constitute career guidance or mentorship of any kind.',
        "Purchasing the Platform does not entitle you to human interaction beyond standard technical troubleshooting.",
      ],
    },
    {
      title: "3. Eligibility",
      paragraphs: [
        "You represent and warrant that you have the legal capacity to enter into a binding agreement in your jurisdiction and that all registration information you provide is accurate, current, and complete.",
      ],
    },
    {
      title: "4. Account Registration and Security",
      paragraphs: [
        "To access Platform features, you must register an account. You agree to maintain the confidentiality of your login credentials and to notify CloudHire immediately at support@cloudhire.ai of any unauthorized access. You are solely responsible for all activity under your account.",
      ],
    },
    {
      title: "5. Platform Services",
      paragraphs: [
        "CloudHire provides the following automated AI-powered tools:",
        "AI Resume Distribution: Automated submission of AI-generated, ATS-optimized resumes to job postings matching your profile.",
        "Resume Optimization: AI-driven generation and formatting of resumes tailored to individual job descriptions.",
        "Skill Assessments: AI-administered video interviews and skill evaluations.",
        "Job Matching: Algorithmic job recommendations based on profile data and preferences.",
        "CloudHire may add, modify, or discontinue features at any time without prior notice.",
      ],
    },
    {
      title: "6. Enrollment, Purchase, and Binding Acceptance of Terms",
      subsections: [
        {
          title: "6.1 Enrollment Process",
          paragraphs: [
            "Access to the CloudHire Platform is available exclusively through a guided sales and enrollment process. The Platform is not available for open self-service purchase. During enrollment, a CloudHire representative will explain the Platform's features, capabilities, and limitations. You acknowledge that you have had the opportunity to ask questions and receive clarification before proceeding.",
          ],
        },
        {
          title: "6.2 One-Time Purchase – No Recurring Billing",
          paragraphs: [
            "Your purchase of the CloudHire Platform is a one-time payment. There is no recurring billing, automatic renewal, or subscription auto-charge. You will be charged once at the time of purchase for the full amount of your selected plan. No further charges will be made to your payment method unless you independently initiate a new purchase.",
          ],
        },
        {
          title: "6.3 Mandatory T&C Acceptance Before Purchase",
          paragraphs: [
            'Before your payment is processed, you will be presented with these Terms of Use and required to provide your electronic signature or affirmative digital consent (e.g., checking a confirmation box and clicking "I Agree"). No purchase can be completed without this step. By providing your electronic signature or affirmative consent, you confirm that:',
            "You have read these Terms of Use in their entirety.",
            "You understand that CloudHire is an AI-powered software platform, not a human-delivered service (see Section 2).",
            "You understand that no employment outcomes are guaranteed (see Section 10).",
            "You understand the refund policy (see Section 11) and accept its terms.",
            "You understand that credits are allocated immediately upon payment and that this allocation constitutes delivery of the purchased product (see Section 7.3).",
            "Your consent is voluntary, informed, and not the result of coercion or misrepresentation.",
          ],
        },
        {
          title: "6.4 Binding Nature of Acceptance",
          paragraphs: [
            "Your electronic signature or affirmative digital consent constitutes a binding legal agreement equivalent to a handwritten signature under applicable law, including the United States Electronic Signatures in Global and National Commerce Act (E-SIGN Act) and the New York State Electronic Signatures and Records Act (ESRA). Once signed and paid, these Terms are fully enforceable. You may not later claim that you did not read, understand, or agree to these Terms.",
          ],
        },
        {
          title: "6.5 T&C Confirmation Email",
          paragraphs: [
            "Immediately following your acceptance and purchase, CloudHire will send a confirmation email to your registered email address containing a complete copy of these Terms of Use, the date and timestamp of your acceptance, and your transaction details. This email serves as your receipt and as evidence of your informed consent.",
          ],
        },
      ],
    },
    {
      title: "7. Credit-Based Delivery System",
      subsections: [
        {
          title: "7.1 Credit Allocation",
          paragraphs: [
            'Each paid purchase includes 1,500 resume-distribution credits ("Paid Credits"). CloudHire may, at its sole and absolute discretion, grant up to 1,500 additional bonus credits ("Bonus Credits") at no extra charge. Bonus Credits carry no monetary value, are non-refundable, non-transferable, and may be revoked or modified at any time.',
          ],
        },
        {
          title: "7.2 Monthly Spend Limit",
          paragraphs: [
            "Credits are consumed at a rate of up to 1,000 credits per calendar month under the standard 3-month plan. CloudHire reserves the right to adjust the monthly spend cap at its discretion with reasonable notice.",
          ],
        },
        {
          title: "7.3 Immediate Allocation Upon Payment – Delivery of Product",
          paragraphs: [
            "THIS IS A CRITICAL TERM. PLEASE READ CAREFULLY.",
            "Upon successful payment, CloudHire immediately allocates your full credit balance (Paid Credits and any applicable Bonus Credits) to your account. This allocation constitutes delivery of the purchased digital product. CloudHire also immediately provisions server resources, AI processing capacity, and automation infrastructure dedicated to your account.",
            "You acknowledge and agree that:",
            "The act of payment triggers immediate, irreversible allocation of resources and credits.",
            "Delivery of the product occurs at the moment of credit allocation, regardless of whether you subsequently create a profile, log into the Platform, or use any features.",
            "Your decision not to create a profile, complete onboarding, log in, or otherwise use the Platform after purchase does not constitute non-delivery of the product.",
            "CloudHire incurs real, non-recoverable costs upon allocation—including AI processing provisioning, resume generation infrastructure, and credit reservation—whether or not you choose to use the Platform.",
            "Inactivity, failure to onboard, or failure to use allocated credits does not entitle you to a refund, reversal, chargeback, or credit of any kind.",
          ],
        },
        {
          title: "7.4 Credit Expiry",
          paragraphs: [
            "All credits—Paid and Bonus—expire at the end of your plan term (3 months from the date of purchase unless otherwise specified). Unused credits do not roll over, carry forward, or accrue monetary value after expiry.",
          ],
        },
        {
          title: "7.5 Credit Consumption",
          paragraphs: [
            "One credit equals one resume distribution (submission to a single job posting). Credits are deemed consumed at the point of submission by the Platform's automated systems, regardless of whether the employer opens, reviews, or responds to the application.",
          ],
        },
      ],
    },
    {
      title: "8. User Responsibilities and LinkedIn Integration",
      paragraphs: [
        'Certain Platform features require a valid LinkedIn browser session cookie ("LinkedIn Cookie") provided by you. You acknowledge and agree that:',
        "You are solely responsible for providing and maintaining a valid, active LinkedIn Cookie.",
        "If your LinkedIn Cookie expires or becomes invalid for a continuous period exceeding seven (7) calendar days, CloudHire bears no responsibility for any interruption, delay, or failure in service delivery during that period.",
        "Credits will not be restored, refunded, or extended for delivery failures attributable to an expired or invalid LinkedIn Cookie.",
        "You are responsible for complying with LinkedIn's own terms of service when providing your cookie to the Platform.",
      ],
    },
    {
      title: "9. Payment Terms",
      paragraphs: [
        "All payments are processed as a one-time charge at the time of enrollment. By completing your purchase, you agree to pay the full amount of your selected plan. All prices are listed in the currency presented at checkout and are inclusive of applicable taxes unless expressly noted. Report any billing discrepancies to support@cloudhire.ai within fifteen (15) calendar days of the charge.",
      ],
    },
    {
      title: "10. No Outcome Guarantees",
      paragraphs: [
        "THIS IS A CRITICAL TERM. PLEASE READ CAREFULLY.",
        "CloudHire provides AI-powered career tools and automated job-matching support. CloudHire does not guarantee, promise, warrant, or represent—expressly or impliedly—any of the following:",
        "That you will receive any interviews, callbacks, or responses from employers.",
        "That you will receive any job offers or employment of any kind.",
        "That you will achieve any specific salary, compensation, or benefits outcome.",
        "That your resume will be reviewed by any particular employer or recruiter.",
        "That the Platform will result in career advancement, professional development, or improved employability.",
        "Results vary entirely based on your individual qualifications, work experience, skills, geographic location, market demand, employer preferences, and other factors wholly outside CloudHire's control. By purchasing, you expressly acknowledge that no outcome of any kind is guaranteed.",
      ],
    },
    {
      title: "11. Refund Policy",
      subsections: [
        {
          title: "11.1 General Rule – No Refunds After Purchase",
          paragraphs: [
            "Because CloudHire immediately allocates credits and provisions resources upon payment (see Section 7.3), and because you have accepted these Terms before completing your purchase (see Section 6.3), all sales are final. Once payment is processed, no refund shall be issued except as expressly provided in Section 11.3.",
          ],
        },
        {
          title: "11.2 No Refund for Inactivity or Non-Use",
          paragraphs: [
            "THIS IS A CRITICAL TERM. PLEASE READ CAREFULLY.",
            "You are not entitled to a refund under any of the following circumstances:",
            "You did not create a profile or account on the Platform after purchase.",
            "You did not log in to the Platform after purchase.",
            "You did not complete the onboarding process.",
            "You did not upload your resume, provide your LinkedIn Cookie, or configure your preferences.",
            "You did not use any credits during your plan term.",
            "You changed your mind after purchase.",
            "You claim you did not understand the product despite having signed these Terms.",
            "Your failure to use the Platform does not constitute non-delivery by CloudHire. Delivery occurs at the moment of credit allocation (see Section 7.3), which happens immediately upon payment.",
          ],
        },
        {
          title: "11.3 Credit-Based Refund for Non-Delivery by CloudHire",
          paragraphs: [
            "If, and only if, CloudHire fails to distribute resumes despite you maintaining a valid LinkedIn Cookie, completing your profile, and meeting all Platform requirements, you may be eligible for a credit-based refund calculated as follows:",
            "Refund Amount = (Number of Undelivered Paid Credits) × ₹7.5",
            "This credit-based refund applies exclusively to Paid Credits. Bonus Credits carry zero refund value.",
          ],
        },
        {
          title: "11.4 Conditions for Refund Eligibility",
          paragraphs: [
            "To be eligible for any refund under Section 11.3, all of the following must be satisfied:",
            "You have created a complete profile on the Platform and actively configured your preferences.",
            "Your LinkedIn Cookie has been valid and active (not expired for more than 7 consecutive days) throughout the plan term.",
            "The customer has completed at least 3 AI interviews through the CloudHire platform.",
            "The customer has achieved a minimum score of 75% on CloudHire's required skill assessments.",
            'The first thirty (30) calendar days of your plan ("Onboarding Period") must have elapsed. No refund requests will be processed during this period because initial service activation is resource-intensive and begins immediately upon purchase.',
            "CloudHire must have failed to distribute Paid Credits despite your full compliance with all Platform requirements.",
            "You must submit a written refund request to support@cloudhire.ai within thirty (30) days of the end of your plan term.",
            "Your request must include: full name, registered email, and a description of the non-delivery issue.",
          ],
        },
        {
          title: "11.5 Refund Exclusions",
          paragraphs: [
            "No refund shall be issued under any of the following circumstances:",
            "You did not receive interviews, job offers, or any particular employment outcome (see Section 10).",
            "You are dissatisfied with the quality of AI-generated resumes or job matches.",
            "Your LinkedIn Cookie expired for more than 7 consecutive days.",
            "You failed to complete required AI interviews or skill assessments.",
            "You did not create a profile, log in, or use the Platform (see Section 11.2).",
            "You expected human coaching, account management, or personalized career guidance (see Section 2).",
            "You have already consumed credits or activated premium features.",
            "You changed your mind after purchase or no longer wish to use the Platform.",
          ],
        },
        {
          title: "11.6 Final Discretion",
          paragraphs: [
            "CloudHire reserves full and absolute discretion to approve or deny any refund request. All refund decisions are final and not subject to appeal. Refund requests will be reviewed within fourteen (14) business days.",
          ],
        },
      ],
    },
    {
      title: "12. Chargebacks and Payment Disputes",
      paragraphs: [
        "You acknowledge that you have voluntarily entered into this agreement after a guided enrollment process, have electronically signed these Terms, and have received a confirmation email with a timestamped copy of these Terms and your transaction details.",
        "If you initiate a chargeback, payment dispute, or reversal with your bank, card issuer, or payment processor after having accepted these Terms and received delivery of credits, CloudHire reserves the right to:",
        "Immediately suspend or permanently terminate your account and all associated credits.",
        "Contest the chargeback by submitting evidence of your electronic T&C acceptance, timestamped confirmation email, proof of credit allocation, and enrollment records.",
        "Refer the outstanding balance to a third-party collections agency.",
        "Pursue all available legal remedies to recover the disputed amount plus any associated costs, fees, and expenses incurred in responding to the dispute.",
        "Report the dispute to relevant fraud databases or payment-processor fraud-prevention networks, to the extent permitted by applicable law.",
        "You agree that initiating a chargeback after accepting these Terms and receiving credit allocation constitutes a breach of this agreement. This clause does not limit your rights under applicable consumer-protection law to the extent such rights cannot be contractually waived; however, you agree to first contact CloudHire at support@cloudhire.ai to attempt resolution before initiating any external dispute.",
      ],
    },
    {
      title: "Cancellation Policy",
      paragraphs: [
        "The CloudHire Platform is a one-time purchase with no recurring subscription fees. Because credits are allocated and server resources are provisioned immediately upon successful payment (as detailed in Section 7.3), there is no cancellation policy. Once a purchase is complete and payment is processed, the order cannot be cancelled.",
      ],
    },
    {
      title: "13. Use License",
      paragraphs: [
        "CloudHire grants you a limited, non-exclusive, non-transferable, revocable license to access and use the Platform for personal, non-commercial purposes. You shall not modify, copy, distribute, reverse-engineer, decompile, or create derivative works from any part of the Platform or its underlying software.",
      ],
    },
    {
      title: "14. User Conduct",
      paragraphs: [
        "You agree not to:",
        "Use the Platform for any unlawful purpose or in violation of applicable laws.",
        "Impersonate any person or entity, or misrepresent your qualifications.",
        "Interfere with, disrupt, or attempt to gain unauthorized access to Platform systems.",
        "Upload or transmit harmful code, malware, or objectionable content.",
        "Use automated scripts, bots, or tools to access the Platform beyond its intended functionality.",
        "Share your account credentials or LinkedIn Cookie with third parties.",
        "Post, publish, or share false, misleading, or defamatory reviews about CloudHire or its services.",
      ],
    },
    {
      title: "15. Intellectual Property",
      paragraphs: [
        "All content, materials, software, algorithms, AI models, trademarks, logos, and proprietary technology on the Platform are the exclusive property of CloudHire or its licensors and are protected under applicable intellectual property laws. Nothing in these Terms grants you any ownership right in Platform content or technology.",
      ],
    },
    {
      title: "16. Privacy Policy",
      paragraphs: [
        "Your use of the Platform is governed by CloudHire's Privacy Policy, which describes how we collect, process, store, and protect your personal information. By using the Platform, you consent to data practices described in the Privacy Policy.",
      ],
    },
    {
      title: "17. Disclaimers",
      paragraphs: [
        'THE PLATFORM IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY. CLOUDHIRE EXPRESSLY DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, ACCURACY, AND RELIABILITY.',
        "CloudHire does not warrant that the Platform will be uninterrupted, error-free, secure, or free of harmful components. CloudHire does not warrant the accuracy, completeness, or usefulness of any AI-generated content, including resumes, job matches, or assessment results.",
      ],
    },
    {
      title: "18. Limitation of Liability",
      paragraphs: [
        "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL CLOUDHIRE, ITS DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, BUSINESS OPPORTUNITIES, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE PLATFORM.",
        "CloudHire's total cumulative liability to you for all claims arising from your use of the Platform shall not exceed the total amount you paid to CloudHire for your purchase.",
      ],
    },
    {
      title: "19. Indemnification",
      paragraphs: [
        "You agree to indemnify, defend, and hold harmless CloudHire and its officers, directors, employees, and agents from and against any and all claims, liabilities, damages, losses, and expenses (including reasonable attorney's fees) arising from or related to your use of the Platform, your violation of these Terms, or your violation of any third-party rights.",
      ],
    },
    {
      title: "20. Termination",
      paragraphs: [
        "CloudHire reserves the right to suspend or terminate your account at its sole discretion, without prior notice, for conduct that violates these Terms, is harmful to other users, or is otherwise detrimental to the Platform. Upon termination, your license to use the Platform is immediately revoked, all unused credits are forfeited, and no refund shall be issued.",
      ],
    },
    {
      title: "21. Dispute Resolution",
      paragraphs: [
        'Any dispute arising out of or relating to these Terms or your use of the Platform shall first be subject to good-faith negotiation between the parties. If the dispute is not resolved within thirty (30) days, it shall be referred to binding arbitration administered by the American Arbitration Association ("AAA") under its Commercial Arbitration Rules. The seat of arbitration shall be New York, New York, and proceedings shall be conducted in English.',
        "You agree that any claim or dispute must be brought in your individual capacity and not as a plaintiff or class member in any purported class or representative proceeding.",
      ],
    },
    {
      title: "22. Force Majeure",
      paragraphs: [
        "CloudHire shall not be liable for any failure or delay in performing its obligations under these Terms if such failure or delay results from circumstances beyond its reasonable control, including but not limited to acts of God, natural disasters, pandemics, government actions, internet outages, third-party service disruptions, cyberattacks, or changes in applicable law.",
      ],
    },
    {
      title: "23. Severability",
      paragraphs: [
        "If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable while preserving its original intent.",
      ],
    },
    {
      title: "24. Entire Agreement",
      paragraphs: [
        "These Terms, together with the Privacy Policy and any supplemental terms presented at checkout, constitute the entire agreement between you and CloudHire regarding your use of the Platform and supersede all prior agreements, representations, and understandings.",
      ],
    },
    {
      title: "25. Changes to Terms",
      paragraphs: [
        "CloudHire may update these Terms at any time. Material changes will be communicated via email to registered users or through in-app notification. Your continued use of the Platform after any such update constitutes your acceptance of the revised Terms. If you do not agree to the updated Terms, you must stop using the Platform and request account deletion.",
      ],
    },
    {
      title: "26. Governing Law and Jurisdiction",
      paragraphs: [
        "These Terms are governed by and construed in accordance with the laws of the State of New York, United States of America, without regard to its conflict-of-law principles. Subject to the arbitration clause in Section 21, the state and federal courts located in the County of New York, New York shall have exclusive jurisdiction over any proceedings arising from these Terms.",
      ],
    },
    {
      title: "27. Contact Information",
      paragraphs: [
        "For technical support or refund requests: support@cloudhire.ai",
        "For public relations and review inquiries: PR@cloudhire.ai",
      ],
    },
  ] as const satisfies readonly TermsSection[],
  closing: "END OF TERMS",
} as const;
