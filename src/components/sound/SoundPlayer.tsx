import AudioPlayer, {
  ActiveUI,
  // InterfaceGridTemplateArea,
  // PlayerPlacement,
  // PlayListPlacement,
  ProgressUI,
  // VolumeSliderPlacement
} from "react-modern-audio-player";
// import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import { useAppSelector } from "../../state-management/hooks";

const SoundPlayer = () => {
  const [progressType] = useState<ProgressUI>("waveform");
  // const [playerPlacement, setPlayerPlacement] = useState<PlayerPlacement>(
  //   "bottom-left"
  // );
  // const [interfacePlacement, setInterfacePlacement] = useState<
  // InterfaceGridTemplateArea
  // >();
  // const [playListPlacement, setPlayListPlacement] = useState<PlayListPlacement>(
  //   "bottom"
  // );
  // const [volumeSliderPlacement, setVolumeSliderPlacement] = useState<
  //   VolumeSliderPlacement
  // >();
  // const [theme, setTheme] = useState<"dark" | "light" | undefined>();
  // const [width, setWidth] = useState("100%");
  const [activeUI] = useState<ActiveUI>({ all: true });
  const { playList } = useAppSelector((state) => state.soundPlayer);

  return (
    <Flex
      position={"sticky"}
      bottom={0}
      w={"100%"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <AudioPlayer
        playList={playList}
        activeUI={{
          ...activeUI,
          progress: progressType,
        }}
        // placement={{
        //   player: playerPlacement,
        //   interface: {
        //     templateArea: interfacePlacement
        //   },
        //   playList: playListPlacement,
        //   volumeSlider: volumeSliderPlacement
        // }}
        // rootContainerProps={{
        //   colorScheme: theme,
        //   width
        // }}
      />
    </Flex>
  );
};

export default SoundPlayer;
