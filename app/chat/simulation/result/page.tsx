"use client";

import { LeftChevronIcon } from "@/components/svg";
import { COLORS } from "@/styles/color";
import { TYPOGRAPHY } from "@/styles/typography";
import styled from "@emotion/styled";
import { useRouter, useSearchParams } from "next/navigation";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { keyframes } from "@emotion/react";
import { useEffect, useState } from "react";
import ReportImage from "@/components/svg/ReportImage";
import Parthenon from "@/components/svg/Parthenon";
import customAxios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";

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

type ReportType = {
  id: number;
  grade: string;
  summary: string;
  cautionPoint: string;
  guide: string;
  createdAt: string;
};

const ResultPage = () => {
  const params = useSearchParams();
  const sessionId = params.get("sessionId");
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
        "/api/simulation/report",
        {
          sessionId,
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
    if (!sessionId) {
      alert("세션 ID가 없습니다.");
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
            나의 금융 면역력 리포트
          </div>
        </Header>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "208px",
            }}
          >
            <DotLottieReact
              src="/lotties/Search.lottie" // public/anims/hero.lottie
              autoplay
              loop
            />
          </div>
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
          나의 금융 면역력 리포트
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
        {data?.name || "OO"}님의 종합 안전 등급은
        <br />
        <span
          style={{
            color: COLORS.grayscale[700],
          }}
        >
          {report?.grade} Level
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
            {report?.summary || "AI가 분석한 총평이 없습니다."}
          </div>
        </SelectionContainer>
        <SelectionContainer>
          <div
            style={{
              ...TYPOGRAPHY.body2.semiBold,
              color: COLORS.grayscale[700],
            }}
          >
            주의 사항
          </div>
          <div
            style={{
              ...TYPOGRAPHY.body2.regular,
              color: COLORS.grayscale[1300],
            }}
          >
            {report?.cautionPoint || "주의 사항이 없습니다."}
          </div>
        </SelectionContainer>
        <SelectionContainer>
          <div
            style={{
              ...TYPOGRAPHY.body2.semiBold,
              color: COLORS.grayscale[700],
            }}
          >
            한 줄 가이드
          </div>
          <div
            style={{
              ...TYPOGRAPHY.body2.regular,
              color: COLORS.grayscale[1300],
            }}
          >
            {report?.guide || "가이드가 없습니다."}
          </div>
        </SelectionContainer>
        <div>
          <ParthenonContainer>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <div
                  style={{
                    ...TYPOGRAPHY.body1.semiBold,
                    color: COLORS.grayscale[1300],
                  }}
                >
                  더 깊이 있는 분석을 원한다면
                </div>
                <div
                  style={{
                    ...TYPOGRAPHY.body2.regular,
                    color: COLORS.grayscale[1300],
                  }}
                >
                  AI 변호사가 법률적 관점에서 상세히 분석해 드립니다.
                </div>
              </div>
              <div>
                <LawyerButton
                  style={{
                    ...TYPOGRAPHY.caption.medium,
                    color: COLORS.grayscale[100],
                  }}
                  onClick={() => {
                    if (!report) {
                      alert("리포트가 준비되지 않았습니다.");
                      return;
                    }
                    router.push(`/chat/lawyer?reportId=${report?.id}`);
                  }}
                >
                  법률 분석 받기
                </LawyerButton>
              </div>
            </div>
            <Parthenon />
          </ParthenonContainer>
        </div>
      </FlexBox>
    </Container>
  );
};

export default ResultPage;

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
