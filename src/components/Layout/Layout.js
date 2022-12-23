import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MenuPage from '../MenuPage/MenuPage';

export default function Layout({ location, loggedIn, isOpen, menuClick, closeMenu }) {
  return (
    <>
      <Header
        loggedIn={loggedIn}
        isOpen={isOpen}
        openMenu={menuClick}
        closeMenu={closeMenu}
        location={location}
      ></Header>
      <main className="main">
        <MenuPage
          loggedIn={loggedIn}
          isOpen={isOpen}
          closeMenu={closeMenu}
        ></MenuPage>
        <Outlet location={location}></Outlet>
      </main>
      <Footer location={location}></Footer>
    </>
  );
}
