import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IReciter } from "../lib/types";
import { useAppDispatch } from "../state-management/hooks";
import {
  likeReciter,
  removeReciterLike,
} from "../state-management/userDetSlice/userDetSlice";

type LoveAnimationProps = {
  reciter: IReciter;
  className: string;
  isLoved: boolean;
};

const LoveAnimation = ({ reciter, className, isLoved }: LoveAnimationProps) => {
  const dispatch = useAppDispatch();

  const handleLikeClick = () => {
    if (isLoved) {
      dispatch(removeReciterLike(reciter));
    } else {
      dispatch(likeReciter(reciter));
    }
  };

  return (
    <button
      onClick={handleLikeClick}
      className={`relative w-[30px] h-[26.25px] focus:outline-none ${className}`}
    >
      <div
        className={`absolute inset-0 text-gray-400 transition-all duration-150 ${
          isLoved ? "text-transparent" : ""
        }`}
      >
        <FaRegHeart className="text-3xl" />
      </div>
      <div
        className={`absolute inset-0 text-red-600 transition-all duration-100 transform ${
          isLoved ? "animate-fillHeart" : "scale-0"
        }`}
      >
        <FaHeart className="text-3xl" />
      </div>
    </button>
  );
};

export default LoveAnimation;
