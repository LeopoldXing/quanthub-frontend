import { useState } from 'react';
import logo from "@/assets/logo.svg";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Menu, MenuButton, MenuItem } from "@/components/mui/MenuDropdown.tsx";
import { Typography } from "@mui/material";
import { Dropdown } from '@mui/base/Dropdown';
import clsx from "clsx";

const Header = () => {
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

  return (
      <header
          className="w-screen mx-auto px-10 md:px-28 h-20 flex items-center justify-between text-white bg-[#21305e]">
        {/*  Logo  */}
        <a href="/"><img src={logo} alt="logo" className="h-16"/></a>

        {/*  Menu/Logo Container  */}
        <nav className="flex items-center justify-between font-bold text-white">
          {/*  Links  */}
          <div className="hidden font-alata md:flex md:space-x-8">
            <div className="group">
              <a href="/about">About</a>
              <div className="mx-2 group-hover:border-b group-hover:border-blue-50"></div>
            </div>
            <div className="group">
              <a href="/articles">Articles</a>
              <div className="mx-2 group-hover:border-b group-hover:border-blue-50"></div>
            </div>
            <div className="group">
              <a href="/docs">Docs</a>
              <div className="mx-2 group-hover:border-b group-hover:border-blue-50"></div>
            </div>
            <div className="group">
              <a href="/support">Support</a>
              <div className="mx-2 group-hover:border-b group-hover:border-blue-50"></div>
            </div>
          </div>

          <div className="hidden font-alata md:flex md:items-center">
            {/*  separator  */}
            <div className="w-0 h-8 mx-8 border-x-[1px] border-white"></div>
            {/*  user  */}
            <a className="flex items-center justify-around cursor-pointer" onClick={toggleDropdown}>
              <Dropdown open={dropdownOpen}>
                <MenuButton className={clsx("h-10 flex justify-center items-center")}>
                  <AccountCircleOutlinedIcon/>
                  <Typography className={clsx("ml-1 hidden lg:flex text-blue")}>1759714344@qq.com</Typography>
                </MenuButton>
                <Menu onBlur={() => toggleDropdown()} className={clsx(!dropdownOpen && "hidden")}>
                  <MenuItem onClick={() => console.log("Profile")}>Profile</MenuItem>
                  <MenuItem onClick={() => console.log("settings")}>Language settings</MenuItem>
                  <MenuItem onClick={() => console.log("Log out")}>Log out</MenuItem>
                </Menu>
              </Dropdown>
              <span className="ml-1 hidden lg:flex"></span>
            </a>
          </div>

          {/*  Hamburger Button  */}
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
          {/*  Mobile Menu  */}
          <div
              id="menu"
              className={`absolute top-0 bottom-0 left-0 flex-col self-end w-full min-h-screen py-1 pt-40 pl-12 space-y-3 text-lg text-white uppercase bg-black ${mobileMenuOpen ? 'flex' : 'hidden'}`}
          >
            <a href="/login" className="hover:text-pink-500">Login</a>
            <a href="/about" className="hover:text-pink-500">About</a>
            <a href="/articles" className="hover:text-pink-500">Articles</a>
            <a href="/docs" className="hover:text-pink-500">Docs</a>
            <a href="/support" className="hover:text-pink-500">Support</a>
          </div>
        </nav>
      </header>
  );
};

export default Header;
