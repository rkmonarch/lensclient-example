import { useState } from "react";
import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { Web3Storage } from "web3.storage";
import { signInWithLens, createProfile, getProfile, createMetaData, deleteProfile } from "@/components/profile";
import Upload from "@/components/upload";
import Image from "next/image";
import { useAccount } from "wagmi";
import Link from "next/link";

export default function Dashboard() {
    // State variables
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [userName, setUserName] = useState("");
    const [profileId, setProfileId] = useState("");
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [image, setImage] = useState("");
    const { address } = useAccount();

    // Function to create profile metadata
    async function createProfileMetadata() {
        // Initialize Web3Storage client
        const client = new Web3Storage({
            token:"WEB3STORAGE_TOKEN"
        });

        // Create profile metadata object
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

        // Create JSON blob and file for metadata upload
        const blob = new Blob([JSON.stringify(pdata)], {
            type: "application/json",
        });
        const file = [new File([blob], `${pdata.metadata_id}.json`)];

        // Upload metadata file to Web3Storage
        const uploadResponse = await client.put(file);
        const metadataUrl = `https://${uploadResponse}.ipfs.dweb.link/${pdata.metadata_id}.json`;

        // Create profile metadata request
        const createProfileMetadataRequest = {
            profileId: profileId,
            metadata: metadataUrl,
        };

        // Call createMetaData function to create metadata on Lens
        await createMetaData(createProfileMetadataRequest);
    }

    return (
        <>
            {/* ConnectKitButton component */}
            <div className="flex md:order-2" style={{ marginLeft: "80rem", marginTop: "1rem" }}>
                {/* ConnectKitButton */}
            </div>

            {/* Sign In with Lens button */}
            <div className="bg-gradient-to-r" style={{ marginLeft: "10rem" }}>
                <Button onClick={async () => await signInWithLens(address)}>
                    Sign In with Lens
                </Button>
            </div>

            {/* Create Profile section */}
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
                <div style={{ marginTop: "1rem", marginLeft: "10rem" }}></div>
                <Button
                    onClick={async () => {
                        await createProfile(userName);
                    }}
                >
                    Create Profile
                </Button>
            </div>

            {/* Get Profile section */}
            <div className="bg-gradient-to-r" style={{ marginLeft: "10rem", marginTop: "1rem" }}>
                <Button
                    as={Link}
                    onClick={async () => {
                        const profile = await getProfile(userName);
                        setProfileId(profile as string);
                    }}
                    target="_blank"
                    href="https://testnets.opensea.io/0x97fcDEe354Ee9494927eAfAfEE283940CD734B85"
                >
                    Get Profile
                </Button>
            </div>

            {/* Create Profile Metadata section */}
            <div style={{ marginTop: "1rem" }}></div>
            <div className="bg-gradient-to-r" style={{ marginLeft: "10rem" }}>
                <Button onClick={onOpen}>
                    Create Profile Metadata
                </Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Create Profile Metadata</ModalHeader>
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
                                            token: "WEB3STORAGE_TOKEN",
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
                            <Button onClick={() => {
                                createProfileMetadata();
                            }}>
                                Create Profile Metadata
                            </Button>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </div>

            {/* Delete Profile section */}
            <div style={{ marginTop: "1rem" }}></div>
            <div className="bg-gradient-to-r" style={{ marginLeft: "10rem" }}>
                <Button onClick={() => {
                    deleteProfile(profileId);
                }}>
                    Delete Profile
                </Button>
            </div>
        </>
    );
}
