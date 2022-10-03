import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 15,
  borderRadius: 0,
  background: "#4caf50",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "f5f5f5",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 0,
    backgroundColor: "#4caf50",
  },
}));

type Props = {
  valueBuffer: number;
  value: number;
};
export const LineProgress: React.FC<Props> = ({ valueBuffer, value }) => {
  return (
    <Box>
      <BorderLinearProgress
        variant="determinate"
        value={value ? (value / valueBuffer) * 100 : 0}
      />
    </Box>
  );
};
