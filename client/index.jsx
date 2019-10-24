import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import UserReview from './UserReview.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
    };
  }

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
      <div className="user-reviews">
        <h2>User Reviews</h2>
        { reviews.length && <UserReview reviews={reviews} />}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('user-reviews-module'));
