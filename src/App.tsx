import { useState } from 'react';
import { Container, Button, Typography, Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';
import MenuIcon from '@mui/icons-material/Menu';
import CachedIcon from '@mui/icons-material/Cached';
import PaidIcon from '@mui/icons-material/Paid';
import data from './data/data.min.json';
import './style/App.css';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const App = () => {
  const [selectedBot, setSelectedBot] = useState('yellow_bot');
  const [interval, setInterval] = useState('24h');
  const botColors = {
    yellow_bot: 'orange',
    white_bot: 'black',
    green_bot: 'green',
    red_bot: 'red',
    blue_bot: 'blue',
    orange_bot: 'orange',
  };

  const handleIntervalChange = (event) => {
    setInterval(event.target.value);
  };

  const handleBotChange = (event) => {
    setSelectedBot(event.target.value);
  };

  const getChartData = () => {
    if (!data) return { labels: [], datasets: [] };

    return {
      labels: data.bots.map((bot) => bot.name),
      datasets: [
        {
          label: `Доходность ${selectedBot}`,
          data: data.bots.map((bot) => bot[interval]),
          borderColor: botColors[selectedBot],
          fill: false,
        },
      ],
    };
  };

  return (
    <Container className="container" maxWidth="md">
      <Box>
        <Box className="header">
          <MenuIcon />
          <Typography variant="h4">Dashboard</Typography>
          <CachedIcon />
        </Box>

        <Box className="trading-capital">

          <Box>
            <Typography variant="h6" className="trading-capital-title">
              TRADING CAPITAL
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
              {data.trading_capital} {data.trading_capital_currency}
            </Typography>
          </Box>

          <Box className="balance-info">
            <Typography variant="h6" className="balance-text">
              BALANCE: {data.balance} <PaidIcon fontSize="small" />
            </Typography>
            <Typography variant="h6" className="balance-text">
              ON HOLD: {data.on_hold} <PaidIcon fontSize="small" />
            </Typography>
          </Box>

        </Box>
        
      </Box>
      <Typography variant="h4" gutterBottom className="chart-title">
        Данные доходности ботов
      </Typography>
      <Line data={getChartData()} />
      <Box className="bot-buttons">
        {data &&
          data.bots.map((bot) => (
            <Box
              key={bot.name}
              m={1}
              width={{ xs: '100%', sm: '45%', md: '30%' }}
            >
              <Button
                variant={selectedBot === bot.name ? 'contained' : 'outlined'}
                onClick={() => handleBotChange({ target: { value: bot.name } })}
                style={{ width: '100%' }}
              >
                {bot.name}
              </Button>
            </Box>
          ))}
      </Box>
      <Box>
        <Button
          className="interval-buttons"
          variant="contained"
          value="24h"
          onClick={handleIntervalChange}
        >
          24 часа
        </Button>
        <Button
          className="interval-buttons"
          variant="contained"
          value="7d"
          onClick={handleIntervalChange}
        >
          7 дней
        </Button>
        <Button
          className="interval-buttons"
          variant="contained"
          value="30d"
          onClick={handleIntervalChange}
        >
          30 дней
        </Button>
        <Button
          className="interval-buttons"
          variant="contained"
          value="all_time"
          onClick={handleIntervalChange}
        >
          Все время
        </Button>
      </Box>
    </Container>
  );
};

export default App;
