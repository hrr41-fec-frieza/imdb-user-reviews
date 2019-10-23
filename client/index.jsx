import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import UserReview from './UserReview.jsx';

class App extends React.Component {
  componentDidMount() {
    axios({
      method: 'GET',
      url: 'http://localhost:65387/api/user-reviews',
    }).then((response) => {
      this.setState({ reviews: response.data });
    });
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

ReactDOM.render(<App />, document.getElementById('user-reviews-module'));
