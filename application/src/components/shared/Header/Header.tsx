"use client";

// Libraries
import React, { RefObject } from "react";
import clsx from "clsx";
import Link from "next/link";

// Components
import { Button, Flex } from "@/components/ui";
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";

// Styled
import { StyledHeader } from "./styled";

// Hooks
import { useScrollPosition } from "@/hooks";
import { LanguageSwitcher } from "../LanguageSwitcher";

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  isDashboard?: boolean;
  /** Reference to the parent element to calculate the scroll position */
  parentRef?: RefObject<HTMLElement>;
  /** Left content to be displayed on the left side of the header */
  leftContent?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = (props) => {
  const { className, isDashboard, parentRef, leftContent, ...restOfProps } =
    props;
  const { isScrolled } = useScrollPosition(0, parentRef);

  return (
    <StyledHeader
      $isScrolled={isScrolled}
      className={clsx(
        className,
        "bg-transparent lg:fixed w-full transition-all",
        {
          "shadow-sm shadow-slate-50": isScrolled,
        }
      )}
      {...restOfProps}
    >
      <div
        className={clsx("mx-auto p-4 flex justify-between items-center", {
          container: !isDashboard,
        })}
      >
        {leftContent ? (
          leftContent
        ) : (
          <div className="text-2xl font-bold">Compily</div>
        )}

        <Flex gap={16} align="center">
          <SignedOut>
            <Link href="/sign-in">
              <Button size="large">Log In</Button>
            </Link>
            <Link href="/sign-up">
              <Button type="primary" size="large">
                Sign Up
              </Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton showName />
          </SignedIn>

          <LanguageSwitcher />
        </Flex>
      </div>
    </StyledHeader>
  );
};
