"use client";

import dynamic from "next/dynamic";

import type { ComponentProps } from "react";

const StickyBottomCta = dynamic(
  () =>
    import("@/components/layout/sticky-bottom-cta").then((module) => ({
      default: module.StickyBottomCta,
    })),
  { ssr: false }
);

type StickyBottomCtaDynamicProps = ComponentProps<typeof StickyBottomCta>;

export function StickyBottomCtaDynamic(props: StickyBottomCtaDynamicProps) {
  return <StickyBottomCta {...props} />;
}
