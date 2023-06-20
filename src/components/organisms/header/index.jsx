import "./styles.css";

export default function Header() {
  return (
    <header className="header">
      <h2 style={{color: "whitesmoke", textShadow: "2px 2px 5px black"}}>COMPUTING ENGINE | SIMULATOR</h2>
      <figure>
        <img style={{ width: "100px" }}  src="/logoArt.png" alt="logoArt" />
      </figure>
    </header>
  );
}
