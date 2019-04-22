import React from "react";
import Moment from "react-moment";
import Chat from "../components/chat.jsx";
import ReactModal from "react-modal";
import '../../dist/style.css'

ReactModal.setAppElement("#app");



/////////////////
///  Host  //////
/////////////////
// Following componet produces the first part of the project page
// Contains information about the host icluding location, # of reviews, quick info (e.g language) and includes the Chat component module

/////////////////
///  Props    ///
/////////////////
// The only prop it receives is the host object 

/////////////////
///  Methods  ///
/////////////////
/// Support of the Chat component --> close/open chat [ e.g ReactModal isOpen={this.state.chatIsOpen} ]


class Host extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatIsOpen: false
    };
    this.openChat = this.openChat.bind(this);
    this.closeChat = this.closeChat.bind(this);
  }

  openChat() {
    this.setState({
      chatIsOpen: true
    });
  }

  closeChat() {
    this.setState({
      chatIsOpen: false
    });
  }


  render() {
    return (
      <div className="mainDiv">


        <img className="hostAvatar" src={this.props.host.avatar} />



        <div className="hostedBy">
          <span className = "allSpans">Hosted by {this.props.host.name}</span>
          <h5 className="locationOfTheHost">
            {this.props.host.city} · Joined in{" "}
            {/* displays the time since the host joined the platform (data included in the props host object)*/}
            <Moment format="MMM YYYY">{this.props.host.joined}</Moment> 
          </h5>
        </div>



        <div className="littleIcons">
            <span className="iconText">★ {this.props.host.numberOfReviews}{" "} Reviews </span>
          <div>
            <img
              className="icons"
              src="https://img.icons8.com/ios/18/000000/men-age-group-4-filled.png"
            />{" "}
            <span className="referencesText">
              {" "}
              {this.props.host.numberOfReferences} References
            </span>
          </div>



          {/* checks whether the hosts are verified. In case if they are displays the verifieed icon */}
          {this.props.host.isVerified ? (
            <div>
              <img
                className="icons"
                src="https://img.icons8.com/material-sharp/18/000000/verified-account.png"
              />
              <span className="verifiedText"> Host is Verified</span>
            </div>
          ) : (
            <span />
          )}
        </div>


        
       {/* checks whether the hosts are a superhost. In case if they are displays the superhost text */}
        <div>
          {this.props.host.isSuper ? (
            <div className="mostOfTheTextOnPage">
              <hr className = 'hostHr'/>
              <b> {this.props.host.name} is a Superhost </b>· Superhosts are
              experienced, highly rated hosts who are committed to providing
              great stays for guests.
              <hr className = 'hostHr'/>
            </div>
          ) : (
            <br />
          )}
        </div>


        {/* displays hosts intro text */}
        <div>
          <p className="mostOfTheTextOnPage">
            Hi! My name is {this.props.host.name}.
            {this.props.host.neighborhoodDescr}
          </p>
        </div>

        <br />

    
        <div className="quickInfoAboutHost">
          <span>
            Language: <b>{this.props.host.language}</b>
          </span>
          <br />
          <br />
          <span>
            Response rate: <b>{this.props.host.responseRate}% </b>
          </span>
          <br />
          <br />
          <span>
            Response time: <b> within {this.props.host.responseTime} </b>
          </span>
          <br />
          <br />
        </div>



        <div className="divAroundContactButton">
          <button className="contactHostButton" onClick={() => this.openChat()}>
            Contact host
          </button>

        
          <div>
            <ReactModal isOpen={this.state.chatIsOpen} contentLabel="Chat">
              <Chat
                host={this.props.host.name}
                handleCloseChatX={this.closeChat}
              />
            </ReactModal>
          </div>
        </div>

        <hr className = 'hostHr' />

        {/* Additional info message  */}
        <p className="mostOfTheTextOnPage">
          <b>Always communicate through Airbnb </b>· To protect your payment,
          never transfer money or communicate outside of the Airbnb website or
          app. <a className = 'linkToLearnMore' href = 'https://www.airbnb.com/help/article/199/what-should-i-do-if-someone-asks-me-to-pay-outside-of-the-airbnb-website'>Learn more </a>
        </p>


        <hr className = 'hostHr'/>

      </div>
    );
  }
}

export default Host;
