import FooterBrand from "./FooterBrand.jsx";
import "./Footer.css";
import FooterNavGroup from "./FooterNavGroup.jsx";
import FooterBottom from "./FooterBottom.jsx";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-top">
                <FooterBrand/>
                <FooterNavGroup/>
            </div>
            <FooterBottom/>
        </footer>
    )
}

export default Footer;