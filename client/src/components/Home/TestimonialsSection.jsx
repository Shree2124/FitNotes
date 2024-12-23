import { Box, Typography, useTheme } from "@mui/material";

const TestimonialsSection = () => {
  const theme = useTheme();

  const testimonials = [
    { name: "John Doe", text: "This platform transformed my workflow!" },
    {
      name: "Jane Smith",
      text: "Highly recommend for anyone looking to level up.",
    },
    { name: "Sam Wilson", text: "Amazing features and excellent support." },
  ];

  return (
    <Box
      component="section"
      sx={{
        py: theme.spacing(8),
        backgroundColor: theme.palette.background.paper,
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
          What Our Users Say
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: theme.spacing(4),
          }}
        >
          {testimonials.map((testimonial, index) => (
            <Box
              key={index}
              sx={{
                p: theme.spacing(3),
                backgroundColor: theme.palette.background.default,
                borderRadius: theme.shape.borderRadius,
                boxShadow: theme.shadows[2],
                "&:hover": {
                  boxShadow: theme.shadows[6],
                },
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontStyle: "italic",
                  mb: theme.spacing(2),
                  color: theme.palette.text.secondary,
                }}
              >
                {testimonial.text}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.primary.main,
                }}
              >
                - {testimonial.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default TestimonialsSection;
