import "../styles/navbar.sass";
import PROFILEIMAGE from '../assets/image.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">LEARNEASY</div>
      <div className="profile">
        <img src={PROFILEIMAGE} alt="Profile" className="profile-img" />
      </div>
    </nav>
  );
};

export default Navbar;
