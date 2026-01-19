import styled from "styled-components";
import Chip from "../common/Chip/Chip";
import { formatTime } from "../../utils/formatTime";

export default function ChatMessage({ message }) {
  const getInitials = (name) => {
    if (!name) return "?";
    // 한글의 경우 마지막 글자, 영문의 경우 첫 글자
    const lastChar = name[name.length - 1];
    return lastChar;
  };

  return (
    <Container>
      <MessageContent>
        <MessageHeader>
          <SenderName>{message.senderName}</SenderName>
          <Timestamp>{formatTime(message.sendTime)}</Timestamp>
        </MessageHeader>
        {message.lineNumber && (
          <LineReference>
            <Chip variant="tagging">#{message.lineNumber}번 줄</Chip>
          </LineReference>
        )}
        <MessageText>{message.message}</MessageText>
      </MessageContent>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px 20px;
  &:hover {
    background-color: var(--color-main-light);
  }
`;

const MessageContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
`;

const SenderName = styled.span`
  font-weight: 600;
  font-size: 14px;
  color: var(--color-text);
`;

const Timestamp = styled.span`
  font-size: 12px;
  color: var(--color-gray-600);
`;

const LineReference = styled.div`
  margin-bottom: 6px;
`;

const MessageText = styled.div`
  font-size: 14px;
  color: var(--color-text);
  line-height: 1.5;
  background-color: var(--color-gray-200);
  padding: 10px 14px;
  border-radius: 8px;
  word-wrap: break-word;
`;
