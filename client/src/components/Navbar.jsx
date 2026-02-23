import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>MERN App</h2>
      <div>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/about" style={styles.link}>About</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    background: "#111",
    color: "#fff"
  },
  logo: {
    margin: 0
  },
  link: {
    color: "#fff",
    marginLeft: "20px",
    textDecoration: "none"
  }
};

export default Navbar;