import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const applicationModal = withReactContent(
    Swal.mixin({
      showCloseButton: true,
      showConfirmButton: false,
      
    })
  );

  export {  applicationModal };