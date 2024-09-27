'use client';

// Libraries
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

// Components
import { Result, Button } from '@/components/ui';

export default function NotFound() {
  const router = useRouter();
  const t = useTranslations();

  return (
    <div className="glass-section">
      <Result
        status="404"
        title={t('notFound.title')}
        subTitle={t('notFound.description')}
        extra={
          <Button type="primary" onClick={() => router.push('/')}>
            {t('common.backHome')}
          </Button>
        }
      />
    </div>
  );
}
