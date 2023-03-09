import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import {Videos, ChannelCard} from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';

const ChannelDetail = () => {
  const {id} = useParams();
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`)
      .then(data => {
        setChannelDetail(data?.items[0]);
      })

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
      .then(data => {
        setVideos(data?.items);
      })
  }, [id])

  return (
    <Box minHeight='95vh'>
      <Box>
        <div
          style={{
            height: '200px',
            zIndex: 10,
            background: 'linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)'
          }}
        >
        </div>
        <ChannelCard channelDetail={channelDetail} marginTop='-120px' />
      </Box>
      <Box m={1}>
        {/* <Box sx={{mr: {sm: '150px'}}} /> */}
        <Videos videos={videos} />
      </Box>
    </Box>
  )
}

export default ChannelDetail