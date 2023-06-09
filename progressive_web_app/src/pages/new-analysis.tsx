import { type NextPage } from "next";
import { api } from "~/utils/api";

const NewAnalysis: NextPage = () => {
  
  const blobVideo = api.videos.uploadVideo.useMutation()
  const handleSubmit = ()=>{
    blobVideo.mutate({url: "https://res.cloudinary.com/dfpitoil1/video/upload/v1667090291/a4rpifn9ljyi9tdpnbbg.mp4"})
  }
  
  return (
    <>
      <h1>NewAnalysis</h1>

      <form
        className="flex flex-col gap-[20px] "
        onSubmit={handleSubmit}
      >
        <button
          type="submit"
          className="rounded-md bg-blue-800 px-4 py-3 text-white"
        >
          Submit
        </button>
      </form>

    </>
  );
};

export default NewAnalysis;
