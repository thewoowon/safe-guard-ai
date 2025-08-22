"use client";
import {
  BigXIcon,
  LeftChevronIcon,
  MicIcon,
  ProfileIcon,
} from "@/components/svg";
import { COLORS } from "@/styles/color";
import { TYPOGRAPHY } from "@/styles/typography";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useMutation } from "@tanstack/react-query";
import customAxios from "@/lib/axios";
import Typewriter from "@/components/effect/Typewriter";
import { useAuthStore } from "@/stores/authStore";

type FirstChat = {
  sessionId: string;
  speech: string;
  turn: number;
  voiceSpeech: string;
};

type SpeechRecognitionStatus =
  | "onstart"
  | "onspeechstart"
  | "onspeechend"
  | "error"
  | "onend";

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

const CallPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [shouldPulse, setShouldPulse] = useState(false);
  const [text, setText] = useState("시작하기 버튼을 눌러 말해보세요!");
  const [status, setStatus] = useState<SpeechRecognitionStatus>("onend");
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioObjectRef = useRef<HTMLAudioElement | null>(null);
  const [listening, setListening] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMVideoLoading, setIsMVideoLoading] = useState(true);
  const mVideoRef = useRef<HTMLVideoElement>(null);
  const [gptSpeech, setGptSpeech] = useState(true);
  const [communicationContext, setCommunicationContext] = useState<
    {
      content: string;
      role: "user" | "assistant";
    }[]
  >([]);
  const [chat, setChat] = useState<string[]>([]);
  const [firstChat, setFirstChat] = useState<FirstChat | null>(null);
  const [turn, setTurn] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleMVideoCanPlay = () => {
    console.log("비디오가 준비되었습니다.");
    setIsMVideoLoading(false);
  };

  const handleMVideoCanPlayAndPlay = () => {
    if (mVideoRef.current) {
      mVideoRef.current.play().catch((error) => {
        console.error("비디오 재생 오류:", error);
        handleMVideoCanPlay();
      });
    }
  };

  const fetchFirstChat = async () => {
    try {
      const response = await customAxios.get(
        "/api/simulation/voice/firstTurn",
        {
          params: {
            type: "보이스피싱",
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("첫 번째 채팅을 가져오는 데 실패했습니다.");
      }
      return response.data;
    } catch (error) {
      console.error("첫 번째 채팅 가져오기 실패:", error);
      alert("첫 번째 채팅을 가져오는 데 실패했습니다. 다시 시도해주세요.");
      return null;
    }
  };

  const playAudio = (data: FirstChat) => {
    console.log("메시지 전송 성공:", data);
    const audioData = data;

    console.log("오디오 데이터:", audioData);

    // base64를 Blob으로 변환
    const byteString = atob(
      audioData.voiceSpeech.replace(/^data:audio\/mpeg;base64,/, "")
    );
    const byteArray = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([byteArray], { type: "audio/mpeg" });

    const audioUrl = URL.createObjectURL(blob);
    const audio = new Audio(audioUrl);
    audioObjectRef.current = audio; // 오디오 객체 저장
    audio.addEventListener("canplaythrough", () => {
      audio.play();
      if (mVideoRef.current) {
        mVideoRef.current.play().catch((error) => {
          console.error("비디오 재생 오류:", error);
          handleMVideoCanPlay();
        });
      }
    });

    console.log("오디오 재생:", audioData.speech);
    setCommunicationContext((prev) => [
      ...prev,
      { content: audioData.speech, role: "assistant" },
    ]);
    setChat((prev) => [...prev, audioData.speech]);
    setLoading(false); // 오디오 재생이 끝나면 로딩 상태 해제
    audio.onended = () => {
      setGptSpeech(false); // GPT 음성 재생 상태 해제
      if (mVideoRef.current) {
        mVideoRef.current.pause();
        mVideoRef.current.currentTime = 0; // 비디오 초기화
      }
    }; // 오디오 재생이 끝나면 로딩 상태 해제
    setText(`🤖 "${audioData.speech}"`);
  };

  const { mutate: sendMessage } = useMutation({
    mutationFn: async (message: string) => {
      try {
        const response = await customAxios.post(
          "/api/simulation/voice/turn",
          {
            sessionId: firstChat?.sessionId || "",
            turn: turn,
            answer: message,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
            },
            responseType: "json", // 그대로 둬도 됨
            withCredentials: true,
          }
        );

        if (response.status !== 200) {
          throw new Error("메시지 전송에 실패했습니다.");
        }
        console.log("메시지 전송 성공:", response.data);

        return response.data;
      } catch (error) {
        console.error("오디오 요청 실패:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      playAudio(data);
    },
    onError: (error) => {
      console.error("메시지 전송 실패:", error);
      setText("❌ 메시지 전송 실패");
    },
  });

  const startListening = () => {
    if (!recognitionRef.current) return;

    try {
      recognitionRef.current.start();
      setListening(true);
      setShouldPulse(true); // 비디오 애니메이션 시작
      // setStatus("🟢 인식 시작됨");
      setStatus("onstart");
      setText("🎧 듣는 중입니다. 말해보세요!");
    } catch (err) {
      console.error("인식 시작 실패:", err);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      window.SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("이 브라우저는 음성 인식을 지원하지 않습니다.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "ko-KR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognition.onstart = () => {
      // setStatus("🟢 인식 시작됨");
      setStatus("onstart");
      setShouldPulse(true);
    };

    recognition.onspeechstart = () => {
      // setStatus("🗣️ 말하는 중...");
      setStatus("onspeechstart");
      setShouldPulse(true);
    };

    recognition.onspeechend = () => {
      // setStatus("🤫 말 멈춤, 인식 중...");
      setStatus("onspeechend");
      setShouldPulse(false);
      recognition.stop(); // 자동으로 인식 종료
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      // setStatus("✅ 인식 결과 수신됨");
      const transcript = event.results[0][0].transcript;
      const confidence = event.results[0][0].confidence;

      setCommunicationContext((prev) => [
        ...prev,
        { content: transcript, role: "user" },
      ]);
      setText("응답을 기다리고 있습니다");
      setLoading(true); // 로딩 상태로 변경
      setListening(false); // 음성 인식 상태 해제
      setShouldPulse(false); // 비디오 애니메이션 중지
      console.log("인식된 텍스트:", transcript, "신뢰도:", confidence);
      sendMessage(transcript); // 메시지 전송
      recognition.stop(); // 인식 종료
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onerror = (event: any) => {
      // setStatus("🔴 오류 발생");
      setStatus("error");
      setShouldPulse(false);
    };

    recognition.onend = () => {
      // setStatus("🔵 인식 종료됨");
      setStatus("onend");
      setShouldPulse(false);
    };

    recognitionRef.current = recognition;
  }, [sendMessage]);

  useEffect(() => {
    const fetchInitialChat = async () => {
      const firstChat = await fetchFirstChat();
      console.log("첫 번째 채팅:", firstChat);
      if (firstChat) {
        playAudio(firstChat);
        setFirstChat(firstChat);
        setCommunicationContext((prev) => [
          ...prev,
          { content: firstChat.speech, role: "assistant" },
        ]);
        setTurn(firstChat.turn || 0);
      }
    };

    fetchInitialChat();

    // const utterance = new SpeechSynthesisUtterance(
    //   "안녕하세요, 이것은 웹 API의 TTS 기능입니다."
    // );
    // utterance.lang = "ko-KR"; // 한국어
    // utterance.rate = 1; // 기본 속도
    // utterance.pitch = 1; // 기본 음조
    // speechSynthesis.speak(utterance);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat, loading]);

  return (
    <Container>
      <Header>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => router.back()}
        >
          <LeftChevronIcon fill="white" />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
          }}
        >
          <ProfileIcon />
          <div
            style={{
              ...TYPOGRAPHY.body1.semiBold,
              color: COLORS.grayscale[100],
            }}
          >
            1588-0000
          </div>
        </div>
      </Header>
      <NoScrollContainer>
        <VideoContainer>
          {firstChat && isMVideoLoading && (
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: COLORS.grayscale[1300],
                borderRadius: "10px",
                zIndex: 1,
              }}
            >
              <LoaderLottie />
            </div>
          )}
          <VideoEl
            ref={mVideoRef}
            loop
            preload="auto"
            playsInline
            // 더 일찍: onLoadedMetadata / 프레임 준비: onLoadedData / 실제 재생 시작: onPlaying
            onLoadedData={() => handleMVideoCanPlay()}
            onError={(e) => {
              console.error("video error", e);
              handleMVideoCanPlay();
            }}
          >
            <source src="/videos/prosecutors.mp4" type="video/mp4" />
            비디오를 지원하지 않는 브라우저입니다.
          </VideoEl>
        </VideoContainer>
        <ChatContainer>
          {chat.map((message, index) => (
            <ChatMessage
              key={index}
              ref={scrollRef}
              style={{ animation: "fadeIn 0.5s" }}
            >
              <Typewriter
                typingSpeed={20}
                textArray={[message]}
                // onTypingStart={() => {
                //   // 비디오 애니메이션 시작
                //   if (mVideoRef.current && !isMVideoLoading && gptSpeech) {
                //     mVideoRef.current.play().catch((error) => {
                //       console.error("비디오 재생 오류:", error);
                //       handleMVideoCanPlay();
                //     });
                //   }
                // }}
                // onComplete={() => {
                //   if (index === chat.length - 1 && gptSpeech) {
                //     // 비디오 멈추기
                //     if (mVideoRef.current) {
                //       mVideoRef.current.pause();
                //       mVideoRef.current.currentTime = 0; // 비디오 초기화
                //     }
                //   }
                // }}
              />
            </ChatMessage>
          ))}
          {loading && (
            <ChatMessage ref={scrollRef} style={{ animation: "fadeIn 0.5s" }}>
              <WaveText
                style={{
                  ...TYPOGRAPHY.body1.regular,
                  color: COLORS.grayscale[100],
                }}
              >
                상대방 말 기록 중...
              </WaveText>
            </ChatMessage>
          )}
          {/* <ChatMessage>
            <Typewriter
              typingSpeed={20}
              // 마지막에 오는 ''은 삭제
              textArray={[
                `안녕하세요, 서울중앙지검 이상철 수사관입니다.혹시 최근에 본인 명의로 개설된 계좌가 범죄에 사용됐다는 연락 받으신 적 있습니까?`,
              ]}
              onComplete={() => {}}
            />
          </ChatMessage> */}
        </ChatContainer>
      </NoScrollContainer>
      <ButtonContainer>
        {listening && (
          <div
            style={{
              ...TYPOGRAPHY.body1.regular,
              color: COLORS.grayscale[100],
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            {"듣는 중..."}
          </div>
        )}
        <Button
          style={{ backgroundColor: COLORS.caution.red[300] }}
          onClick={() => {
            setIsModalOpen(true);
            if (audioObjectRef.current) {
              audioObjectRef.current.pause();
              audioObjectRef.current.currentTime = 0; // 오디오 초기화
            }
            if (recognitionRef.current) {
              recognitionRef.current.abort(); // 음성 인식 중지
            }
            setListening(false); // 음성 인식 상태 해제
            setShouldPulse(false); // 비디오 애니메이션 중지
            setText("시뮬레이션을 종료합니다. 훈련을 계속하시겠습니까?");
            setCommunicationContext([]); // 대화 내용 초기화
            setGptSpeech(false); // GPT 음성 재생 상태 해제
            setLoading(false); // 로딩 상태 해제
            if (mVideoRef.current) {
              mVideoRef.current.pause(); // 비디오 일시 정지
              mVideoRef.current.currentTime = 0; // 비디오 초기화
            }
            // setIsMVideoLoading(true); // 비디오 로딩 상태로 설정
            if (recognitionRef.current) {
              recognitionRef.current.onend = () => {
                setStatus("onend");
                setShouldPulse(false);
              }; // 음성 인식 종료 상태로 설정
            }
          }}
        >
          <BigXIcon />
        </Button>
        <Button
          onClick={() => {
            // 현재 오디오 재생이 있다면 중지
            if (audioObjectRef.current) {
              audioObjectRef.current.pause();
              audioObjectRef.current = null; // 오디오 객체 초기화
              // audioObjectRef.current.currentTime = 0; // 오디오 초기화
              setGptSpeech(false); // GPT 음성 재생 상태 해제
            }

            if (mVideoRef.current) {
              mVideoRef.current.pause(); // 비디오 일시 정지
              mVideoRef.current.currentTime = 0; // 비디오 초기화
            }

            // 현재 음성 인식이 진행 중이면 중지
            if (recognitionRef.current && listening) {
              recognitionRef.current.stop();
              setListening(false);
              setShouldPulse(false); // 비디오 애니메이션 중지
              setLoading(false); // 로딩 상태 해제
              setStatus("onend");
              return;
            }
            startListening();
          }}
          style={{
            backgroundColor: listening
              ? COLORS.grayscale[100]
              : COLORS.grayscale[800],
          }}
        >
          <MicIcon fill={listening ? COLORS.grayscale[1300] : "white"} />
        </Button>
      </ButtonContainer>
      <Modal style={{ display: isModalOpen ? "flex" : "none" }}>
        <MessageBox>
          <div>
            지금 나가면 진행 중인 시뮬레이션의 <br />
            진행도와 분석이 초기화될 수 있어요. <br />
            그래도 나가시겠습니까?
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <MessageBoxButton
              style={{
                ...TYPOGRAPHY.body1.medium,
                backgroundColor: COLORS.caution.red[300],
                color: COLORS.grayscale[100],
              }}
              onClick={() => {
                router.push("/");
              }}
            >
              나가기
            </MessageBoxButton>
            <MessageBoxButton
              style={{
                ...TYPOGRAPHY.body1.medium,
                backgroundColor: COLORS.grayscale[1100],
                color: COLORS.grayscale[100],
              }}
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              훈련 계속하기
            </MessageBoxButton>
          </div>
        </MessageBox>
      </Modal>
    </Container>
  );
};

export default CallPage;

const Container = styled.main`
  background-color: ${COLORS.grayscale[1300]};
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding-top: 63px;
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
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  padding-right: 16px;
  padding-left: 16px;
  height: 57px;
  background-color: transparent;
  margin-bottom: 6px;
  gap: 20px;
`;

const VideoEl = styled.video`
  inset: 0;
  /* width: 100%;
  height: 100%; */
  object-fit: cover;
`;

const VideoContainer = styled.div`
  width: 100%;
  height: 346px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background-color: ${COLORS.grayscale[1300]};
  border-radius: 10px;
`;

const ButtonContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  margin-top: 16px;
  margin-bottom: 26px;
  gap: 135px;
`;

const Button = styled.button`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  border-radius: 50%;
`;

const ChatContainer = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  background-color: ${COLORS.grayscale[1300]};
  color: ${COLORS.grayscale[100]};
  font-size: ${TYPOGRAPHY.body1.regular.fontSize};
`;

const ChatMessage = styled.div`
  width: 100%;
  padding-top: 20px;
  word-break: break-word;
  font-size: 16px;
  line-height: 1.4;
  letter-spacing: -0.5%;
  color: ${COLORS.grayscale[100]};
`;

const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 26px;
`;

const MessageBox = styled.div`
  width: 100%;
  background-color: white;
  color: ${COLORS.grayscale[1300]};
  border-radius: 15px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 16px;
`;

const MessageBoxButton = styled.div`
  flex: 1;
  width: 100%;
  height: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  cursor: pointer;
  border-radius: 50px;
`;

const WaveText = styled.h1`
  font-size: 64px;
  font-weight: bold;
  background: linear-gradient(
    270deg,
    #ff4d4d,
    #ff9a3c,
    #ffd93c,
    #3cff90,
    #3cc2ff,
    #a43cff,
    #ff4da6,
    #ff4d4d
  );
  background-size: 1600% 1600%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: wave 8s ease infinite;

  @keyframes wave {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const NoScrollContainer = styled.div`
  width: 100%;
  padding: 0 16px;
  flex: 1;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none; /* IE and Edge */
`;
