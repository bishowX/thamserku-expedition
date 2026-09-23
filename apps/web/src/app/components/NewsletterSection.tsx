import { Form, useNavigation } from "react-router";
import type { NewsletterActionData } from "../pages/NewsletterPage";

type NewsletterData = {
  newsletterEyebrow?: string;
  newsletterHeading?: string;
  newsletterBody?: string;
  newsletterCta?: string;
  newsletterPrivacyNote?: string;
};

export function NewsletterSection({
  data,
  actionData,
  dark = false,
}: {
  data?: NewsletterData;
  actionData?: NewsletterActionData;
  /** Homepage only: it sits between two light sections there. */
  dark?: boolean;
}) {
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";

  const subscribed = actionData?.success === true;

  // Same palette either way, just flipped: light cream page vs the site's slate.
  const c = dark
    ? {
        bg: "bg-[#2E353C]",
        heading: "text-white",
        muted: "text-[#C8CDD2]",
        input:
          "border-[#5A6673] text-white placeholder:text-[#C8CDD2]/60 focus:border-white",
        button:
          "border-[rgba(200,205,210,0.35)] text-white hover:border-white",
        error: "text-red-400",
      }
    : {
        bg: "bg-[#F4F2EC]",
        heading: "text-[#1A1A1A]",
        muted: "text-[#5A6673]",
        input:
          "border-[#C8CDD2] text-[#1A1A1A] placeholder:text-[#5A6673]/70 focus:border-[#1A1A1A]",
        button:
          "border-[rgba(10,58,119,0.35)] text-[#0A3A77] hover:border-[#0A3A77]",
        error: "text-red-600",
      };

  return (
    <section
      id="newsletter"
      className={`w-full ${c.bg} py-16 md:py-24 px-6 md:px-16`}
    >
      <div className="flex flex-col items-center text-center gap-6">
        <p className={`font-['DM_Mono'] uppercase tracking-[2.4px] text-[11px] ${c.muted}`}>
          {data?.newsletterEyebrow ?? "07 — FIELD NOTES — NEWSLETTER"}
        </p>

        <h2 className={`font-['Fraunces'] text-display-l ${c.heading} max-w-[480px]`}>
          {data?.newsletterHeading ??
            "Receive Field Notes from the expedition desk."}
        </h2>

        <p className={`font-['DM_Sans'] font-light text-body leading-[1.1] ${c.muted} max-w-[540px]`}>
          {data?.newsletterBody ??
            "A quiet quarterly letter of field reports, route judgment and Himalayan readings."}
        </p>

        {subscribed ? (
          <p className={`font-['DM_Mono'] text-[13px] tracking-[2px] uppercase mt-2 ${dark ? "text-white" : "text-[#0A3A77]"}`}>
            {actionData?.alreadySubscribed
              ? "You are already on the list."
              : "You are now on the list. Expect your first field notes soon."}
          </p>
        ) : (
          <Form
            method="post"
            action="/newsletter"
            className="flex flex-col md:flex-row gap-6 items-end justify-center w-full max-w-[485px] mt-2"
          >
            <div className="flex-1 w-full flex flex-col gap-2 items-start">
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Your email address"
                required
                className={`w-full bg-transparent border-b pb-2 font-['Fraunces'] italic text-body tracking-[2.4px] focus:outline-none transition-colors ${c.input}`}
              />
              {actionData?.success === false && (
                <p className={`font-['DM_Mono'] text-[11px] tracking-[1px] ${c.error}`}>
                  {actionData.error}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={submitting}
              className={`w-full md:w-auto border px-8 py-[14px] font-['DM_Mono'] uppercase tracking-[2.4px] text-[11px] transition-colors whitespace-nowrap disabled:opacity-50 ${c.button}`}
            >
              {submitting
                ? "SENDING..."
                : (data?.newsletterCta ?? "SUBSCRIBE →")}
            </button>
          </Form>
        )}

        <p className={`font-['DM_Mono'] font-light text-[13px] leading-[1.1] uppercase tracking-[1px] ${c.muted}`}>
          {data?.newsletterPrivacyNote ??
            "BY SUBSCRIBING YOU AGREE TO OUR PRIVACY TERMS. WE WILL NEVER SHARE YOUR DETAILS."}
        </p>
      </div>
    </section>
  );
}
