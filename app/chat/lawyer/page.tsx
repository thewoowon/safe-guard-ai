"use client";

import { DownloadIcon, LeftChevronIcon } from "@/components/svg";
import { COLORS } from "@/styles/color";
import { TYPOGRAPHY } from "@/styles/typography";
import styled from "@emotion/styled";
import { useRouter, useSearchParams } from "next/navigation";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { keyframes } from "@emotion/react";
import { useEffect, useState } from "react";
import ReportImage from "@/components/svg/ReportImage";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import customAxios from "@/lib/axios";

const shimmer = keyframes`
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

type Size = number | string;

type SkeletonProps = {
  /** px 또는 %, rem 등 */
  width?: Size;
  height?: Size;
  /** px, rem, 또는 '50%' 등 */
  radius?: Size;
  /** 애니메이션 on/off */
  animate?: boolean;
  /** ms 단위 */
  duration?: number;
  /** 배경색 (밑면) */
  baseColor?: string;
  /** 하이라이트 색 (번쩍이는 부분) */
  shimmerColor?: string;
  /** 접근성: 로딩 상태를 부모에 알릴 때 */
  "aria-label"?: string;
};

const Skeleton = styled("div")<SkeletonProps>(
  ({
    width = "100%",
    height = "1rem",
    radius = 8,
    animate = true,
    duration = 1200,
    baseColor,
    shimmerColor,
  }) => ({
    display: "inline-block",
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    borderRadius: typeof radius === "number" ? `${radius}px` : radius,
    position: "relative",
    overflow: "hidden",

    // 라이트 모드 기본
    background: baseColor ?? "hsl(210 16% 92%)",

    // 다크 모드 기본
    ["@media (prefers-color-scheme: dark)"]: {
      background: baseColor ?? "hsl(215 15% 22%)",
    },

    // Shimmer 레이어
    ["&::before"]: {
      content: '""',
      position: "absolute",
      inset: 0,
      background: `linear-gradient(90deg, transparent, ${
        shimmerColor ?? "hsla(0,0%,100%,0.55)"
      }, transparent)`,
      backgroundSize: "200% 100%",
      animation: animate
        ? `${shimmer} ${duration}ms ease-in-out infinite`
        : "none",
    },

    // 모션 최소화 사용자 배려
    ["@media (prefers-reduced-motion: reduce)"]: {
      ["&::before"]: { animation: "none" },
    },
  })
);

const LawyerPage = () => {
  const params = useSearchParams();
  const reportId = params.get("reportId");
  const router = useRouter();
  const [report, setReport] = useState<ReportType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { data, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      if (!useAuthStore.getState().accessToken) return null;
      const response = await customAxios.get(`/user/getUserInfo`, {
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
        },
      });
      if (response.status !== 200) {
        throw new Error("프로필 정보를 가져오는 데 실패했습니다.");
      }

      console.log("User data:", response.data);
      return response.data;
    },
  });

  const createReport = async () => {
    try {
      const response = await customAxios.post(
        "/api/chat/simulation/report",
        {
          reportId,
        },
        {
          headers: {
            Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("리포트 생성 실패");
      }

      return response.data;
    } catch (error) {
      console.error("리포트 생성 중 오류 발생:", error);
      alert("리포트 생성 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    if (!reportId || reportId === "undefined") {
      alert("레포트 ID가 없습니다.");
      router.back();
      return;
    }
    const fetchReport = async () => {
      const reponse = await createReport();
      if (reponse) {
        setReport(reponse);
      }
      setIsLoading(false);
    };

    fetchReport();
  }, []);

  if (isLoading) {
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
            AI 변호사 심층 분석 리포트
          </div>
        </Header>
        <div
          style={{
            width: "100%",
          }}
        >
          <DotLottieReact
            src="/lotties/Search.lottie" // public/anims/hero.lottie
            autoplay
            loop
          />
        </div>
        <div
          style={{
            ...TYPOGRAPHY.h3.bold,
            color: COLORS.grayscale[1300],
            textAlign: "center",
            marginBottom: 36,
          }}
        >
          꼼꼼한 분석으로 더 정확한 <br />
          리포트를 준비하고 있습니다
        </div>
        <SkeletonFlexBox>
          <SelectionContainer>
            <Skeleton width={72} height={20} />
            <Skeleton height={60} />
          </SelectionContainer>
          <SelectionContainer>
            <Skeleton width={72} height={20} />
            <Skeleton height={100} />
          </SelectionContainer>
          <SelectionContainer>
            <Skeleton width={72} height={20} />
            <Skeleton height={60} />
          </SelectionContainer>
        </SkeletonFlexBox>
      </Container>
    );
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
          AI 변호사 심층 분석 리포트
        </div>
        <div
          style={{
            position: "absolute",
            right: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => router.back()}
        >
          <DownloadIcon />
        </div>
      </Header>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "26px 0",
        }}
      >
        <ReportImage type={"F"} />
      </div>
      <div
        style={{
          ...TYPOGRAPHY.h3.bold,
          color: COLORS.grayscale[1300],
          textAlign: "center",
          marginBottom: 36,
        }}
      >
        OO님의 종합 안전 등급은
        <br />
        <span
          style={{
            color: COLORS.grayscale[700],
          }}
        >
          F Level
        </span>{" "}
        입니다
      </div>
      <FlexBox>
        <SelectionContainer>
          <div
            style={{
              ...TYPOGRAPHY.body2.semiBold,
              color: COLORS.grayscale[700],
            }}
          >
            AI 한 줄 총평
          </div>
          <div
            style={{
              ...TYPOGRAPHY.body2.regular,
              color: COLORS.grayscale[1300],
            }}
          >
            계약 과정 전반에 걸쳐 금융 사기에 대한 경각심이 부족하여 모든 금액을
            사기꾼에게 송금했습니다. 최소한의 의심 없이 모든 요청을 수락한 것이
            치명적인 실수였습니다.
          </div>
        </SelectionContainer>
        <SelectionContainer>
          <div
            style={{
              ...TYPOGRAPHY.body2.semiBold,
              color: COLORS.grayscale[700],
            }}
          >
            위험 분석
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <MessageContainer
              style={{
                ...TYPOGRAPHY.body2.medium,
                color: COLORS.grayscale[1300],
              }}
            >
              <div>2.</div>
              알겠습니다. 이 집을 놓치고 싶지 않네요. 대신 가계약금 영수증은 꼭
              발행해주세요.
            </MessageContainer>
            <div
              style={{
                ...TYPOGRAPHY.body2.regular,
                color: COLORS.grayscale[1300],
              }}
            >
              {`🚫️ 가계약금은 법적 구속력이 약하며, 사기꾼은 이를 이용해 돈을
              편취할 수 있습니다. 특히 '인기 매물'을 미끼로 촉박한 상황을
              조성하는 것은 전형적인 사기 수법입니다.`}
            </div>
            <div
              style={{
                ...TYPOGRAPHY.body2.regular,
                color: COLORS.grayscale[1300],
              }}
            >
              {`✅ 가계약금 송금 전에 등기부등본을 확인하여 실소유주를 파악하고, 계약 조건을 명확히 기재한 가계약서를 작성해야 합니다. 급박한 상황에 휘말리지 않고 신중하게 판단해야 합니다.`}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <MessageContainer
              style={{
                ...TYPOGRAPHY.body2.medium,
                color: COLORS.grayscale[1300],
              }}
            >
              <div>2.</div>
              알겠습니다. 이 집을 놓치고 싶지 않네요. 대신 가계약금 영수증은 꼭
              발행해주세요.
            </MessageContainer>
            <div
              style={{
                ...TYPOGRAPHY.body2.regular,
                color: COLORS.grayscale[1300],
              }}
            >
              {`🚫️ 가계약금은 법적 구속력이 약하며, 사기꾼은 이를 이용해 돈을
              편취할 수 있습니다. 특히 '인기 매물'을 미끼로 촉박한 상황을
              조성하는 것은 전형적인 사기 수법입니다.`}
            </div>
            <div
              style={{
                ...TYPOGRAPHY.body2.regular,
                color: COLORS.grayscale[1300],
              }}
            >
              {`✅ 가계약금 송금 전에 등기부등본을 확인하여 실소유주를 파악하고, 계약 조건을 명확히 기재한 가계약서를 작성해야 합니다. 급박한 상황에 휘말리지 않고 신중하게 판단해야 합니다.`}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <MessageContainer
              style={{
                ...TYPOGRAPHY.body2.medium,
                color: COLORS.grayscale[1300],
              }}
            >
              <div>2.</div>
              알겠습니다. 이 집을 놓치고 싶지 않네요. 대신 가계약금 영수증은 꼭
              발행해주세요.
            </MessageContainer>
            <div
              style={{
                ...TYPOGRAPHY.body2.regular,
                color: COLORS.grayscale[1300],
              }}
            >
              {`🚫️ 가계약금은 법적 구속력이 약하며, 사기꾼은 이를 이용해 돈을
              편취할 수 있습니다. 특히 '인기 매물'을 미끼로 촉박한 상황을
              조성하는 것은 전형적인 사기 수법입니다.`}
            </div>
            <div
              style={{
                ...TYPOGRAPHY.body2.regular,
                color: COLORS.grayscale[1300],
              }}
            >
              {`✅ 가계약금 송금 전에 등기부등본을 확인하여 실소유주를 파악하고, 계약 조건을 명확히 기재한 가계약서를 작성해야 합니다. 급박한 상황에 휘말리지 않고 신중하게 판단해야 합니다.`}
            </div>
          </div>
        </SelectionContainer>
        <SelectionContainer>
          <div
            style={{
              ...TYPOGRAPHY.body2.semiBold,
              color: COLORS.grayscale[700],
            }}
          >
            권장 조치
          </div>
          <div
            style={{
              ...TYPOGRAPHY.body2.regular,
              color: COLORS.grayscale[1300],
            }}
          >
            {`부동산 계약, 특히 비대면 계약 시에는 등기부등본 확인, 실소유주 확인,
            계약서 검토 등의 절차를 반드시 거쳐야 합니다. 낯선 용어나 요구에
            대해서는 의심하고, 관련 법률 및 절차를 직접 확인하거나 전문가의
            도움을 받는 것이 중요합니다. '서두르게 하는 상황' 자체를 경계하고,
            급하게 돈을 송금하지 않도록 주의해야 합니다.`}
          </div>
        </SelectionContainer>
      </FlexBox>
    </Container>
  );
};

export default LawyerPage;

const Container = styled.main`
  background-color: ${COLORS.grayscale[300]};
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
  background-color: ${COLORS.grayscale[300]};
`;

const SelectionContainer = styled.div`
  padding: 20px 22px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: white;
  gap: 6px;
`;

const SkeletonFlexBox = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: white;
  overflow-x: hidden;
  overflow-y: auto;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none; /* IE and Edge */
  padding-top: 4px;
  padding-bottom: 26px;
`;

const FlexBox = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: white;
  overflow-x: hidden;
  overflow-y: auto;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none; /* IE and Edge */
  padding-top: 4px;
  padding-bottom: 26px;
`;

const ParthenonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 26px 0;
  background-color: ${COLORS.primary[50]};
  border-radius: 20px;
  padding: 20px;
  gap: 10px;
`;

const LawyerButton = styled.button`
  width: "fit-content";
  background-color: ${COLORS.grayscale[1100]};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  padding: 8px 12px;
  border-radius: 50px;
  &:hover {
    background-color: ${COLORS.grayscale[900]};
  }
`;

const MessageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  background-color: ${COLORS.primary[30]};
  gap: 6px;
  padding: 8px 12px;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top-left-radius: 16px;
  border-bottom-left-radius: 2px;
`;
