"use client";

import { LeftChevronIcon, RightChevronIcon } from "@/components/svg";
import { COLORS } from "@/styles/color";
import { TYPOGRAPHY } from "@/styles/typography";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useQuery } from "@tanstack/react-query";
import customAxios from "@/lib/axios";

const LogoBall = () => {
  return (
    <svg
      width="32"
      height="33"
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_245_3309)">
        <circle cx="16" cy="16.5" r="16" fill="#D9D9D9" />
        <circle cx="16" cy="16.5" r="16" fill="url(#paint0_linear_245_3309)" />
        <path
          d="M12.4736 19.5176H16.1475L12.7217 22.999H9V17.0254L12.4736 13.4727V19.5176ZM22 15.8867V19.5166L16.1465 19.5176L19.4932 15.8867H22ZM22 13.4727H12.4736L15.9805 10H22V13.4727Z"
          fill="white"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_245_3309"
          x1="-7.35632"
          y1="2.8908"
          x2="29.4253"
          y2="31.5805"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#090E1B" />
          <stop offset="1" stopColor="#2B4381" />
        </linearGradient>
        <clipPath id="clip0_245_3309">
          <rect y="0.5" width="32" height="32" rx="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const REPORT_LIST: {
  id: string;
  title: string;
  createdAt: string;
}[] = [
  {
    id: "1",
    title: "전세사기: 나의 금융 면역력 리포트",
    createdAt: "2023.10.01",
  },
  {
    id: "2",
    title: "보이스피싱: 나의 금융 면역력 리포트",
    createdAt: "2023.09.01",
  },
  {
    id: "3",
    title: "검찰사칭: 나의 금융 면역력 리포트",
    createdAt: "2023.08.01",
  },
];
const RISK_LIST: {
  id: string;
  title: string;
  createdAt: string;
  riskLevel: "low" | "medium" | "high";
}[] = [
  {
    id: "1",
    title: "실시간 위험 진단 결과",
    createdAt: "2023.10.01",
    riskLevel: "low",
  },
  {
    id: "2",
    title: "실시간 위험 진단 결과",
    createdAt: "2023.09.01",
    riskLevel: "medium",
  },
  {
    id: "3",
    title: "실시간 위험 진단 결과",
    createdAt: "2023.08.01",
    riskLevel: "high",
  },
];

const MyPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

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

  const { data: reportData, refetch: refetchReports } = useQuery<ReportResult>({
    queryKey: ["reports"],
    queryFn: async () => {
      if (!useAuthStore.getState().accessToken) return [];
      const response = await customAxios.get(`/api/simulation/resultList`, {
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
        },
      });
      if (response.status !== 200) {
        throw new Error("리포트 정보를 가져오는 데 실패했습니다.");
      }

      console.log("Report data:", response.data);
      return response.data;
    },
  });

  const logout = async () => {
    const response = await customAxios.post(
      "/user/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
        },
      }
    );

    if (response.status === 200) {
      useAuthStore.getState().setAccessToken(null);
      setUser(null);
      router.push("/");
    } else {
      console.error("로그아웃 실패:", response.data);
    }
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
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0px 16px",
          marginBottom: "50px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "10px",
          }}
        >
          <LogoBall />
          <div
            style={{
              ...TYPOGRAPHY.body1.medium,
              color: COLORS.grayscale[1100],
            }}
          >
            {!!useAuthStore.getState().accessToken ? data?.email : "내 계정"}
          </div>
        </div>
        <LoginButton
          onClick={() => {
            if (!!useAuthStore.getState().accessToken) {
              logout();
            } else {
              // window.location.href =
              //   "https://api.sfgdai.com/oauth2/authorization/google";
              useAuthStore.getState().setAccessToken("1");
              refetch();
              refetchReports();
              console.log("로그인");
              // router.push("/");
            }
          }}
          style={{
            ...TYPOGRAPHY.caption.medium,
          }}
        >
          {!!useAuthStore.getState().accessToken ? "로그아웃" : "로그인"}
        </LoginButton>
      </div>
      <Stroke />
      <ListAllContainer>
        <ListContainer>
          <ListTitle
            style={{
              ...TYPOGRAPHY.caption.medium,
            }}
          >
            나의 금융 면역력 리포트
          </ListTitle>
          <div style={{ width: "100%" }}>
            {reportData && reportData.reportList?.length > 0 ? (
              reportData.reportList.map((report) => (
                <div
                  key={report.id}
                  style={{
                    ...TYPOGRAPHY.body2.medium,
                    color: COLORS.grayscale[1300],
                    padding: "14px 20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>{report.title}</div>
                    <div
                      style={{
                        ...TYPOGRAPHY.caption.regular,
                        color: COLORS.grayscale[700],
                      }}
                    >
                      {report.createdAt}
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      router.push(
                        `/chat/simulation/result?reportId=${report.id}`
                      );
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <RightChevronIcon />
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  ...TYPOGRAPHY.caption.regular,
                  color: COLORS.grayscale[700],
                  padding: "14px 20px",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                아직 생성된 리포트가 없습니다.
              </div>
            )}
          </div>
        </ListContainer>
        <Stroke />
        <ListContainer>
          <ListTitle
            style={{
              ...TYPOGRAPHY.caption.medium,
            }}
          >
            AI 변호사 심층 분석 리포트
          </ListTitle>
          <div style={{ width: "100%" }}>
            {reportData && reportData.deepReportList?.length > 0 ? (
              reportData.deepReportList.map((report) => (
                <div
                  key={report.id}
                  style={{
                    ...TYPOGRAPHY.body2.medium,
                    color: COLORS.grayscale[1300],
                    padding: "14px 20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>{report.title}</div>
                    <div
                      style={{
                        ...TYPOGRAPHY.caption.regular,
                        color: COLORS.grayscale[700],
                      }}
                    >
                      {report.createdAt}
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      router.push(`/chat/lawyer?reportId=${report.id}`);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <RightChevronIcon />
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  ...TYPOGRAPHY.caption.regular,
                  color: COLORS.grayscale[700],
                  padding: "14px 20px",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                아직 생성된 리포트가 없습니다.
              </div>
            )}
          </div>
        </ListContainer>
        <Stroke />
        <ListContainer>
          <ListTitle
            style={{
              ...TYPOGRAPHY.caption.medium,
            }}
          >
            실시간 위험 진단 결과
          </ListTitle>
          <div style={{ width: "100%" }}>
            {reportData && reportData.imageReportList?.length > 0 ? (
              reportData.imageReportList.map((risks) => (
                <div
                  key={risks.id}
                  style={{
                    ...TYPOGRAPHY.body2.medium,
                    color: COLORS.grayscale[1300],
                    padding: "14px 20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>{risks.title}</div>
                    <div
                      style={{
                        ...TYPOGRAPHY.caption.regular,
                        color: COLORS.grayscale[700],
                      }}
                    >
                      {risks.createdAt}
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      router.push(`/upload/analysis?reportId=${risks.id}`);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <RightChevronIcon />
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  ...TYPOGRAPHY.caption.regular,
                  color: COLORS.grayscale[700],
                  padding: "14px 20px",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                아직 진단 결과가 없습니다.
              </div>
            )}
          </div>
        </ListContainer>
      </ListAllContainer>
    </Container>
  );
};

export default MyPage;

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

const LoginButton = styled.button`
  background-color: ${COLORS.grayscale[1100]};
  color: white;
  border: none;
  border-radius: 50px;
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background-color: ${COLORS.grayscale[900]};
  }
  transition: background-color 0.3s ease;
`;

const Stroke = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${COLORS.grayscale[400]};
`;

const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none; /* IE and Edge */
  -ms-overflow-style: none; /* IE and Edge */
`;

const ListTitle = styled.div`
  color: ${COLORS.grayscale[800]};
  padding: 16px 20px 6px 20px;
`;

const ListAllContainer = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none; /* IE and Edge */
  -ms-overflow-style: none; /* IE and Edge */
`;
