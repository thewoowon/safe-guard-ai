"use client";
import ImageUpload from "@/components/element/upload";
import { LeftChevronIcon, XIcon } from "@/components/svg";
import { COLORS } from "@/styles/color";
import { TYPOGRAPHY } from "@/styles/typography";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
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

const ImageUploadIcon = () => {
  return (
    <svg
      width="45"
      height="45"
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28.2595 14.5182H28.2791M22.3703 38.0747H12.5551C10.9932 38.0747 9.49532 37.4542 8.3909 36.3498C7.28648 35.2454 6.66602 33.7474 6.66602 32.1855V12.5551C6.66602 10.9932 7.28648 9.49532 8.3909 8.3909C9.49532 7.28648 10.9932 6.66602 12.5551 6.66602H32.1855C33.7474 6.66602 35.2454 7.28648 36.3498 8.3909C37.4542 9.49532 38.0747 10.9932 38.0747 12.5551V22.3703"
        stroke="#2F58E0"
        strokeWidth="2.67687"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.66602 28.2587L14.5182 20.4065C16.3399 18.6535 18.5856 18.6535 20.4073 20.4065L28.2595 28.2587"
        stroke="#2F58E0"
        strokeWidth="2.67687"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.2949 26.2973L28.258 24.3342C29.4692 23.1702 30.8649 22.7776 32.2017 23.1603M30.221 36.1125H41.9992M36.1101 30.2234V42.0016"
        stroke="#2F58E0"
        strokeWidth="2.67687"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="29" cy="15" r="3" fill="#2F58E0" />
    </svg>
  );
};

const UploadPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showXIcon, setShowXIcon] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [overLimit, setOverLimit] = useState(false);
  const [myUploadUrl, setMyUploadUrl] = useState<string | null>(null);
  const handleImageUpload = (file: File) => {
    setFile(file);
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
          <LeftChevronIcon />
        </div>
      </Header>
      <TitleContainer>
        <div
          style={{
            ...TYPOGRAPHY.h2.bold,
            color: COLORS.grayscale[1300],
          }}
        >
          의심스러운 문자나
          <br />
          계약서가 있나요?
        </div>
        <div
          style={{
            ...TYPOGRAPHY.body1.regular,
            color: COLORS.grayscale[1300],
          }}
        >
          스크린샷 이미지를 업로드해주세요. <br />
          AI가 즉시 분석해 드립니다.
        </div>
      </TitleContainer>
      <ImageUploadContainer>
        <ImageUploader>
          <ImageUploadIcon />
          {/* <ImageUploadButton
            style={{
              ...TYPOGRAPHY.body1.medium,
              color: COLORS.primary[500],
            }}
            onClick={() => {
              return;
            }}
          >
            이미지 업로드
          </ImageUploadButton> */}
          <ImageUpload
            file={file}
            setFile={setFile}
            setOverLimit={setOverLimit}
            onChange={handleImageUpload}
            setMyUploadUrl={setMyUploadUrl}
            setIsLoading={setIsLoading}
          />
          {overLimit && (
            <div
              style={{
                ...TYPOGRAPHY.body2.regular,
                color: COLORS.caution.red[500],
              }}
            >
              파일 크기는 50MB 이하로 업로드해주세요.
            </div>
          )}
          {isLoading && (
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                backgroundColor: COLORS.grayscale[300],
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 10,
              }}
            >
              <LoaderLottie />
            </div>
          )}
          {myUploadUrl && (
            <MyUploadUrlContainer
              onMouseOver={() => {
                setShowXIcon(true);
              }}
              onMouseLeave={() => {
                setShowXIcon(false);
              }}
              onTouchStart={() => {
                setShowXIcon(true);
              }}
              onTouchEnd={() => {
                setShowXIcon(false);
              }}
            >
              <div
                onClick={() => {
                  setMyUploadUrl(null);
                  setFile(null);
                }}
                style={{
                  display: showXIcon ? "block" : "none",
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  zIndex: 20,
                  cursor: "pointer",
                }}
              >
                <XIcon width={24} height={24} />
              </div>
              <div
                style={{
                  display: showXIcon ? "block" : "none",
                  position: "absolute",
                  zIndex: 10,
                  backgroundColor: showXIcon
                    ? "rgba(0, 0, 0, 0.3)"
                    : "transparent",
                  top: "0",
                  left: "0",
                  right: "0",
                  bottom: "0",
                  width: "100%",
                  height: "100%",
                }}
              ></div>
              <Image
                src={myUploadUrl}
                alt="my upload url"
                loader={({ src }) =>
                  src ? src : "/images/sora-background.png"
                }
                fill
              />
            </MyUploadUrlContainer>
          )}
        </ImageUploader>
      </ImageUploadContainer>
      <ButtonContainer>
        <Button
          style={{
            ...TYPOGRAPHY.body1.medium,
            backgroundColor: !!file
              ? COLORS.grayscale[1100]
              : COLORS.grayscale[500],
          }}
          onClick={() => {
            if (!file) return;
            router.push("/upload/analysis");
          }}
          disabled={!file}
        >
          AI에게 위험도 분석 요청하기
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default UploadPage;

const Container = styled.main`
  background-color: white;
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
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  padding-right: 16px;
  padding-left: 16px;
  height: 57px;
  background-color: transparent;
  margin-bottom: 6px;
`;

const TitleContainer = styled.div`
  padding: 26px 20px 24px 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 16px;
`;

const ImageUploadContainer = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageUploader = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 343px;
  background-color: ${COLORS.grayscale[300]};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  border: 1px solid ${COLORS.grayscale[500]};
`;

// const ImageUploadButton = styled.button`
//   padding: 12px 26.5px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   background-color: ${COLORS.primary[50]};
//   border: none;
//   border-radius: 100px;
//   cursor: pointer;
//   color: ${COLORS.grayscale[700]};
//   font-size: 16px;
//   font-weight: 500;
//   &:hover {
//     color: ${COLORS.grayscale[900]};
//     background-color: ${COLORS.primary[100]};
//   }
//   transition: all 0.3s ease;
// `;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  margin-bottom: 26px;
`;

const Button = styled.button`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: ${COLORS.grayscale[1100]};
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  z-index: 2;
  transition: background-position 1s linear;

  &:hover {
    background-position: 100% 0; /* hover 시 gradient 이동 */
  }
`;

const MyUploadUrlContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  overflow: hidden;
  background-color: ${COLORS.grayscale[300]};
  z-index: 1;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
