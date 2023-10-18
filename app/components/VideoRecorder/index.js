import React, { memo, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import api from 'api';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'antd';

// records video and sends it to server every second
function VideoRecorder(props) {
  const mimeType = 'video/webm;codecs=vp8,opus';
  const mediaRecorder = useRef(null);
  const [stream, setStream] = useState(null);
  const [permission, setPermission] = useState(false);
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const videoName = useRef(`${new Date().getTime().toString()}.webm`);

  const getCameraPermission = async () => {
    if ('MediaRecorder' in window) {
      try {
        const videoConstraints = {
          audio: true,
          video: {
            facingMode: 'user',
            width: { max: 640 },
            height: { max: 480 },
            frameRate: { max: 24 },
          },
        };
        const videoStream = await navigator.mediaDevices.getUserMedia(
          videoConstraints,
        );
        setStream(videoStream);
        setPermission(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log('The MediaRecorder API is not supported in your browser.');
    }
  };

  const startRecording = async () => {
    const media = new MediaRecorder(stream, { mimeType });
    mediaRecorder.current = media;

    mediaRecorder.current.start();

    // initial requstData call
    setTimeout(mediaRecorder.current.requestData(), 1000);

    mediaRecorder.current.ondataavailable = async event => {
      if (typeof event.data === 'undefined' || event.data.size === 0) {
        if (mediaRecorder.current.state === 'recording')
          setTimeout(mediaRecorder.current.requestData(), 1000);
        return;
      }

      // send vdieoBlob to server
      const fd = new FormData();
      fd.append('video', event.data, `${videoName.current}`);
      fd.append('topicId', props.topicId);
      fd.append('conceptId', props.conceptId);
      
      let path;
      if (props.readingMaterial) {
        path = 'video/reading-material';
        fd.append('rmId', props.rmId);
      } else if (props.practise) {
        path = 'video/practise';
        fd.append('gameId', props.gameId);
        fd.append('level', props.level);
      } else if (props.graded) {
        path = 'video/graded';
        fd.append('gameId', props.gameId);
      } else {
        // invalid props
        console.log('VideoRecorder: Invalid props');
        return;
      }

      try {
        const response = await api.post(path, fd, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: localStorage._UFT_,
          },
          withCredentials: true,
        });

        // subsequent requestData call on successful upload after 1s
        if (mediaRecorder.current.state === 'recording')
          setTimeout(mediaRecorder.current.requestData(), 1000);
      } catch (err) {
        console.log(err);
      }
    };
  };

  const stopRecording = async () => {
    mediaRecorder.current.stop();
  };

  useEffect(() => {
    setPolicyAccepted(localStorage.getItem('policyAccepted'));
    setShowPopup(!localStorage.getItem('videoFootagePopupShown'));
  }, []);

  useEffect(() => {
    if (policyAccepted)
      getCameraPermission();
  }, [policyAccepted]);

  useEffect(() => {
    if (permission) {
      startRecording();
      return () => {
        stopRecording();
        stream.getTracks().forEach(track => track.stop());
      };
    }
  }, [permission]);

  return (
    <Modal
      title="Permission for collecting Video Footage"
      centered
      visible={showPopup}
      maskClosable={false}
      onOk={() => {
        localStorage.setItem('policyAccepted', true);
        localStorage.setItem('videoFootagePopupShown', true);
        setPolicyAccepted(true);
        setShowPopup(false);
      }}
      onCancel={() => {
        localStorage.setItem('videoFootagePopupShown', true);
        setShowPopup(false);
      }}
    >
      <p>
        Please carefully read the{' '}
        <Link to="/policy/terms-of-service" target="_blank">
          Terms Of Service
        </Link>{' '}
        and{' '}
        <Link to="/policy/privacy-policy" target="_blank">
          Privacy Policy
        </Link>{' '}
        before providing any video footage for research purposes to the website.
        By providing your footage, you acknowledge and agree to be bound by
        these terms.
      </p>
    </Modal>
  );
}

VideoRecorder.propTypes = {
  readingMaterial: PropTypes.bool,
  practise: PropTypes.bool,
  graded: PropTypes.bool,
  topicId: PropTypes.string,
  conceptId: PropTypes.string,
  rmId: PropTypes.string,
  gameId: PropTypes.string,
  level: PropTypes.string,
};

export default memo(VideoRecorder);
