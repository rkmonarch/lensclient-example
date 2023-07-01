import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { ConnectKitButton } from "connectkit";
import { useDisclosure } from "@chakra-ui/react";
import { lensClient } from "@/utils/lensClient";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { signInWithLens, createProfile } from "@/components/profile";

export default function dashboard() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { address } = useAccount();
    const [userName, setUserName] = useState("");
   

    return (
        <>
            <div className="flex md:order-2" style={{ marginLeft: "80rem", marginTop: "1rem" }}>
                <ConnectKitButton />
            </div>
            <div className="bg-gradient-to-r">
                <Button onClick={
                    async () => {
                        await signInWithLens(address);
                    }
                }>
                    Sign In with Lens
                </Button>
            </div>

            <div className="bg-gradient-to-r">
            
                <Button onClick={onOpen}>
                    CreateProfile
                </Button>
                <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Input
                  id="username"
                  name="username"
                 
                  placeholder="jessica"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
                <Button
                    onClick={async () => {
                      await createProfile(userName);
                    }}
                >
                    Create Profile
                </Button>
          </ModalBody>

       
        </ModalContent>
      </Modal>
            </div>

            <div className="bg-gradient-to-r">
               
                <Button>
                    Get Profile
                </Button>
            </div>

            <div className="bg-gradient-to-r">
              
                <Button>
                    Create Profile Metadata
                </Button>
            </div>

            <div className="bg-gradient-to-r">
              
              <Button>
                  Delete Profile
              </Button>
          </div>
        </>
    );
}
