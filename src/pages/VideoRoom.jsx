

import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const VideoRoom = () => {
  const meetingRef = useRef(null);
  const { roomID } = useParams();
  useEffect(() => {
    const loadZego = async () => {
      if (!window.ZegoUIKitPrebuilt) {
        const script = document.createElement("script");
        script.src =
          "https://unpkg.com/@zegocloud/zego-uikit-prebuilt/zego-uikit-prebuilt.js";
        script.async = true;
        document.body.appendChild(script);

        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
        });
      }

      if (!window.ZegoUIKitPrebuilt) {
        console.error("Zego SDK not loaded");
        return;
      }

      const appID = 123456789; // Yuvraj AppID (ensure this is correct for your project)
      const serverSecret = "e8f11d38868f2802a80160969ed39f64";

      const expireAt = (Math.floor(Date.now() / 1000) + 60 * 60).toString(); // 1 hour from now (in seconds)

      const kitToken = window.ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID || "default-room",
        expireAt,
        `user-${Math.floor(Math.random() * 10000)}`
      );

      console.log("Zego: appID", appID, "roomID", roomID, "expireAt", expireAt);
      console.log("Zego: kitToken", kitToken);

      try {
        const zp = window.ZegoUIKitPrebuilt.create(kitToken);

        // joinRoom may throw or fail internally; wrap to surface errors
        const joinResult = zp.joinRoom({
          container: meetingRef.current,
          scenario: {
            mode: window.ZegoUIKitPrebuilt.VideoConference,
          },
        });

        console.log("Zego: joinRoom called", joinResult);
      } catch (err) {
        console.error("Zego: failed to join room", err);
      }
    };

    loadZego();
  }, []);

  return <div ref={meetingRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default VideoRoom;


