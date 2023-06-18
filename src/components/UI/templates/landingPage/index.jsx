import "./styles.css";
import Header from "../../../organisms/header";
import Simulator from "../../../organisms/simulator";
import Main from "../main";

  export default function LandingPage() {
    return (
        <section className="main">
          <Header />
          <section className="main__title">
            <h2>Simulador | Utilidad de recursos computacionales</h2>
          </section>
          <Simulator />
          <Main/>
        </section>
      );
    }