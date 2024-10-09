import React, { useRef } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
import { Bio } from "../../data/constants";
import { FaWhatsapp, FaEnvelope, FaLinkedin } from "react-icons/fa";

// Styled Components

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; /* Fixed typo */
  position: relative; /* Fixed typo */
  z-index: 1;
  align-items: center;
  padding: 40px 20px; /* Added padding for better spacing */
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* Align items to the top */
  flex-direction: row; /* Align Info and Form side by side */
  width: 100%;
  max-width: 1100px;
  gap: 40px; /* Increased gap for better spacing */
  @media (max-width: 960px) {
    flex-direction: column; /* Stack vertically on small screens */
    align-items: center; /* Center align on small screens */
  }
`;

const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 40px; /* Moved from inline style */
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(17, 25, 40, 0.83);
  border-radius: 12px;
  padding: 20px;
  box-shadow: rgba(23, 92, 230, 0.1) 0px 4px 24px;
`;

const FormContainer = styled.div`
  flex: 1;
  max-width: 600px;
  width: 100%;
`;

const ContactTitleSection = styled.div`
  font-size: 28px;
  margin-bottom: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  text-align: center;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  color: ${({ theme }) => theme.text_primary};
  
  a {
    color: ${({ theme }) => theme.text_primary}; /* Default link color */
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.primary}; /* Hover color (violet) */
    }
  }
`;

const IconWrapper = styled.div`
  margin-right: 10px;
  font-size: 24px;
`;

const ContactFormStyled = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(17, 25, 40, 0.83);
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 32px;
  border-radius: 12px;
  box-shadow: rgba(23, 92, 230, 0.1) 0px 4px 24px;
  gap: 12px;
`;

const ContactInput = styled.input`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary}80; /* Adjusted opacity */
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;

  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary}80;
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;

  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.button`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primary};
  }
`;

// Contact Component
const Contact = () => {
  const form = useRef();

  // Handle form submission with EmailJS
  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_r9oduli", // Your EmailJS service ID
        "template_hhxudut", // Your EmailJS template ID
        form.current, // The form you want to send
        "tCCFA2O7Wtu-qmRMb" // Your public key
      )
      .then(
        (result) => {
          alert("Message Sent Successfully!");
          form.current.reset(); // Reset the form fields
        },
        (error) => {
          alert("An error occurred, please try again later.");
          console.error("EmailJS Error:", error.text); // Log error for debugging
        }
      );
  };

  return (
    <OuterContainer>
      <Title>Contact</Title> {/* Section title */}
      <Desc>
        Feel free to reach out to me for any questions or opportunities!
      </Desc>

      <Wrapper id="Contact">
        <InfoContainer>
          <ContactTitleSection>Contact Information</ContactTitleSection>
          <ContactItem>
            <IconWrapper>
              <FaWhatsapp />
            </IconWrapper>
            <div>WhatsApp: 7200970046</div>
          </ContactItem>
          <ContactItem>
            <IconWrapper>
              <FaEnvelope />
            </IconWrapper>
            <div>Email: dineehkumar040311@gmail.com</div>
          </ContactItem>
          <ContactItem>
            <IconWrapper>
              <FaLinkedin />
            </IconWrapper>
            <div>
              LinkedIn:{" "}
              <a
                href={Bio.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                Dinesh Kumar
              </a>
            </div>
          </ContactItem>
        </InfoContainer>

        <FormContainer>
          <ContactFormStyled ref={form} onSubmit={handleSubmit}>
            <ContactTitleSection>Email Me 🚀</ContactTitleSection>
            <ContactInput
              type="email"
              placeholder="Your Email"
              name="from_email"
              required
            />
            <ContactInput
              type="text"
              placeholder="Your Name"
              name="from_name"
              required
            />
            <ContactInput
              type="text"
              placeholder="Subject"
              name="subject"
              required
            />
            <ContactInputMessage
              placeholder="Message"
              name="message"
              rows={4}
              required
            />
            <ContactButton type="submit">Send</ContactButton>
          </ContactFormStyled>
        </FormContainer>
      </Wrapper>
    </OuterContainer>
  );
};

export default Contact;