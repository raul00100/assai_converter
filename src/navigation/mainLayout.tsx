import DockComp from "./dockComp";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <DockComp />
      <Outlet />
    </>
  );
}
