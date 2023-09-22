// user stats
// access past interviews + feedback
// INCLUDE IN NAVIGATION
import { useEffect, useState } from "react";
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
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  StackDivider,
  Box,
  Text,
} from "@chakra-ui/react";

const GET_USER = gql`
  query FindUserById($findUserByIdId: String!) {
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
    data: dataQueries,
    loading: loadingQueries,
    error: errorQueries,
  } = useQuery(GET_USER, {
    variables: { findUserByIdId: Auth.getProfile().data._id },
  });

  console.log(dataQueries);

  const [
    deleteUser,
    { data: dataMutations, loading: loadingMutations, error: errorMutations },
  ] = useMutation(DELETE_USER);

  const deleteAccount = async () => {
    const { dataMutations } = await deleteUser({
      variables: {
        id: Auth.getProfile().data._id,
      },
    });

    Auth.logout();
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const userQuestions = dataQueries.findUserById.questions;

  return (
    <>
      {userQuestions.map((question, index) => {
        return (
          <Card my="5" key={index} value={question}>
            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Box>
                  <Text>Question: {question.question} </Text>
                  <Text>Answer: {question.answer} </Text>
                  <Text>Feedback: {question.feedback}</Text>
                </Box>
                <Box>
                  <Text>Industry: {question.industry}</Text>
                  <Text>Role: {question.role}</Text>
                  <Text>Experience Level: {question.experience} years</Text>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        );
      })}

      <Button
        data-test="modal-button"
        mt={5}
        onClick={onOpen}
        colorScheme="red"
      >
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
