import Typography from "@mui/material/Typography";
import Title from "./Title";

interface CardAnalyticProps {
  title: string;
  number: string;
  date: string;
}

export default function CardAnalytic({
  title,
  number,
  date,
}: CardAnalyticProps) {
  return (
    <>
      <Title>{title}</Title>
      <Typography component="p" variant="h4">
        {number}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {date}
      </Typography>
    </>
  );
}
