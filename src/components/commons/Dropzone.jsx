// components/simple-dropzone.component.js
import React from "react";

import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import { getDroppedOrSelectedFiles } from "html5-file-selector";

export default function ({
  name,
  setFieldValue,
  values,
  setImage,
  image,
  height,
  width,
  mode,
}) {
  const handleChangeStatus = ({ meta, file }, status) => {
    setImage(file);
  };
  const getFilesFromEvent = (e) => {
    return new Promise((resolve) => {
      getDroppedOrSelectedFiles(e).then((chosenFiles) => {
        resolve(chosenFiles.map((f) => f.fileObject));
      });
    });
  };
  const InputChooseFile = ({ accept, onFiles, files, getFilesFromEvent }) => {
    const text = files.length > 0 ? "Add more files" : "Choose a file";
    const buttonStyle = {
      marginTop: "auto",
      marginBottom: "auto",
      backgroundColor: "#67b0ff",
      color: "#fff",
      cursor: "pointer",
      paddingTop: 15,
      paddingBottom: 15,
      paddingRight: 40,
      paddingLeft: 40,
      borderRadius: 30,
    };
    return (
      <div className="flex items-center h-full flex-col py-[1rem] gap-[1rem]">
        {image?.filePath && (
          <div className="h-full">
            <img
              className="h-[200px] w-full object-contain  rounded-md"
              src={`${process.env.REACT_APP_SERVER_BASE_URL}${image?.filePath}/${image?.fileName}`}
            />
          </div>
        )}
        {mode != "view" && (
          <label style={buttonStyle}>
            {text}
            <input
              style={{ display: "none" }}
              className=""
              type="file"
              accept={accept}
              // value={image}
              multiple
              onChange={(e) => {
                console.log(e.target.files[0]);
                setImage(e.target.files[0]);
                getFilesFromEvent(e).then((chosenFiles) => {
                  onFiles(chosenFiles);
                });
              }}
            />{" "}
          </label>
        )}
      </div>
    );
  };

  return (
    <>
      <Dropzone
        disabled={mode == "view"}
        SubmitButtonComponent={"none"}
        maxFiles={1}
        onChangeStatus={handleChangeStatus}
        multiple={false}
        InputComponent={InputChooseFile}
        getFilesFromEvent={getFilesFromEvent}
        classNames
        styles={{
          dropzone: {
            width: width || 500,
            height: height || "320px",
            margin: "0",
            border: "1px solid rgb(115, 112, 111)",
            overflow: "auto",
          },
          dropzoneActive: { borderColor: "blue" },
        }}
      />
    </>
  );
}
