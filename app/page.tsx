"use client";
import Header from "@/components/layout/Header";
import styled from "@emotion/styled";
import { COLORS } from "@/styles/color";
import { TYPOGRAPHY } from "@/styles/typography";
import { ChatService, VoiceService, ReportService } from "@/components/svg";
import { useRouter, useSearchParams } from "next/navigation";
import RadioToggle from "@/components/element/radio/RadioToggle";
import { useCallback, useEffect, useState } from "react";
import ImageService from "@/components/svg/ImageService";
import { useAuthStore } from "@/stores/authStore";
import customAxios from "@/lib/axios";

const CircleDecoration = () => {
  return (
    <svg
      width="769"
      height="765"
      viewBox="0 0 769 765"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.13" filter="url(#filter0_f_3990_294)">
        <ellipse
          cx="384.249"
          cy="382.124"
          rx="283.249"
          ry="281.124"
          fill="url(#paint0_linear_3990_294)"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_3990_294"
          x="0.166206"
          y="0.166206"
          width="768.165"
          height="763.916"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="50.4169"
            result="effect1_foregroundBlur_3990_294"
          />
        </filter>
        <linearGradient
          id="paint0_linear_3990_294"
          x1="287.5"
          y1="294.5"
          x2="533.5"
          y2="604"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#125FEE" />
          <stop offset="1" stopColor="#125FEE" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const TargetDecoration = () => {
  return (
    <svg
      width="375"
      height="541"
      viewBox="0 0 375 541"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_3990_295)">
        <g opacity="0.7">
          <mask
            id="mask0_3990_295"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="-77"
            y="46"
            width="529"
            height="459"
          >
            <rect
              x="-77"
              y="46.0005"
              width="529"
              height="458.055"
              fill="url(#paint0_radial_3990_295)"
            />
          </mask>
          <g mask="url(#mask0_3990_295)">
            <rect
              width="416.414"
              height="529"
              transform="translate(-77 479.447) rotate(-90)"
              fill="url(#paint1_radial_3990_295)"
            />
            <line
              x1="69.7824"
              y1="479.446"
              x2="69.7824"
              y2="63.0318"
              stroke="white"
              strokeWidth="0.724198"
              strokeDasharray="2.9 2.9"
            />
            <line
              x1="192.535"
              y1="479.446"
              x2="192.535"
              y2="63.0318"
              stroke="white"
              strokeOpacity="0.4"
              strokeWidth="0.724198"
            />
            <line
              x1="315.288"
              y1="479.446"
              x2="315.288"
              y2="63.0318"
              stroke="white"
              strokeWidth="0.724198"
              strokeDasharray="2.9 2.9"
            />
            <circle
              cx="192.535"
              cy="270.878"
              r="122.571"
              stroke="white"
              strokeWidth="0.362099"
            />
            <circle
              cx="192.718"
              cy="271.058"
              r="173.627"
              stroke="white"
              strokeWidth="0.724198"
            />
            <g style={{ mixBlendMode: "overlay" }} opacity="0.6">
              <line
                x1="-337.646"
                y1="114.976"
                x2="714.184"
                y2="114.976"
                stroke="white"
                strokeWidth="0.914636"
                strokeDasharray="3.66 3.66"
              />
              <line
                x1="-337.646"
                y1="270.012"
                x2="714.184"
                y2="270.012"
                stroke="white"
                strokeWidth="0.914636"
              />
              <line
                x1="-337.646"
                y1="425.045"
                x2="714.184"
                y2="425.045"
                stroke="white"
                strokeWidth="0.914636"
                strokeDasharray="3.66 3.66"
              />
            </g>
          </g>
        </g>
      </g>
      <defs>
        <radialGradient
          id="paint0_radial_3990_295"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(187.5 274.257) rotate(90) scale(229.799 265.391)"
        >
          <stop stopOpacity="0.8" />
          <stop offset="0.716346" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint1_radial_3990_295"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(208.207 263.609) rotate(90) scale(265.391 208.908)"
        >
          <stop stopOpacity="0.8" />
          <stop offset="0.716346" stopOpacity="0" />
        </radialGradient>
        <clipPath id="clip0_3990_295">
          <rect width="375" height="541" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const DoubleCircleDecoration = () => {
  return (
    <svg
      width="769"
      height="765"
      viewBox="0 0 769 765"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.13" filter="url(#filter0_f_2_3)">
        <ellipse
          cx="384.249"
          cy="382.124"
          rx="283.249"
          ry="281.124"
          fill="#2F58E0"
        />
      </g>
      <g opacity="0.3" filter="url(#filter1_f_2_3)">
        <ellipse
          cx="384.43"
          cy="382.033"
          rx="311.43"
          ry="186.033"
          fill="#2F58E0"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_2_3"
          x="0.166206"
          y="0.166206"
          width="768.166"
          height="763.916"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="50.4169"
            result="effect1_foregroundBlur_2_3"
          />
        </filter>
        <filter
          id="filter1_f_2_3"
          x="8.68435"
          y="131.684"
          width="751.491"
          height="500.696"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="32.1578"
            result="effect1_foregroundBlur_2_3"
          />
        </filter>
      </defs>
    </svg>
  );
};

const ToggleContext: {
  chatting: {
    title1: string;
    title2: string;
    image: React.ReactNode;
    description1: string;
    description2: string;
    description3: string;
    description4: string;
    buttonText: string;
  };
  call: {
    title1: string;
    title2: string;
    image: React.ReactNode;
    description1: string;
    description2: string;
    description3: string;
    description4: string;
    buttonText: string;
  };
} = {
  chatting: {
    title1: "메시지 속",
    title2: "위험 신호를 캐치하세요",
    image: <ChatService width={137} height={132} />,
    description1: "실제 사례를 바탕으로 구성된",
    description2: "다양한 주제의 채팅 시뮬레이션.",
    description3: "대화를 따라가며 숨어있는",
    description4: "위험 신호를 직접 확인해보세요.",
    buttonText: "채팅 시뮬레이션 시작",
  },
  call: {
    title1: "보이스피싱, 목소리 뒤의",
    title2: "속임수를 간파하세요",
    image: <VoiceService width={136} height={128} />,
    description1: "실제 통화 음성과 화면을 통해",
    description2: "재현된 보이스피싱 시나리오.",
    description3: "목소리와 말투 속에 숨어있는",
    description4: "사기 신호를 잡아내 보세요.",
    buttonText: "통화 시뮬레이션 시작",
  },
};

const ToggleContainer = ({ toggle }: { toggle: "chatting" | "call" }) => {
  const router = useRouter();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <BigServiceContainer>
        <div
          style={{
            textAlign: "center",
            ...TYPOGRAPHY.h2.bold,
            color: COLORS.grayscale[1300],
            paddingBottom: "10px",
          }}
        >
          {ToggleContext[toggle].title1}
          <br />
          {ToggleContext[toggle].title2}
        </div>
        <div
          style={{
            padding: "16px 0",
          }}
        >
          {ToggleContext[toggle].image}
        </div>
        <div
          style={{
            textAlign: "center",
            ...TYPOGRAPHY.h1.medium,
            color: COLORS.grayscale[1300],
            padding: "10px 0 20px 0",
          }}
        >
          {ToggleContext[toggle].description1}
          <br />
          {ToggleContext[toggle].description2}
          <br />
          {ToggleContext[toggle].description3}
          <br />
          {ToggleContext[toggle].description4}
        </div>
        <BlackButton
          onClick={() => {
            router.push(toggle === "chatting" ? "/chat" : "/call");
          }}
        >
          {ToggleContext[toggle].buttonText}
        </BlackButton>
      </BigServiceContainer>

      <BigServiceContainer
        style={{
          background: `url("/images/sora-background.png") no-repeat center center`,
        }}
      >
        <div
          style={{
            textAlign: "center",
            ...TYPOGRAPHY.h2.bold,
            color: COLORS.grayscale[1300],
            paddingBottom: "10px",
          }}
        >
          이미지를 업로드해서 실시간 <br />
          위험을 진단해보세요
        </div>
        <div
          style={{
            padding: "16px 0",
          }}
        >
          <ImageService width={136} height={128} />
        </div>
        <Button
          onClick={() => {
            router.push("/upload");
          }}
        >
          👑 이미지 업로드
        </Button>
      </BigServiceContainer>
    </div>
  );
};

const SERVICE_LIST: {
  title: string;
  description1: string;
  description2: string;
  icon: React.ReactNode;
  link: string;
}[] = [
  {
    title: "채팅 시뮬레이션",
    description1: "전세사기 등 문서 기반 사기를",
    description2: "실제 채팅처럼 경험하세요",
    icon: <ChatService />,
    link: "/chat",
  },
  {
    title: "통화 시뮬레이션",
    description1: "검사를 사칭하는 AI의 목소리를 ",
    description2: "들으며 보이스피싱에 대응하세요",
    icon: <VoiceService />,
    link: "/call",
  },
  {
    title: "AI 분석 리포트",
    description1: "시뮬레이션 후 당신의 취약점을",
    description2: "분석한 전문가 리포트를 받아보세요",
    icon: <ReportService />,
    link: "/news",
  },
];

export default function Home() {
  const params = useSearchParams();
  const code = params.get("code");
  const router = useRouter();
  const [toggle, setToggle] = useState<"chatting" | "call">("chatting");

  const getAccessToken = useCallback(async () => {
    if (!code) return;
    try {
      const response = await customAxios.get("/token/token", {
        params: { code },
      });

      console.log("로그인 응답:", response.headers);
      console.log(response.headers["accesstoken"]);
      console.log(response.headers["accesstoken"]);
      if (response.status === 200) {
        console.log("로그인 성공");
        useAuthStore.getState().setAccessToken(response.headers["accesstoken"]);
        localStorage.setItem("refreshToken", response.headers["accesstoken"]);
      } else {
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
      }
      router.replace("/");
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
      router.replace("/");
    }
  }, [code, router]);

  useEffect(() => {
    if (code) {
      getAccessToken();
    }
  }, [code, getAccessToken]);

  if (!!useAuthStore.getState().accessToken) {
    return (
      <Container>
        <CircleDecorationContainer>
          <CircleDecoration />
        </CircleDecorationContainer>
        <Header />
        <DoubleCircleDecorationContainer>
          <DoubleCircleDecoration />
        </DoubleCircleDecorationContainer>
        <ColumnContainer style={{ padding: "26px 16px 100px 16px" }}>
          <RadioToggle
            selectedOption={toggle}
            setSelectedOption={(option) => {
              setToggle(option);
            }}
          />
          <ToggleContainer toggle={toggle} />
        </ColumnContainer>
      </Container>
    );
  }

  return (
    <Container>
      <CircleDecorationContainer>
        <CircleDecoration />
      </CircleDecorationContainer>
      <Header />
      <TargetDecorationContainer>
        <TargetDecoration />
      </TargetDecorationContainer>
      <ColumnContainer>
        <MainTitle style={{ ...TYPOGRAPHY.h1.bold, marginTop: "50px" }}>
          금융사기 <br />
          이제 AI로 경험하세요
        </MainTitle>
        <Subtitle style={{ ...TYPOGRAPHY.h4.regular, marginTop: "30px" }}>
          뉴스 데이터로 학습한 사기꾼 AI와의 <br />
          가상 대화와 통화 시뮬레이션
        </Subtitle>
        <Subtitle style={{ ...TYPOGRAPHY.h4.regular, marginTop: "14px" }}>
          당신의 금융 면역력을 키우는 <br />
          가장 안전한 백신
        </Subtitle>
        <div
          style={{
            width: "100%",
            position: "relative",
            paddingRight: "16px",
            paddingLeft: "16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "50px",
            gap: "20px",
          }}
        >
          {SERVICE_LIST.map((service) => (
            <ServiceContainer
              key={service.title}
              style={{ ...TYPOGRAPHY.h4.regular }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "20px",
                }}
              >
                {service.icon}
                <div style={{ marginLeft: "20px" }}>
                  <div
                    style={{
                      ...TYPOGRAPHY.h4.bold,
                      color: COLORS.grayscale[1300],
                      marginBottom: "4px",
                    }}
                  >
                    {service.title}
                  </div>
                  <div
                    style={{
                      ...TYPOGRAPHY.body2.medium,
                      color: COLORS.grayscale[1300],
                    }}
                  >
                    {service.description1}
                  </div>
                  <div
                    style={{
                      ...TYPOGRAPHY.body2.medium,
                      color: COLORS.grayscale[1300],
                    }}
                  >
                    {service.description2}
                  </div>
                </div>
              </div>
            </ServiceContainer>
          ))}
        </div>
      </ColumnContainer>
      <ButtonContainer>
        <Button
          style={{ ...TYPOGRAPHY.body1.medium }}
          onClick={() => {
            window.location.href =
              "https://api.sfgdai.com/oauth2/authorization/google";
            // setAccessToken("1"); // Mock token for demonstration
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.12973 14.2595C12.0682 14.2595 14.526 11.0613 13.9041 7.24136H8.12973V9.34383H11.5944C11.4759 10.2914 10.5283 12.0089 8.12973 12.0089C6.02726 12.0089 4.33937 10.2914 4.33937 8.12973C4.33937 5.99765 6.02726 4.25053 8.12973 4.25053C9.69918 4.25053 10.5579 5.19812 10.5579 5.19812L12.2162 3.59906C12.2162 3.59906 10.7652 2 8.12973 2C4.75394 2 2 4.75394 2 8.12973C2 11.5055 4.75394 14.2595 8.12973 14.2595Z"
              fill="white"
            />
          </svg>
          구글로 시작하기
        </Button>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.main`
  background-color: ${COLORS.grayscale[1300]};
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
  @media (max-width: 768px) {
    padding-top: 50px;
  }
  @media (max-width: 480px) {
    padding-top: 40px;
  }
  @media (max-width: 360px) {
    padding-top: 30px;
  }
`;

const CircleDecorationContainer = styled.div`
  position: absolute;
  top: -50%;
  left: -40%;
  z-index: 1;
`;

const TargetDecorationContainer = styled.div`
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
`;

const DoubleCircleDecorationContainer = styled.div`
  position: absolute;
  top: -50px;
  left: 50%;
  z-index: 1;
  transform: translateX(-50%);
`;

const MainTitle = styled.div`
  text-align: center;
  background: linear-gradient(110deg, #4368e3 0%, #15317c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  z-index: 2;
`;

const Subtitle = styled.div`
  text-align: center;
  color: white;
  z-index: 2;
`;

const ServiceContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 24px;
  width: 100%;
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
`;

const Button = styled.button`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: linear-gradient(90deg, #16337d 0%, #2c53d3 100%);
  background-size: 200% 200%; /* gradient 움직임을 위해 영역 크게 */
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

const BlackButton = styled.button`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background-color: ${COLORS.grayscale[1100]};
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${COLORS.grayscale[900]};
  }
  z-index: 2;
`;

const ColumnContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-x: hidden;
  overflow-y: auto;
  padding-bottom: 100px;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none; /* IE and Edge */
  z-index: 2;
`;

const BigServiceContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 26px 16px;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 24px;
  color: white;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.02);
  }
  z-index: 2;
`;
