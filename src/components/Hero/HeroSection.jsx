import './HeroSection.css';
import HeroText from "./HeroText.jsx";
import HeroRecipeCard from "./HeroRecipeCard.jsx";


function HeroSection() {
    return (
        <section className="hero-section container">
            <HeroText/>
            <HeroRecipeCard/>
        </section>
    )
}

export default HeroSection