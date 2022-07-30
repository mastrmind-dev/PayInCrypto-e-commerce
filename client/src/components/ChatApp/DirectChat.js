import React, { useState } from "react";
import { getOrCreateChat } from "react-chat-engine";

const DirectChat = (props) => {
  const [username, setUsername] = useState("");
  console.log("username");
  console.log(username);
  console.log("props");
  console.log(props);

  function createDirectChat(props) {
    console.log("second username");
    console.log(username);
    getOrCreateChat(
      props,
      { is_direct_chat: true, usernames: [username] },
      () => setUsername("")
    );
  }

  return (
    <div>
      <input
        type="text"
        placeholder="type username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={() => createDirectChat(props)}>Create</button>
    </div>
  );
};

export default DirectChat;