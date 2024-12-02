import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useThemeContext } from '../../context/ThemeContext';

const FeaturesSection = () => {
  const { theme } = useThemeContext();

  return (
    <div>
      <Container sx={{ marginTop: '60px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '40px', // Added margin bottom for spacing
          }}
        >
          {['Track Sets and Reps', 'Monitor Your Progress', 'Custom Workouts'].map((title, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 + index * 0.2 }}
            >
              <Box
                sx={{
                  width: { xs: '100%', sm: '300px' },
                  backgroundColor: theme.palette.background.paper,
                  padding: '20px',
                  borderRadius: '10px',
                  textAlign: 'center',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <img
                  src="https://via.placeholder.com/150"
                  alt={title}
                  style={{
                    width: '100%',
                    borderRadius: '10px',
                    marginBottom: '15px',
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    marginTop: '15px',
                    fontWeight: '600',
                    fontSize: { xs: '1.25rem', sm: '1.5rem' }, // Responsive text size
                  }}
                >
                  {title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: { xs: '0.875rem', sm: '1rem' }, // Responsive text size
                  }}
                >
                  {index === 0
                    ? 'Log your sets, reps, and weights to track your progress over time.'
                    : index === 1
                    ? 'See how your strength increases with automatic progress tracking.'
                    : 'Create and store your own personalized workout routines.'}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Container>
    </div>
  );
};

export default FeaturesSection;
