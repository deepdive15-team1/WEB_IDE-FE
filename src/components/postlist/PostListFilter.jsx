import { Button } from "../common/Button/Button";

import styled from "styled-components";
import timeIcon from "./../../assets/time.svg";
import checkIcon from "./../../assets/check-black.svg";

const FILTER_OPTIONS = [
  { value: "ALL", label: "전체", icon: "none" },
  { value: "OPEN", label: "진행중", icon: timeIcon },
  { value: "COMPLETED", label: "완료", icon: checkIcon },
];

export default function PostListFilter({ activeFilter, onFilterChange }) {
  return (
    <Container>
      {FILTER_OPTIONS.map(({ value, label, icon }) => (
        <Button
          key={value}
          onClick={() => onFilterChange(value)}
          variant={value === activeFilter ? "primary" : "outline"}
          size="sm"
          startIcon={icon === "none" ? undefined : icon}
        >
          {label}
        </Button>
      ))}
    </Container>
  );
}

const Container = styled.main`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;
