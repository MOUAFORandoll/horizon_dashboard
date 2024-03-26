import {
  mdiAccountCircle,
  mdiMonitor,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive,
  mdiPalette,
  mdiAccountSwitch,
  mdiBell,
  mdiHomeGroup,
  mdiCommentProcessing,
  mdiPhoneSettings,
} from "@mdi/js";

export default [
  {
    to: "/",
    icon: mdiMonitor,
    label: "Dashboard",
  },

  {
    to: "/Paiement",
    icon: mdiHomeGroup,
    label: "Paiement",
  },
  {
    to: "/Poste",
    label: "Poste",
    icon: mdiAccountSwitch,
  },
];
