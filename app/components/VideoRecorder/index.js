import React, { memo, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import api from 'api';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'antd';

// records video and sends it to server every 5 seconds
function VideoRecorder(props) {
  const mimeType = 'video/webm';
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState('inactive');
  const [stream, setStream] = useState(null);
  const [permission, setPermission] = useState(false);
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const filename = new Date().getTime().toString();
  let chunkIndex = 0;

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

    setRecordingStatus('recording');
    mediaRecorder.current.start(5000); // raises dataavailable event every 5 seconds

    mediaRecorder.current.ondataavailable = async event => {
      if (typeof event.data === 'undefined') return;
      if (event.data.size === 0) return;

      const videoBlob = event.data;

      // set the filename
      const videoName = `${filename}-${chunkIndex}.webm`;
      chunkIndex++;

      // send vdieoBlob to server here
      let path;
      if (props.readingMaterial) {
        path = `/video/reading-material/${props.topicId}/${props.conceptId}/${
          props.rmId
        }/${videoName}`;
      } else if (props.practise) {
        path = `/video/practise/${props.topicId}/${props.conceptId}/${
          props.gameId
        }/${props.level}/${videoName}`;
      } else if (props.graded) {
        path = `/video/graded/${props.topicId}/${props.conceptId}/${
          props.gameId
        }/${videoName}`;
      } else {
        // invalid props
        console.log('VideoRecorder: Invalid props');
        return;
      }

      try {
        const response = await api.post(path, videoBlob, {
          headers: {
            'Content-Type': 'video/webm',
            Authorization: localStorage._UFT_,
          },
          withCredentials: true,
        });
      } catch (err) {
        console.log(err);
      }
    };
  };

  const stopRecording = async () => {
    setRecordingStatus('inactive');
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
