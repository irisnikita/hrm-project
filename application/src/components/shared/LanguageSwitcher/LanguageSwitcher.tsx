"use client";

// Libraries
import { useState } from "react";
import Image from "next/image";

// Components
import { Button, Dropdown } from "@/components/ui";

// Constants
import { LOCALE_OPTIONS } from "@/constants";

// Utils
import { getLanguage, setLanguage } from "@/utils";
import { useRouter } from "next/navigation";
import { tryCatch } from "@/lib";

export const LanguageSwitcher = () => {
  const router = useRouter();
  const [currentLanguage, setCurrentLanguage] = useState(getLanguage());

  const handleLanguageChange = async (key: string) => {
    setCurrentLanguage(key);
    setLanguage(key);
    router.refresh();

    throw new Error("Test");
  };

  return (
    <Dropdown
      menu={{
        items: LOCALE_OPTIONS.map((option) => ({
          key: option.key,
          label: (
            <div className="flex items-center gap-2">
              <Image
                src={option.icon}
                alt={option.label}
                width={20}
                height={20}
              />
              {option.label}
            </div>
          ),
        })),
        selectedKeys: [currentLanguage],
        onClick: (e) => tryCatch(handleLanguageChange)(e.key),
      }}
      trigger={["click"]}
      placement="bottomRight"
    >
      <Button shape="circle" type="text">
        {currentLanguage?.toUpperCase()}
      </Button>
    </Dropdown>
  );
};

LanguageSwitcher.displayName = "LanguageSwitcher";
