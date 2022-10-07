import Box from '@mui/system/Box';

const ContentList = ({
  children,
  isSingleCol = false,
  colBreakPoints = [1, 2, 3],
}) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexShrink: 0,
          justifyContent: 'center',
          bgcolor: 'background.main',
        }}
      >
        <Box sx={{ width: '1600px' }}>
          <Box
            sx={{
              display: 'grid',
              gap: 2,
              my: 3,
              gridTemplateColumns: {
                xs: `repeat(${colBreakPoints[0]}, 1fr)`,
                md: `repeat(${isSingleCol ? '1' : colBreakPoints[1]}, 1fr)`,
                lg: `repeat(${isSingleCol ? '1' : colBreakPoints[2]}, 1fr)`,
              },
              '@media (max-width:1800px)': {
                mx: '10%',
              },
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ContentList;
