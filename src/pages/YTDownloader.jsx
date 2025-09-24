import { useState } from "react";
import {
  FaDownload,
  FaYoutube,
  FaPlay,
  FaClock,
  FaUser,
  FaEye,
  FaLink,
  FaSpinner,
} from "react-icons/fa";
import { toast } from "react-toastify";

function YTDownloader() {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoInfo, setVideoInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("");

  const formats = [
    { quality: "1080p", type: "mp4", label: "HD 1080p (MP4)" },
    { quality: "720p", type: "mp4", label: "HD 720p (MP4)" },
    { quality: "480p", type: "mp4", label: "SD 480p (MP4)" },
    { quality: "360p", type: "mp4", label: "SD 360p (MP4)" },
    { quality: "Audio", type: "mp3", label: "Audio MP3 (128kbps)" },
  ];

  const validateYouTubeUrl = (url) => {
    const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return pattern.test(url);
  };

  const extractVideoId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const fetchVideoInfo = async () => {
    if (!videoUrl.trim()) {
      toast.error("Please enter a YT URL");
      return;
    }

    if (!validateYouTubeUrl(videoUrl)) {
      toast.error("Please enter a valid YT URL");
      return;
    }

    setLoading(true);

    try {
      // Simulate API call - replace with your actual ytdl-core implementation
      const videoId = extractVideoId(videoUrl);

      // Mock video info - replace with actual ytdl-core data
      const mockVideoInfo = {
        title: "Sample YT Video Title",
        duration: "10:30",
        author: "Channel Name",
        views: "1.5M",
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        formats: formats,
      };

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setVideoInfo(mockVideoInfo);
      setSelectedFormat(formats[0].label);
      toast.success("Video information loaded successfully!");
    } catch (error) {
      toast.error("Failed to fetch video information");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (format) => {
    if (!videoInfo) return;

    setDownloading(true);

    try {
      // Simulate download process - replace with actual ytdl-core download
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success(`Downloading ${format.label}...`);

      // Actual download logic would go here using ytdl-core
      // const stream = ytdl(videoUrl, { quality: format.quality });
      // ... download implementation
    } catch (error) {
      toast.error("Download failed. Please try again.");
      console.error(error);
    } finally {
      setDownloading(false);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setVideoUrl(text);
    } catch (err) {
      toast.error("Unable to paste from clipboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-900 to-mint-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-red-500/20 p-4 rounded-full">
              <FaYoutube className="w-12 h-12 text-red-500" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-nunito font-bold text-white mb-3">
            YT Video Downloader
          </h1>
          <p className="text-mint-200 text-lg">
            Download YT videos in high quality for free
          </p>
        </div>

        {/* URL Input Section */}
        <div className="bg-mint-800 rounded-xl p-6 mb-8 border border-mint-700 shadow-lg">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <FaLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mint-400 w-5 h-5" />
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="Paste YT URL here..."
                  className="w-full bg-mint-700 border border-mint-600 rounded-lg py-3 pl-10 pr-4 text-white placeholder-mint-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handlePaste}
                className="px-4 py-3 bg-mint-600 hover:bg-mint-500 text-white rounded-lg transition-colors whitespace-nowrap"
              >
                Paste
              </button>
              <button
                onClick={fetchVideoInfo}
                disabled={loading}
                className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <FaSpinner className="w-4 h-4 animate-spin" />
                ) : (
                  <FaPlay className="w-4 h-4" />
                )}
                {loading ? "Loading..." : "Get Video"}
              </button>
            </div>
          </div>
        </div>

        {/* Video Info Section */}
        {videoInfo && (
          <div className="bg-mint-800 rounded-xl p-6 mb-8 border border-mint-700 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Thumbnail */}
              <div className="lg:col-span-1">
                <img
                  src={videoInfo.thumbnail}
                  alt={videoInfo.title}
                  className="w-full h-48 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = `https://img.youtube.com/vi/${extractVideoId(
                      videoUrl
                    )}/hqdefault.jpg`;
                  }}
                />
              </div>

              {/* Video Details */}
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold text-white mb-3 line-clamp-2">
                  {videoInfo.title}
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-mint-300">
                    <FaUser className="w-4 h-4" />
                    <span className="text-sm">{videoInfo.author}</span>
                  </div>
                  <div className="flex items-center gap-2 text-mint-300">
                    <FaClock className="w-4 h-4" />
                    <span className="text-sm">{videoInfo.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-mint-300">
                    <FaEye className="w-4 h-4" />
                    <span className="text-sm">{videoInfo.views} views</span>
                  </div>
                </div>

                {/* Format Selection */}
                <div className="mb-4">
                  <label className="block text-mint-200 mb-3 font-medium">
                    Select Download Quality:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {formats.map((format, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedFormat(format.label)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedFormat === format.label
                            ? "border-red-500 bg-red-500/10"
                            : "border-mint-600 bg-mint-700 hover:border-mint-500"
                        }`}
                      >
                        <div className="text-white font-medium text-sm">
                          {format.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={() =>
                    handleDownload(
                      formats.find((f) => f.label === selectedFormat)
                    )
                  }
                  disabled={downloading || !selectedFormat}
                  className="w-full bg-red-600 hover:bg-red-500 text-white py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {downloading ? (
                    <FaSpinner className="w-5 h-5 animate-spin" />
                  ) : (
                    <FaDownload className="w-5 h-5" />
                  )}
                  {downloading
                    ? "Downloading..."
                    : `Download ${selectedFormat}`}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-mint-800 p-6 rounded-lg border border-mint-700 text-center">
            <div className="bg-blue-500/20 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <FaDownload className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">High Quality</h3>
            <p className="text-mint-300 text-sm">
              Download videos up to 1080p HD quality
            </p>
          </div>

          <div className="bg-mint-800 p-6 rounded-lg border border-mint-700 text-center">
            <div className="bg-green-500/20 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <FaYoutube className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Fast Download</h3>
            <p className="text-mint-300 text-sm">
              Quick processing and fast download speeds
            </p>
          </div>

          <div className="bg-mint-800 p-6 rounded-lg border border-mint-700 text-center">
            <div className="bg-purple-500/20 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <FaPlay className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Multiple Formats</h3>
            <p className="text-mint-300 text-sm">
              MP4 video and MP3 audio formats available
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-mint-800 rounded-xl p-6 border border-mint-700">
          <h3 className="text-white font-semibold mb-4 text-lg">
            How to Download:
          </h3>
          <ol className="text-mint-300 space-y-2 list-decimal list-inside">
            <li>Copy the YT video URL from your browser</li>
            <li>Paste the URL in the input field above</li>
            <li>Click "Get Video" to load video information</li>
            <li>Select your preferred download quality</li>
            <li>Click "Download" to save the video to your device</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default YTDownloader;
