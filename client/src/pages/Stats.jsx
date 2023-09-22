// user stats
// access past interviews + feedback
// INCLUDE IN NAVIGATION
import { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
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

const GET_USER = gql`
  query FindUserById($findUserByIdId: ID!) {
    findUserById(id: $findUserByIdId) {
      _id
      name
      email
      password
      questions {
        _id
        question
        answer
        feedback
        industry
        role
        experience
      }
    }
  }
`;

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
  const {
    loading: loadingQueries,
    error: errorQueries,
    data: dataQueries,
  } = useQuery(GET_USER);
  const [
    deleteUser,
    { data: dataMutations, loading: loadingMutations, error: errorMutations },
  ] = useMutation(DELETE_USER);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getUser = async () => {
    const { data } = await getUser(Auth.getProfile().data._id);

    console.log(data);
  };

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
      <Button data-test="modal-button" onClick={onOpen} colorScheme="red">
        Delete Account
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent data-test="delete-account-modal">
          <ModalHeader data-test="modal-header">Delete Account</ModalHeader>
          <ModalCloseButton data-test="close-button" />
          <ModalBody data-test="modal-content">
            This is a permanent action. Are you sure you want to permanently
            delete your account?
          </ModalBody>
          <ModalFooter>
            <Button data-test="cancel-button" onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button
              data-test="delete-account-button"
              onClick={deleteAccount}
              colorScheme="red"
            >
              Delete Account
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Stats;
