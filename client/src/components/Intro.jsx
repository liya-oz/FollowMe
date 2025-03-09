import "../styles/Intro.scss";

const Intro = () => (
  <section className="intro">
    <div className="intro-overlay">
      <h1 className="intro-title elevation-light-1">
        Your <span className="highlight-green">Gateway</span> to <br />
        <span className="highlight-orange">Amazing Events!</span>
      </h1>
      <p className="intro-subtitle">
        Discover events you love, meet like-minded people, and enjoy your
        favorite activities. Find, join, and experience unforgettable
        moments—all in one place!
      </p>
    </div>
  </section>
);

export default Intro;
