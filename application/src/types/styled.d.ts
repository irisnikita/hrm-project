import 'styled-components';

// Constants
import { STYLED_THEME } from '@/constants';

type Theme = typeof STYLED_THEME;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
