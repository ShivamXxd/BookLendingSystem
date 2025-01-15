import classes from "./footer.module.css";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <>
      <div className={classes.container}>
        <div className={classes.links}>
          <div className={classes.supportLinks}>
            <div>Terms and Conditions</div>
            <div>Privacy Policy</div>
            <div>Return & Refund</div>
            <div>FAQs</div>
          </div>
          <div className={classes.contact}>
            <div>Email: BookLendersOfficial@gmail.com</div>
            <div>Ph No: +91 9821738568</div>
            <div>Ph No: +91 8824738261</div>
            <div>Address: Sector - 9, Apartment - 119, RTS Karodiya, Vadodara</div>
          </div>
        </div>
        <div className={classes.socials}>
          <div>Follow Us:</div>
          <div className={classes.icons}>
            <FaFacebook />
            <FaInstagram />
            <FaXTwitter />
            <FaWhatsapp />
          </div>
        </div>
        <div className={classes.copyright}>Copyright &copy; 2025 by ShelfShare India</div>
      </div>
    </>
  );
}

export default Footer;
