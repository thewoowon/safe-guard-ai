"use client";
import {
  DangerCircle,
  InterestCircle,
  LeftChevronIcon,
  WarningCircle,
} from "@/components/svg";
import { COLORS } from "@/styles/color";
import { TYPOGRAPHY } from "@/styles/typography";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";

const AnalysisPage = () => {
  const router = useRouter();
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
          실시간 위험 진단 결과
        </div>
      </Header>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <DangerCircle />
        <div
          style={{
            textAlign: "center",
            ...TYPOGRAPHY.h3.bold,
            color: COLORS.grayscale[1300],
            marginTop: "16px",
          }}
        >
          긴급! 자녀 사칭 송금 요구 메시지 <br />
          보이스피싱 의심
        </div>
        <Tags>
          {Array.from({ length: 3 }, (_, i) => (
            <Tag
              key={i}
              style={{
                ...TYPOGRAPHY.body2.regular,
                color: COLORS.caution.red[300],
              }}
            >
              {i === 0 ? "#보이스피싱" : i === 1 ? "#사칭" : "#송금"}
            </Tag>
          ))}
        </Tags>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "20px",
          boxSizing: "border-box",
          gap: "12px",
        }}
      >
        <TextBox
          style={{
            ...TYPOGRAPHY.body2.regular,
            color: COLORS.grayscale[1300],
          }}
        >
          <div
            style={{
              ...TYPOGRAPHY.body2.semiBold,
              color: COLORS.grayscale[700],
            }}
          >
            AI 분석 요약
          </div>
          <div>
            {`자녀를 사칭하여 폰 고장을 이유로 급히 송금을 요구하는 메시지입니다.
          '해남신문 계좌'와 같이 특정 계좌를 언급하며 긴급함을 강조하는 수법은
          전형적인 보이스피싱/스미싱 기법입니다. 메시지의 어색한 문장 구성과
          시간 간격 또한 사기 메시지의 특징입니다. 자녀와 직접 연락하여 상황을
          확인해야 하며, 절대 송금해서는 안 됩니다.`}
          </div>
        </TextBox>
        <TextBox
          style={{
            ...TYPOGRAPHY.body2.regular,
            color: COLORS.grayscale[1300],
          }}
        >
          <div
            style={{
              ...TYPOGRAPHY.body2.semiBold,
              color: COLORS.grayscale[700],
            }}
          >
            AI 분석 요약
          </div>
          <div>
            {`메시지 발신자에게 직접 전화하여 상황을 확인하고, 절대로 돈을 송금하지 마세요. 금융기관에 신고하고 경찰에 사기 사건으로 접수하세요.`}
          </div>
        </TextBox>
        <TextBox
          style={{
            ...TYPOGRAPHY.body2.regular,
            color: COLORS.grayscale[1300],
          }}
        >
          <div
            style={{
              ...TYPOGRAPHY.body2.semiBold,
              color: COLORS.grayscale[700],
            }}
          >
            추출된 텍스트 원문 확인하기
          </div>
          <div>
            {`메시지 발신자에게 직접 전화하여 상황을 확인하고, 절대로 돈을 송금하지 마세요. 금융기관에 신고하고 경찰에 사기 사건으로 접수하세요.`}
          </div>
        </TextBox>
      </div>
      {/* <WarningCircle />
      <InterestCircle /> */}
    </Container>
  );
};

export default AnalysisPage;

const Container = styled.main`
  background-color: ${COLORS.grayscale[300]};
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
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding-right: 16px;
  padding-left: 16px;
  height: 57px;
  background-color: transparent;
  margin-bottom: 6px;
`;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-top: 16px;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  width: fit-content;
  height: 26px;
  padding: 3px 10px;
  border-radius: 13px;
  border: 1px solid ${COLORS.caution.red[300]};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextBox = styled.div`
  padding: 16px 20px;
  background-color: #ffffff;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
