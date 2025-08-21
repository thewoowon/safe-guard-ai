"use client";
import { LeftChevronIcon } from "@/components/svg";
import { COLORS } from "@/styles/color";
import { TYPOGRAPHY } from "@/styles/typography";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SimulationCode = "jeonse" | "used_goods" | "family_fraud" | "romance_scam";

type SimulationItem = {
  id: number;
  code: SimulationCode;
  title: string;
  description: string;
};

const SIMULATION_LIST: SimulationItem[] = [
  {
    id: 1,
    code: "jeonse",
    title: "🏠 전세사기",
    description: "시세보다 저렴한 집, 덜컥 계약해도 괜찮을까요?",
  },
  {
    id: 2,
    code: "used_goods",
    title: "🛍️ 중고거래 사기",
    description: "안전거래라던 판매자, 믿고 돈을 보내도 될까요?",
  },
  {
    id: 3,
    code: "family_fraud",
    title: "👤 가족/지인 사칭",
    description: "갑자기 돈을 부탁하는 가족 메시지, 도와줘야 할까요?",
  },
  {
    id: 4,
    code: "romance_scam",
    title: "💕로맨스 스캠",
    description: "달콤한 메시지를 보내는 그 사람, 정말 믿어도 될까요?",
  },
];

const ChatPage = () => {
  const router = useRouter();
  const [simulationList, setSimulationList] = useState(SIMULATION_LIST);
  const [simulationCode, setSimulationCode] = useState<SimulationCode | null>(
    null
  );
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
          시뮬레이션 할
          <br />
          대화 주제를 선택해주세요
        </div>
      </TitleContainer>
      <SimulationList>
        {simulationList.map((item) => (
          <div
            key={item.id}
            style={{
              ...TYPOGRAPHY.body1.regular,
              color: COLORS.grayscale[1300],
              padding: "20px",
              borderRadius: "20px",
              transition: "all 0.3s ease",
              backgroundColor:
                simulationCode === item.code
                  ? COLORS.primary[30]
                  : COLORS.grayscale[300],
              width: "100%",
              cursor: "pointer",
              gap: "4px",
              border:
                simulationCode === item.code
                  ? `2px solid ${COLORS.primary[500]}`
                  : `2px solid ${COLORS.grayscale[300]}`,
            }}
            onClick={() => {
              // router.push(`/chat/${item.id}`);
              setSimulationCode(item.code);
            }}
          >
            <div
              style={{
                ...TYPOGRAPHY.h4.bold,
                color:
                  simulationCode === item.code
                    ? COLORS.primary[500]
                    : COLORS.grayscale[800],
              }}
            >
              {item.title}
            </div>
            <div
              style={{
                ...TYPOGRAPHY.body2.medium,
                color:
                  simulationCode === item.code
                    ? COLORS.primary[500]
                    : COLORS.grayscale[800],
              }}
            >
              {item.description}
            </div>
          </div>
        ))}
      </SimulationList>
      <ButtonContainer>
        <Button
          style={{
            ...TYPOGRAPHY.body1.medium,
            backgroundColor: simulationCode
              ? COLORS.grayscale[1100]
              : COLORS.grayscale[500],
          }}
          onClick={() => {
            if (!simulationCode) return;
            router.push(`/chat/simulation?simulationCode=${simulationCode}`);
          }}
          disabled={!simulationCode}
        >
          다음
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default ChatPage;

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

const SimulationList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 20px;
  gap: 10px;
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
