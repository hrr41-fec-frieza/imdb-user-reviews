import UserReview from './UserReview.jsx';

const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  render() {
    const { reviews } = this.state;
    return (
      <div>
        <h2>User Reviews</h2>
        <UserReview reviews={reviews} />
      </div>
    );
  }
}

$.ajax({
  method: 'GET',
  url: 'http://localhost:65387/api/user-reviews',
}).done((reviews) => {
  ReactDOM.render(<App reviews={reviews} />, document.getElementById('user-reviews-module'));
});
