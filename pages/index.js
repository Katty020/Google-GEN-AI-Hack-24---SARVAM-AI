import { Container, Typography, Button, Box, AppBar, Toolbar } from '@mui/material';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from '../styles/Home.module.css'; // Import the CSS module for the dots animation

export default function Home() {
  return (
    <Box className={styles.dotsBackground} sx={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <AppBar position="static" sx={{ background: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'black', fontWeight: 'bold' }}>
            SARVAM.AI
          </Typography>
          <Link href="/create-course" passHref>
            <Button variant="contained" color="primary">
              Create Course
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center', color: 'black' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Gen AI Exchange Hackathon by Google
          </Typography>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            Problem statement shared by Sarvam AI
          </Typography>
          <Link href="/create-course" passHref>
            <Button variant="contained" color="primary" sx={{ mt: 3 }}>
              Create Course
            </Button>
          </Link>
        </motion.div>
        <Box component="footer" sx={{ width: '100%', mt: 4, textAlign: 'center', py: 2, flexShrink: 0 }}>
    <a href="https://www.linkedin.com/in/aryan-katiyar-aa4202254/" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>
      <i className="fab fa-linkedin" style={{ fontSize: '30px' }}></i>
    </a>
    <a href="https://github.com/Katty020" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>
      <i className="fab fa-github" style={{ fontSize: '30px' }}></i>
    </a>
  </Box>
      </Container>
    </Box>
  );
}