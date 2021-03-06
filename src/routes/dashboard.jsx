import Dashboard from "views/Dashboard/Dashboard.jsx";
// import Notifications from "views/Notifications/Notifications.jsx";
import Facilities from "views/Facilities/Facilities.jsx";
// import Icons from "views/Icons/Icons.jsx";
// import Typography from "views/Typography/Typography.jsx";
// import TableList from "views/TableList/TableList.jsx";
import Maps from "views/Maps/Maps.jsx";
//import FacilityInfo from "../components/FacilityInfo/FacilityInfo";
// import Upgrade from "views/Upgrade/Upgrade.jsx";
// import UserPage from "views/UserPage/UserPage.jsx";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "business_chart-bar-32",
    component: Dashboard
  },
  {
    path: "/facilities",
    name: "Registered Facilities",
    icon: "files_single-copy-04",
    component: Facilities
  },
  { path: "/maps", name: "Facility Locator", icon: "location_map-big", component: Maps },

  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "ui-1_bell-53",
  //   component: Notifications
  // },
  // {
  //   path: "/user-page",
  //   name: "User Profile",
  //   icon: "users_single-02",
  //   component: UserPage
  // },
  // {
  //   path: "/extended-tables",
  //   name: "Table List",
  //   icon: "files_paper",
  //   component: TableList
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "design-2_ruler-pencil",
  //   component: Typography
  // },
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "objects_spaceship",
  //   component: Upgrade
  // },
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;
