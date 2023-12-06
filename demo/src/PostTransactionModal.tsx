import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Textarea } from "@chakra-ui/react";
import React, { useCallback, useRef } from "react";
import { ResilientDB } from "resilientdb-javascript-sdk";

const PostTransactionModal = ({ open, onFinish, onClose, client }: {
  open: boolean,
  onClose: () => void,
  onFinish: () => void,
  client: ResilientDB
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  const generateKeys = useCallback(() => {
    if (!formRef.current) return;
    const form = formRef.current;

    const senderPair = ResilientDB.generateKeys();

    (form.elements["signerPublicKey" as unknown as number] as HTMLInputElement).value = senderPair.publicKey;
    (form.elements["signerPrivateKey" as unknown as number] as HTMLInputElement).value = senderPair.privateKey;
    (form.elements["recipientPublicKey" as unknown as number] as HTMLInputElement).value = "4ndMdtmPpDM1PBJHZcDddmAs8yNzzCYJ1XQY3hHVZohc";
  }, []);

  const postTransaction = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    const form = formRef.current;
    const data = new FormData(form);

    const signerPublicKey = data.get("signerPublicKey") as string;
    const signerPrivateKey = data.get("signerPrivateKey") as string;
    const recipientPublicKey = data.get("recipientPublicKey") as string;
    const amount = data.get("amount") as string;
    const fullName = data.get("fullName") as string;
    const asset = data.get("asset") as string;

    if (signerPublicKey.length === 0 || signerPrivateKey.length === 0 || recipientPublicKey.length === 0 || amount.length === 0) return;

    const result = await client.postTransaction({
      operation: "CREATE",
      amount: parseFloat(amount),
      signerPublicKey,
      signerPrivateKey,
      recipientPublicKey,
      asset: {
        ...JSON.parse(asset),
        "name": fullName
      }
    });

    console.log("Got result:", result);
    onClose();
    onFinish();
  }, [client, onClose, onFinish]);

  // const transaction = await client.postTransaction({
  //   operation: 'CREATE',
  //   amount: 5,
  //   signerPublicKey: senderPair.publicKey,
  //   signerPrivateKey: senderPair.privateKey,
  //   recipientPublicKey: receiverPair.publicKey,
  //   asset: {}
  // });

  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form ref={formRef} onSubmit={postTransaction}>
          <ModalHeader>Post Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button type="button" className="mb-4" onClick={generateKeys}>Generate Keys</Button>

            <label className="block font-semibold mb-0.5">Signer Public Key:</label>
            <Input name="signerPublicKey" />

            <label className="block font-semibold mb-0.5 mt-2">Signer Private Key:</label>
            <Input name="signerPrivateKey" />

            <label className="block font-semibold mb-0.5 mt-2">Signer Pseudonym (name):</label>
            <Input name="fullName" />

            <label className="block font-semibold mb-0.5 mt-2">Recipient Public Key:</label>
            <Input name="recipientPublicKey" />

            <label className="block font-semibold mb-0.5 mt-2">Amount:</label>
            <NumberInput name="amount">
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>

            <label className="block font-semibold mb-0.5 mt-2">Asset/Data:</label>
            <Textarea defaultValue={'{"from": "resilientdb-javascript-sdk demo"}'} name="asset" />
          </ModalBody>

          <ModalFooter>
            <Button type="button" variant='ghost' mr={4} onClick={onClose}>Close</Button>
            <Button type="submit" colorScheme='blue'>
              Submit
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default PostTransactionModal;