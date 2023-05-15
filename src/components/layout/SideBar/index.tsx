"use client";

import {
  Bars3Icon,
  Cog6ToothIcon,
  ListBulletIcon,
  TruckIcon,
} from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import { FC, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { initTE, Sidenav } from "tw-elements";

const SideBarContainer = styled.nav`
  padding: 8px;
  border-right: 1px solid #afafaf;
  li {
    margin: 4px 0px;
  }
`;

const SideBar: FC = () => {
  const instance = useRef<any>();
  const pathname = usePathname();

  const handleResize = useCallback(() => {
    if (instance.current)
      if (window.innerWidth < 720) {
        if (!instance.current._slimCollapsed) instance.current.toggleSlim();
      } else {
        if (instance.current._slimCollapsed) instance.current.toggleSlim();
      }
  }, []);

  useEffect(() => {
    initTE({ Sidenav });
    instance.current = Sidenav.getInstance(document.getElementById("sidebar"));
    if (window.innerWidth < 720) {
      if (instance.current) instance.current.toggleSlim();
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const handleToggle = () => {
    if (instance.current) instance.current.toggleSlim();
  };

  return (
    <SideBarContainer
      id="sidebar"
      className="left-0 top-0 z-[1035] h-screen w-60 -translate-x-full overflow-hidden data-[te-sidenav-hidden='false']:translate-x-0 "
      data-te-sidenav-init
      data-te-sidenav-hidden="false"
      data-te-sidenav-mode="side"
      data-te-sidenav-slim="true"
      data-te-sidenav-content="#content"
      data-te-sidenav-slim-collapsed="false"
    >
      <ul
        className="relative m-0 list-none px-[0.2rem]"
        data-te-sidenav-menu-ref
      >
        <li className="md:hidden">
          <a
            href="#"
            className={`bg-primary flex items-center h-13 w-13 cursor-pointer px-4 py-4 rounded-[5px] text-neutral`}
            data-te-sidenav-link-ref
            onClick={handleToggle}
          >
            <span className="bg-primary [&>svg]:h-5 [&>svg]:w-5  text-neutral">
              <Bars3Icon />
            </span>
          </a>
        </li>
        <li className="relative">
          <a
            href="/orders"
            className={`${
              pathname === "/" || pathname === "orders"
                ? "bg-primary text-neutral"
                : ""
            } flex items-center h-13 w-13 cursor-pointer px-4 py-4 rounded-[5px] hover:bg-primary hover:text-neutral transition`}
            data-te-sidenav-link-ref
          >
            <span className="mr-5 [&>svg]:h-5 [&>svg]:w-5 ">
              <ListBulletIcon />
            </span>
            <span>Orders</span>
          </a>
        </li>
        <li className="relative">
          <a
            href="/shipments"
            className={`${
              pathname === "shipments" ? "bg-primary text-neutral" : ""
            } flex items-center h-13 w-13 cursor-pointer px-4 py-4 rounded-[5px] hover:bg-primary hover:text-neutral transition`}
            data-te-sidenav-link-ref
          >
            <span className="mr-5 [&>svg]:h-5 [&>svg]:w-5 ">
              <TruckIcon />
            </span>
            <span>Shipments</span>
          </a>
        </li>
        <li className="relative">
          <a
            href="/settings"
            className={`${
              pathname === "settings" ? "bg-primary text-neutral" : ""
            } flex items-center h-13 w-13 cursor-pointer px-4 py-4 rounded-[5px] hover:bg-primary hover:text-neutral transition`}
            data-te-sidenav-link-ref
          >
            <span className="mr-5 [&>svg]:h-5 [&>svg]:w-5 ">
              <Cog6ToothIcon />
            </span>
            <span>Settings</span>
          </a>
        </li>
      </ul>
    </SideBarContainer>
  );
};
export default SideBar;
