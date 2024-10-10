import styled, { ThemeProvider } from "styled-components";
import { darkTheme } from "./utils/Themes";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./components/sections/Hero";
import Skills from "./components/sections/Skills";
import StartCanvas from "./components/canvas/Stars";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg}; /* Optional if you want some color overlay */
  width: 100%;
  min-height: 100vh;
  height: auto;
  overflow-x: hidden;
  position: relative;
  z-index: 1; /* Places the content above the background */
  padding-bottom: 50px;
  
  @media (max-width: 1340px) {
    padding-left: 90px;
  }

  @media (min-width: 1340px) and (max-width: 1440px) {
    padding-left: 60px;
  }

  @media screen and (max-width: 768px) {
    padding-left: 0px;
  }
`;

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Navbar />
        <Body>
          <StartCanvas />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<Hero />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Body>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;