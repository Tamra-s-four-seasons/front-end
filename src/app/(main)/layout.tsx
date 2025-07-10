import React from "react";
import { NavRoot, NavList, NavItem, NavLink } from "@vapor-ui/core";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavRoot size="md" shape="fill" aria-label="Main Navigation">
        <NavList>
          <NavItem>
            <NavLink href="/">미션 현황</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/collection">내 컬렉션</NavLink>
          </NavItem>
        </NavList>
      </NavRoot>
      {children}
    </div>
  );
};

export default MainLayout;
