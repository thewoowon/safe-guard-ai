"use client";

import { LeftChevronIcon } from "@/components/svg";
import customAxios from "@/lib/axios";
import { useAuthStore } from "@/stores/authStore";
import { COLORS } from "@/styles/color";
import { TYPOGRAPHY } from "@/styles/typography";
import styled from "@emotion/styled";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

type MessageType = {
  id: number;
  role: "system" | "user" | "assistant" | "tool";
  content: string;
  option?: "link" | "button" | "card";
  imageUrl?: string;
};

const MESSAGE_LIST: MessageType[] = [
  {
    id: 1,
    role: "assistant",
    content: "안녕하세요~ {username}님! 집에는 잘 들어가셨나요?",
  },
  {
    id: 2,
    role: "assistant",
    content:
      "오늘 보신 매물은 저희 협회 회장님이 직접 보증하는 건물이에요. 부동산 업계에서 유명하신 분이라 믿어도 됩니다.",
  },
  {
    id: 3,
    role: "user",
    content: "권위 있는 분이라도 서류와 사실 확인은 필수입니다.",
  },
  {
    id: 4,
    role: "assistant",
    content:
      "그리고 이 매물은 오늘 안에 계약 안 하면 바로 다른 사람한테 넘어가요. 지금 계약금만 보내시면 잡아드리겠습니다!",
  },
  {
    id: 5,
    role: "user",
    content: "급하게 결정하지 않고 확인 후 계약하겠습니다.",
  },
  {
    id: 6,
    role: "assistant",
    content:
      "이 매물 정보는 여기 부동산 포털 링크로 확인하시면 됩니다. 따로 등기부 등본은 필요 없어요.",
  },
  {
    id: 7,
    role: "assistant",
    content:
      "https://estate-portal.test/kr/seoul/gangnam/jeonse/new-villa-84a?fast=1",
    option: "link",
  },
  {
    id: 8,
    role: "assistant",
    content: "강남 초역세권 신축 빌라 전세, 시세보다",
    option: "card",
    imageUrl: "https://example.com/image.jpg",
  },
  {
    id: 9,
    role: "assistant",
    content:
      "이 매물 정보는 여기 부동산 포털 링크로 확인하시면 됩니다. 따로 등기부 등본은 필요 없어요.",
  },
  {
    id: 10,
    role: "assistant",
    content:
      "https://estate-portal.test/kr/seoul/gangnam/jeonse/new-villa-84a?fast=1",
    option: "link",
  },
  {
    id: 11,
    role: "assistant",
    content: "강남 초역세권 신축 빌라 전세, 시세보다",
    option: "card",
    imageUrl: "https://example.com/image.jpg",
  },
];

type FirstChat = {
  sessionId: string;
  speech: string;
  turn: number;
  answers: {
    answer: string;
    verdict: string;
  }[];
};

const codeMap: {
  [key: string]: string;
} = {
  jeonse: "전세사기",
  used_goods: "중고거래 사기",
  family_fraud: "가족/지인 사칭",
  romance_scam: "로맨스 스캠",
};

const LoaderLottie = () => {
  return (
    <DotLottieReact
      src="/lotties/Loading spinner simplui.lottie" // public/anims/hero.lottie
      autoplay
      loop
      style={{
        width: "72px",
        height: "72px",
      }}
    />
  );
};

