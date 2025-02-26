import { useTranslation } from 'react-i18next';
import { css } from 'styled-components';

import { Box, Text } from '@/components/';
import { useCunninghamTheme } from '@/cunningham';

export const Title = () => {
  const { t } = useTranslation();
  const theme = useCunninghamTheme();
  const spacings = theme.spacingsTokens();
  const colors = theme.colorsTokens();

  return (
    <Box $direction="row" $align="center" $gap={spacings['2xs']}>
      <Text
        $margin="none"
        as="h2"
        $color="#000091"
        $zIndex={1}
        $size="1.375rem"
      >
        {t('Docs Customized')}
      </Text>
      <Text
        $padding={{
          horizontal: '6px',
          vertical: '4px',
        }}
        $size="11px"
        $theme="primary"
        $variation="500"
        $weight="bold"
        $radius="12px"
        $css={css`
          line-height: 9px;
        `}
        $width="40px"
        $height="16px"
        $background={colors['primary-200']}
      >
        ALPHA
      </Text>
    </Box>
  );
};
