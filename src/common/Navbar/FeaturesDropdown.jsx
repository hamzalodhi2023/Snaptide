import { Link } from "react-router-dom";
import {
  HiOutlineMicrophone,
  HiOutlineDownload,
  HiOutlineVideoCamera,
  HiOutlineTranslate,
  HiOutlineDocumentText,
} from "react-icons/hi";
import { IoLogoYoutube } from "react-icons/io";

function FeaturesDropdown({ setFeaturesDropdownOpen }) {
  const features = [
    {
      path: "/ai-transcription",
      icon: HiOutlineMicrophone,
      title: "AI-Transcription",
      description: "Convert audio to text",
    },
    {
      path: "/video-downloader",
      icon: HiOutlineDownload,
      title: "Video Downloader",
      description: "Download videos easily",
    },
    {
      path: "/video-to-text",
      icon: HiOutlineVideoCamera,
      title: "Video to Text",
      description: "Extract text from videos",
    },
    {
      path: "/tools/yt-downloader",
      icon: IoLogoYoutube,
      title: "YouTube Video Downloader",
      description: "Download YouTube videos",
    },
    {
      path: "/audio-to-text",
      icon: HiOutlineMicrophone,
      title: "Audio to Text",
      description: "Transcribe audio files",
    },
    {
      path: "/transcribe-translation",
      icon: HiOutlineTranslate,
      title: "Transcribe & Translation",
      description: "Transcribe and translate content",
    },
    {
      path: "/youtube-transcript",
      icon: HiOutlineDocumentText,
      title: "YouTube Transcript Generator",
      description: "Generate YouTube transcripts",
    },
  ];

  return (
    <div className="absolute top-full -left-52 mt-2 w-[90vw] max-w-[700px] bg-mint-800 shadow-xl border-2 border-mint-600 rounded-lg py-4 z-50 grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
      {features.map((feature) => (
        <Link
          key={feature.path}
          to={feature.path}
          className="flex items-start p-3 rounded-lg hover:bg-mint-700 transition-colors group"
          onClick={() => setFeaturesDropdownOpen(false)}
        >
          <div className="bg-mint-600 p-2 rounded-md mr-3 group-hover:bg-mint-500 transition-colors">
            <feature.icon className="w-5 h-5 text-mint-300" />
          </div>
          <div>
            <div className="font-medium text-white">{feature.title}</div>
            <div className="text-sm text-mint-200">{feature.description}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default FeaturesDropdown;
