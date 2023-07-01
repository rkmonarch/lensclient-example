import { ethers } from "ethers";
import { lensClient } from "@/utils/lensClient";
import { Toast, useToast } from "@chakra-ui/react";
import { isRelayerResult } from "@lens-protocol/client";

const getSigner = async () => {
    const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
    );
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    return signer;
};


export const signInWithLens = async (address: any) => {
    const challenge = await lensClient.authentication.generateChallenge(
        address
    );
    const signer = await getSigner();
    const signature = await signer.signMessage(challenge);
    await lensClient.authentication.authenticate(address, signature);
};

export const createProfile = async (userName: any) => {

    const profileCreateResult = await lensClient.profile.create({
        handle: userName,
    });

    console.log("profileCreateResult", profileCreateResult);
    alert("Profile Created");

}

