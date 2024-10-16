const TallHeaderBackground = () => (
  <div
    style={{
      position: "relative",
      width: "100%",
      height: "300px",
      overflow: "hidden",
    }}
  >
    <img
      src="images/tall-header-background.png"
      alt="Header Background"
      style={{
        position: "absolute",
        bottom: "0",
        width: "100%",
        height: "auto",
        minHeight: "100%",
        objectFit: "cover",
      }}
    />
  </div>
);

export default TallHeaderBackground;
