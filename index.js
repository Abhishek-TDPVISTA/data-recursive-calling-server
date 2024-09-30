import fs from 'fs';
import axios from 'axios';

const channelIds = [
  'UCWt-NtWi-YB8KpXRX1oP8Vg',
  'UChFeutaq6_XfEvYx3VEHkvQ',
  'UCpgdy5wNn4oaME4MyzPZ9TA',
  'UCmekdIK9GY5EufNrjmWoSoQ',
  'UC98IYlshOXvWyXmM4eSDyNQ',
  'UCjDpT8o2_PJq-MrWmq6VF8Q',
  'UCnvhoDDLDjmMo5_tlEvRbxQ',
  'UCG0i_srk6N6XgbdKt0R4P3g',
  'UCtJ7izhohOhJzOVB49UbFHQ',
  'UCQu1-14oFwXfW69HPo_t7sw',
  'UCy55ba__XkvFiAW9B78jxsw',
  'UCQGKOqD_yMLIOluZauHUBjQ',
  'UCK7iCgfQQsBnwuD6w4doHAw',
  'UClxpF-YK6nA-tp4dy2s1cKg',
  'UCpK9BDYFE4dcF_sKInXoxbA',
  'UCGt6OunIlOyqQLMDAw5rAvQ',
  'UCuK_w0o4ync87plEZWYrUSg',
  'UCNDvVy2TKCuJTUnAetKkIAg',
  'UCA1JUCJKmGjih2sM5n1duJg',
  'UC-uNMFfk7lpSIpuC_EBBwjA',
  'UC1lrbncSy1BWnCNMyM2NqqQ',
  'UCHSvhtNPp77Dwysh9jSN-bA',
  'UCFxemP-PwSdE-4MIrfN2KHg',
  'UCZjeHtw5ZS1d4MaI6WK2MxA',
  'UCSsQy5PyHxwt4V7PigQLSOA',
  'UC3WaOrbWFd4gJqJc4EHaAIw',
  'UCPeHtWLKWK7S_PV_DvCXxnA',
  'UCZ2n6UaTdNYLYyIB4ZhNM4Q',
  'UCGdIjfagNUEeK8ZR_K7VWeA',
  'UCHdHf5RbtKxgaAm9aQEKaVA',
  'UCEw_YKybZRqi2RwJzljk-Ew',
  'UCWQ73B8TKnPjRu6oisTY43g',
  'UCoKGzKenFjmH4NLEVd9sX3g',
  'UCTj8B_lzn80AR4h_i8vcy4g',
  'UCodBDtYUuhigSVKksHpYMTw',
  'UCDoA-VDjK2aD7NI8AUCaqvA',
  'UCte7mxjLtGSl0l_UFX_KfyQ',
  'UCG7XV2UBYdZM-c6vdwTEAEw',
  'UCG7XV2UBYdZM-c6vdwTEAEw',
  'UCWGM8313sRCbKrFQRlFk0lQ',
  'UCh8BfDptIoCwCZPr-VQY91Q',
  'UC0HyabXpupX0ImuEy94E0OQ',
  'UCSSU17J3BF6RjuoOzyJBtWw',
  'UCSQi81UB17N5E9dcmWQqOfA',
  'UCqEpLqrNHrQIxmlTml_2ydw',
  'UCdFhgfsU-oh8DEv_DA9QTrQ',
  'UCfbcbEIGrV8jWr4u9ejmKmg',
  'UC0Po6aUH1m6_X-1uizJWNTA',
  'UCqEm-cr0PJ4pFwuWGLKvmew',
  'UC7ZGBanoTIuq1_HMiFJKCIw',
  'UCBtNaFEMqd017VXYhDKQGvA',
  'UCm0BloxESCVb4OwFOII16Ww',
  'UCI7IwAKVPJGIwAf7Q-pfLCg',
  'UCbNMVhn0P-9hC4ag2kcfqlA',
  'UCYykkRe6qYknnJZs41jLHlA',
  'UCeoSs4j5U_0IG2fXY1Zrb7g',
  'UCzmxbCRCv_F8t3OBnSh4kSQ',
  'UCz2CXVqAmXd60icvdwNsrOQ',
  'UCxUq3mgDJQoQz3mm7eFANUg',
  'UCbdzynO0gd2WKAQ_pwAou3w',
  'UCYwgG0Yn5_UG91Lr6aUJGzw',
  'UCHdB3m19nofHdrhKR94i0uA',
  'UC6dJEm5vT6den-5pOlqVDBw',
  'UC5wi2srAmQc4Yy2vAArscsQ',
  'UCHBchadr4LRnDsH_xHulXFA',
  'UCAmsIlLKOhCYNMKJveuPTPw',
  'UCJ7Mh9wWRzCyy5mOJw8NuNg',
  'UCbK9ULNpnPKbUlv3HbnLtcw',
  'UChJRDTWVS8JaDbhsclfTUKg',
  'UCw5_yzVcT8wDJ3mCbYQBnfg',
  'UCON_gtDQSNnWS1gwBcqgRKg',
  'UCEuSLR125Q7Boe1ljevF0tA',
  'UCOVzZ13MqjC26F_Qp4f03Yg',
  'UCpxYT5ZsN4YhLfHd52cz75g',
  'UC1RBej3dtZOJrnsCWzgz1DQ',
  'UC8dzuCib0JtYOba641sqd1g',
  'UCmvXitY0XLYHr9xZcVIJ0TQ',
  'UCG6Q-1cGryJntcjRNXrhGRQ',
  'UCPtMXS-uCNZYJE8moxeeBIw',
  'UCJ973uhz6Cym9lQYeM077GA',
  'UCWy7-enhZgiwW7wQj82xqKQ',
  'UCefwHBWfv98twiv6muJnwhQ',
  'UCZte1uhEjZUafcmOWjAhLag',
  'UCSbq2Af0zuxcywafXYe8KPg',
  'UCCN3_OrWlBZB1edEdcyMhZg',
  'UCeyqjoLtEipIp8VdKiUFW3g',
  'UC8RPPDm4Tgapblch6a7B4Iw',
  'UCsC0cYmi5xOu0pNu4DoVZlw',
  'UCUlGF1am1b0svFXI1ZeKu-A',
  'UCJ4on9WruGhPYFmQga5QP9g',
  'UCKkASYweDWH_Nqo8rr0SIDA',
  'UCbsk3CGxOjGbWWaiYkFhavQ',
  'UCPTw_UvDWKCYtWfZQAOi7pg',
  'UCvVEcGPPEkn3zSdc-rniGMg',
  'UCQfE97UMDGgKCFb7iGM8Btg',
];

const logFile = 'youtube_api_log.txt';

async function fetchChannelData(channelId) {
  try {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/channels`, {
      params: {
        part: 'snippet,statistics',
        id: channelId,
      }
    });

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

async function processChannels() {
  for (const channelId of channelIds) {
    const result = await fetchChannelData(channelId);

    if (result.success) {
      console.log(`Success for channel ${channelId}:\n${JSON.stringify(result.data, null, 2)}\n\n`);
      fs.appendFileSync(logFile, `Success for channel ${channelId}:\n${JSON.stringify(result.data, null, 2)}\n\n`);
    } else {
      console.error(`Failed for channel ${channelId}:\n${result.error}\n\n`);
      fs.appendFileSync(logFile, `Failed for channel ${channelId}:\n${result.error}\n\n`);
    }
  }
}

processChannels().then(() => console.log('Processing complete. Check the log file for results.'));
