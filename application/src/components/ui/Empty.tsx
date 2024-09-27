'use client';

// Libraries
import React from 'react';
import { useTranslations } from 'next-intl';

// Components
import { Empty as AntdEmpty, EmptyProps as AntdEmptyProps } from 'antd';
import Image from 'next/image';

interface EmptyProps extends AntdEmptyProps {}

export const Empty: React.FC<EmptyProps> = ({ ...props }) => {
  const t = useTranslations();

  return (
    <AntdEmpty
      image={
        <Image
          src={'/images/core/no-data.png'}
          className="mx-auto object-contain"
          alt="no-data"
          width={80}
          height={80}
        />
      }
      description={t('common.noData')}
      className="flex h-full flex-col items-center justify-center"
      {...props}
    />
  );
};
