import { NavLink, type NavLinkProps } from "react-router-dom";

const MenuLink = ({ children, ...props }: NavLinkProps) => {
  return (
    <NavLink
      {...props}
      className={({ isActive, isPending }) =>
        isPending
          ? "text-orange-500"
          : isActive
          ? "text-primary font-semibold"
          : ""
      }
    >
      {children}
    </NavLink>
  );
};

const Header = () => {
  return (
    <header className="border-b border-primary/20 py-4">
      <div className="flex mx-auto max-w-7xl justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Academia de Númenor</h2>
        <nav>
          <ul className="flex gap-8">
            <li>
              <MenuLink to={"/"}>Home</MenuLink>
            </li>
            <li>
              <MenuLink to={"/classrooms"}>Turmas</MenuLink>
            </li>
            <li>
              <MenuLink to={"/rubrics"}>Rúbricas</MenuLink>
            </li>
          </ul>
        </nav>
        <div className="w-10 h-10 rounded-full bg-cover bg-center">
          <img
            className="rounded-full"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhP5Nb0Mdm2nzgu_Ik0BhLZmVrToeKW0RdPuPAYX-M0oetTSFcELpf18tOxDtQbLn_lNHnMw396l2ss9VzQMS3fhvGBnlhHM9WU9cCjQfsRJwvKSyXOXiuOSKL42RX7oxh4Dt2uyJqQ091tsqgZS2teo33VTzVzXkbpO9qqdgO5BrC1tfyd-Dvf855CFHujgTNntRvnnxo4nBtVX0njtzKW5-YZOerJQk6UB1rQnHFYZjauqTCOLCjrmRgn6yoAG8cZ3PLRE_Gztk"
          />
        </div>
      </div>
    </header>
  );
};
export default Header;
