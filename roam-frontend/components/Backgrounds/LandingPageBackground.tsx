const LandingPageBackground = () => (
    <div style={{ position: 'relative', width: '100%', height: '761px', overflow: 'hidden' }}>
      <img
        src="images/landing-page-background.png"
        alt="Landing Background"
        style={{
          position: 'absolute',
          bottom: '0',
          width: '100%',
          height: 'auto',
          minHeight: '100%',
          objectFit: 'cover',
        }}
      />
    </div>
  );
  
  export default LandingPageBackground;
  