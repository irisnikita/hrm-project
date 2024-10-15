'use client';

// Libraries
import { motion } from 'framer-motion';
import { MoveRightIcon, TagIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import styled from 'styled-components';

// Components
import { ImageOverlay } from '@/components/styled';
import {
  Button,
  Card,
  Flex,
  Tag,
  Typography,
  Swiper,
  SwiperSlide,
  Empty,
  Select,
} from '@/components/ui';

// Queries
import { useGetNewsList } from '@/queries/news';

// Utils
import { getMediaUrl } from '@/utils';

const { Text } = Typography;

export const StyledNewsCard = styled(Card)`
  height: 100%;
  overflow: hidden;

  > .ant-card-body {
    padding: 0px !important;
    height: 100%;
    overflow: hidden;
  }

  .ant-typography {
    color: ${({ theme }) => theme.colorTextWhite};
  }

  .swiper-pagination {
    left: auto;
    right: 0;
    width: fit-content;
    text-align: right;
    padding-right: 24px;
    padding-bottom: 10px;
  }
`;

export const StyledSwiperSlide = styled(SwiperSlide)`
  position: relative;
  height: 100%;
  z-index: 20;
`;

const NEWS_PAGE_SIZE = 5;

export const NewsCard: React.FC = () => {
  const t = useTranslations('common');
  const { data: newsListData } = useGetNewsList({
    args: {
      params: {
        'pagination[pageSize]': NEWS_PAGE_SIZE,
        populate: 'image,newsTags',
        'sort[0]': 'createdAt:desc',
      },
    },
  });
  const { data: newsList } = newsListData || {};

  // Handlers
  const renderNewsList = () => {
    return newsList?.map(news => {
      const { id, attributes } = news || {};
      const { image, title, newsTags } = attributes || {};

      return (
        <StyledSwiperSlide key={id}>
          <ImageOverlay />
          <Image
            src={getMediaUrl(image?.data?.attributes?.url || '')}
            alt={title || ''}
            fill
            className="object-cover"
          />
          <Flex vertical justify="flex-end" gap={16} className="relative z-10 h-full p-6">
            <Flex gap={'0 4px'}>
              {Array.isArray(newsTags?.data) &&
                newsTags.data?.map(tag => {
                  const { id, attributes } = tag || {};
                  const { tagName } = attributes || {};

                  return (
                    <Tag key={id} className="!flex items-center gap-1">
                      <span>
                        <TagIcon size={12} />
                      </span>
                      <span>{tagName}</span>
                    </Tag>
                  );
                })}
            </Flex>
            <Text
              className="!text-xl"
              ellipsis={{
                tooltip: {
                  zIndex: 2000,
                  title,
                },
              }}
            >
              {title}
            </Text>

            <Flex gap={8} align="center">
              <Button type="primary" className="w-fit">
                {t('readMore')}
              </Button>
              <Button type="link">
                {t('viewAll')}
                <MoveRightIcon size={16} />
              </Button>
            </Flex>
          </Flex>
        </StyledSwiperSlide>
      );
    });
  };

  return (
    <motion.div
      className="relative h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 1 }}
    >
      <StyledNewsCard>
        {Array.isArray(newsList) && newsList.length ? (
          <Swiper className="h-full">{renderNewsList()}</Swiper>
        ) : (
          <Empty />
        )}
      </StyledNewsCard>
    </motion.div>
  );
};