const SimulationPage = () => {
  const params = useSearchParams();
  const simulationCode = params.get("simulationCode");
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [firstChat, setFirstChat] = useState<FirstChat | null>(null);
  const [communicationContext, setCommunicationContext] = useState<
    MessageType[]
  >([]);
  const [answers, setAnswers] = useState<
    {
      answer: string;
      verdict: string;
    }[]
  >([]);
  const [turn, setTurn] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const label = codeMap[simulationCode || "jeonse"] || "전세사기";

  const fetchFirstChat = async () => {
    try {
      const response = await customAxios.get("/api/simulation/text/firstTurn", {
        params: {
          type: label,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("첫 번째 채팅을 가져오는 데 실패했습니다.");
      }

      return response.data as FirstChat;
    } catch (error) {
      console.error("첫 번째 채팅 가져오기 실패:", error);
      alert("첫 번째 채팅을 가져오는 데 실패했습니다. 다시 시도해주세요.");
      return null;
    }
  };

  const postAnswer = async (answer: string, verdict: string) => {
    try {
      const response = await customAxios.post(
        "/api/simulation/text/turn",
        {
          sessionId: firstChat?.sessionId,
          turn,
          answer,
          verdict,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
          },
        }
      );
      if (response.status !== 200) {
        throw new Error("답변 전송에 실패했습니다.");
      }
      console.log("답변 전송 성공:", response.data);
      return response.data as FirstChat;
    } catch (error) {
      console.error("답변 전송 실패:", error);
      alert("답변 전송에 실패했습니다. 다시 시도해주세요.");
      return null;
    }
  };

  const handleAnswerSelection = async (index: number) => {
    if (selectedAnswer === index) {
      setSelectedAnswer(null);
      return;
    }
    setSelectedAnswer(index);
    const selected = answers[index];
    const messages = [...communicationContext];
    const newMessage: MessageType = {
      id: communicationContext.length + 1,
      role: "user",
      content: selected.answer,
      option: "button",
    };
    messages.push(newMessage);
    setCommunicationContext([...messages]);
    const result = await postAnswer(selected.answer, selected.verdict);
    if (result) {
      messages.push({
        id: communicationContext.length + 2,
        role: "assistant",
        content: result.speech,
      });
      setCommunicationContext([...messages]);
      setTurn(result.turn || 0);
      setAnswers(result.answers || []);
      setSelectedAnswer(null);
      if (result.turn > 7) {
        alert("시뮬레이션이 종료되었습니다. 결과를 확인해주세요.");
        router.push(`/chat/simulation/result?sessionId=${result.sessionId}`);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadFirstChat = async () => {
      const chat = await fetchFirstChat();
      if (chat) {
        setFirstChat(chat);
        setCommunicationContext([
          {
            id: 0,
            role: "assistant",
            content: chat.speech,
          },
        ]);
        setAnswers(chat.answers || []);
        setTurn(chat.turn || 0);
      }
    };

    loadFirstChat();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [communicationContext]);

  if (!simulationCode) {
    return <div>시뮬레이션 ID가 없습니다.</div>;
  }
  return (
    <Container>
      <Header>
        <div
          style={{
            position: "absolute",
            left: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => router.back()}
        >
          <LeftChevronIcon />
        </div>
        <div
          style={{
            ...TYPOGRAPHY.body1.semiBold,
            color: COLORS.grayscale[1300],
          }}
        >
          {label} 시뮬레이션
        </div>
      </Header>
      <ChatArea>
        {communicationContext.map((message) => {
          if (message.role === "assistant") {
            return (
              <AssistantMessageContainer key={message.id} ref={scrollRef}>
                <AssistantMessage>
                  <div
                    style={{
                      ...TYPOGRAPHY.body2.regular,
                    }}
                  >
                    {message.content}
                  </div>
                  {message.option === "link" && (
                    <Link
                      href={message.content}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        ...TYPOGRAPHY.body2.regular,
                      }}
                    >
                      {message.content}
                    </Link>
                  )}
                  {/* {message.option === "card" && (
                  <MessageImage src={message.imageUrl} alt="Property Image" />
                )} */}
                </AssistantMessage>
              </AssistantMessageContainer>
            );
          } else if (message.role === "user") {
            return (
              <UserMessageContainer key={message.id} ref={scrollRef}>
                <UserMessage>
                  <div
                    style={{
                      ...TYPOGRAPHY.body2.regular,
                    }}
                  >
                    {message.content}
                  </div>
                </UserMessage>
              </UserMessageContainer>
            );
          }
          return null;
        })}
      </ChatArea>
      <SelectionGuide
        style={{
          ...TYPOGRAPHY.caption.regular,
          color: COLORS.grayscale[600],
          textAlign: "center",
        }}
      >
        예시 답변 중 선택해주세요
      </SelectionGuide>
      <SelectionContainer>
        {isLoading && (
          <div
            style={{
              position: "absolute",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              zIndex: 10,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <LoaderLottie />
            <div
              style={{
                ...TYPOGRAPHY.body2.regular,
                color: COLORS.grayscale[1300],
              }}
            >
              답변을 분석 중입니다...
            </div>
          </div>
        )}
        {answers.map((item, index) => (
          <SelectionButton
            key={index}
            style={{
              ...TYPOGRAPHY.body2.regular,
              backgroundColor:
                selectedAnswer === index ? COLORS.primary[50] : "white",
            }}
            onClick={() => {
              if (isLoading) return;
              setIsLoading(true);
              handleAnswerSelection(index);
            }}
            disabled={isLoading}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.84766 3.32445C8.10734 3.35337 6.44812 4.06483 5.22779 5.30539C4.00745 6.54596 3.32379 8.21625 3.32422 9.95606C3.32456 11.7144 4.02361 13.4007 5.26762 14.6439C6.51162 15.8872 8.19871 16.5856 9.95784 16.5857C11.0632 16.5857 12.151 16.3096 13.1224 15.7825C14.2332 16.4606 15.7123 16.6578 16.6576 16.6578C16.1081 15.8079 15.4952 14.9834 15.1794 14.046C16.0943 12.8788 16.5915 11.4388 16.5915 9.95606C16.5916 9.08523 16.42 8.22291 16.0867 7.41833C15.7534 6.61376 15.2648 5.8827 14.6488 5.26689C14.0328 4.65107 13.3015 4.16258 12.4966 3.82929C11.6917 3.49601 10.829 3.32446 9.95784 3.32445C9.92112 3.32414 9.88438 3.32414 9.84766 3.32445Z"
                fill="#97ADF5"
              />
              <path
                d="M7.70898 12.563L9.99212 6.91992L12.2753 12.563"
                stroke="white"
                strokeWidth="1.02549"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.48828 11.2656H11.5771"
                stroke="white"
                strokeWidth="1.02549"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div
              style={{
                textAlign: "left",
              }}
            >
              {item.answer}
            </div>
          </SelectionButton>
        ))}
      </SelectionContainer>
    </Container>
  );
};

export default SimulationPage;

const Container = styled.main`
  background-color: white;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding-top: 57px;
  overflow-x: hidden;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none; /* IE and Edge */
`;

const Header = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding-right: 16px;
  padding-left: 16px;
  height: 57px;
  background-color: white;
`;

const SelectionContainer = styled.div`
  padding: 16px 20px 26px 20px;
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.primary[30]};
  border-top-right-radius: 24px;
  border-top-left-radius: 24px;
  gap: 10px;
  position: relative;
`;

const SelectionButton = styled.button`
  width: 100%;
  height: fit-content;
  color: ${COLORS.grayscale[1300]};
  border: 1px solid ${COLORS.primary[200]};
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  transition: background-color 0.3s ease;
  padding: 16px 10px;
  gap: 6px;
`;

const ChatArea = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: white;
  padding: 16px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none; /* IE and Edge */
`;

const SelectionGuide = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 0px;
  background-color: white;
`;

const AssistantMessageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const UserMessageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const AssistantMessage = styled.div`
  width: 70%;
  padding: 16px;
  background-color: ${COLORS.grayscale[400]};
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 8px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  color: black;
`;

const UserMessage = styled.div`
  width: 70%;
  padding: 16px;
  background-color: ${COLORS.primary[500]};
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 8px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  border-bottom-left-radius: 16px;
  color: white;
`;
