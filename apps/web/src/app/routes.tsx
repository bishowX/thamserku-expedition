import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { Home } from "./pages/Home";
import { Everest } from "./pages/Everest";
import { AtlasPage } from "./pages/AtlasPage";
import { EditionsPage } from "./pages/EditionsPage";
import { LegacyPage } from "./pages/LegacyPage";
import { TeamPage } from "./pages/TeamPage";
import { EnquiryPage } from "./pages/EnquiryPage";
import { ExpeditionArchive } from "./pages/ExpeditionArchive";
import { YetiInfrastructure } from "./pages/YetiInfrastructure";
import { SevenThousandMeterPathway } from "./pages/SevenThousandMeterPathway";
import { PrivateExpeditions } from "./pages/PrivateExpeditions";
import { FieldNotes } from "./pages/FieldNotes";
import { MainFAQ } from "./pages/MainFAQ";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "everest", Component: Everest },
      { path: "atlas", Component: AtlasPage },
      { path: "editions", Component: EditionsPage },
      { path: "legacy", Component: LegacyPage },
      { path: "team", Component: TeamPage },
      { path: "consultation", Component: EnquiryPage },
      { path: "archive", Component: ExpeditionArchive },
      { path: "yeti-infrastructure", Component: YetiInfrastructure },
      { path: "7000m", Component: SevenThousandMeterPathway },
      { path: "private", Component: PrivateExpeditions },
      { path: "field-notes", Component: FieldNotes },
      { path: "faq", Component: MainFAQ },
    ],
  },
]);