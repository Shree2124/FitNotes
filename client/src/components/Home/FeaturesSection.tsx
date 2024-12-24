import { Box, Typography, useTheme, Theme } from "@mui/material";

interface Feature {
  title: string;
  description: string;
}

const FeaturesSection: React.FC = () => {
  const theme = useTheme<Theme>();

  const features: Feature[] = [
    { title: "Fast & Reliable", description: "Experience top-notch performance and reliability." },
    { title: "User-Friendly", description: "Intuitive and easy-to-use interfaces." },
    { title: "Secure", description: "Your data is safe with state-of-the-art encryption." },
  ];

  return (
    <Box
      component="section"
      sx={{
        py: theme.spacing(8),
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box
        sx={{
          maxWidth: "lg",
          mx: "auto",
          px: theme.spacing(2),
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            mb: theme.spacing(4),
            color: theme.palette.text.primary,
          }}
        >
          Features
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              lg: "1fr 1fr 1fr",
            },
            gap: theme.spacing(4),
          }}
        >
          {features.map((feature, index) => (
            <Box
              key={index}
              sx={{
                p: theme.spacing(3),
                backgroundColor: theme.palette.background.paper,
                borderRadius: theme.shape.borderRadius,
                boxShadow: theme.shadows[2],
                transition: "box-shadow 0.3s",
                "&:hover": {
                  boxShadow: theme.shadows[6],
                },
              }}
            >
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  fontWeight: "bold",
                  mb: theme.spacing(1),
                  color: theme.palette.text.primary,
                }}
              >
                {feature.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                }}
              >
                {feature.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default FeaturesSection;
