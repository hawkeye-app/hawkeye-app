import Button from "../Button";
import CamBattery from "./CamBattery";
import Counter from "./Counter";
import { api } from "~/utils/api";
import axios from "axios";
import {
  type TRecordResponse,
  type TStopRecording,
} from "~/server/api/routers/videos";
import { useState } from "react";
import Image from "next/image";

type RecordingProps = {
  handleStep: () => void;
  step: number;
};

type CameraData = {
  message: string;
  file_url: string;
};

const Recording: React.FC<RecordingProps> = ({ handleStep, step }) => {
  const [recordData, setRecordData] = useState<string | null>();
  const [cameraInfo, setCameraInfo] = useState<CameraData | null>(null);

  async function startRecording() {
    try {
      handleStep;
      const record: TRecordResponse = await axios.get(
        "http://127.0.0.1:8000/record",
        {
          responseType: "json",
        }
      );
      if (record.message === "RecordStarted") {
        // Aquí puedes manipular los datos recibidos del backend
        setRecordData(record.message);
      }

      return;
    } catch (err: unknown) {
      console.log(err);
    }
  }
  async function callHawkeye() {
    try {
      const stopRecord: TStopRecording = await axios.get(
        "http://127.0.0.1:8000/stopRecording",
        {
          responseType: "json",
        }
      );
      if (stopRecord.message === "CameraConnected") {
        setCameraInfo({
          message: stopRecord.message,
          file_url: stopRecord.file_url,
        });
      }

      return;
    } catch (err: unknown) {
      console.log(err);
    }
  }
  return (
    <>
      {step === 1 ? (
        <section className="mx-auto my-auto flex h-screen w-full flex-col items-center justify-center gap-4 p-4">
          <h1 className="text-3xl font-semibold text-foreground-important">
            You are ready to start
          </h1>{" "}
          <p className="text-center text-foreground">
            Everything is set up to start your new analysis with Hawkeye live.
          </p>
          <div className="absolute bottom-0 flex w-full flex-col p-6 sm:static sm:w-auto sm:p-0">
            <Button
              label="Start recording"
              style="primary"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={startRecording}
            />
          </div>
        </section>
      ) : (
        <div className="flex h-screen w-full pt-[63px]">
          <section className="flex h-full w-full flex-col items-center justify-center gap-4">
            <h1 className="text-3xl font-semibold text-foreground-important">
              No hawkeye call yet
            </h1>
            <p className="text-foreground">
              Here you will see the clip of the point you want to analyze.
            </p>
          </section>
          <aside className="flex h-full w-96 flex-col border-l border-background-border">
            <div className="flex flex-grow flex-col items-center justify-center px-8 py-16">
              <Counter />
            </div>
            {cameraInfo && (
              <div>
                <Image
                  src={cameraInfo.file_url}
                  alt=""
                  width={50}
                  height={50}
                />
              </div>
            )}
            <hr className="border-background-border" />
            <section className="flex flex-col gap-4 p-8">
              <Button
                style="primary"
                label="Call hawkeye"
                icon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.0001 18.3333C8.8473 18.3333 7.76397 18.1146 6.75008 17.6771C5.73619 17.2396 4.85425 16.6458 4.10425 15.8958C3.35425 15.1458 2.7605 14.2639 2.323 13.25C1.8855 12.2361 1.66675 11.1528 1.66675 9.99999C1.66675 8.84721 1.8855 7.76388 2.323 6.74999C2.7605 5.7361 3.35425 4.85416 4.10425 4.10416C4.85425 3.35416 5.73619 2.76041 6.75008 2.32291C7.76397 1.88541 8.8473 1.66666 10.0001 1.66666C11.1529 1.66666 12.2362 1.88541 13.2501 2.32291C14.264 2.76041 15.1459 3.35416 15.8959 4.10416C16.6459 4.85416 17.2397 5.7361 17.6772 6.74999C18.1147 7.76388 18.3334 8.84721 18.3334 9.99999C18.3334 11.1528 18.1147 12.2361 17.6772 13.25C17.2397 14.2639 16.6459 15.1458 15.8959 15.8958C15.1459 16.6458 14.264 17.2396 13.2501 17.6771C12.2362 18.1146 11.1529 18.3333 10.0001 18.3333ZM10.0001 16.6667C11.8612 16.6667 13.4376 16.0208 14.7292 14.7292C16.0209 13.4375 16.6667 11.8611 16.6667 9.99999C16.6667 8.13888 16.0209 6.56249 14.7292 5.27082C13.4376 3.97916 11.8612 3.33332 10.0001 3.33332C8.13897 3.33332 6.56258 3.97916 5.27092 5.27082C3.97925 6.56249 3.33341 8.13888 3.33341 9.99999C3.33341 11.8611 3.97925 13.4375 5.27092 14.7292C6.56258 16.0208 8.13897 16.6667 10.0001 16.6667ZM10.0001 15C8.61119 15 7.43064 14.5139 6.45841 13.5417C5.48619 12.5694 5.00008 11.3889 5.00008 9.99999C5.00008 8.6111 5.48619 7.43055 6.45841 6.45832C7.43064 5.4861 8.61119 4.99999 10.0001 4.99999C11.389 4.99999 12.5695 5.4861 13.5417 6.45832C14.514 7.43055 15.0001 8.6111 15.0001 9.99999C15.0001 11.3889 14.514 12.5694 13.5417 13.5417C12.5695 14.5139 11.389 15 10.0001 15ZM10.0001 13.3333C10.9167 13.3333 11.7015 13.0069 12.3542 12.3542C13.007 11.7014 13.3334 10.9167 13.3334 9.99999C13.3334 9.08332 13.007 8.2986 12.3542 7.64582C11.7015 6.99305 10.9167 6.66666 10.0001 6.66666C9.08342 6.66666 8.29869 6.99305 7.64592 7.64582C6.99314 8.2986 6.66675 9.08332 6.66675 9.99999C6.66675 10.9167 6.99314 11.7014 7.64592 12.3542C8.29869 13.0069 9.08342 13.3333 10.0001 13.3333ZM10.0001 11.6667C9.54175 11.6667 9.14939 11.5035 8.823 11.1771C8.49661 10.8507 8.33342 10.4583 8.33342 9.99999C8.33342 9.54166 8.49661 9.1493 8.823 8.82291C9.14939 8.49652 9.54175 8.33332 10.0001 8.33332C10.4584 8.33332 10.8508 8.49652 11.1772 8.82291C11.5036 9.1493 11.6667 9.54166 11.6667 9.99999C11.6667 10.4583 11.5036 10.8507 11.1772 11.1771C10.8508 11.5035 10.4584 11.6667 10.0001 11.6667Z"
                      fill="#181B27"
                    />
                  </svg>
                }
                iconPosition="left"
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={callHawkeye}
              />
              <Button
                style="secondary"
                label="Finish recording"
                icon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.66675 13.3333H13.3334V6.66666H6.66675V13.3333ZM10.0001 18.3333C8.8473 18.3333 7.76397 18.1146 6.75008 17.6771C5.73619 17.2396 4.85425 16.6458 4.10425 15.8958C3.35425 15.1458 2.7605 14.2639 2.323 13.25C1.8855 12.2361 1.66675 11.1528 1.66675 9.99999C1.66675 8.84721 1.8855 7.76388 2.323 6.74999C2.7605 5.7361 3.35425 4.85416 4.10425 4.10416C4.85425 3.35416 5.73619 2.76041 6.75008 2.32291C7.76397 1.88541 8.8473 1.66666 10.0001 1.66666C11.1529 1.66666 12.2362 1.88541 13.2501 2.32291C14.264 2.76041 15.1459 3.35416 15.8959 4.10416C16.6459 4.85416 17.2397 5.7361 17.6772 6.74999C18.1147 7.76388 18.3334 8.84721 18.3334 9.99999C18.3334 11.1528 18.1147 12.2361 17.6772 13.25C17.2397 14.2639 16.6459 15.1458 15.8959 15.8958C15.1459 16.6458 14.264 17.2396 13.2501 17.6771C12.2362 18.1146 11.1529 18.3333 10.0001 18.3333ZM10.0001 16.6667C11.8612 16.6667 13.4376 16.0208 14.7292 14.7292C16.0209 13.4375 16.6667 11.8611 16.6667 9.99999C16.6667 8.13888 16.0209 6.56249 14.7292 5.27082C13.4376 3.97916 11.8612 3.33332 10.0001 3.33332C8.13897 3.33332 6.56258 3.97916 5.27092 5.27082C3.97925 6.56249 3.33341 8.13888 3.33341 9.99999C3.33341 11.8611 3.97925 13.4375 5.27092 14.7292C6.56258 16.0208 8.13897 16.6667 10.0001 16.6667Z"
                      className="fill-secondary-foreground transition-all duration-150 ease-out group-hover:fill-foreground"
                    />
                  </svg>
                }
                iconPosition="left"
              />
            </section>
            <hr className="border-background-border" />
            <section className="flex flex-col items-center justify-center gap-4 p-8">
              <CamBattery battery={getBattery.data?.battery} />
            </section>
          </aside>
        </div>
      )}
    </>
  );
};
export default Recording;
/*

        step === 1 ? (
          <section className="flex flex-col gap-2 items-center justify-center my-auto">
            <h1 className="text-3xl font-semibold text-foreground-important">
              You are ready to start
            </h1>{" "}
            <p className="text-center text-foreground">
              Everything is set up to start your new analysis with Hawkeye live.
            </p>
            <div className="absolute bottom-0 p-6 w-full flex flex-col sm:static sm:w-auto sm:p-0">
              <Button label="Start  recording" style="primary" onClick={()=>handleStep("more")}/>
            </div>
          </section>
        ) : (<div className="w-full h-full"></div>)

*/