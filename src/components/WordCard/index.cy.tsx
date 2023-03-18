import { WordCard } from '.';
import { FontStyles } from '../../assets/fonts';

describe('<WordCard />', () => {
  it('should render correct word details', () => {
    cy.mount(
      <>
        <FontStyles />
        {/* <WordCard /> */}
      </>
    );
  });
});