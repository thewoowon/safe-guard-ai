"use client";
import Header from "@/components/layout/Header";
import styled from "@emotion/styled";
import { COLORS } from "@/styles/color";
import { TYPOGRAPHY } from "@/styles/typography";
import { ChatService, VoiceService, ReportService } from "@/components/svg";
import { useRouter } from "next/navigation";

const CircleDecoration = () => {
  const router = useRouter();
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

const TitleText = () => {
  return (
    <svg
      width="264"
      height="74"
      viewBox="0 0 264 74"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100.209 1.71875V4C100.209 6.21875 100.209 8.6875 99.5525 11.9375H103.303V15.1562H77.2713V11.9375H95.5213C96.1463 9.09375 96.2244 6.89062 96.24 4.90625H80.4588V1.71875H100.209ZM100.115 18.1562V28.5625H80.365V18.1562H100.115ZM84.2713 21.2812V25.375H96.1463V21.2812H84.2713ZM130.705 13.1875V16.4062H124.955V19.8438C126.658 20.7188 127.596 22.0156 127.611 23.6875C127.58 27.0312 123.861 28.9062 117.705 28.9062C111.455 28.9062 107.736 27.0312 107.736 23.6875C107.736 21.9531 108.736 20.625 110.58 19.7188V16.4062H104.768V13.1875H130.705ZM117.705 18.5C118.877 18.5 119.971 18.5625 120.955 18.6875V16.4062H114.549V18.6875C115.518 18.5625 116.564 18.5 117.705 18.5ZM117.705 21.5C113.768 21.5312 111.768 22.2188 111.799 23.6875C111.768 25.1875 113.768 25.875 117.705 25.875C121.549 25.875 123.58 25.1875 123.611 23.6875C123.58 22.2188 121.549 21.5312 117.705 21.5ZM117.736 0.875C124.018 0.875 128.049 2.96875 128.08 6.40625C128.049 9.78125 124.018 11.8125 117.736 11.8125C111.393 11.8125 107.361 9.78125 107.361 6.40625C107.361 2.96875 111.393 0.875 117.736 0.875ZM117.736 3.96875C113.768 3.96875 111.486 4.78125 111.518 6.40625C111.486 7.96875 113.768 8.78125 117.736 8.78125C121.674 8.78125 123.955 7.96875 123.955 6.40625C123.955 4.78125 121.674 3.96875 117.736 3.96875ZM142.733 6.875C142.701 11.9688 144.889 17.125 149.451 19.3125L147.045 22.5C143.998 21 141.951 18.1875 140.764 14.75C139.529 18.4375 137.326 21.4531 134.108 23.0312L131.639 19.8125C136.451 17.5938 138.733 12.1562 138.733 6.875V2.625H142.733V6.875ZM154.701 0.4375V11.4062H158.889V14.7812H154.701V28.875H150.701V0.4375H154.701ZM183.666 0.4375V28.875H179.635V0.4375H183.666ZM175.135 3.40625C175.135 12.0312 172.104 19.1875 161.948 24L159.854 20.8125C167.198 17.3438 170.432 12.8438 171.073 6.53125H161.385V3.40625H175.135ZM23.3019 45.4375V73.9375H19.2706V45.4375H23.3019ZM7.86438 47.4375C12.1456 47.4375 15.3331 51.375 15.3331 57.5625C15.3331 63.8125 12.1456 67.7188 7.86438 67.7188C3.48938 67.7188 0.30188 63.8125 0.33313 57.5625C0.30188 51.375 3.48938 47.4375 7.86438 47.4375ZM7.86438 51.0312C5.64563 51.0312 4.17688 53.3438 4.17688 57.5625C4.17688 61.8125 5.64563 64.0938 7.86438 64.0938C10.0206 64.0938 11.4894 61.8125 11.4894 57.5625C11.4894 53.3438 10.0206 51.0312 7.86438 51.0312ZM51.5794 45.4375V73.875H47.7981V45.4375H51.5794ZM45.7669 45.9062V72.5625H42.0169V58.4062H38.2669V55.1875H42.0169V45.9062H45.7669ZM35.9856 53.0625C35.9856 57.7812 37.4544 62.5625 41.6106 64.9375L39.2669 67.875C36.7356 66.375 35.0638 63.8281 34.1106 60.7812C33.1263 64.0938 31.4075 66.9062 28.7981 68.5L26.3919 65.5625C30.5794 63 32.1419 57.875 32.1419 53.0625V51.5312H27.4856V48.3438H40.2981V51.5312H35.9856V53.0625ZM66.5406 71H61.4781L69.3219 48.375H75.3531L83.1656 71H78.1344L76.4469 65.7812H68.2594L66.5406 71ZM69.4469 62.125H75.2594L72.4156 53.4688H72.2594L69.4469 62.125ZM90.2556 48.375V71H85.5681V48.375H90.2556ZM118.877 67.4375V70.7188H92.8456V67.4375H103.814V63.1562H95.8456V53.5938H111.939V50.4688H95.8144V47.2812H115.877V56.7188H99.8456V59.9062H116.533V63.1562H107.783V67.4375H118.877ZM151.526 45.4688V61.8438H147.557V59.0625H141.151V55.875H147.557V53.1562H141.432C139.666 57.6562 135.635 60.75 129.369 62.4688L127.807 59.3125C134.354 57.5938 137.557 54.4688 138.119 50.5625H129.338V47.375H142.463C142.463 48.2969 142.401 49.1875 142.276 50.0312H147.557V45.4688H151.526ZM142.057 62.1875C147.838 62.1875 151.713 64.4062 151.744 67.9375C151.713 71.5 147.838 73.75 142.057 73.75C136.213 73.75 132.307 71.5 132.338 67.9375C132.307 64.4062 136.213 62.1875 142.057 62.1875ZM142.057 65.3125C138.463 65.2812 136.307 66.1875 136.307 67.9375C136.307 69.6875 138.463 70.5938 142.057 70.5938C145.588 70.5938 147.744 69.6875 147.744 67.9375C147.744 66.1875 145.588 65.2812 142.057 65.3125ZM179.022 45.4375V62.625H175.053V57.0312H171.366V53.7812H175.053V45.4375H179.022ZM179.022 63.8438V73.5625H159.897V63.8438H179.022ZM163.897 66.9688V70.375H175.116V66.9688H163.897ZM171.866 47.9062V51.0938H155.116V47.9062H161.553V45.1875H165.491V47.9062H171.866ZM163.522 52.0312C167.522 52.0312 170.334 54.1562 170.334 57.125C170.334 60.2188 167.522 62.2812 163.522 62.2812C159.553 62.2812 156.678 60.2188 156.678 57.125C156.678 54.1562 159.553 52.0312 163.522 52.0312ZM163.522 55.0312C161.678 55.0312 160.491 55.7812 160.522 57.125C160.491 58.5625 161.678 59.3438 163.522 59.3438C165.334 59.3438 166.522 58.5625 166.522 57.125C166.522 55.7812 165.334 55.0312 163.522 55.0312ZM204.987 45.4375V56.5625H209.174V59.8438H204.987V73.875H201.049V45.4375H204.987ZM199.112 49.6875V52.875H182.393V49.6875H188.831V45.875H192.831V49.6875H199.112ZM190.831 54.4688C194.987 54.4688 198.081 57.2812 198.081 61.25C198.081 65.2188 194.987 68.0312 190.831 68.0312C186.643 68.0312 183.549 65.2188 183.549 61.25C183.549 57.2812 186.643 54.4688 190.831 54.4688ZM190.831 57.6875C188.831 57.7188 187.362 59.0625 187.362 61.25C187.362 63.4688 188.831 64.7812 190.831 64.75C192.831 64.7812 194.268 63.4688 194.268 61.25C194.268 59.0625 192.831 57.7188 190.831 57.6875ZM219.171 52.5938C219.171 57.1875 220.452 61.9375 224.327 64.4375L222.171 67.5312C219.717 66.0469 218.155 63.6094 217.264 60.6875C216.233 63.9062 214.53 66.5938 211.952 68.1562L209.514 65.2188C213.733 62.5938 215.296 57.5938 215.296 52.7812V47.875H219.171V52.5938ZM234.702 45.4375V73.875H230.889V45.4375H234.702ZM228.733 45.8438V72.5625H225.014V58.2812H221.327V55.0312H225.014V45.8438H228.733ZM263.573 67.2812V70.5625H237.542V67.2812H243.354V60.3125C241.151 59 239.823 56.9844 239.823 54.4688C239.823 49.875 244.323 46.8125 250.511 46.8125C256.667 46.8125 261.198 49.875 261.229 54.4688C261.214 56.9219 259.917 58.9219 257.792 60.25V67.2812H263.573ZM250.511 49.9688C246.448 49.9688 243.761 51.5938 243.761 54.4688C243.761 57.25 246.448 58.9688 250.511 58.9688C254.542 58.9688 257.261 57.25 257.292 54.4688C257.261 51.5938 254.542 49.9688 250.511 49.9688ZM247.292 67.2812H253.761V61.75C252.745 61.9531 251.651 62.0625 250.511 62.0625C249.37 62.0625 248.292 61.9688 247.292 61.75V67.2812Z"
        fill="url(#paint0_linear_3990_321)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3990_321"
          x1="-13.3579"
          y1="-0.499999"
          x2="280.022"
          y2="98.6803"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4368E3" />
          <stop offset="1" stopColor="#15317C" />
        </linearGradient>
      </defs>
    </svg>
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
        <Button style={{ ...TYPOGRAPHY.body1.medium }}>
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
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${COLORS.primary[600]};
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
