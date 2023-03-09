import { Hearts } from "react-loader-spinner";
import "./Spinner.scss";
const Spinner = () => {
  return (
    <Hearts
      height="80"
      width="80"
      color="purple"
      ariaLabel="hearts-loading"
      wrapperStyle={{}}
      wrapperClass="spinner"
      visible={true}
    />
  );
};

export default Spinner;
