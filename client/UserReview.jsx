const React = require('react');
const moment = require('moment');

const UserReview = (props) => {
  const { reviews } = props;
  const formattedDate = moment(reviews[0].date).format('D MMMM YYYY');
  return (
    <div>
      <span><strong>{ reviews[0].headline }</strong></span>
      <div className="user-review-byline">
        {formattedDate}
        &nbsp;| by&nbsp;
        <a>{reviews[0].username}</a>
        &nbsp;&ndash;&nbsp;
        <a>See all my reviews</a>
      </div>
      <div>
        <p>
          {reviews[0].body}
        </p>
      </div>
    </div>

  );
};

export default UserReview;
