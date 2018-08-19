import FetchedQuoteContainer from '../../../app/javascript/react/containers/FetchedQuoteContainer';

describe('FetchedQuoteContainer', () => {
  let wrapper;

  wrapper = mount(<FetchedQuoteContainer />)

  describe('index page', () => {
    it('should contain mood category Sad', (done) => {
      setTimeout(() => {
        expect(wrapper.text()).toMatch('Sad')
        done()
      }, 0)
    })

    it('should contain mood category Unmotivated', (done) => {
      setTimeout(() => {
        expect(wrapper.text()).toMatch('Unmotivated')
        done()
      }, 0)
    })

    it('should contain mood category Uninspired', (done) => {
      setTimeout(() => {
        expect(wrapper.text()).toMatch('Uninspired')
        done()
      }, 0)
    })

    it('should contain mood category Uninspired', (done) => {
      setTimeout(() => {
        expect(wrapper.text()).toMatch('Uninspired')
        done()
      }, 0)
    })
  })
})
