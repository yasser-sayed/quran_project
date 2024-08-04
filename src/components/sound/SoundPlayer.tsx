import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Flex } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../state-management/hooks";
import { setAudioIndex } from "../../state-management/soundSlices/soundPlayerSlice";
import Loading from "../Loading";

const SoundPlayer = () => {
  const { playList, playingAudio, audioIndex } = useAppSelector(
    (state) => state.soundPlayer
  );
  const dispatch = useAppDispatch();

  const nextAudio = () => {
    dispatch(setAudioIndex(audioIndex + 1));
    if (audioIndex >= playList.length - 1) {
      dispatch(setAudioIndex(0));
    } else {
      dispatch(setAudioIndex(audioIndex + 1));
    }
  };

  const prevAudio = () => {
    if (audioIndex < 1) {
      dispatch(setAudioIndex(playList.length - 1));
    } else {
      dispatch(setAudioIndex(audioIndex - 1));
    }
  };

  return (
    <Flex
      position={"sticky"}
      bottom={0}
      w={"100%"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <AudioPlayer
        onEnded={nextAudio}
        defaultCurrentTime={<Loading divMinHight="unset" loaderSize={10} />}
        defaultDuration={<Loading divMinHight="unset" loaderSize={10} />}
        className="audioPlayer bg-[#101010]"
        autoPlay
        customAdditionalControls={[<p>{playingAudio?.name}</p>]}
        src={playingAudio?.src}
        onClickNext={nextAudio}
        onClickPrevious={prevAudio}
        showSkipControls
      />
    </Flex>
  );
};

export default SoundPlayer;
