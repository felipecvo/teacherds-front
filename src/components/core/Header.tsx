import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="mx-auto max-w-7xl">
        <nav>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
              <Link to={"/classrooms"}>Turmas</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default Header;
