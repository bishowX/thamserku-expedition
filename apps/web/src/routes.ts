import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./app/pages/Home.tsx"),
  route("expeditions/:slug", "./app/pages/ExpeditionDossier.tsx"),
  route("editions", "./app/pages/EditionsPage.tsx"),
  route("legacy", "./app/pages/LegacyPage.tsx"),
  route("consultation", "./app/pages/EnquiryPage.tsx"),
  route("yeti-infrastructure", "./app/pages/YetiInfrastructure.tsx"),
  route("newsletter", "./app/pages/NewsletterPage.tsx"),
  route("news-and-blogs", "./app/pages/NewsAndBlogsPage.tsx"),
  route("faq", "./app/pages/MainFAQ.tsx"),
  route("design-your-expedition", "./app/pages/DesignPage.tsx"),
  route("api/upload-cv", "./app/api/upload-cv.ts"),
  route("api/preview-mode/enable", "./app/api/preview-mode.enable.ts"),
  route("api/preview-mode/disable", "./app/api/preview-mode.disable.ts"),
  route("sitemap.xml", "./app/api/sitemap.xml.ts"),
  route("robots.txt", "./app/api/robots.txt.ts"),
  route("safety", "./app/pages/SafetyPage.tsx"),
  route("terms-and-conditions", "./app/pages/TermsPage.tsx"),
  route(
    "heritage-and-achievements",
    "./app/pages/HeritageAndAchievementsPage.tsx",
  ),
] satisfies RouteConfig;
