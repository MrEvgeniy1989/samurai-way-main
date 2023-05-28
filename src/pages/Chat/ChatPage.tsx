import React, { useEffect, useRef, useState } from "react";
import { ChatMessageAPIType } from "../../api/chat-api";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage, startMessagesListening, stopMessagesListening } from "../../redux/chat-reducer";
import { AppStateType } from "../../redux/redux-store";
import s from "./ChatPage.module.css";
import { Button, Input } from "antd";

export const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};

const Chat: React.FC = () => {
  const dispatch = useDispatch();

  const status = useSelector((state: AppStateType) => state.chat.status);

  useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stopMessagesListening());
    };
  }, []);

  return (
    <div>
      {status === "error" && <div>Some error occured. Please refresh the page</div>}
      <>
        <div>
          <Messages />
        </div>
        <hr />
        <div className={s.addMessageForm}>
          <AddMessageForm />
        </div>
      </>
    </div>
  );
};

const Messages: React.FC<{}> = ({}) => {
  const messages = useSelector((state: AppStateType) => state.chat.messages);
  const messagesAnchorRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget;
    if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 300) {
      !isAutoScroll && setIsAutoScroll(true);
    } else {
      isAutoScroll && setIsAutoScroll(false);
    }
  };

  useEffect(() => {
    if (isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div style={{ height: "600px", overflowY: "auto" }} onScroll={scrollHandler}>
      {messages.map((m) => (
        <Message key={m.id} message={m} />
      ))}
      <div ref={messagesAnchorRef}></div>
    </div>
  );
};

const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(({ message }) => {
  return (
    <div className={s.message}>
      <div className={s.message__user}>
        <img src={message.photo} alt={"avatar"} />
      </div>
      <div className={s.message__text}>
        <b>{message.userName}</b>
        {message.message}
      </div>
      <hr />
    </div>
  );
});

const AddMessageForm: React.FC<{}> = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const status = useSelector((state: AppStateType) => state.chat.status);

  const sendMessageHandler = () => {
    if (!message) {
      return;
    }
    dispatch(sendMessage(message));
    setMessage("");
  };

  const { TextArea } = Input;

  return (
    <div className={s.message__form}>
      <TextArea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></TextArea>

      <Button disabled={status !== "ready"} onClick={sendMessageHandler}>
        Send
      </Button>
    </div>
  );
};
