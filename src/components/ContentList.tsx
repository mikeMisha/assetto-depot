import Box from '@mui/system/Box';

interface ContentListProps {
  children: React.ReactNode;
  isSingleCol?: boolean;
  colBreakPoints?: number[];
}

const ContentList = (props: ContentListProps) => {
  const { children, isSingleCol = false, colBreakPoints = [1, 2, 3] } = props;

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
