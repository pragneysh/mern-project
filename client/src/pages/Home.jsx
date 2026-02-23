function Home() {
  return (
    <div style={styles.container}>
      <h1>Welcome to MERN Starter 🚀</h1>
      <p>This is your scalable startup project.</p>
      <button style={styles.button}>Get Started</button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px"
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    marginTop: "20px",
    cursor: "pointer",
    background: "#111",
    color: "#fff",
    border: "none",
    borderRadius: "5px"
  }
};

export default Home;