import {
  getDocument,
  updateDocument,
  deleteDocument,
  getDocuments,
} from "../../apiCalls/general";
import { FaEdit, FaTrash } from "react-icons/fa";
import { HiEye } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { confirmToast, messageToast } from "../../utils/toast";

const Actions = ({
  _id,
  setMode,
  setOpenModal,
  setCurrentId,
  type,
  actionType,
  hasAddFeature,
  isAuthorized,
}) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth);

  // handle edit
  const handleEdit = async () => {
    setOpenModal(true);
    setCurrentId(_id);
    setMode("update");
  };

  // handle delete
  const handleDelete = async () => {
    const result = await confirmToast(
      null,
      "You are Deleting the document!,",
      null,
      "Delete!"
    );
    if (result) {
      try {
        let response = await deleteDocument(type, _id);
        if (response.status != 200) {
          return messageToast(
            "error",
            response.data.message || "Cannot Delete !!!"
          );
        }
        messageToast("success", "You have successfully deleted document!!!");
      } catch (err) {
        messageToast("error", err.message || "Cannot Delete !!!");
      }
    }
    let response = await getDocuments(type);
    dispatch({ type: actionType, payload: response.data.documents });
  };
  const handleView = async () => {
    setOpenModal(true);
    setCurrentId(_id);
    setMode("view");
  };
  return (
    <ul className="flex gap-[0.8rem] text-xl">
      <li className="cursor-pointer" onClick={handleView}>
        <HiEye className="text-blue-500" />
      </li>
      {hasAddFeature && (
        <li className="cursor-pointer" onClick={handleEdit}>
          <FaEdit className="text-green-600" />
        </li>
      )}
      {
        <li className="cursor-pointer" onClick={handleDelete}>
          <FaTrash className="text-red-600" />
        </li>
      }
    </ul>
  );
};
export default Actions;
