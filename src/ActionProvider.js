
import axios from "axios";

class ActionProvider {
  constructor(createChatbotMessage, setStateFunc, createClientMessage) {
    this.createChatbotMessage = createChatbotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }


  createChat(answer,user) {
    const message = user.createChatbotMessage(answer);

  user.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  }


   handleAnswer(msg) {
     let user=  this;
    const headers = {
      "Content-Type": "application/json",
      Authorization: "EndpointKey 16084e4b-326a-49de-8111-1bd8b5b84c37",
    };

    const data = { question: msg };

    axios
      .post(
        "https://coronaqnabot.azurewebsites.net/qnamaker/knowledgebases/853ad67c-a6db-4661-9f63-4147c726ab63/generateAnswer",
        data,
        {
          headers: headers,
        }
      )
      .then((response) => {
        const answerObject = response.data;
        const answer = answerObject.answers[0].answer;
        this.createChat(answer,user)
       
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default ActionProvider;
