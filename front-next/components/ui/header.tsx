
import { NavLink } from './core/nav-link';

export function Header() {
  return (
    <header className="flex flex-col gap-5">
      <div className="py-4 flex items-center gap-4">
        <NavLink href="/">
          Index
        </NavLink>
        <NavLink href="/users">
          Random user
        </NavLink>
        <NavLink href="/users/miquel">
          User Detail
        </NavLink>
        <NavLink href="/notFound">
          404 NotFound
        </NavLink>
      </div>
    </header>
  );
}
