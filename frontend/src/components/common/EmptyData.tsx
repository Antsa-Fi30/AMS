import { AccessTime } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

interface EmptyDataProps {
  title?: string;
  hint?: string;
}

const EmptyData: React.FC<EmptyDataProps> = ({ title, hint }) => {
  return (
    <div>
      <Box
        sx={{
          minHeight: 200,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "text.secondary",
          textAlign: "center",
          py: 3,
        }}
      >
        <AccessTime sx={{ fontSize: 60, color: "grey.400", mb: 1 }} />

        {title ? (
          <Typography variant="subtitle1" fontWeight="medium">
            {title}
          </Typography>
        ) : (
          <Typography variant="subtitle1" fontWeight="medium">
            Empty data
          </Typography>
        )}
        {hint ? (
          <Typography variant="body1" fontWeight="medium">
            {hint}
          </Typography>
        ) : (
          <Typography variant="body1" fontWeight="medium">
            The data will appear here
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default EmptyData;
