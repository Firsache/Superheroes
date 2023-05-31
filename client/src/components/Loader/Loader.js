import { FallingLines } from "react-loader-spinner";

export const Loader = () => {
  return (
    <div style={{ position: "absolute", top: "50%", left: "50%" }}>
      <FallingLines
        color={"blue"}
        width="100"
        visible={true}
        ariaLabel="falling-lines-loading"
      />
    </div>
  );
};
