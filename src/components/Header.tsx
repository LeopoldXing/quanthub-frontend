import { useEffect, useState } from 'react';
import logo from "@/assets/logo.svg";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Menu, MenuButton, MenuItem } from "@/components/mui/MenuDropdown.tsx";
import { Dropdown } from '@mui/base/Dropdown';
import clsx from "clsx";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { CurrentUserInfo } from "@/types.ts";
import { useGetUserProfile } from "@/api/MyUserApi.ts";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  }

  // auth0
  const { loginWithRedirect, isAuthenticated, logout, isLoading, user, getAccessTokenSilently } = useAuth0();

  // current user info
  const [currentUserInfo, setCurrentUserInfo] = useState<CurrentUserInfo | null>(null);

  useEffect(() => {
    const cookie = Cookies.get("quanthub-user");
    if (cookie) {
      try {
        const parsedCookie = JSON.parse(cookie);
        setCurrentUserInfo(parsedCookie);
      } catch (error) {
        console.error("Error parsing cookie:", error);
      }
    } else {
      setCurrentUserInfo(null);
    }
  }, []);


  const { getUserProfile } = useGetUserProfile();
  useEffect(() => {
    const updateUserInfo = async () => {
      if (!isLoading) {
        if (isAuthenticated && user) {
          try {
            const token = await getAccessTokenSilently();

            const customUser = await getUserProfile({ auth0Id: user.sub, email: user.email });

            const userInfo: CurrentUserInfo = { token, user: customUser };
            Cookies.set("quanthub-user", JSON.stringify(userInfo));
            setCurrentUserInfo(userInfo);
          } catch (error) {
            console.error("Error getting access token:", error);
          }
        } else {
          Cookies.remove("quanthub-user");
          setCurrentUserInfo(null);
        }
      }
    };

    updateUserInfo();
  }, [isAuthenticated, isLoading, user, getAccessTokenSilently, location, getUserProfile]);

  const handleLogout = () => {
    Cookies.remove("quanthub-user");
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const handleLogin = () => {
    loginWithRedirect({
      appState: { returnTo: location.pathname }
    });
  };


  return (
      <header className="w-full h-20 bg-[#21305e]">
        <div className="max-w-[1600px] h-20 mx-auto px-10 md:px-28 flex items-center justify-between text-white">
          <a href="/"><img src={logo} alt="logo" className="h-16"/></a>

          <nav className="flex items-center justify-between font-bold text-white">
            <div className="hidden mr-8 font-alata md:flex md:space-x-8">
              <div className="group">
                <a href="/about" className="hover:text-[#f0e68c]">About</a>
                <div className="mx-2 group-hover:border-b group-hover:border-blue-50"></div>
              </div>
              <div className="group">
                <a href="/articles/search" className="hover:text-[#f0e68c]">Blogs</a>
                <div className="mx-2 group-hover:border-b group-hover:border-blue-50"></div>
              </div>
              <div className="group">
                <a href="/docs" className="hover:text-[#f0e68c]">Docs</a>
                <div className="mx-2 group-hover:border-b group-hover:border-blue-50"></div>
              </div>
              <div className="group">
                <a href="/support" className="hover:text-[#f0e68c]">Support</a>
                <div className="mx-2 group-hover:border-b group-hover:border-blue-50"></div>
              </div>
            </div>

            <div className="hidden font-alata md:flex md:items-center">
              <div className="w-0 h-8 mr-6 border-x-[1px] border-white"></div>
              <a className="flex items-center justify-around cursor-pointer" onClick={toggleDropdown}>
                {currentUserInfo ? (
                    <Dropdown open={dropdownOpen}>
                      <MenuButton className={clsx("h-10 flex justify-center items-center")}>
                        <AccountCircleOutlinedIcon/>
                        <span className={"ml-1 hidden lg:flex"}>{currentUserInfo.user.username}</span>
                      </MenuButton>
                      <Menu onBlur={toggleDropdown} className={clsx(!dropdownOpen && "hidden")}>
                        <MenuItem onClick={() => navigate("/user-profile")}>Profile</MenuItem>
                        <MenuItem onClick={() => navigate("/my/articles")}>My articles</MenuItem>
                        <MenuItem onClick={handleLogout}>Log out</MenuItem>
                      </Menu>
                    </Dropdown>
                ) : (
                    <Button variant="text" sx={{ fontWeight: "bold", fontSize: "15px", color: "white" }}
                            onClick={handleLogin}>
                      Login
                    </Button>
                )}
              </a>
            </div>

            <div className="md:hidden">
              <button
                  id="menu-btn"
                  type="button"
                  className={`z-40 block hamburger md:hidden focus:outline-none ${mobileMenuOpen ? 'open' : ''}`}
                  onClick={toggleMenu}>
                <span className="hamburger-top"></span>
                <span className="hamburger-middle"></span>
                <span className="hamburger-bottom"></span>
              </button>
            </div>
            <div
                id="menu"
                className={`absolute top-0 bottom-0 left-0 flex-col self-end w-full min-h-screen py-1 pt-40 pl-12 space-y-3 text-lg text-white uppercase bg-black ${mobileMenuOpen ? 'flex' : 'hidden'}`}
            >
              {isAuthenticated ? (
                  <a href="/logout" className="hover:text-pink-500" onClick={handleLogout}>Logout</a>
              ) : (
                  <a href="/login" className="hover:text-pink-500"
                     onClick={handleLogin}>Login</a>
              )}
              <a href="/about" className="hover:text-pink-500">About</a>
              <a href="/articles/search" className="hover:text-pink-500">Blogs</a>
              <a href="/docs" className="hover:text-pink-500">Docs</a>
              <a href="/support" className="hover:text-pink-500">Support</a>
            </div>
          </nav>
        </div>
      </header>
  );
};

export default Header;
