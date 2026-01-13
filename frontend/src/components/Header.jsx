function Header() {
  return (
    <header className="h-20 px-6 bg-white border-b">

      <div className="grid grid-cols-3 h-full items-center">

        <h1 className="text-xl font-semibold text-left">Left</h1>

        <h1 className="text-xl font-semibold text-center">Center</h1>

        <h1 className="text-xl font-semibold text-right">Right</h1>

      </div>
    </header>
  );
}
export default Header;
