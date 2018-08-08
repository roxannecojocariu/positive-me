import HappyQuoteContainer from '../../../app/javascript/react/containers/HappyQuoteContainer';

describe('HappyQuoteContainer', () => {
  let wrapper;
  let contents;

  contents = {
    author: "Steve Maraboli",
    categories: ["dreams", "goals", "happy", "healthy", "living", "principles"],
    id: "iT3DwhPdBvhFQhH8M7TP9AeF",
    permalink: "https://theysaidso.com/quote/steve-maraboli-i-find-that-i-am-most-happy-and-healthy-when-i-am-living-in-align",
    quote: "I find that I am most happy and healthy when I am living in alignment with my goals, dreams, and principles.",
    requested_category: "happy"
  }
  fetchMock.get('https://quotes.rest/quote/search.json?category=happy', {
    headers: { 'X-TheySaidSo-Api-Secret':'4_VSex0_jq_Nu5GN94HewAeF' },
    status: 200,
    body: {contents: contents}
  })
  wrapper = mount(<HappyQuoteContainer />)

  afterEach(fetchMock.restore)

  describe('happy quote page', () => {
    it('should contain author name', (done) => {
      setTimeout(() => {
        expect(wrapper.text()).toMatch('Steve Maraboli')
        done()
      }, 0)
    })
    it('should contain quote', (done) => {
      setTimeout(() => {
        expect(wrapper.text()).toMatch('I find that I am most happy and healthy when I am living in alignment with my goals, dreams, and principles.')
        done()
      }, 0)
    })
  })
})
