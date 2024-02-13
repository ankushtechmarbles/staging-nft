import { useState } from "react";
import { useAppContext } from "../Context/AppContext";

let thread_id = "";
let chat = [
    {
        message: "Tell us about your IDEA?",
        name: "IDEA Creator Assistant",
        isBot: true,
    },
];

export default function useFlowiseHook() {
    const [isLoading, setIsLoading] = useState(false);
    const { character } = useAppContext();

    const sendMessage = async (message) => {
        try {
            setIsLoading(true);

            if (thread_id) {
                // add message to chat
                chat.push({
                    message,
                    name: character.name,
                    isBot: false,
                });

                // chat push placeholder message with ellipsis
                chat.push({
                    message: "...",
                    name: "Idea creator assistant",
                    isBot: true,
                });

                const {
                    data: {
                        data: { data },
                    },
                } = await axios.post("/api/assistant", {
                    threadId: thread_id,
                    message,
                });

                // remove placeholder message
                chat.pop();

                chat.push({
                    message: data[0].content[0].text.value,
                    name: "Idea creator assistant",
                    isBot: true,
                });
            } else {
                // add message to chat
                chat.push({
                    message,
                    name: character.name,
                    isBot: false,
                });

                // chat push placeholder message with ellipsis
                chat.push({
                    message: "...",
                    name: "Idea creator assistant",
                    isBot: true,
                });

                const {
                    data: {
                        data: { data },
                    },
                } = await axios.post("/api/assistant", {
                    message,
                });

                // remove placeholder message
                chat.pop();

                thread_id = data[0].thread_id;
                chat.push({
                    message: data[0].content[0].text.value,
                    name: "Idea creator assistant",
                    isBot: true,
                });
            }

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    return { sendMessage, chat, isLoading };
}
