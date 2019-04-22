import React from "react";
import Moment from "react-moment";
class MessagesView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul>
        {this.props.messages.map(message => {
          return (
            <li className="message" key = {this.props.messages.id}>
              {message.messageBody} <br />
              <span className="messageSentAt">
                {/* displays time from message sent */}
                <Moment fromNow />
              </span>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default MessagesView;
