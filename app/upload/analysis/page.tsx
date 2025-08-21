"use client";
import {
  DangerCircle,
  InterestCircle,
  LeftChevronIcon,
  WarningCircle,
} from "@/components/svg";
import { useImageReportStore } from "@/stores/imageReportStore";
import { COLORS } from "@/styles/color";
import { TYPOGRAPHY } from "@/styles/typography";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";

const AnalysisPage = () => {
  const router = useRouter();
  const { imageReportResult } = useImageReportStore.getState();
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
        {imageReportResult?.riskLevel === "관심" ? (
          <InterestCircle />
        ) : imageReportResult?.riskLevel === "주의" ? (
          <WarningCircle />
        ) : (
          <DangerCircle />
        )}
        <div
          style={{
            textAlign: "center",
            ...TYPOGRAPHY.h3.bold,
            color: COLORS.grayscale[1300],
            marginTop: "16px",
          }}
        >
          {imageReportResult?.title}
        </div>
        <Tags>
          {imageReportResult?.detectedKeywords.map((keyword, index) => (
            <Tag
              key={index}
              style={{
                ...TYPOGRAPHY.body2.regular,
                color:
                  imageReportResult?.riskLevel === "관심"
                    ? COLORS.primary[500]
                    : imageReportResult?.riskLevel === "주의"
                      ? COLORS.caution.yellow[300]
                      : COLORS.caution.red[300],
                borderColor:
                  imageReportResult?.riskLevel === "관심"
                    ? COLORS.primary[500]
                    : imageReportResult?.riskLevel === "주의"
                      ? COLORS.caution.yellow[300]
                      : COLORS.caution.red[300],
              }}
            >
              #{keyword}
            </Tag>
          ))}
        </Tags>
      </div>
      <ScrollableContainer>
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
          <div>{imageReportResult?.summary || "AI 분석 요약이 없습니다."}</div>
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
            한 줄 가이드
          </div>
          <div>{imageReportResult?.guide || "한 줄 가이드가 없습니다."}</div>
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
            {imageReportResult?.extractedText || "추출된 텍스트가 없습니다."}
          </div>
        </TextBox>
      </ScrollableContainer>
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

const ScrollableContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  box-sizing: border-box;
  gap: 12px;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none; /* IE and Edge */
`;
