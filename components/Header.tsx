import Link from "next/link";

function Header() {
  return (
    <header className="flex items-center justify-between p-5 max-w-7xl mx-auto">
      <div className="flex items-center">
        <Link href="/">
          <img
            className="w-44 object-contain cursor-pointer"
            src="https://links.papareact.com/yvf"
            alt="Medium"
          />
        </Link>
        <div className="hidden md:inline-flex items-center space-x-8">
          <h3>About</h3>
          <h3>Contact</h3>
          <h3 className="bg-green-600 text-white rounded-full px-4 py-1">
            Follow
          </h3>
        </div>
      </div>

      <div className="text-green-600 inline-flex space-x-8 items-center">
        <h3>Sign In</h3>
        <h3 className="border border-green-600  px-4 py-1 rounded-full">
          Get started
        </h3>
      </div>
    </header>
  );
}

export default Header;
