import welcome from './../../assets/welcome.jpg';
import './home.scss';

const Home = () => {
  return (
    <div className="container">
        <img src={welcome} />

        <section className="animation">
            <div className="title">
                <span>
                    <span>B</span>
                    <span>I</span>
                    <span>E</span>
                    <span>N</span>
                    <span>V</span>
                    <span>E</span>
                    <span>N</span>
                    <span>I</span>
                    <span>D</span>
                    <span>O</span>
                </span>
                <span>
                    <span>A</span>
                </span>
                <span>
                    <span>B</span>
                    <span>O</span>
                    <span>R</span>
                    <span>D</span>
                    <span>O</span>
                </span>
            </div>
        </section>
    </div>
  );
};

export default Home;
