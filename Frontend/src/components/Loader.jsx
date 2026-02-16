import { TailSpin } from "react-loader-spinner";

const Loader = ({ fullHeight = false }) => {
  return (
    <div
      className={`w-full flex justify-center items-center ${
        fullHeight ? "min-h-[100vh]" : "min-h-[300px]"
      }`}
    >
      <TailSpin
        height="70"
        width="70"
        color="var(--color-deep-magenta)" // using your azure-blue theme color
        ariaLabel="loading"
        radius="1"
        visible={true}
      />
    </div>
  );
};

export default Loader;