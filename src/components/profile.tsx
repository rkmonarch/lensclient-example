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

export const getProfile = async (handle: any) => {
    console.log("handle", handle);
    const profileByHandle = await lensClient.profile.fetch({
        handle: `${handle}.test`,
    });
    console.log("profileByHandle", profileByHandle);
    return profileByHandle?.id;
}

export const createMetaData = async (createProfileMetadataRequest: any) => {
    const typedDataResult =
        await lensClient.profile.createSetProfileMetadataTypedData(
            createProfileMetadataRequest
        );
    console.log("relayerResult", typedDataResult);

    const profileData = typedDataResult.unwrap();

    const signer = await getSigner();

    const signedTypedData = await signer._signTypedData(
        profileData.typedData.domain,
        profileData.typedData.types,
        profileData.typedData.value
    );

    const broadcastResult = await lensClient.transaction.broadcast({
        id: profileData.id,
        signature: signedTypedData,
    });

    const broadcastResultValue = broadcastResult.unwrap();

    if (!isRelayerResult(broadcastResultValue)) {
        console.log(`Something went wrong`, broadcastResultValue);
        return;
    }
    console.log(
        `Transaction was successfuly broadcasted with txId ${broadcastResultValue.txId}`
    );

};

export const deleteProfile = async (profileId: any) => {
    const burnProfileTypedDataResult = await lensClient.profile.createBurnProfileTypedData({
        profileId,
      });
      console.log("burnProfileTypedDataResult", burnProfileTypedDataResult);
    }