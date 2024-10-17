// Libraries
import styled, { css } from 'styled-components';

// Components
import { Card, List } from '@/components/ui';

// Constants
import { WIDTHS } from '@/constants';

export const StyledCard = styled(Card)`
  width: ${WIDTHS.MODAL_DEFAULT_WIDTH}px;
`;

export const ListItem = styled(List.Item)`
  ${({ theme }) => {
    return css`
      justify-content: space-between;
      transition: ${theme.transition};
      padding: 12px;
      overflow: hidden;
      cursor: pointer;

      .remove-icon {
        opacity: 0;
        transition: ${theme.transition};
      }

      &:hover {
        background-color: ${theme.controlItemBgHover};

        .remove-icon {
          opacity: 1;
        }
      }
    `;
  }}
`;
