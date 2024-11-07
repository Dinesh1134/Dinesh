import React, { useState } from "react";
import { Link as LinkR, NavLink } from "react-router-dom";
import styled from "styled-components";
import { Bio } from "../data/constants";
import { MenuRounded, Share } from "@mui/icons-material";
import { SiGithub, SiLinkedin, SiHackerrank, SiLeetcode } from "react-icons/si";

const Nav = styled.div`
  background-color: ${({ theme }) => theme.bg};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
`;

const NavbarContainer = styled.div`
  width: 100%;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  position: relative;
`;

const NavLogo = styled(LinkR)`
  border: 2px solid ${({ theme }) => theme.primary};
  border-radius: 50px;
  padding: 8px 12px;
  font-weight: 500;
  font-size: 20px;
  text-decoration: none;
  color: inherit;
`;

// Updated NavItem to use NavLink
const NavItem = styled(NavLink)`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
  text-decoration: none;
  writing-mode: vertical-lr;
  text-align: center;
  transform: rotate(180deg);
  position: relative;

  &.active {
    color: ${({ theme }) => theme.primary};
  }

  &.active::after {
    content: "";
    position: absolute;
    bottom: 50%;
    left: -50%;
    transform: translateX(-50%);
    width: 6px;
    height: 6px;
    margin: auto;
    background-color: ${({ theme }) => theme.primary};
    border-radius: 50%;
  }

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const RouterNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
  text-decoration: none;
  position: relative;

  &.active {
    color: ${({ theme }) => theme.primary};
  }

  &.active::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 6px;
    background-color: ${({ theme }) => theme.primary};
    border-radius: 50%;
  }

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const FollowMeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const FollowMeText = styled.h4`
  margin: 0;
  color: ${({ theme }) => theme.text_primary};
`;

const HorizontalLine = styled.div`
  width: 100px;
  height: 4px;
  background-color: ${({ theme }) => theme.primary};
  margin: 0 10px;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 30px;

  @media screen and (max-width: 768px) {
    gap: 20px;
  }
`;

const SocialIcon = styled.a`
  color: ${({ theme }) => theme.text_primary};
  transition: color 0.2s ease;
  font-size: 24px;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const ButtonContainer = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 6px;

  @media screen and (max-width: 768px) {
    display: none;
  }

  @media screen and (max-width: 998px) {
    width: 20%;
  }
`;

const Sidebar = styled.div`
  position: fixed;
  top: 180px; /* Adjust as necessary to center vertically */
  left: 10px; /* Adjust as necessary */
  display: flex;
  flex-direction: column;
  gap: 40px; /* Space between nav items */
  align-items: center; /* Center items horizontally */
  justify-content: flex-start; /* Align items to the start */
  height: calc(100% - 100px); /* Adjust height based on desired vertical position */
  margin-left: 20px; /* Add space between NavLogo and Sidebar */
  
    @media screen and (max-width: 768px) {
    display: none;
  }
`;

const SayHiButton = styled.a`
  border: 1px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.6s ease-in-out;
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
  }
`;

const MobileIcon = styled.div`
  height: 100%;
  display: none;
  align-items: center;
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;

  @media screen and (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenu = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 24px 40px;
  list-style: none;
  background: ${({ theme }) => theme.card_light + "99"};
  position: absolute;
  top: 60px;
  right: 0;
  left: 0;
  transition: all 0.6s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? "translateY(0)" : "translateY(-100%)")};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  z-index: ${({ isOpen }) => (isOpen ? "1000" : "-1000")};
`;

const ShareButton = styled.div`
  cursor: pointer;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 50%;
  color: ${({ theme }) => theme.primary};
  padding: 10px;
  transition: background-color 0.3s;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleShare = () => {
    const shareData = {
      title: "My Portfolio",
      text: "Check out my portfolio!",
      url: "http://dinesh-portfolio.com",
    };
    if (navigator.share) {
      navigator.share(shareData).catch((err) => console.error("Error sharing", err));
    } else {
      console.log("Share not supported on this browser");
    }
  };

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to="/">KD</NavLogo>

        <MobileIcon onClick={() => setIsOpen(!isOpen)}>
          <MenuRounded style={{ color: "inherit" }} />
        </MobileIcon>

        <FollowMeContainer>
          <FollowMeText>Follow Me</FollowMeText>
          <HorizontalLine />
          <SocialIcons>
            <SocialIcon href={Bio.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <SiGithub />
            </SocialIcon>
            <SocialIcon href={Bio.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <SiLinkedin />
            </SocialIcon>
            <SocialIcon href={Bio.hackerRank} target="_blank" rel="noopener noreferrer" aria-label="HackerRank">
              <SiHackerrank />
            </SocialIcon>
            <SocialIcon href={Bio.leetcode} target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
              <SiLeetcode />
            </SocialIcon>
          </SocialIcons>
        </FollowMeContainer>

        <Sidebar>
          <NavItem to="/about">About</NavItem>
          <NavItem to="/projects">Projects</NavItem>
          <NavItem to="/skills">Skills</NavItem>
          <NavItem to="/contact">Contact</NavItem>

          {/* Share Button */}
          <ShareButton onClick={handleShare}>
            <Share />
          </ShareButton>
        </Sidebar>

        {isOpen && (
          <MobileMenu isOpen={isOpen}>
            <RouterNavLink onClick={() => setIsOpen(false)} to="/about">
              About
            </RouterNavLink>
            <RouterNavLink onClick={() => setIsOpen(false)} to="/projects">
              Works
            </RouterNavLink>
            <RouterNavLink onClick={() => setIsOpen(false)} to="/skills">
              Skills
            </RouterNavLink>
            <RouterNavLink onClick={() => setIsOpen(false)} to="/contact">
              Contact
            </RouterNavLink>
            <SocialIcons>
              <SocialIcon href={Bio.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <SiGithub />
              </SocialIcon>
              <SocialIcon href={Bio.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <SiLinkedin />
              </SocialIcon>
              <SocialIcon href={Bio.hackerRank} target="_blank" rel="noopener noreferrer" aria-label="HackerRank">
                <SiHackerrank />
              </SocialIcon>
              <SocialIcon href={Bio.leetcode} target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
                <SiLeetcode />
              </SocialIcon>
            </SocialIcons>
            <SayHiButton href={`mailto:${Bio.email}`} target="_blank" rel="noopener noreferrer">
              Say Hi..
            </SayHiButton>
          </MobileMenu>
        )}

        <ButtonContainer>
          <SayHiButton href={`mailto:${Bio.email}`} target="_blank" rel="noopener noreferrer">
            Say Hi..
          </SayHiButton>
        </ButtonContainer>
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;