import React, { useRef, useEffect, useState } from "react";
import axios from 'axios';
import { Button, Input, Modal, Form, Spin } from 'antd'; // Import Spin
import { CaretRightOutlined } from '@ant-design/icons';
import { useMemories } from "../hooks/useMemories";

const DEBUG = true;

const VideoComponent = () => (
  <div>
    <video autoPlay loop muted playsInline style={{ width: "100%", height: "100vh", objectFit: "contain", position: "fixed", top: "0", left: "0", zIndex: "-1" }}>
      <source src="martian_sculptures10000-2220a.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
);

const LittleMartian = () => {
  const [answer, setAnswer] = useState<string | null>(null); 
  const [question, setQuestion] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isQAVisible, setIsQAVisible] = useState(true);
  const [videoSrc, setVideoSrc] = useState("");
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAsking, setIsAsking] = useState(false);
  
  const { memories, isLoading, mutate } = useMemories();
  const [playMemories, setPlayMemories] = useState(false);
  const [currentMemoryIndex, setCurrentMemoryIndex] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const handleButtonClick = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleToggleMemories = () => {
    if (!playMemories) {
      setCurrentMemoryIndex(Math.floor(Math.random() * memories.length));
      setPlayMemories(true);
    } else {
      setPlayMemories(false);
    }
  }

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused || audioRef.current.ended) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleOk = async () => {
    setIsModalVisible(false);
    setPlayMemories(false);
    setQuestion("");
    setIsAsking(true); 
    
    const audio = new Audio();

    try {
      const response = await axios.post("/api/martian", { question: text });
      const blob = new Blob([Buffer.from(response.data.audio, 'base64')], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);
  
      audio.src = url;
      audioRef.current = audio;
      setAudioSrc(url);
      setIsPlaying(true);
      
      audio.play();
      setQuestion(text);
      setAnswer(response.data.answer);
      mutate();

    } catch(error) {
      console.error(error);
    }

    setIsAsking(false); // Set isLoading to false when we finish loading the audio
  };

  const playNextMemory = () => {
    if (memories && currentMemoryIndex < memories.length) {
      const memory = memories[currentMemoryIndex];
      const audio = new Audio();

      setQuestion(memory.question);
      setAnswer(memory.answer);
      audio.src = memory.audioUrl;
      audioRef.current = audio;
      setAudioSrc(memory.audioUrl);
      setIsPlaying(true);
      
      audio.play();
      setCurrentMemoryIndex((prevIndex) => {
        return prevIndex >= memories.length - 1 ? 0 : prevIndex + 1;
      });
    } else {
      setPlayMemories(false);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => {
        setIsPlaying(false);
        if (playMemories) playNextMemory();
      };
    }
  }, [audioSrc, playMemories, currentMemoryIndex]); 

  useEffect(() => {
    if (playMemories && memories) {
      setCurrentMemoryIndex(0);
      playNextMemory();
    }
  }, [playMemories]);

  useEffect(() => {
    document.body.style.backgroundColor = "blue";
    const screenheight = window.innerHeight;
    if(screenheight < 1000 && screenheight > 10) {
      setVideoSrc("new-vertical2_mobile.mp4");
    } else {
      setVideoSrc("new-vertical2.mp4");
    }
  }, []);
  
  return (
    <>
      <div style={{
        position: "fixed", 
        width: "100%", 
        bottom: "8%",
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center", 
        gap: "10px"
      }}>
        {question && isQAVisible && (
          <div style={{
            fontSize: "1.1em", 
            marginBottom: "10px", 
            color: "white", 
            backgroundColor: "rgba(0, 0, 0, 0.5)", 
            padding: "20px", 
            textAlign: "center",
            marginLeft: "10%", 
            marginRight: "10%" 
          }}>
            <div style={{ paddingBottom: "10px" }}>
              <b><i>{question}</i></b>
            </div>
            <div style={{ paddingBottom: "10px" }}>
              {answer}
            </div>
            {isAsking ? ( 
              <Spin />
            ) : (
              audioSrc && (
                <div style={{ paddingTop: "10px" }}>
                  <audio ref={audioRef} src={audioSrc} style={{ display: 'none' }}>
                    Your browser does not support the audio element.
                  </audio>
                  <Button 
                    onClick={handlePlayPause}
                    icon={<CaretRightOutlined rev={undefined} />}
                  />
                </div>
              )
            )}
          </div>
        )}
        <Button 
          size="large" type="primary" 
          style={{ 
            background: "red", 
            borderColor: "yellow", 
            fontSize: "1.35em", 
            padding: "6px 15px", 
            height: "auto"
          }} 
          onClick={handleButtonClick}
        >
          Ask Nebulana
        </Button>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          {question && (
            <Button 
              size="large" 
              type="default" 
              style={{ color: "black", borderColor: "yellow" }} 
              onClick={() => setIsQAVisible(!isQAVisible)}
            >
              {isQAVisible? "Hide dialogue" : "Show dialogue" }
            </Button>
          )}
          <Button 
            size="large" 
            type="default" 
            style={{ color: "black", borderColor: "yellow" }} 
            onClick={handleToggleMemories}
          >
            {playMemories? "Turn off autoplay" : "Autoplay memories" }
          </Button>
        </div>
      </div>
      <Modal 
        title="Ask Nebulana" 
        open={isModalVisible} 
        onOk={async () => handleOk()} 
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" style={{ background: "red", borderColor: "yellow" }} onClick={async () => handleOk()}>
            Submit
          </Button>
        ]}
      >
        <Form>
          <Form.Item>
            <Input placeholder="What is the meaning of life?" value={text} onChange={e => setText(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
      <VideoComponent />
      {DEBUG && memories && !isLoading && (
        <>
          <h2>Video: {videoSrc}</h2>          
          <h2>Memories</h2>
          <ul>
            {memories.map((memory: any, index: number) => (
              <li key={index}>
                <strong>Question:</strong> {memory.question} 
                <strong>Answer:</strong> {memory.answer} 
                <strong>Audio:</strong> {memory.audioUrl} 
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );

};

export default LittleMartian;
