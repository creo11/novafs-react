import "./Footer.less";
import novaLogo from "../../assets/home/nova-nav.svg";

export default function Footer() {
  return (
    <footer id="nova-footer">
      <div className="center-content">
        <div className="footer-logo">
          <img src={novaLogo} alt="Nova Facility Solutions" />
        </div>
        <div className="company-info">
          <p className="company-name">Nova Facility Solutions</p>
          <p>
            Professional Cleaning & Facility Maintenance Services
            <br />
            Serving the Greater Bay Area, California
            <br />
            Licensed & Insured
          </p>
          <span className="copyright-text">
            &copy; <span id="copyrightYear"></span> Nova Facility Solutions, All Rights Reserved.
          </span>
        </div>
        <div className="contact-info">
          <p>
            Need Reliable Facility Services?
            <br />
            Request a Free Quote Today
          </p>
          <a className="phone-link" href="tel:3419465458">
            (341) 946-5458
          </a>
          <a href="mailto:hello@novafs.net">hello@novafs.net</a>
          <p>
            2163 Meeker Avenue #147
            <br />
            Richmond, CA 94804
          </p>
        </div>
      </div>
    </footer>
  );
}