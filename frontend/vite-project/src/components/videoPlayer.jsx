import { useEffect, forwardRef } from "react";

const VideoPlayer = forwardRef(({ socket }, ref) => {
  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      ref.current = new window.YT.Player("player", {
        height: "400",
        width: "800",
      });
    };

    socket.on("sync_state", ({ videoId, currentTime, isPlaying }) => {
      const player = ref.current;
      if (!player) return;

      const currentVideo = player.getVideoData().video_id;

      if (currentVideo !== videoId) {
        player.loadVideoById(videoId, currentTime);
      } else {
        player.seekTo(currentTime, true);
      }

      isPlaying ? player.playVideo() : player.pauseVideo();
    });

    return () => socket.off();
  }, []);

  return <div id="player"></div>;
});

export default VideoPlayer;