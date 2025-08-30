function Topbar() {
  return (
    <div className="bg-secondary text-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex-grow text-center text-sm">
          <span>Snap instantly. Ride the tide of downloads.</span>
        </div>
        <div className="hidden text-sm md:block">
          <a
            href="tel:+92 300 0000000
"
            className="hover:text-gray-300"
          >
            +92 300 0000000
          </a>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
