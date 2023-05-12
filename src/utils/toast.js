import Swal from "sweetalert2";

export const messageToast = (icon, title) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    width: "20rem",
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: icon || "success",
    title: title || "Task Completed Successfully!!!",
  });
};

export const confirmToast = async (
  title,
  text,
  icon,
  confirmationButtonText
) => {
  const result = await Swal.fire({
    title: title || "Are you sure?",
    text: text || "You won't be able to revert this!",
    icon: icon || "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: confirmationButtonText || "Yes!",
  });

  if (result.isConfirmed) {
    return true;
  }
  return false;
};
