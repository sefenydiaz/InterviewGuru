// user stats
// access past interviews + feedback
// INCLUDE IN NAVIGATION

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

const Stats = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            This is a permanent action. Are you sure you want to delete your
            account permanently?
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button colorScheme="red">Delete Account</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Stats;
