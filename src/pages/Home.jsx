function Home() {
  return (
    <div className="w-full h-[85vh] relative">
      {/* Show video on md and larger */}
      <video
        src="/video.mp4"
        autoPlay
        muted
        loop
        className="hidden md:block w-full h-full object-cover"
      />

      {/* Show image only on small screens */}
      <img
        src="/mobile-hero.png"
        alt="Mobile Hero"
        className="block md:hidden w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10" />

      {/* Content */}
      <div className="absolute top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tighter uppercase md:text-8xl font-nunito">
          Welcome to Snaptide
        </h1>
        <p className="mb-6 text-sm tracking-widest md:text-lg font-nunito">
          Snap instantly. Ride the tide of downloads.
        </p>
      </div>
    </div>
  );
}
export default Home;
