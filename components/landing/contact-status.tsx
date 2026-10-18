"use client";

import { socialsConfig } from "@/config/socials";
import { trackEvent } from "@/lib/analytics";
import { FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const emailSocial = socialsConfig.find((social) => social.id === "email");
const linkedinSocial = socialsConfig.find((social) => social.id === "linkedin");

/**
 * Footer presence card. Replaces Discord Lanyard with a calm contact line
 * that points to LinkedIn and email.
 */
export function ContactStatus() {
  const href =
    linkedinSocial?.href ?? emailSocial?.href ?? "mailto:support@ummahsignal.com";
  const handle =
    linkedinSocial?.handle ?? emailSocial?.handle ?? "support@ummahsignal.com";
  const isLinkedIn = Boolean(linkedinSocial?.href);

  return (
    <div className="flex items-center gap-2.5">
      <div className="relative size-7 shrink-0">
        <div className="flex size-full items-center justify-center overflow-hidden rounded-md bg-muted">
          <Image
            src="/images/daedalus-workbench.webp"
            alt=""
            width={28}
            height={28}
            className="size-full object-cover"
          />
        </div>
        <span
          aria-hidden="true"
          className="absolute -bottom-0.5 -right-0.5 size-2 rounded-full bg-emerald-500 ring-[1.5px] ring-background"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium leading-tight tracking-tight text-foreground">
          Building in public.
        </p>
        <p className="truncate text-[11px] leading-tight text-muted-foreground">
          Message on LinkedIn or email, I reply when I can.
        </p>
      </div>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          trackEvent("social_link_clicked", {
            platform: isLinkedIn ? "linkedin" : "email",
            url: href,
            location: "footer_contact_status",
          });
        }}
        className="micro-transition inline-flex h-6 shrink-0 items-center gap-1 rounded-md px-1.5 font-mono text-[10px] text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/20"
        aria-label={
          isLinkedIn ? "Open LinkedIn profile" : "Send email"
        }
      >
        {isLinkedIn ? (
          <FaLinkedin className="size-3 fill-[#0A66C2]" aria-hidden />
        ) : (
          <span aria-hidden className="text-[10px]">
            @
          </span>
        )}
        <span className="hidden sm:inline">
          {isLinkedIn ? "LinkedIn" : handle}
        </span>
      </Link>
    </div>
  );
}

export default ContactStatus;
