import ContactImage from "../../Nowy folder/uselessThings/src/components/ContactImage";
import ContactText from "../../Nowy folder/uselessThings/src/components/ContactText";
import Facebook from "../../Nowy folder/uselessThings/src/assets/Facebook.svg";
import Instagram from "../../Nowy folder/uselessThings/src/assets/Instagram.svg";

function Contact() {
  return (
    <section id="contact">
        <div className="contact__container container">
            <ContactImage />
            <ContactText />
        </div>
        <div className="contact__container__bottom container">
            <span>
                Copyright by FICO
            </span>
            <img src={Facebook } alt="Icon" className="contact__container__text__SVGSignature"/>
            <img src={Instagram} alt="Icon" className="contact__container__text__SVGSignature"/>
        </div>
    </section>
  );
}

export default Contact;
