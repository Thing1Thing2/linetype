import React from "react";

const Message = () => {
  return (
    <div>
      <center>
        <img
          style={{ width: 200, height: 200 }}
          src={"LineTypeLogo.jpg"}
          alt="logo"
        />
        <h1>LineType</h1>

        <h5>
          {" "}
          <b>Vision</b> <br />
          Be an innovative provider for the built environment industry to design
          better and increase productivity
        </h5>
        <h5>
          {" "}
          <b>Mission</b>
          <br />
          To streamline the design and construction process through the
          introduction of an adapted integrated ecosystem
        </h5>

        <img
          style={{ width: 500, height: 200 }}
          src={"valueproposition.png"}
          alt="logo"
        />
      </center>
    </div>
  );
};

export default Message;
