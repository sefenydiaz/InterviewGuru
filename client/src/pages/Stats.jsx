// user stats
// access past interviews + feedback
// INCLUDE IN NAVIGATION
import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import Auth from "../utils/auth";
import { useNavigate } from "react-router-dom";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

const DELETE_USER = gql`
  mutation DeleteUser($id: String!) {
    deleteUser(_id: $id) {
      _id
      email
      name
      password
    }
  }
`;

const Stats = () => {
  const [deleteUser, { data, loading, error }] = useMutation(DELETE_USER);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteAccount = async () => {
    const userId = Auth.getProfile().data._id;

    const { data } = await deleteUser({
      variables: {
        id: userId,
      },
    });

    Auth.logout();
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="red">
        Delete Account
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            This is a permanent action. Are you sure you want to permanently
            delete your account?
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button onClick={deleteAccount} colorScheme="red">
              Delete Account
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Stats;
