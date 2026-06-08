import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./app/pages/Home.tsx"),
  route("expeditions/:slug", "./app/pages/ExpeditionDossier.tsx"),
  route("atlas", "./app/pages/AtlasPage.tsx"),
  route("editions", "./app/pages/EditionsPage.tsx"),
  route("legacy", "./app/pages/LegacyPage.tsx"),
  route("team", "./app/pages/TeamPage.tsx"),
  route("consultation", "./app/pages/EnquiryPage.tsx"),
  route("archive", "./app/pages/ExpeditionArchive.tsx"),
  route("yeti-infrastructure", "./app/pages/YetiInfrastructure.tsx"),
  route("7000m", "./app/pages/SevenThousandMeterPathway.tsx"),
  route("private", "./app/pages/PrivateExpeditions.tsx"),
  route("field-notes", "./app/pages/FieldNotes.tsx"),
  route("newsletter", "./app/pages/NewsletterPage.tsx"),
  route("news-and-blogs", "./app/pages/NewsAndBlogsPage.tsx"),
  route("faq", "./app/pages/MainFAQ.tsx"),
  route("design-your-expedition", "./app/pages/DesignPage.tsx"),
  route("api/upload-cv", "./app/api/upload-cv.ts"),
  route("safety", "./app/pages/SafetyPage.tsx"),
  route(
    "heritage-and-achievements",
    "./app/pages/HeritageAndAchievementsPage.tsx",
  ),
] satisfies RouteConfig;
