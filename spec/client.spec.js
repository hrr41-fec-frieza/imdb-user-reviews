import { shallow } from 'enzyme';
import App from '../client/App.jsx';

describe('<App />', () => {
  it('Renders <App /> to the DOM', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(App).to.have.lengthOf(1));
  });
});
