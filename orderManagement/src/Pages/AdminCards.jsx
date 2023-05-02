import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import activeImage from '../assets/images/active.png';
import inActiveImage from '../assets/images/inactive.jpg'


export default function AdminCards() {
  const theme = useTheme();

  console.log("admincards")
  return (
    <div className='container'>
      <div className='row'>
        {/* Status cards for the Active and Inactive Users */}
        <div className='col'>
    <Card sx={{ display: 'flex', backgroundColor: 'darkgrey', width:'350px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            Active Exicutives
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div" sx={{fontSize:40}}>
            500
          </Typography>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151, height:80 }}
        image={activeImage}
        alt="Live from space album cover"
      />
    </Card>
    </div>
    <div className='col'>
    <Card sx={{ display: 'flex', backgroundColor:'darkcyan', width:'350px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            InActive Exicutives
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div" sx={{fontSize:40}}>
            150
          </Typography>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={inActiveImage}
        alt="Live from space album cover"
      />
    </Card>
    </div>
    </div>
    </div>
  );
}