import { type NextPage } from "next";
import { api } from "~/utils/api";

const NewAnalysis: NextPage = () => {
  const uploadVideo = api.videos.uploadVideo.useMutation();

  const handleSubmit = () => {
    uploadVideo.mutate();
  };

  const { data: videos } = api.videos.getVideo.useQuery();

  return (
    <>
      <h1>NewAnalysis</h1>
      <form className="flex flex-col gap-[20px] " onSubmit={handleSubmit}>
        <button
          type="submit"
          className="rounded-md bg-blue-800 px-4 py-3 text-white"
        >
          Submit
        </button>
      </form>
      <br />

      {videos?.map((video) => (
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        <video
          key={video.id}
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          src={video.videoUrl!}
          height={800}
          width={800}
        ></video>
      ))}
    </>
  );
};

export default NewAnalysis;
