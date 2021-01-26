import { Avatar } from "@material-ui/core";
import "../styles/Chats.css";
import SearchIcon from "@material-ui/icons/Search";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/appSlice";
import { useHistory } from "react-router-dom";
import { resetCameraImage } from "../features/cameraSlice";

const Chats = () => {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
  }, []);

  const takeSnap = () => {
    dispatch(resetCameraImage());
    history.push("/");
  };

  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar
          className="chats__avatar"
          src={user?.profilePic}
          onClick={() => auth.signOut()}
        />
        <div className="chats__search">
          <SearchIcon />
          <input type="text" placeholder="Friends" />
        </div>
        <ChatBubbleIcon className="chats__chatIcon" />
      </div>
      <div className="chats__posts">
        {posts.map(
          ({
            id,
            data: { profilePic, username, timestamp, imageUrl, read },
          }) => (
            <Chat
              key={id}
              id={id}
              profilePic={profilePic}
              username={username}
              timestamp={timestamp}
              imageUrl={imageUrl}
              read={read}
            />
          )
        )}
      </div>
      <RadioButtonUncheckedIcon
        className="chats__takePicIcon"
        fontSize="large"
        onClick={takeSnap}
      />
    </div>
  );
};

export default Chats;
