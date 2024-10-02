import fs from 'fs';
import axios from 'axios';
import { config } from 'dotenv';

import testChannelIds from './TestChannelIDs.json' assert { type: "json" };

config();

const logFile = 'youtube_api_log.txt';

async function fetchChannelData(channelId) {
  try {
    const server_url = process.env.DATA_SERVER_URL;

    const response = await axios.post(`${server_url}/api/v1/add_yt_influncer`, {
      Channel_id: channelId
    });

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      error: error
    };
  }
}

async function processChannels() {
  for (const channelId of testChannelIds) {
    const result = await fetchChannelData(channelId);

    if (result.success) {
      console.log(`Success for channel ${channelId}:\n${JSON.stringify(result.data, null, 2)}\n\n`);
      fs.appendFileSync(logFile, `Success for channel ${channelId}:\n${JSON.stringify(result.data, null, 2)}\n\n`);
    } else {
      console.error(`Failed for channel ${channelId}:\n${JSON.stringify(result)}\n\n`);
      fs.appendFileSync(logFile, `Failed for channel ${channelId}:\n${JSON.stringify(result)}\n\n`);
    }
  }
}

processChannels().then(() => console.log('Processing complete. Check the log file for results.'));
