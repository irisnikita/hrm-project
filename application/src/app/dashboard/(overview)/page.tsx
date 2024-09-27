'use client';

// Components
import { Row, Col } from '@/components/ui';
import { WelcomeCard, NewsCard } from './components';
import { AuthorizationComponent } from '@/components/shared';

// Libraries
export default function DashboardPage() {
  return (
    <div>
      <Row gutter={16}>
        <Col span={16}>
          <WelcomeCard>Board</WelcomeCard>
        </Col>
        <Col span={8}>
          <AuthorizationComponent allowedRoles={['admin', 'employee']}>
            <NewsCard />
          </AuthorizationComponent>
        </Col>
      </Row>
    </div>
  );
}
