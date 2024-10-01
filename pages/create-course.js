import { useState } from 'react';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Button,
  Box,
  CircularProgress,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Paper,
} from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from '../styles/CreateCourse.module.css'; // Import the CSS module for additional styling
import ThreeScene from '../components/ThreeScene'; // Import the ThreeScene component
import WaveAnimation from '../components/WaveAnimation';
// _app.js or main entry file
import '@fortawesome/fontawesome-free/css/all.min.css';
export default function CreateCourse() {
  const [courseContent, setCourseContent] = useState('');
  const [translatedContent, setTranslatedContent] = useState('');
  const [language, setLanguage] = useState('hi'); // Default to Hindi
  const [image, setImage] = useState(null);
  const [voiceover, setVoiceover] = useState(null);
  const [lectureNotes, setLectureNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleTranslate = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/translate', { text: courseContent, targetLang: language });
      setTranslatedContent(response.data.translatedText);
    } catch (error) {
      console.error('Error in handleTranslate:', error.response ? error.response.data : error.message);
    }
    setLoading(false);
  };

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleVoiceover = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/voiceover', { text: translatedContent });
      setVoiceover(response.data.voiceoverUrl);
    } catch (error) {
      console.error('Error in handleVoiceover:', error.response ? error.response.data : error.message);
    }
    setLoading(false);
  };

  const handleLectureNotes = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/lecture-notes', { text: translatedContent });
      setLectureNotes(response.data.notes);
    } catch (error) {
      console.error('Error in handleLectureNotes:', error.response ? error.response.data : error.message);
    }
    setLoading(false);
  };

  const handleRingClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <Box className={styles.dotsBackground} sx={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Gen AI Hackathon
          </Typography>
          <Link href="/create-course" passHref>
            <Button variant="contained" color="primary">
              Create Course
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Container>
        <Box sx={{ mt: 5 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h4" gutterBottom>
              Create Course
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Paper elevation={3} sx={{ p: 3, mb: 3, backgroundColor: '#ffffff' }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <TextField
                  label="Course Content"
                  multiline
                  rows={4}
                  fullWidth
                  value={courseContent}
                  onChange={(e) => setCourseContent(e.target.value)}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Language</InputLabel>
                  <Select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    label="Language"
                  >
                    <MenuItem value="hi">Hindi</MenuItem>
                    <MenuItem value="ta">Tamil</MenuItem>
                    <MenuItem value="te">Telugu</MenuItem>
                    <MenuItem value="ml">Malayalam</MenuItem>
                    <MenuItem value="kn">Kannada</MenuItem>
                  </Select>
                </FormControl>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button variant="contained" color="primary" onClick={handleTranslate} disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : 'Translate'}
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <TextField
                  label="Translated Content"
                  multiline
                  rows={4}
                  fullWidth
                  value={translatedContent}
                  variant="outlined"
                  sx={{ mt: 2, mb: 2 }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <input type="file" onChange={handleImageUpload} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <Button variant="contained" color="primary" onClick={handleVoiceover} disabled={loading} sx={{ mt: 2 }}>
                  {loading ? <CircularProgress size={24} /> : 'Generate Voiceover'}
                </Button>
              </motion.div>
              {voiceover && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  <audio src={voiceover} controls sx={{ mt: 2 }} />
                </motion.div>
              )}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.4 }}
              >
                <Button variant="contained" color="primary" onClick={handleLectureNotes} disabled={loading} sx={{ mt: 2 }}>
                  {loading ? <CircularProgress size={24} /> : 'Generate Lecture Notes'}
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.6 }}
              >
                <TextField
                  label="Lecture Notes"
                  multiline
                  rows={4}
                  fullWidth
                  value={lectureNotes}
                  variant="outlined"
                  sx={{ mt: 2 }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </motion.div>
            </Paper>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
           <Box component="footer" sx={{ width: '100%', mt: 4, textAlign: 'center', py: 2, backgroundColor: '#f8f9fa' }}>
              <a href="https://www.linkedin.com/in/aryan-katiyar-aa4202254/" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>
                <i className="fab fa-linkedin" style={{ fontSize: '30px' }}></i>
              </a>
              <a href="https://github.com/Katty020" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>
                <i className="fab fa-github" style={{ fontSize: '30px' }}></i>
              </a>
            </Box>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}