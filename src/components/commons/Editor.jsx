import React, { useEffect, useMemo, useRef, useState } from "react";
import JoditEditor from "jodit-react";
const Editor = ({ values, setFieldValue, disabled }) => {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      uploader: { insertImageAsBase64URI: true },
      showXPathInStatusbar: false,
      showCharsCounter: false,
      showWordsCounter: false,
      toolbarAdaptive: false,
      disabled: disabled,
    }),
    []
  );
  return (
    <JoditEditor
      className=""
      ref={editor}
      value={values.text}
      config={config}
      onChange={(newContent) => setFieldValue("text", newContent)}
    />
  );
};

export default Editor;
