import "./Header.css";

export default function Header({ sortBy, setSortBy }) {
  return (
    <header className="header">
      <a href="#" className="logo">LOGO</a>
      <div className="sort-wrapper">
        <label htmlFor="sort-select">Sort by Price:</label>
        <select
          id="sort-select"
          name="price"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">None</option>
          <option value="cheap">Cheapest</option>
          <option value="expensive">Most Expensive</option>
        </select>
      </div>
    </header>
  );
}
