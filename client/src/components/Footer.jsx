import "../styles/Footer.scss";
import { LuCalendarPlus2 } from "react-icons/lu";
import { LuMail } from "react-icons/lu";
import { LuUsers } from "react-icons/lu";
import { LuSmile } from "react-icons/lu";

const Footer = () => (
  <>
    <div className="footer">
      <div className="banner">
        <div className="how-it-works">
          <h1>Plan, Create, Have Fun!</h1>
          <div className="how-it-works-content">
            <div className="how-it-works-content-item">
              <div className="item-icon-frame">
                <LuCalendarPlus2 className="icon" />
              </div>
              <h4>Create an event</h4>
            </div>
            <div className="how-it-works-content-item">
              <div className="item-icon-frame">
                <LuUsers className="icon" />
              </div>
              <h4>Invite & Confirm</h4>
            </div>
            <div className="how-it-works-content-item">
              <div className="item-icon-frame">
                <LuMail className="icon" />
              </div>
              <h4>Stay in touch</h4>
            </div>
            <div className="how-it-works-content-item">
              <div className="item-icon-frame">
                <LuSmile className="icon" />
              </div>
              <h4>Meet & Enjoy</h4>
            </div>
          </div>
        </div>
        <div className="learn-more-card">
          <h4>Create & Join Without Limits!</h4>
          <p>Host unlimited events effortlessly!</p>
          <button>Learn More</button>
        </div>
      </div>
      <p>© FollowMe 2025. All Rights Reserved.</p>
    </div>
  </>
);

export default Footer;
