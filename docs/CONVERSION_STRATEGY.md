# HexaStack Conversion Optimization Strategy

## Demo Booking Funnel

- **CTA:** "Book a demo" in header and after hero/product sections. Link to Calendly, typeform, or /demo page with embed.
- **Flow:** Click → calendar or form → confirmation + optional reminder (email/WhatsApp).
- **Storage:** If form used, create lead in DB (e.g. Lead model: email, name, product interest, source) and optionally notify sales.

## Lead Magnet

- **Ideas:** "VAT checklist for Gulf businesses" (HexaBill), "ATS checklist for job seekers" (HexaCV). PDF or Notion page.
- **Gate:** Email (and optional name) on landing page; store in Lead/Newsletter model; send asset via Resend.
- **Consent:** Short disclaimer (e.g. "We’ll send the guide and occasional product updates; unsubscribe anytime").

## Email Capture

- **Places:** Footer (newsletter), exit-intent modal (desktop).
- **Same storage and consent as lead magnet.**
- **Exit intent:** One modal per session; offer demo or lead magnet; do not block mobile (use time-on-page or scroll depth if needed).

## WhatsApp Integration

- **Source:** Floating button and contact modals use numbers from CompanySettings (primaryWhatsApp, secondaryWhatsApp). Admin edits in Settings; frontend fetches /api/settings (public or cached).
- **Copy:** "Chat with us" or "Contact on WhatsApp." Two lines (e.g. Sales vs Support) if both numbers shown.

## Pricing Psychology (/pricing)

- **Clarity:** Feature comparison table (HexaBill plans, HexaCV free vs premium if any).
- **Anchoring:** Annual discount (e.g. "2 months free").
- **CTA:** One primary CTA per plan (e.g. "Start free trial" or "Book demo").

## Trust Building

- **Testimonials:** Section on home and product pages; short quote + name/role/company (or "Verified user").
- **Logos:** Industries or regions served (e.g. "Trusted in India & Gulf").
- **Badges:** VAT compliant, data privacy (HexaCV), security where relevant.

## Beta & Referral

- **Beta:** "Join beta" CTA for HexaBill or new tools; capture email + use case; early access in exchange for feedback.
- **Referral:** Optional referral link (e.g. ?ref=xxx) or code; track in analytics; later reward (discount, extended trial).

## India + Gulf Growth

- **India:** WhatsApp prominent; rupee and local use cases; "India" in copy and SEO.
- **Gulf:** VAT, multi-branch, UAE/Saudi in copy; consider Arabic later.
- **Localized CTAs:** "Request demo" / "Chat on WhatsApp" above the fold.
- **Later:** Local payment methods, currency, and language.
