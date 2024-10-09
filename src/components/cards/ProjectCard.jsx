import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";

const Card = styled.div`
  width: 330px;
  height: auto;
  background-color: ${({ theme }) => theme.card};
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  padding: 26px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: all 0.5s ease-in-out;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 0 50px 4px rgba(0, 0, 0, 0.6);
    filter: brightness(1.1);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  background-color: ${({ theme }) => theme.white};
  border-radius: 10px;
  box-shadow: 0 0 16px 2px rgba(0, 0, 0, 0.3);
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const Date = styled.div`
  font-size: 12px;
  margin-left: 2px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 80};
`;

const Description = styled.div`
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 99};
  overflow: hidden;
  margin-top: 8px;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const Button = styled.button`
  color: ${({ theme }) => theme.primary};
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  border: none;
  background: none;
  cursor: pointer;
  margin-top: 10px;
`;

const ModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 50px;
  background-color: #111928;
  border-radius: 12px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  position: relative;
  align-items: center; /* Center items horizontally by default */

  @media (min-width: 768px) and (max-width: 998px) {
    flex-direction: column;
    gap: 30px;
    align-items: center; /* Ensure content is centered */
  }

  @media (min-width: 1170px) {
    flex-direction: row;
    padding: 40px;
    gap: 40px;
  }
`;


const ModalImage = styled.img`
  width: 80%;
  height: auto;
  max-height: 320px;
  border-radius: 10px;
  object-fit: container;
  
  @media (min-width: 998px) and (max-width: 1170px) {
    width: 80%;
    max-height: 360px;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
  
  @media (min-width: 1170px) {
    width: 50%;
    height: 400px;
  }
`;


const ModalDetails = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (min-width: 998px) and (max-width: 1170px) {
    width: 100%;
  }

  @media (min-width: 1170px) {
    width: 50%;
  }
`;


const DetailRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const DetailTitle = styled.span`
  font-weight: 600;
  font-size: 18px;
  color: white;
  margin-right: 5px;
  flex: 0 0 auto;
`;

const DetailValue = styled.span`
  font-weight: 400;
  font-size: 16px;
  color: white;
  flex: 1 1 auto;
  word-break: break-word;
`;

const LinksContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;
`;

const LinkButton = styled.a`
  background: ${({ theme }) => theme.primary};
  padding: 10px 16px;
  border-radius: 6px;
  color: ${({ theme }) => theme.text_primary};
  text-decoration: none;
  font-weight: 600;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.text_primary};
    color: ${({ theme }) => theme.primary};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 32px; /* Increased size of the close button */
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: red; /* Change color on hover */
  }
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "1100px",
    height: "auto",
    backgroundColor: "transparent",
    border: "none",
    padding: "0", 
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 1000,
  },
};

const ProjectCard = ({ project }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <Card>
        <Image src={project.image} alt={project.title} />
        <Details>
          <Title>{project.title}</Title>
          <Date>{project.date}</Date>
          <Description>{project.description}</Description>
        </Details>
        <Button onClick={openModal}>View More</Button>
      </Card>

      {/* Modal for Project Details */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Project Details"
      >
        <ModalContentWrapper>
          <CloseButton onClick={closeModal} aria-label="Close Modal">&times;</CloseButton>
          <ModalImage src={project.image} alt={project.title} />
          <ModalDetails>
            <DetailRow>
              <DetailTitle>Title:</DetailTitle>
              <DetailValue>{project.title}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailTitle>Description:</DetailTitle>
              <DetailValue>{project.description}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailTitle>Date:</DetailTitle>
              <DetailValue>{project.date}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailTitle>Technologies:</DetailTitle>
              <DetailValue>{project.tags?.join(", ")}</DetailValue>
            </DetailRow>
            <LinksContainer>
              <LinkButton href={project.github} target="_blank" rel="noopener noreferrer">
                View Code
              </LinkButton>
              <LinkButton href={project.webapp} target="_blank" rel="noopener noreferrer">
                Live Site
              </LinkButton>
            </LinksContainer>
          </ModalDetails>
        </ModalContentWrapper>
      </Modal>
    </>
  );
};


export default ProjectCard;