import { ChangeEvent, useState } from "react";

import { api } from "../utils/api";

export default function Message() {
  const [error, setError] = useState("");
  const [showResponseMessages, setShowResponseMessage] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [messageSend, setMessageSend] = useState("");
  const correctEnglishMutation = api.generateText.correctEnglish.useMutation();
  const randomQuestion = api.generateText.randomQuestion.useQuery({ text: "" });

  function correctEnglishOfMessage() {
    if (messageInput === "") {
      setError("El texto no puede quedar en blanco");
      return;
    }
    setMessageSend(messageInput);
    setShowResponseMessage(true);
    setMessageInput("");
    correctEnglishMutation.mutate({
      text: messageInput,
    });
  }

  function handleInputChange(evt: ChangeEvent<HTMLInputElement>): void {
    setMessageInput(evt.target.value);
    if (!evt.target.value || evt.target.value === "") {
      setError("El texto no puede quedar en blanco");
      return;
    }
    setError("");
  }

  function refreshPage() {
    window.location.reload();
  }

  return (
    <>
      <div className="p:2 flex h-screen flex-1 flex-col justify-between sm:p-6">
        <div
          id="messages"
          className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex flex-col space-y-4 overflow-y-auto p-3"
        >
          <div className="chat-message">
            <div className="flex items-end">
              <div className="order-2 mx-2 flex max-w-xs flex-col items-start space-y-2 text-xs">
                <div>
                  <span className="inline-block rounded-lg rounded-bl-none bg-gray-300 px-4 py-2 text-gray-600">
                    {randomQuestion.data
                      ? randomQuestion.data.question
                      : "Loading..."}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="chat-message"
            style={showResponseMessages ? {} : { display: "none" }}
          >
            <div className="flex items-end justify-end">
              <div className="order-1 mx-2 flex max-w-xs flex-col items-end space-y-2 text-xs">
                <div>
                  <span className="inline-block rounded-lg rounded-br-none bg-blue-600 px-4 py-2 text-white ">
                    {messageSend}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="chat-message"
          style={showResponseMessages ? {} : { display: "none" }}
        >
          <div className="flex items-end">
            <div className="order-2 mx-2 flex max-w-xs flex-col items-start space-y-2 text-xs">
              <div>
                <span className="inline-block rounded-lg rounded-bl-none bg-gray-300 px-4 py-2 text-gray-600">
                  {correctEnglishMutation.data
                    ? correctEnglishMutation.data.greeting
                    : "Loading..."}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-2 border-t-2 border-gray-200 px-4 pt-4 sm:mb-0">
          <div
            className="relative flex"
            style={showResponseMessages ? { display: "none" } : {}}
          >
            <input
              type="text"
              placeholder="Escribe tu mensaje"
              className="w-full rounded-md bg-gray-200 py-3 pl-12 text-gray-600 placeholder-gray-600 focus:placeholder-gray-400 focus:outline-none"
              onChange={(evt) => handleInputChange(evt)}
              value={messageInput}
            />
            <div className="absolute inset-y-0 right-0 hidden items-center sm:flex">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-4 py-3 text-white transition duration-500 ease-in-out hover:bg-blue-400 focus:outline-none"
                onClick={correctEnglishOfMessage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="ml-2 h-6 w-6 rotate-90 transform"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              </button>
            </div>
          </div>
          <span style={{ color: "red" }}>{error}</span>
          <div
            className="relative flex"
            style={correctEnglishMutation.data ? {} : { display: "none" }}
          >
            <div className="mx-auto content-center items-center justify-center sm:flex">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-4 py-3 text-white transition duration-500 ease-in-out hover:bg-blue-400 focus:outline-none"
                onClick={refreshPage}
              >
                <span className="font-bold">Siguiente pregunta</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
