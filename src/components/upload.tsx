import React from "react";
import PropTypes from "prop-types";
import { Button } from "@chakra-ui/react";

interface IUpload {
  id: string;
  name: string;
  type?: string;
  accept?: string;
  onChange: (e: any) => void;
}

const Upload = ({ id, name, type, accept, onChange }: IUpload) => {
  return (
    <div className="flex flex-col">
      <Button
        style={{ padding: "0" }}
        className="max-w-[300px] text-black bg-gray-200 border border-gray-200 font-bold"
      >
        <div className="relative left-[15px]">Upload</div>
        <input
          id={id}
          name={name}
          type={type || "file"}
          className="opacity-0 fixed left-0 relative h-[40px] ml-[-70px] w-[100px] hover:cursor-pointer"
          accept={accept || "image/*"}
          onChange={onChange}
        />
      </Button>
    </div>
  );
};

export default Upload;

Upload.defaultProps = {
  label: "",
  placeholder: "",
  type: "file",
  accept: "image/*",
};

Upload.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  accept: PropTypes.string,
  onchange: PropTypes.func,
};
