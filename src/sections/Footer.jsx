import { socialImgs } from "../constants";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="flex text-white flex-col justify-center">
          <p>Designed by Anesu</p>
        </div>
        <div className="socials">
          {socialImgs.map((socialImg, index) => (
            <div key={index} className="icon">
              <img src={socialImg.imgPath} alt="social icon" />
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-center text-white md:text-end">
            © {new Date().getFullYear()} Anesu Mugiya. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;