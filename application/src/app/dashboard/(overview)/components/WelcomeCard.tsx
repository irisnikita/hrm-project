'use client';

// Libraries
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Components
import { Button, Card, Flex, Typography } from '@/components/ui';

// Hooks
import { useUser } from '@/hooks';

// Types
import { Greeting } from '@/types';

// Utils
import { getGreeting } from '@/utils';

// Constants
import { GLOBAL_TOKEN } from '@/constants';

interface WelcomeCardProps {}

const { Text } = Typography;
const { colorTextWhite } = GLOBAL_TOKEN;

const backgroundImage = `linear-gradient(to right, rgba(20, 26, 33, 0.88) 0%, rgb(20, 26, 33) 75%),
url('/images/backgrounds/background-5.webp')`;
const StyledWelcomeCard = styled(Card)`
  background-position: center;
  background-size: cover;

  > .ant-card-body {
    padding: 40px;
  }

  .ant-typography {
    color: ${({ theme }) => {
      return theme.colorTextWhite;
    }};
  }
`;

type TState = {
  greeting: Greeting;
};

export const WelcomeCard: React.FC<WelcomeCardProps> = () => {
  const t = useTranslations();
  const { user } = useUser();
  const [state, setState] = useImmer<TState>({
    greeting: {
      Icon: '',
      message: '',
    },
  });
  const { greeting } = state;
  const { message, Icon } = greeting || {};

  // Effects
  useEffect(() => {
    (async () => {
      const greeting = await getGreeting();
      setState(draft => {
        draft.greeting = greeting;
      });
    })();
  }, [setState]);

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
    >
      <StyledWelcomeCard
        style={{
          backgroundImage,
        }}
      >
        <Flex align="center" gap={16}>
          <Flex vertical gap={12} className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Flex align="center" gap={8}>
                <Text className="!text-xl font-bold">
                  {message ? t(message as any).toUpperCase() : '&nbsp;'}
                </Text>
                {Icon ? <Icon style={{ color: colorTextWhite }} /> : null}
              </Flex>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
            >
              <Text className="!text-xl font-bold">{user?.fullName || '&nbsp;'}</Text>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Text className="opacity-70">{t('greeting.welcome')}</Text>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, ease: 'easeInOut', duration: 1 }}
            >
              <Button type="primary" className="mt-4 w-fit">
                {t('common.explore')}
              </Button>
            </motion.div>
          </Flex>

          <motion.div
            initial={{ opacity: 0, x: 20, scale: 1.2 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 1.5, ease: 'linear' }}
            className="relative h-[250px] w-[400px] shrink-0"
          >
            <Image
              src="/images/backgrounds/greeting.png"
              className="object-contain"
              alt="greeting"
              fill
            />
          </motion.div>
        </Flex>
      </StyledWelcomeCard>
    </motion.div>
  );
};
