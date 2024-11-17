// Components
import { Drawer, DrawerProps } from '@/components/ui';

export interface DrawerDetailProps extends DrawerProps {}

const DRAWER_WIDTH = `calc(100% - 282px)`;

export const DrawerDetail: React.FC<DrawerDetailProps> = ({ children, ...props }) => {
  return (
    <Drawer {...props} width={DRAWER_WIDTH}>
      {children}
    </Drawer>
  );
};
