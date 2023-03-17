import { createGlobalStyle } from 'styled-components';

import LatoRegular from './Lato/Lato-Regular.ttf';
import LatoRegularItalic from './Lato/Lato-RegularItalic.ttf';
import LatoBold from './Lato/Lato-Bold.ttf';
import LatoBoldItalic from './Lato/Lato-BoldItalic.ttf';

export const FontStyles = createGlobalStyle`
  @font-face {
    font-family: 'Lato';
    src: url(${LatoRegular});
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Lato';
    src: url(${LatoRegularItalic});
    font-weight: 400;
    font-style: italic;
  }

  @font-face {
    font-family: 'Lato';
    src: url(${LatoBold});
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'Lato';
    src: url(${LatoBoldItalic});
    font-weight: 700;
    font-style: italic;
  }
`;