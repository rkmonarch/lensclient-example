import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { ConnectKitButton } from "connectkit";
import { useDisclosure } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { signInWithLens, createProfile, getProfile, createMetaData, deleteProfile } from "@/components/profile";
import { Web3Storage } from "web3.storage";
import Upload from "@/components/upload";


export default function dashboard() {
    const { address } = useAccount();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [userName, setUserName] = useState("");
    const [profileId, setProfileId] = useState("");
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [image, setImage] = useState("");

    async function createProfileMetadata() {
        console.log("profileId", profileId);
        const client = new Web3Storage({
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDkxZTRjOEMwNTJiMzkzNEQ3Nzc5NWM3QWQ3MkQ0MTFhMGQyMWUxODIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzE2ODYwNTU1NjIsIm5hbWUiOiJNYXRpYy1Qcm9maWxlIn0.zDWjIoqZUCnPXtvWXjm_ZbvPN2ZZHTfcK7JHdM2S7hk",
          });
          const pdata = {
            name: name,
            bio: bio,
            cover_picture: image,
            attributes: [
              {
                traitType: "string",
                value: "twitter handle",
                key: "twitter",
              },
            ],
            version: "1.0.0",
            metadata_id: uuidv4(),
          };
      
          const blob = new Blob([JSON.stringify(pdata)], {
            type: "application/json",
          });
          const file = [new File([blob], `${pdata.metadata_id}.json`)];
          console.log(JSON.stringify(pdata));
          const uploadResponse = await client.put(file);
          console.log(
            "data",
            `https://${uploadResponse}.ipfs.dweb.link/${pdata.metadata_id}.json`
          );

          const createProfileMetadataRequest = {
            profileId: profileId,
            metadata: `https://${uploadResponse}.ipfs.dweb.link/${pdata.metadata_id}.json`,
          };
        
            await createMetaData(createProfileMetadataRequest);

        }


    return (
        <>
            <div className="flex md:order-2" style={{ marginLeft: "80rem", marginTop: "1rem" }}>
                <ConnectKitButton />
            </div>
            <div className="bg-gradient-to-r" style={{marginLeft: "10rem" }}>
                <Button onClick={
                    async () => {
                        await signInWithLens(address);
                    }
                }>
                    Sign In with Lens
                </Button>
            </div>

            <div className="bg-gradient-to-r" style={{ marginTop: "2rem", marginLeft: "10rem" }}>
                <Input
                    id="username"
                    name="username"

                    placeholder="jessica"
                    value={userName}
                    onChange={(e) => {
                        setUserName(e.target.value);
                    }}
                />
                <div style={{ marginTop: "1rem" ,marginLeft: "10rem" }}>
                </div>
                <Button
                    onClick={async () => {
                        await createProfile(userName);
                    }}
                >
                    Create Profile
                </Button>

            </div>

            <div className="bg-gradient-to-r" style={{marginLeft: "10rem", marginTop:"1rem" }}>

                <Button 
                as={Link}
                onClick={async()=> {
                   const profile = await getProfile(userName);
                     setProfileId(profile as string);
                }}
                target="_blank"
                href="https://testnets.opensea.io/0x97fcDEe354Ee9494927eAfAfEE283940CD734B85"
               >
                    Get Profile
                </Button>
            </div>
            <div style={{ marginTop: "1rem" }}>
            </div>

            <div className="bg-gradient-to-r" style={{marginLeft: "10rem" }}>

                <Button onClick={onOpen}>
                    Create Profile Metadata
                </Button>
                <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <div className="flex items-center justify-center space-x-2 mb-5">
                  <Image
                    src={image !== "" ? image : "/lens.png"}
                    loader={() => (image !== "" ? image : "/lens.png")}
                    alt="preview"
                    width={100}
                    className="rounded-md"
                    height={100}
                  />
                  <Upload
                    id="image"
                    name="image"
                    type="file"
                    onChange={(e: any) => {
                      const image = URL.createObjectURL(e.target.files[0]);
                      setImage(image);
                      const files = e.target.files;
                      const client = new Web3Storage({
                        token:
                          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDkxZTRjOEMwNTJiMzkzNEQ3Nzc5NWM3QWQ3MkQ0MTFhMGQyMWUxODIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzE2ODYwNTU1NjIsIm5hbWUiOiJNYXRpYy1Qcm9maWxlIn0.zDWjIoqZUCnPXtvWXjm_ZbvPN2ZZHTfcK7JHdM2S7hk",
                      });
                      client.put(files).then((cid) => {
                        console.log(cid);
                        setImage(
                          `https://${cid}.ipfs.w3s.link/${files[0].name}`
                        );
                      });
                    }}
                  />
                </div>
                <Input
                  id="Name"
                  name="Name"
                  value={name}
                  placeholder="Jessica Bourne"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <Input
                  id="bio"
                  name="bio"         
                  placeholder="Blockchain developer"
                  value={bio}
                  onChange={(e) => {
                    setBio(e.target.value);
                  }}
                />
                <Button onClick={()=> {
                    createProfileMetadata();
                }}>
                    Create Profile Metadata
                </Button>
          </ModalBody>

        </ModalContent>
      </Modal>
            </div>
            <div style={{ marginTop: "1rem" }}>
            </div>
            <div className="bg-gradient-to-r" style={{marginLeft: "10rem" }}>

                <Button onClick={()=> {
                    deleteProfile(profileId);
                }}>
                    Delete Profile
                </Button>
            </div>
        </>
    );
}
