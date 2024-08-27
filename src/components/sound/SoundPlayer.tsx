import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Flex } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../state-management/hooks";
import {
  fixPlayListIndexs,
  setAudioIndex,
} from "../../state-management/soundSlices/soundPlayerSlice";
import Loading from "../Loading";
import { BounceLoader } from "react-spinners";
import { addLastPlayed } from "../../state-management/userDetSlice/userDetSlice";
import { IAudio } from "../../lib/types";
import { useEffect } from "react";

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

  useEffect(() => {
    dispatch(fixPlayListIndexs());
  }, []);

  return (
    <Flex
      position={"sticky"}
      bottom={0}
      w={"100%"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <AudioPlayer
        showJumpControls={!playingAudio?.live}
        onEnded={nextAudio}
        defaultCurrentTime={<Loading divMinHight="unset" loaderSize={10} />}
        defaultDuration={
          !playingAudio?.live ? (
            <Loading divMinHight="unset" loaderSize={10} />
          ) : (
            <Flex alignItems={"center"} justifyContent={"center"} gap={2}>
              <p>live</p>
              <BounceLoader color="red" size={15} />
            </Flex>
          )
        }
        className="audioPlayer bg-[#101010]"
        autoPlay
        customAdditionalControls={[<p>{playingAudio?.name}</p>]}
        src={playingAudio?.src}
        onClickNext={nextAudio}
        onClickPrevious={prevAudio}
        showSkipControls
        onCanPlay={() =>
          !playingAudio?.live && dispatch(addLastPlayed(playingAudio as IAudio))
        }
      />
    </Flex>
  );
};

export default SoundPlayer;
