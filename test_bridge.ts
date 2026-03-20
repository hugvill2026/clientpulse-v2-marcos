import axios from 'axios';

const testUrl = 'https://script.google.com/macros/s/AKfycbzoGj49Iy0iew-7Ngsih6q4CnIj4DcrgPSkxjv4uUTDGRxKOo4MupGDQWPM-8gGhgix/exec';

async function testBridge() {
  try {
    const response = await axios.post(testUrl, {
      type: 'USER',
      payload: {
        fullName: 'Test Agent Verification',
        email: 'test@antigravity.ai'
      }
    });
    console.log('Response Status:', response.status);
    console.log('Response Data:', response.data);
  } catch (e) {
    console.error('Bridge failed:', e.message);
  }
}

testBridge();
