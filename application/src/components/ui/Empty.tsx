'use client';

// Libraries
import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Components
import { Empty as AntdEmpty, EmptyProps as AntdEmptyProps } from 'antd';

interface EmptyProps extends AntdEmptyProps {}

export const Empty: React.FC<EmptyProps> = ({ ...props }) => {
  const t = useTranslations();

  return (
    <AntdEmpty
      image={
        <motion.div
          initial={{ y: 0, scale: 0.5, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 10,
          }}
        >
          <Image
            src={'/images/core/no-data.png'}
            className="mx-auto object-contain"
            alt="no-data"
            width={80}
            height={80}
          />
        </motion.div>
      }
      description={
        <motion.div
          initial={{ top: -20, opacity: 0 }}
          animate={{ top: 0, opacity: 1 }}
          transition={{
            duration: 1,
          }}
        >
          {t('common.noData')}
        </motion.div>
      }
      className="flex h-full flex-col items-center justify-center"
      {...props}
    />
  );
};
