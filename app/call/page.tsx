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
import { useRef, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

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
  const [listening, setListening] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMVideoLoading, setIsMVideoLoading] = useState(false);
  const mVideoRef = useRef<HTMLVideoElement>(null);

  const handleMVideoCanPlay = () => {
    setIsMVideoLoading(false);
  };

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
      <div style={{ width: "100%", padding: "0 16px" }}>
        <VideoContainer>
          {isMVideoLoading ? (
            <LoaderLottie />
          ) : (
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
          )}
        </VideoContainer>
        <ChatContainer>
          <ChatMessage>
            안녕하세요, 서울중앙지검 이상철 수사관입니다.혹시 최근에 본인 명의로
            개설된 계좌가 범죄에 사용됐다는 연락 받으신 적 있습니까?
          </ChatMessage>
          <ChatMessage>
            네, 지금 상황이 심각합니다. 경찰과 검찰에서 동시에 수사 중이라, 바로
            확인이 필요합니다. 혹시 본인 확인을 위해 주민등록번호 뒷자리와 현재
            사용 중인 은행명을 말씀해 주실 수 있나요?
          </ChatMessage>
        </ChatContainer>
      </div>
      <ButtonContainer>
        <Button
          style={{ backgroundColor: COLORS.caution.red[300] }}
          onClick={() => setIsModalOpen(true)}
        >
          <BigXIcon />
        </Button>
        <Button
          onClick={() => {
            setListening(!listening);
            if (mVideoRef.current) {
              if (listening) {
                mVideoRef.current.pause();
              } else {
                mVideoRef.current.play();
              }
            }
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
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
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
