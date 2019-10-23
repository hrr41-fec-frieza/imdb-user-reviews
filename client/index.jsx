const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
    };
    this.getReviewData = this.getReviewData.bind(this);
  }

  componentDidMount() {
    this.getReviewData();
  }

  getReviewData() {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:65387/api/user-reviews',
    }).done((response) => {
      this.setState({ reviews: response });
    });
  }

  render() {
    const { reviews } = this.state;
    return (
      <div>
        { JSON.stringify(reviews) }
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('user-reviews-module'));
