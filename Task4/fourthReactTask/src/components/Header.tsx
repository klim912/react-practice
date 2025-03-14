import { Search } from "react-feather";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

function Header({ searchQuery, setSearchQuery }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex justify-between items-center shadow-lg rounded-b-xl">
      <h1 className="text-2xl font-semibold tracking-wide">Менеджер Нотаток</h1>

      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Пошук нотаток..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-3 pl-10 pr-4 rounded-full text-black bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
    </header>
  );
}

export default Header;
